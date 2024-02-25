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
  updateProfilePic,
  forgotPassword,
  resetPassword,
} from "../controller/userController.js";

router.post("/login", userLogin);
router.post("/signup", userSignUp);
router
  .route("/profile")
  .get(protectedRoutesWithParser, getMyProfile)
  .put(protectedRoutesWithParser, updateProfile);

router.put("/updateprofilepic", protectedRoutesWithParser, updateProfilePic);
router.put("/changepassword", protectedRoutesWithParser, changePassword);
router.post("/logout", protectedRoutesWithParser, logoutUser);

router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword").put(resetPassword);

export default router;
