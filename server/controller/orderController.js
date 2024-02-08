import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
//modals
import UserModal from "../modals/userModal.js";
import ProductModal from "../modals/ProductModal.js";
import CategoryModal from "../modals/categoryModa.js";
import OrderModal from "../modals/orderModal.js";

// @desc Create a new order
// @route POST /api/orders
// @access Private

// const createOrder = asyncHandler(async (req, res) => {
//   const {
//     shippingInfo,
//     orderItems,
//     userType,
//     paymentMethod,
//     paymentInfo,
//     itemPrice,
//     taxPrice,
//     shippingCharges,
//     totalAmount,
//   } = req.body;

//   if (orderItems && orderItems.length === 0) {
//     res.status(400);
//     throw new Error("No order items");
//     return;
//   } else {
//     const order = new OrderModal({
//       userType: req.user._id, // Assuming userType is the ID of the user making the request
//       shippingInfo,
//       orderItems,
//       paymentMethod,
//       itemPrice,
//       taxPrice,
//       shippingCharges,
//       totalAmount,
//       paymentInfo,
//       orderStatus: "Preparing", // Default status
//     });

//     const createdOrder = await order.save();

//     res.status(201).json({ message: "Order placed succesfully", createdOrder });
//   }
// });

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

// @desc get all orders
// route GET /api/orders/getAllOrders
// @access PRIVATE
const getAllOrders = asyncHandler(async (req, res) => {});

export { getAllOrders, createOrder };
