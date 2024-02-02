import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name."],
    },
    email: {
      type: String,
      required: [true, "Please enter email."],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email."], // Note the change here from 'validator' to 'validate' and usage of an array
    },
    password: {
      type: String,
      required: [true, "Please enter password."],
      minLength: [6, "Password must be at least 6 characters."], // Corrected spelling
      select: false, // This ensures that the password is not returned in query results unless explicitly requested
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    avatar: {
      public_id: String,
      url: String,
    },
    otp: Number,
    otp_expire: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
