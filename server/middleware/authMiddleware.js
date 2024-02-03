import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
//parser
import UserModal from "../modals/userModal.js";

export const protectedRoutesWithParser = asyncHandler(
  async (req, res, next) => {
    const token = req.cookies.jwt; // JWT token from cookie
    const csrfToken = req.cookies["XSRF-TOKEN"]; // CSRF token from cookie
    // const csrfTokenFromHeader = req.headers["X-CSRF-TOKEN"]; // CSRF token from header
    const csrfTokenFromHeader = req.headers["x-csrf-token"]; // CSRF token from header

    // console.log({ token, csrfToken, csrfTokenFromHeader, req: req.headers });

    if (token && csrfToken && csrfTokenFromHeader) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verify CSRF token
        if (csrfToken !== csrfTokenFromHeader) {
          res.status(403);
          throw new Error("CSRF token validation failed");
        }

        // Token is valid, set the user in the request
        req.user = await UserModal.findById(decoded.id).select("-password");
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, token missing or CSRF token missing");
    }
  }
);
