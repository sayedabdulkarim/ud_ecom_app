import express from "express";
import {
  adminMiddleware,
  protectedRoutesWithParser,
} from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  addCategory,
  getAllProducts,
  createProduct,
  deleteCategory,
  deleteProduct,
  getAllCategories,
  getProductDetails,
  updateProduct,
  getAdminProducts,
} from "../controller/productController.js";

//
router.get(
  "/getAdminProducts",
  protectedRoutesWithParser,
  adminMiddleware,
  getAdminProducts
);

///
router.get("/getAllProducts", getAllProducts);
router.route("/getProduct/:id").get(getProductDetails);
router.post(
  "/createproduct",
  protectedRoutesWithParser,
  adminMiddleware,
  createProduct
);
router.put(
  "/updateproduct/:id",
  protectedRoutesWithParser,
  adminMiddleware,
  updateProduct
);
router.delete(
  "/deleteproduct/:id",
  protectedRoutesWithParser,
  adminMiddleware,
  deleteProduct
);

//categories
router.post(
  "/addcategory",
  protectedRoutesWithParser,
  adminMiddleware,
  addCategory
);
router.get("/getallcategories", protectedRoutesWithParser, getAllCategories);
router.delete(
  "/deleteCategory/:id",
  protectedRoutesWithParser,
  adminMiddleware,
  deleteCategory
);

export default router;
