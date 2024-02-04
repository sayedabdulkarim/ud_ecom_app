import bcrypt from "bcryptjs"; // Make sure to import bcryptjs
import asyncHandler from "express-async-handler";
//modals
import UserModal from "../modals/userModal.js";
import ProductModal from "../modals/ProductModal.js";

import { generateToken, hashPassword } from "../utils/generateToken.js";
import { sendEmail } from "../utils/emailHelper.js";

// @desc login an user
// route POST /api/users/login
// @access PUBLIC

const addProduct = asyncHandler(async (req, res) => {});

export { addProduct };
