import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

async function listChatModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // Filter for models that support "generateContent" (Chat)
    const chatModels = data.models
      .filter(m => m.supportedGenerationMethods.includes("generateContent"))
      .map(m => m.name);

    console.log("-----------------------------------");
    console.log("✅ YOUR AVAILABLE CHAT MODELS:");
    console.log(chatModels.join("\n"));
    console.log("-----------------------------------");
    console.log("Pick one of these names and put it in your API_URL!");
  } catch (err) {
    console.error(err);
  }
}

listChatModels();