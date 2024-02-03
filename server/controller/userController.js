import bcrypt from "bcryptjs"; // Make sure to import bcryptjs
import asyncHandler from "express-async-handler";
//modals
import UserModal from "../modals/userModal.js";
import PropertyModal from "../modals/propertyModal.js";

import { generateToken, hashPassword } from "../utils/generateToken.js";
//helpers

// @desc login an user
// route POST /api/users/login
// @access PUBLIC

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // Get the password from the request body

  // Find the user by email
  const user = await UserModal.findOne({ email }).select("+password");

  if (user) {
    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a token for the user session
    const token = generateToken(res, user._id);

    // Exclude the password when sending back the user data
    const userResponse = { ...user._doc };
    delete userResponse.password;

    // Send the response including the user info (without password), token, and their properties
    res.status(200).json({
      token,
      data: userResponse,
      message: `Welcome back, ${userResponse?.name}`,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// @desc register a new user
// route POST /api/users/signup
// @access PUBLIC
const userSignUp = asyncHandler(async (req, res) => {
  const { name, email, password, address, city, pinCode, country } = req.body;

  console.log({
    name,
    email,
    password,
    address,
    city,
    pinCode,
    country,
  });
  // Check if the user already exists based on email
  const existingUserByEmail = await UserModal.findOne({ email });
  if (existingUserByEmail) {
    res
      .status(400)
      .json({ message: "User with this email already exists. Please Login." });
    return;
  }

  // Encrypt the password
  const hashedPassword = await hashPassword(password);

  // Create a new user with the hashed password
  const newUser = new UserModal({
    name,
    email,
    password: hashedPassword, // Store the hashed password
    address,
    city,
    pinCode,
    country,
  });
  await newUser.save();

  // Generate JWT token
  const token = generateToken(newUser._id);

  res.status(201).json({
    message: "User registered successfully.",
    user: { name, email }, // Adjust according to what you want to return
    token, // Include the token in the response
  });
});

// @desc get profile for a registered user
// route GET /api/users/profile
// @access PRIVATE
const getMyProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id; // or just req.user if it's the entire object

  try {
    const user = await UserModal.findById(userId).select("-password"); // Exclude password from the result
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Send back the user information, excluding the password
    res.status(200).json({
      data: user,
      message: "Profile information retrieved successfully",
    });
  } catch (error) {
    // Log the error or handle it as needed
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error retrieving user profile" });
  }
});

// @desc logout for a registered user
// route POST /api/users/logout
// @access PRIVATE
const logoutUser = asyncHandler(async (req, res) => {
  // Clear the JWT Token cookie
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });

  // Clear the CSRF Token cookie
  res.cookie("XSRF-TOKEN", "", {
    expires: new Date(0),
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });

  // Inform the client that the user has been successfully logged out
  res.status(200).json({
    message: "Successfully logged out.",
  });
});

export { userLogin, userSignUp, getMyProfile, logoutUser };
