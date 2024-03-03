import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import debug from "debug";
import dotenv from "dotenv";
import cors from "cors";
import pg from "pg";
import assetRouter from "./routes/assetRouter.js";
import * as db from "./config/db.js";
import bookingRouter from "./routes/bookingRouter.js";

// Configure environment variables
dotenv.config({ path: "./config/.env" });

// Create express app
const app = express();

// Server config goes here
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your Vite React app's localhost address
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Test route
app.get("/", (req, res) => {
  res.send(JSON.stringify(`Hello from Node.js!`));
});

// API routes
app.use("/api/assets", assetRouter);
app.use("/api/bookings", bookingRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
