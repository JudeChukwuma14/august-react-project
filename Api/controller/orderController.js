const Order = require("../models/orderModel");
const Cart = require("../models/cart");
const Product = require("../models/productModel");
const { v4: uuidv4 } = require("uuid");

const handleError = (res, error) => {
    console.error("Error details:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
};

const createOrder = async (req, res) => {
    try {
        const { shippingInfo, items, totalAmount, sessionId } = req.body;
        const userId = req.user?._id || null;

        if (!shippingInfo || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Invalid order data" });
        }

        let finalItems = [];
        let adjustedTotal = 0;
        let hasPriceChanges = false;

        // Validate and adjust items
        for (const itemData of items) {
            const { productId, quantity, price: clientPrice } = itemData;
            const product = await Product.findById(productId).select('price stock title');
            if (!product) {
                return res.status(404).json({ message: `Product ${productId} not found` });
            }
            if (product.price !== clientPrice) {
                console.warn(`Price changed for ${product.title}: ${clientPrice} -> ${product.price}`);
                hasPriceChanges = true;
            }
            if (product.stock < quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${product.title}. Available: ${product.stock}` });
            }
            const currentPrice = product.price;
            finalItems.push({ productId, quantity, price: currentPrice });
            adjustedTotal += currentPrice * quantity;
        }

        // Use adjusted total if prices changed
        const orderTotal = hasPriceChanges ? adjustedTotal : totalAmount;

        // Create order
        const order = new Order({
            userId: userId || null,
            sessionId: userId ? null : sessionId,
            shippingInfo,
            items: finalItems,
            totalAmount: orderTotal,
        });

        await order.save();

        // Reduce stock
        for (const itemData of finalItems) {
            await Product.findByIdAndUpdate(itemData.productId, {
                $inc: { stock: -itemData.quantity },
            });
        }

        // Clear cart
        if (userId) {
            await Cart.findOneAndDelete({ userId });
        } else if (sessionId) {
            await Cart.findOneAndDelete({ sessionId });
        }

        // Populate items for response
        await order.populate({
            path: 'items.productId',
            select: 'title price',
        });

        res.status(201).json({
            message: hasPriceChanges ? 'Order created with updated prices' : 'Order created successfully',
            orderId: order._id,
            order,
            adjustedTotal: hasPriceChanges ? orderTotal : null,
        });
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = { createOrder };