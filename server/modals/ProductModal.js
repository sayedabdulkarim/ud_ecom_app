import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name."],
    },
    description: {
      type: String,
      required: [true, "Please enter description."],
    },
    stock: {
      type: Number,
      required: [true, "Please enter stock"],
    },
    imgaes: [
      {
        public_id: String,
        url: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ProductModal = mongoose.model("Product", productSchema);

export default ProductModal;
