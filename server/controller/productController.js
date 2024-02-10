import bcrypt from "bcryptjs"; // Make sure to import bcryptjs
import asyncHandler from "express-async-handler";
//modals
import UserModal from "../modals/userModal.js";
import ProductModal from "../modals/ProductModal.js";
import CategoryModal from "../modals/categoryModa.js";

import { generateToken, hashPassword } from "../utils/generateToken.js";
import { sendEmail } from "../utils/emailHelper.js";

// @desc get all products
// route GET /api/product/getAllproducts
// @access PUBLIC
const getAllProducts = asyncHandler(async (req, res) => {
  // Build the query object based on search keyword and category
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i", // Case-insensitive
        },
      }
    : {};

  const categoryFilter = req.query.category
    ? { category: req.query.category }
    : {};

  try {
    // If there's a category filter, we want to populate the category details
    let query = ProductModal.find({ ...keyword, ...categoryFilter }).populate(
      "category"
    );

    // Optionally, populate 'category' if it's present in the query
    if (req.query.category) {
      query = query.populate("category");
    }

    const products = await query;

    if (products.length === 0) {
      res.status(404).json({ message: "No products found" });
    } else {
      res
        .status(200)
        .json({ message: "All products fetched successfully", products });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// @desc get all admin products
// route GET /api/product/getAdminproducts
// @access PUBLIC
const getAdminProducts = asyncHandler(async (req, res) => {
  try {
    const products = await ProductModal.find({}).populate("category");
    const outOfStock = products.filter((product) => product.stock === 0);

    res.status(200).json({
      success: true,
      message: "Admin products fetched successfully.",
      productsCount: products.length,
      products,
      outOfStockCount: outOfStock.length,
      outOfStock,
      inStockCount: products.length - outOfStock.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin products.",
      error: error.message, // Providing the error message can be helpful for debugging.
    });
  }
});
// @desc Get a single product by ID
// @route GET /api/product/getProduct/:id
// @access PUBLIC

const getProductDetails = asyncHandler(async (req, res) => {
  console.log(req.params, " sdfgh");
  try {
    const product = await ProductModal.findById(req.params.id).populate(
      "category"
    );

    if (product) {
      res
        .status(200)
        .json({ message: "Product details fetched succesfully.", product });
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

  res
    .status(201)
    .json({ message: "Product created Succesfully.", createdProduct }); // Respond with the created product
});

// @desc Update a single product
// @route PUT /api/product/updateproduct/:id
// @access PRIVATE

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, stock, images, category, price } = req.body;

  // First check if the product exists
  const product = await ProductModal.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  // If the product exists, proceed with updating it
  // Construct an update object based on provided fields
  let updateObj = {};
  if (name) updateObj.name = name;
  if (price) updateObj.price = price;
  if (description) updateObj.description = description;
  if (stock) updateObj.stock = stock;
  if (images) updateObj.images = images;
  if (category) updateObj.category = category;

  // Perform the update using the existing product document
  product.set(updateObj);
  const updatedProduct = await product.save();

  // Respond with the updated product details and a success message
  res.status(200).json({
    message: "Product updated successfully",
    product: updatedProduct,
  });
});

//update image (no need i think)

// @desc Delete a single product
// @route DELETE /api/product/deleteproduct/:id
// @access PRIVATE

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Attempt to find the product by ID and delete it
  const product = await ProductModal.findByIdAndDelete(id);

  if (!product) {
    // If the product is not found, return a message indicating it does not exist
    return res.status(404).json({ message: "Product not found." });
  }

  // If the product exists and has been deleted, return a success message
  res.status(200).json({ message: "Product deleted successfully." });
});

//category

// @desc add a category
// @route POST /api/product/addcategory
// @access PRIVATE
const addCategory = asyncHandler(async (req, res) => {
  const { category } = req.body;

  // Basic validation
  if (!category) {
    res.status(400);
    throw new Error("Please enter a category.");
  }

  // Check for duplicate categories
  const categoryExists = await CategoryModal.findOne({ category });
  if (categoryExists) {
    res.status(400);
    throw new Error("Category already exists.");
  }

  const newCategory = await CategoryModal.create({ category });

  if (newCategory) {
    res
      .status(201)
      .json({ message: "Category created succesfully.", newCategory });
  } else {
    res.status(400);
    throw new Error("Invalid category data");
  }
});

// @desc get all categories
// @route GET /api/product/getallcategories
// @access PRIVATE
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await CategoryModal.find({});
  res
    .status(200)
    .json({ message: "All Categories fetched succesfully.", categories });
});

// @desc delete a category
// @route DELETE /api/product/deletecategory/:id
// @access PRIVATE
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Attempt to find and delete the category by its ID
  const deletedCategory = await CategoryModal.findByIdAndDelete(id);

  if (!deletedCategory) {
    res.status(404);
    throw new Error("Category not found.");
  }

  // Update all products associated with this category, setting the category to undefined
  await ProductModal.updateMany({ category: id }, { $unset: { category: "" } });

  res.status(200).json({
    message: "Category deleted successfully and related products updated.",
  });
});

export {
  getAllProducts,
  getAdminProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
  //
  addCategory,
  getAllCategories,
  deleteCategory,
};
