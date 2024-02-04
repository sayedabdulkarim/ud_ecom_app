import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Please enter category."],
    },
  },
  {
    timestamps: true,
  }
);

const CategoryModal = mongoose.model("Category", categorySchema);

export default CategoryModal;
