import express from "express";
import {
  adminMiddleware,
  protectedRoutesWithParser,
} from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  createOrder,
  getAllOrders,
  getOrderDetails,
  processPayment,
  updateOrderStatus,
} from "../controller/orderController.js";

router.post("/createOrder", protectedRoutesWithParser, createOrder);
router.post("/processPayment", protectedRoutesWithParser, processPayment);

router.get("/getAllOrders", protectedRoutesWithParser, getAllOrders);
router.get("/getOrderDetails/:id", protectedRoutesWithParser, getOrderDetails);
router.put(
  "/updateOrderStatus/:orderId",
  protectedRoutesWithParser,
  adminMiddleware,
  updateOrderStatus
);

export default router;
