// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Debug: check Hugging Face API key
console.log("HF_API_KEY:", process.env.HF_API_KEY);

app.post("/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ reply: "Invalid request format" });
  }

  // Build the prompt from messages
  const prompt = messages
    .map((m) => (m.role === "user" ? `User: ${m.content}` : `Bot: ${m.content}`))
    .join("\n") + "\nBot:";

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/gpt2", // or another chat-capable model
      { inputs: prompt, options: { wait_for_model: true } },
      {
        headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` },
      }
    );

    const reply = response.data?.generated_text
      ? response.data.generated_text.replace(prompt, "").trim()
      : "Sorry, I couldn't generate a response.";

    res.json({ reply });
  } catch (err) {
    console.error("Hugging Face error:", err.response?.data || err.message || err);
    res.status(500).json({ reply: "Error generating response" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
