import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true, // Ensure phone numbers are unique
    },
  },
  {
    timestamps: true,
  }
);

const ProductModal = mongoose.model("Product", productSchema);

export default ProductModal;
