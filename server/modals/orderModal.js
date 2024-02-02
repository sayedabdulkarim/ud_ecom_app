import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
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

const OrderModal = mongoose.model("Order", orderSchema);

export default OrderModal;
