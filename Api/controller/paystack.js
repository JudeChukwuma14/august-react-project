
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Seller = require("../models/sellerModel");
const axios = require("axios"); 


// 1. Initialize Transaction - USING AXIOS INSTEAD
const initializeTransaction = async (orderTotal, email, orderId, origin) => {
  try {
    console.log("Initializing Paystack transaction:", {
      orderTotal,
      email,
      orderId,
    });

    const amount = Math.round(orderTotal * 100); // Convert to kobo
    if (amount < 100) {
      throw new Error("Amount must be at least ₦1");
    }

    const payload = {
      email: email.trim().toLowerCase(),
      amount: amount,
      reference: `order_${orderId}_${Date.now()}`,
      callback_url: `${origin}/payment-verify?orderId=${orderId}`,
      metadata: {
        order_id: orderId.toString(),
        custom_fields: [
          {
            display_name: "Order ID",
            variable_name: "order_id",
            value: orderId.toString(),
          },
        ],
      },
    };

    console.log("Paystack request payload:", payload);

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Paystack response:", response.data);

    if (!response.data.status) {
      throw new Error(
        response.data.message || "Paystack initialization failed"
      );
    }

    return response.data;
  } catch (error) {
    console.error(
      "Payment initialization error:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to initialize payment"
    );
  }
};

// 2. Verify Transaction - USING AXIOS
const verifyTransaction = async (reference, orderId) => {
  try {
    console.log("Verifying transaction:", reference);

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    console.log("Verification response:", response.data);

    if (!response.data.status || response.data.data.status !== "success") {
      throw new Error(
        "Payment verification failed: " +
          (response.data.message || "Unknown error")
      );
    }

    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");
    if (order.paystackReference !== reference)
      throw new Error("Reference mismatch");

    // Update to hold status & reduce stock
    order.paymentStatus = "hold";
    order.paymentConfirmedAt = new Date();
    await order.save();

    // Reduce stock for all items
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    return order;
  } catch (error) {
    console.error("Verification error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Payment verification failed"
    );
  }
};

// 3. Transfer to Seller (After Order Confirmation) - USING AXIOS
const transferToSeller = async (order, sellerId, amount, orderId) => {
  try {
    // Get seller's payment details
    const seller = await Seller.findById(sellerId);
    if (!seller || !seller.paystackRecipientCode) {
      throw new Error("Seller payment details not configured");
    }

    const response = await axios.post(
      "https://api.paystack.co/transfer",
      {
        source: "balance",
        amount: Math.round(amount * 100),
        recipient: seller.paystackRecipientCode,
        reason: `Payment for order ${orderId}`,
        reference: `transfer_${orderId}_${sellerId}_${Date.now()}`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data.status)
      throw new Error("Transfer failed: " + response.data.message);
    return response.data.data.transfer_code;
  } catch (error) {
    console.error("Transfer error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to transfer to seller"
    );
  }
};

module.exports = {initializeTransaction, verifyTransaction, transferToSeller}