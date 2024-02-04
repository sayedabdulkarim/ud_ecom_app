import bcrypt from "bcryptjs"; // Make sure to import bcryptjs
import asyncHandler from "express-async-handler";
//modals
import UserModal from "../modals/userModal.js";
import ProductModal from "../modals/ProductModal.js";

import { generateToken, hashPassword } from "../utils/generateToken.js";
import { sendEmail } from "../utils/emailHelper.js";

// @desc get all products
// route GET /api/product/allproduct
// @access PUBLIC

const allProduct = asyncHandler(async (req, res) => {
  try {
    //search n category query
    const products = await ProductModal.find({});
    if (products.length === 0) {
      res.status(404).json({ message: "No products found" });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc Get a single product by ID
// @route GET /api/product/getProduct/:id
// @access PUBLIC

const getProductDetails = asyncHandler(async (req, res) => {
  console.log(req.params, " sdfgh");
  try {
    const product = await ProductModal.findById(req.params.id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching product details" });
  }
});
export { allProduct, getProductDetails };
