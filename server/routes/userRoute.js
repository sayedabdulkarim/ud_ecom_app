import express from "express";
import { protectedRoutesWithParser } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  userLogin,
  userSignUp,
  logoutUser,
  getMyProfile,
} from "../controller/userController.js";

router.post("/login", userLogin);
router.post("/signup", userSignUp);
router.get("/profile", protectedRoutesWithParser, getMyProfile);
router.post("/logout", protectedRoutesWithParser, logoutUser);

export default router;
