import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const saltRounds = 10; // adjust the salt rounds as needed

// export const generateJWTToken = (userId, expiresIn = "2d") => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
//     expiresIn: expiresIn,
//   });
// };

export const generateToken = (res, userId, expiresIn = "2d") => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });

  const csrfToken = crypto.randomBytes(24).toString("hex");
  const expiration = new Date();
  // expiration.setMilliseconds(expiration.getMilliseconds() + 3600000); // Set it to 1 hour from now
  expiration.setDate(expiration.getDate() + 2); // Set it to 2 days from now

  // JWT Token
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    expires: expiration,
  });

  // CSRF Token
  res.cookie("XSRF-TOKEN", csrfToken, {
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    expires: expiration,
  });

  console.log({
    csrfToken,
    cookie: res,
  });
  return csrfToken; // Return CSRF token to include in the response
};

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
