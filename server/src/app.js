import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import generateRoutes from "./routes/generate.routes.js";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/generate", generateRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

export default app;
