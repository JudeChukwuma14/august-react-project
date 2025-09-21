const Order = require("../models/orderModel");
const Cart = require("../models/cart");
const Product = require("../models/productModel");
const crypto = require("crypto");
const { initializeTransaction, verifyTransaction, transferToSeller } = require("./paystack");

const handleError = (res, error) => {
    console.error("Error details:", error);
    res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
};



// 4. Create Order and Initialize Payment
const createOrderAndInitializePayment = async (req, res) => {
    try {
        console.log("Create order request body:", req.body);

        const {
            shippingInfo,
            items,
            totalAmount,
            sessionId,
            paymentMethod = "card",
        } = req.body;

        // Get user info from authentication middleware
        const userId = req.user?._id || null;
        const userEmail = req.user?.email || shippingInfo.email;
        const origin = req.headers.origin || process.env.FRONTEND_URL;

        console.log("User info:", { userId, userEmail, role: req.role });

        // For guest users, require sessionId
        if (!req.user && !sessionId) {
            return res
                .status(400)
                .json({ message: "Session ID required for guest checkout" });
        }

        if (!shippingInfo || !items?.length || !userEmail) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Validate items and calculate total
        let finalItems = [];
        let adjustedTotal = 0;
        let hasPriceChanges = false;

        for (const item of items) {
            const product = await Product.findById(item.productId).select(
                "price stock title seller"
            );
            if (!product) {
                return res
                    .status(404)
                    .json({ message: `Product ${item.productId} not found` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Insufficient stock for ${product.title}. Available: ${product.stock}`,
                });
            }
            if (product.price !== item.price) {
                hasPriceChanges = true;
            }
            finalItems.push({
                productId: item.productId,
                quantity: item.quantity,
                price: product.price,
                sellerId: product.seller,
            });
            adjustedTotal += product.price * item.quantity;
        }

        const orderTotal = hasPriceChanges ? adjustedTotal : totalAmount;
        console.log("Order total calculated:", {
            orderTotal,
            hasPriceChanges,
            adjustedTotal,
            originalTotal: totalAmount,
        });

        // Create order - handle both authenticated and guest users
        const order = new Order({
            userId: userId || null,
            sessionId: userId ? null : sessionId,
            shippingInfo,
            items: finalItems,
            totalAmount: orderTotal,
            paymentMethod,
            paymentStatus: "pending",
        });

        await order.save();
        console.log("Order created:", order._id);

        // For pay on delivery, skip payment initialization
        if (paymentMethod === "pay_on_delivery") {
            order.paymentStatus = "hold";
            await order.save();

            // Clear cart
            if (userId) {
                await Cart.findOneAndDelete({ userId });
            } else {
                await Cart.findOneAndDelete({ sessionId });
            }

            return res.status(201).json({
                message: "Order created successfully (Pay on Delivery)",
                orderId: order._id,
                paymentRequired: false,
            });
        }

        // Initialize Paystack payment for card/bank transfer
        console.log("Initializing Paystack payment...");
        const paystackRes = await initializeTransaction(
            orderTotal,
            userEmail,
            order._id,
            origin
        );

        // Update order with Paystack info
        order.paystackReference = paystackRes.data.reference;
        order.paystackAuthorizationUrl = paystackRes.data.authorization_url;
        await order.save();

        // Clear cart
        if (userId) {
            await Cart.findOneAndDelete({ userId });
        } else {
            await Cart.findOneAndDelete({ sessionId });
        }

        res.status(201).json({
            message: hasPriceChanges
                ? "Order created with updated prices"
                : "Order created successfully",
            orderId: order._id,
            authorizationUrl: paystackRes.data.authorization_url,
            reference: paystackRes.data.reference,
            paymentRequired: true,
        });
    } catch (error) {
        console.error("Create order error:", error);
        handleError(res, error);
    }
};

// 5. Verify Payment Webhook
const verifyPaymentWebhook = async (req, res) => {
    try {
        console.log("Webhook received:", req.body);

        // Verify webhook signature
        const hash = crypto
            .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
            .update(JSON.stringify(req.body))
            .digest("hex");

        if (hash !== req.headers["x-paystack-signature"]) {
            console.error("Invalid webhook signature");
            return res.status(401).json({ message: "Invalid signature" });
        }

        const { event, data } = req.body;

        if (event === "charge.success") {
            const { reference } = data;
            const order = await Order.findOne({
                paystackReference: reference,
                paymentStatus: "pending",
            });

            if (order) {
                await verifyTransaction(reference, order._id);
                console.log(`Payment verified for order ${order._id}`);
            }
        }

        res.status(200).send("Webhook processed");
    } catch (error) {
        console.error("Webhook error:", error);
        res.status(500).json({ message: "Webhook processing failed" });
    }
};

// 6. Confirm Order Delivery (Release Payment to Seller)
const confirmOrderDelivery = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user?._id;

        const order = await Order.findById(orderId).populate("items.productId");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Authorization check - user must own the order or be admin
        if (order.userId.toString() !== userId.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: "Not authorized" });
        }

        if (order.paymentStatus !== "hold") {
            return res.status(400).json({ message: "Order not in hold status" });
        }

        if (order.sellerPaidAt) {
            return res.status(400).json({ message: "Sellers already paid" });
        }

        // Group items by seller and process payments
        const sellerPayments = {};
        order.items.forEach((item) => {
            const sellerId = item.sellerId.toString();
            if (!sellerPayments[sellerId]) {
                sellerPayments[sellerId] = 0;
            }
            sellerPayments[sellerId] += item.price * item.quantity;
        });

        const paymentResults = [];
        for (const [sellerId, amount] of Object.entries(sellerPayments)) {
            try {
                const transferCode = await transferToSeller(
                    order,
                    sellerId,
                    amount,
                    orderId
                );
                paymentResults.push({
                    sellerId,
                    success: true,
                    amount,
                    transferCode,
                });
            } catch (error) {
                paymentResults.push({
                    sellerId,
                    success: false,
                    amount,
                    error: error.message,
                });
            }
        }

        // Update order
        order.paymentStatus = "paid";
        order.sellerPaidAt = new Date();
        await order.save();

        res.status(200).json({
            message: "Order confirmed and payments processed",
            payments: paymentResults,
        });
    } catch (error) {
        handleError(res, error);
    }
};


// controllers/orderController.js
const verifyPaymentManual = async (req, res) => {
    try {
        const { reference, orderId } = req.query; // Use req.query for GET

        console.log('Manual verification request:', { reference, orderId });

        if (!reference || !orderId) {
            return res.status(400).json({
                message: "Reference and order ID required",
                received: { reference, orderId }
            });
        }

        const order = await verifyTransaction(reference, orderId);

        res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
            order: {
                _id: order._id,
                totalAmount: order.totalAmount,
                paymentStatus: order.paymentStatus,
                paymentConfirmedAt: order.paymentConfirmedAt
            }
        });
    } catch (error) {
        console.error('Manual verification error:', error.message);
        res.status(400).json({
            success: false,
            message: error.message,
            error: error.toString()
        });
    }
};

module.exports = {
    createOrderAndInitializePayment,
    verifyPaymentWebhook,
    confirmOrderDelivery,
    verifyPaymentManual,
};
