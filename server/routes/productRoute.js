import express from "express";
import { protectedRoutesWithParser } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  allProduct,
  createProduct,
  getProductDetails,
} from "../controller/productController.js";

router.get("/allproduct", allProduct);
router.route("/getProduct/:id").get(getProductDetails);
router.post("/createproduct", protectedRoutesWithParser, createProduct);

export default router;
