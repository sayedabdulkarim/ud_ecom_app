import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import asyncHandler from "express-async-handler";
import { stripe } from "../index.js";
// modals
import UserModal from "../modals/userModal.js";
import ProductModal from "../modals/ProductModal.js";
import CategoryModal from "../modals/categoryModa.js";
import OrderModal from "../modals/orderModal.js";

// @desc Create a new order
// @route POST /api/orders
// @access Private

const createOrder = asyncHandler(async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    userType,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
    paymentInfo,
  } = req.body;

  console.log({
    shippingInfo,
    orderItems,
    userType,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
    paymentInfo,
  });

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    // Reduce stock
    const session = await mongoose.startSession(); // Start a session for transaction
    session.startTransaction();
    try {
      for (const item of orderItems) {
        const product = await ProductModal.findById(item.product).session(
          session
        );
        if (product) {
          product.stock = product.stock - item.quantity;
          if (product.stock < 0) {
            // Optionally handle the case where the stock goes negative
            throw new Error(`Not enough stock for product ${product.name}`);
          }
          await product.save({ session });
        } else {
          throw new Error(`Product not found with ID: ${item.product}`);
        }
      }

      // If stock reduction is successful, create the order
      const order = new OrderModal({
        shippingInfo,
        orderItems,
        userType: req.user._id, // or userType based on your implementation
        paymentMethod,
        itemPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
        paymentInfo,
        orderStatus: "Preparing",
      });

      const createdOrder = await order.save({ session });

      await session.commitTransaction(); // Commit the transaction
      session.endSession(); // End the session

      res
        .status(201)
        .json({ message: "Order placed succesfully", createdOrder });
    } catch (error) {
      await session.abortTransaction(); // Abort the transaction on error
      session.endSession(); // End the session
      res.status(500).json({ message: error.message });
    }
  }
});

// @desc Process online payment
// @route POST /api/orders/processPayment
// @access PRIVATE
const processPayment = asyncHandler(async (req, res) => {
  const { totalAmount } = req.body;
  try {
    // Create a PaymentIntent with the order amount and currency
    const { client_secret } = await stripe.paymentIntents.create({
      amount: Number(totalAmount * 100), // Amount is expected in the smallest currency unit (e.g., cents for USD)
      currency: "inr",
    });

    res.status(200).json({
      success: true,
      message: "Payment processed successfully",
      client_secret, // Used for client-side to confirm the payment
    });
  } catch (error) {
    console.error("Payment processing error:", error);
    res.status(500).json({
      success: false,
      message: "Payment processing failed",
      error: error.message,
    });
  }
});
// @desc get all orders
// route GET /api/orders/getAllOrders
// @access PRIVATE

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await OrderModal.find()
      .populate({
        path: "orderItems.product", // Path to the product ID in the orderItems array
        select: "name description price", // Fields you want to include from the Product documents
      })
      .populate({
        path: "userType", // Path to the user ID
        select: "name email", // Fields you want to include from the User documents
      });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.json({ message: "All Orders fetched successfully.", orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc get order details
// route GET /api/orders/getOrderDetails
// @access PRIVATE

const getOrderDetails = asyncHandler(async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await OrderModal.findById(orderId)
      .populate({
        path: "orderItems.product", // Populate product details in order items
        select: "name price image", // Adjust these fields based on your Product schema
      })
      .populate({
        path: "userType", // Populate user details
        select: "name email", // Adjust these fields based on your User schema
      });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order details fetched succesfully.", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc update order status
// route PUT /api/orders/updateOrderStatus
// @access PRIVATE

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params; // Assuming the request body only contains the order ID

  try {
    const order = await OrderModal.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the logged-in user has the right to update the order
    if (
      req.user.role !== "admin" &&
      order.userType.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this order" });
    }

    let responseMessage = ""; // Initialize an empty response message

    // Automatically progress the order status
    switch (order.orderStatus) {
      case "Preparing":
        order.orderStatus = "Shipped";
        responseMessage = "Order shipped successfully";
        break;
      case "Shipped":
        order.orderStatus = "Delivered";
        order.deliveredAt = Date.now(); // Set the deliveredAt date when order is marked as Delivered
        responseMessage = "Order delivered successfully";
        break;
      default:
        return res.status(400).json({ message: "Order already delivered." });
    }

    await order.save();

    res.json({ message: responseMessage, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//

export {
  getAllOrders,
  createOrder,
  processPayment,
  getOrderDetails,
  updateOrderStatus,
};
