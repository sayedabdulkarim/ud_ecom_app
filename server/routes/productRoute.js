import express from "express";
import { protectedRoutesWithParser } from "../middleware/authMiddleware.js";
const router = express.Router();

import { addProduct } from "../controller/productController.js";

router.post("/addproduct", protectedRoutesWithParser, addProduct);

export default router;
