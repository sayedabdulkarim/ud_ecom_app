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
  const { name, email, password, address, city, pinCode, country, file } =
    req.body;

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

  // Prepare the user data for creation
  const userData = {
    name,
    email,
    password: hashedPassword, // Store the hashed password
    address,
    city,
    pinCode,
    country,
  };

  // If file (avatar) is provided, add it to the user data
  if (file) {
    // Assuming `file` is a Base64-encoded string of the avatar image
    userData.avatar = {
      // You might want to generate a public_id or use a unique identifier for the user
      public_id: "user_avatar_" + new Date().getTime(), // Example public_id generation
      url: file, // Directly storing the Base64 string
    };
  }

  // Create a new user with the provided data
  const newUser = new UserModal(userData);
  await newUser.save();

  // Generate JWT token
  const token = generateToken(newUser._id);

  // Prepare the user data to return, excluding the password and avatar image data for security and size considerations
  const userToReturn = {
    name: newUser.name,
    email: newUser.email,
    address: newUser.address,
    city: newUser.city,
    pinCode: newUser.pinCode,
    country: newUser.country,
    // Optionally include avatar data if needed
    avatar: newUser.avatar ? newUser.avatar.url : null,
  };

  res.status(201).json({
    message: "User registered successfully.",
    user: userToReturn,
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

// @desc Update profile for a registered user
// @route PUT /api/users/profile
// @access PRIVATE
const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { name, email, address, city, country, pinCode } = req.body;

  try {
    // Find the user by ID
    const user = await UserModal.findById(userId);

    // Check if the user exists
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.address = address || user.address;
    user.city = city || user.city;
    user.country = country || user.country;
    user.pinCode = pinCode || user.pinCode;

    // Save the updated user information
    const updatedUser = await user.save();

    // Send back the updated user information, excluding the password
    res.status(200).json({
      data: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        address: updatedUser.address,
        city: updatedUser.city,
        country: updatedUser.country,
        pinCode: updatedUser.pinCode,
      },
      message: "Profile updated successfully",
    });
  } catch (error) {
    // Log the error or handle it as needed
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Error updating user profile" });
  }
});

// @desc Update profile pic for a registered user
// @route PUT /api/users/updateprofilepic
// @access PRIVATE
const updateProfilePic = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Assuming `req.user` is populated by your authentication middleware
  const file = req.body.file; // Or however you're receiving the new avatar image (e.g., as a Base64 string)

  if (!file) {
    res.status(400).json({ message: "No image provided." });
    return;
  }

  // Find the user by ID
  const user = await UserModal.findById(userId);

  if (!user) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  // Update the user's avatar
  // Assuming `file` is a Base64-encoded string of the avatar image
  user.avatar = {
    public_id: "user_avatar_" + new Date().getTime(), // Example for public_id generation
    url: file, // Storing the Base64 string directly, or you could upload the image to a service like Cloudinary and store the URL
  };

  await user.save();

  // Prepare and return the updated user data, excluding sensitive information
  const updatedUser = {
    name: user.name,
    email: user.email,
    address: user.address,
    city: user.city,
    pinCode: user.pinCode,
    country: user.country,
    avatar: user.avatar ? user.avatar.url : null,
  };

  res.json({
    message: "Profile picture updated successfully.",
    user: updatedUser,
  });
});

// @desc Change password for a registered user
// @route PATCH /api/users/changepassword
// @access PRIVATE
const changePassword = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { oldPassword, newPassword } = req.body;

  // Validation: Check if the new password is provided and not empty
  if (!newPassword || newPassword.trim() === "") {
    return res.status(400).json({ message: "New password is required" });
  }

  try {
    const user = await UserModal.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Set the new password
    user.password = hashedPassword;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Error changing password" });
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

export {
  userLogin,
  userSignUp,
  getMyProfile,
  updateProfile,
  updateProfilePic,
  changePassword,
  logoutUser,
};
