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
    price: {
      type: Number,
      required: [true, "Please enter price"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter stock"],
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

const ProductModal = mongoose.model("Product", productSchema);

export default ProductModal;
