import express from "express";
import { generateContent } from "../controllers/generate.controller.js";

const router = express.Router();

router.post("/", generateContent);

// ⬇️ THIS LINE IS REQUIRED
export default router;
