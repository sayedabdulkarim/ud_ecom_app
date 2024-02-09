import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDb from "./config/db.js";
import Stripe from "stripe";
//routes
import userRoutes from "./routes/userRoute.js";
import productRoutes from "./routes/productRoute.js";
import ordersRoutes from "./routes/orderRoutes.js";

const port = process.env.PORT || 5000;

connectDb();

//stripe
export const stripe = new Stripe(process.env.STRIPE_API_SECRET);

const app = express();

// Increase the limit for parsed data (JSON)
app.use(express.json({ limit: "50mb" })); // Adjust '50mb' as needed
// Increase the limit for parsed data (URL-encoded)
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Adjust '50mb' as needed

const corsOptions = {
  origin: ["http://localhost:3000"], // Client's URL, not the server's
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true, // <-- REQUIRED backend setting
};

app.use(cors(corsOptions));

// app.use(cors());
app.use(cookieParser());

//test
app.get("/", (req, res) => {
  res.json("Hello");
});

//routes
app.use("/api/users", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/orders", ordersRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listen to ${port}`);
});
