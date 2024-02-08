import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: [true],
      },
      city: {
        type: String,
        required: [true],
      },
      country: {
        type: String,
        required: [true],
      },
      pinCode: {
        type: Number,
        required: [true],
      },
    },
    orderItems: [
      {
        name: {
          type: String,
          required: [true],
        },
        price: {
          type: Number,
          required: [true],
        },
        quantity: {
          type: Number,
          required: [true],
        },
        image: {
          type: String,
          required: [true],
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    userType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true],
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
    },
    paidAt: {
      type: Date,
    },
    paymentInfo: {
      id: String,
      status: String,
    },
    itemPrice: {
      type: Number,
      required: [true],
    },
    taxPrice: {
      type: Number,
      required: [true],
    },
    shippingCharges: {
      type: Number,
      required: [true],
    },
    totalAmount: {
      type: Number,
      required: [true],
    },
    orderStatus: {
      type: String,
      enum: ["Preparing", "Shipped", "Delivered"],
      default: "Preparing",
    },
    deliveredAt: {
      type: Date,
    },
    placedOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModal = mongoose.model("Order", orderSchema);

export default OrderModal;
