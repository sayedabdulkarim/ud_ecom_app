import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const generateToken = (userId, expiresIn = "2d") => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });
};

const saltRounds = 10; // adjust the salt rounds as needed

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};
