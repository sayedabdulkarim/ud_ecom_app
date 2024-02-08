import express from "express";
import {
  adminMiddleware,
  protectedRoutesWithParser,
} from "../middleware/authMiddleware.js";
const router = express.Router();

import { createOrder, getAllOrders } from "../controller/orderController.js";

router.post("/createOrder", protectedRoutesWithParser, createOrder);
router.get("/getAllOrders", protectedRoutesWithParser, getAllOrders);

export default router;
