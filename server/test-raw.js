import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

console.log("----------------------------------------");
console.log("Testing API Key:", API_KEY ? `Starts with ${API_KEY.substring(0, 4)}...` : "❌ NO KEY FOUND");
console.log("----------------------------------------");

async function testConnection() {
  if (!API_KEY) {
    console.error("❌ Error: GEMINI_API_KEY is missing in .env file");
    return;
  }

  // We will test the 'list models' endpoint directly.
  // This verifies if your Key is allowed to talk to Google at all.
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      console.log("✅ SUCCESS! Your API Key is working.");
      console.log(`🎉 Found ${data.models.length} available models.`);
      console.log("First available model:", data.models[0].name);
    } else {
      console.error("❌ Google Rejected the Connection:");
      console.error(`Status: ${response.status}`);
      console.error("Reason:", JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("❌ Network Error:", error.message);
  }
}

testConnection();