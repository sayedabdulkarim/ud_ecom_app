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
  updateOrderStatus,
} from "../controller/orderController.js";

router.post("/createOrder", protectedRoutesWithParser, createOrder);
router.get("/getAllOrders", protectedRoutesWithParser, getAllOrders);
router.get("/getOrderDetails/:id", protectedRoutesWithParser, getOrderDetails);
router.put(
  "/updateOrderStatus/:orderId",
  protectedRoutesWithParser,
  adminMiddleware,
  updateOrderStatus
);

export default router;
