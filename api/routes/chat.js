import express from "express";
import { handleChat } from "../services/gemini.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        // 1. Get both message and history from the request
        const { message, history } = req.body;
        
        if (!message) return res.status(400).json({ error: "Message is required" });

        // 2. Pass both to the handler
        const response = await handleChat(message, history || []);
        
        res.json(response);
    } catch (err) {
        console.error("Error in /chat route:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
