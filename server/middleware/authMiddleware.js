import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
//parser
import UserModal from "../modals/userModal.js";

// export const protectedRoutesWithParser = asyncHandler(
//   async (req, res, next) => {
//     const token = req.cookies.jwt; // JWT token from cookie
//     const csrfToken = req.cookies["XSRF-TOKEN"]; // CSRF token from cookie
//     // const csrfTokenFromHeader = req.headers["X-CSRF-TOKEN"]; // CSRF token from header
//     const csrfTokenFromHeader = req.headers["x-csrf-token"]; // CSRF token from header

//     // console.log({ token, csrfToken, csrfTokenFromHeader, req: req.headers });

//     if (token) {
//       try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Verify CSRF token
//         if (csrfToken !== csrfTokenFromHeader) {
//           res.status(403);
//           throw new Error("CSRF token validation failed");
//         }

//         // Token is valid, set the user in the request
//         req.user = await UserModal.findById(decoded.id).select("-password");
//         next();
//       } catch (error) {
//         console.error(error);
//         res.status(401);
//         throw new Error("Not authorized, token failed");
//       }
//     } else {
//       res.status(401);
//       throw new Error("Not authorized, token missing or CSRF token missing");
//     }
//   }
// );

export const protectedRoutesWithParser = asyncHandler(
  async (req, res, next) => {
    let token;
    console.log(
      {
        test: req.headers.authorization,
      },
      " protectedddd"
    );
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Assuming you have a User model where you can find the user by ID
        req.user = await UserModal.findById(decoded.id).select("-password");

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

export const adminMiddleware = asyncHandler(async (req, res, next) => {
  // Check if the authenticated user's role is "admin"
  if (req.user && req.user.role === "admin") {
    next(); // User is an admin, proceed to the next middleware
  } else {
    res.status(403); // Forbidden
    throw new Error("Allowed only for admin");
  }
});
