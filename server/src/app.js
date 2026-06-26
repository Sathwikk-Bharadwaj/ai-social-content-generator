import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import generateRoutes from "./routes/generate.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/generate", generateRoutes);
app.use("/api/auth", authRoutes);

// health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

export default app;
