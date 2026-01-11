import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import roadmapRoutes from "./routes/roadmaps.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

/* Middleware */
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/roadmaps", roadmapRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Career Roadmap JS Backend Ready (MongoDB)" });
});

/* Health Check */
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/* MongoDB Connection */
const connectDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    console.log("✅ MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
};

connectDB();

/* Local dev only */
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

/* REQUIRED for Vercel */
export default app;
