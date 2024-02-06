import express from "express";
import { protectedRoutesWithParser } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  addCategory,
  allProduct,
  createProduct,
  deleteCategory,
  deleteProduct,
  getAllCategories,
  getProductDetails,
  updateProduct,
} from "../controller/productController.js";

router.get("/allproduct", allProduct);
router.route("/getProduct/:id").get(getProductDetails);
router.post("/createproduct", protectedRoutesWithParser, createProduct);
router.put("/updateproduct/:id", protectedRoutesWithParser, updateProduct);
router.delete("/deleteproduct/:id", protectedRoutesWithParser, deleteProduct);

//categories
router.post("/addcategory", protectedRoutesWithParser, addCategory);
router.get("/getallcategories", protectedRoutesWithParser, getAllCategories);
router.delete("/deleteCategory/:id", protectedRoutesWithParser, deleteCategory);

export default router;
