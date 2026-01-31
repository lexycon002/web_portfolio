import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  console.log("Checking available models...");

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    // There isn't a direct listModels() in the helper, but we can test if basic generation works
    const result = await model.generateContent("Test");
    console.log("✅ Connection Successful! You have access to 'gemini-pro'");
  } catch (error) {
    console.log("❌ Error connecting:", error.message);
  }
}

listModels();