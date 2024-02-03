import express from "express";
import { protectedRoutesWithParser } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  userLogin,
  userSignUp,
  logoutUser,
  getMyProfile,
  updateProfile,
  changePassword,
} from "../controller/userController.js";

router.post("/login", userLogin);
router.post("/signup", userSignUp);
router.get("/profile", protectedRoutesWithParser, getMyProfile);
router.put("/profile", protectedRoutesWithParser, updateProfile);
router.put("/changepassword", protectedRoutesWithParser, changePassword);
router.post("/logout", protectedRoutesWithParser, logoutUser);

export default router;
