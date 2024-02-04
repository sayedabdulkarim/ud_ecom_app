import express from "express";
import { protectedRoutesWithParser } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  allProduct,
  getProductDetails,
} from "../controller/productController.js";

router.get("/allproduct", allProduct);
router.route("/getProduct/:id").get(getProductDetails);

export default router;
