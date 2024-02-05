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

// @desc create a single product
// @route post /api/product/createproduct
// @access PRIVATE

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, stock, images, category, price } = req.body;

  // Validation (basic) to ensure required fields are provided
  if (!name || !price || !description || stock === undefined) {
    res.status(400); // Bad request
    throw new Error("Please include all required fields.");
  }

  // Create the product
  const product = new ProductModal({
    name,
    price,
    description,
    stock,
    images, // Assuming images come as an array of objects with public_id and url
    category, // Assuming category ID is passed directly
  });

  const createdProduct = await product.save(); // Save the new product to the database

  res.status(201).json(createdProduct); // Respond with the created product
});

export { allProduct, getProductDetails, createProduct };
