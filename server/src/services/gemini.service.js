import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

// Debugging
console.log("======================================");
console.log("Gemini Key Loaded:", process.env.GEMINI_API_KEY);
console.log("======================================");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const generateContent = async (prompt) => {
  try {
    console.log("Generating with prompt:");
    console.log(prompt);

    const result = await model.generateContent(prompt);

    const response = result.response;

    console.log("✅ Gemini Success!");

    return response.text();
  } catch (error) {
    console.error("❌ Gemini Error:");
    console.error(error);

    throw new Error("Failed to generate AI content");
  }
};