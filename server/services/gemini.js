import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";

// CONFIGURATION: USE YOUR VERIFIED MODELS
// Primary: High intelligence
const MODEL_PRIMARY = "gemini-2.0-flash"; 
// Backup: High speed/reliability (From your allowed list)
const MODEL_BACKUP = "gemini-2.0-flash-lite"; 

// --- QUEUE SYSTEM ---
let requestQueue = Promise.resolve();
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function queuedGeminiCall(payload) {
    requestQueue = requestQueue.then(async () => {
        await wait(2000); // 2s Safety Buffer
        return attemptRequestWithFallback(payload);
    }).catch(err => {
        throw err; 
    });
    return requestQueue;
}

// --- ENGINE SWITCHING LOGIC ---
async function attemptRequestWithFallback(payload) {
    try {
        console.log(`🚀 Trying Primary Engine (${MODEL_PRIMARY})...`);
        const url = `${BASE_URL}/${MODEL_PRIMARY}:generateContent`;
        return await callGemini(url, payload);
    } catch (error) {
        console.warn(`⚠️ Primary failed. Switching to Backup (${MODEL_BACKUP})...`);
        
        // Wait 1 second before switching to let API cool down
        await wait(1000);
        
        const backupUrl = `${BASE_URL}/${MODEL_BACKUP}:generateContent`;
        return await callGemini(backupUrl, payload);
    }
}

const SYSTEM_PROMPT = `
You are Hammad's Advanced AI Assistant.

YOUR MODES:
1. **ARITHMETIC EXPERT:** If the user asks about Math, Physics formulas, or Calculus, you MUST:
   - Provide the exact formula.
   - Solve it step-by-step.
   - Use LaTeX formatting for all math (e.g., $E=mc^2$).
   - Be extremely precise.

2. **LOCATION TRACKER:** If the user sends coordinates (Lat/Long), you MUST:
   - Identify the City, State, and Country.
   - Provide a brief interesting fact about that location (e.g., "Lagos is the economic hub of Nigeria").

3. **GENERAL CHAT:** Be witty, professional, and maintain the "Hacker Terminal" persona.
`;

export async function handleChat(userMessage, history, imageBase64, location) {
    try {
        const lowerMsg = userMessage.toLowerCase().trim();

        // ============================================================
        // SAFE MODE INTERCEPTORS (Guaranteed Responses)
        // ============================================================
        
        // 1. Greetings
        if (["hi", "hello", "hey"].includes(lowerMsg)) {
            await wait(500);
            return { reply: "> CONNECTION_ESTABLISHED.\n\nGreetings. Ready for your command." };
        }

        // 2. Status Check
        if (lowerMsg.includes("how are you")) {
            await wait(800); 
            return { reply: "> ASKING_MODE_ACTIVATED...\n\nI am functioning at 100% efficiency. Ready to serve." };
        }
        
        // 3. Small Talk
        if (lowerMsg.includes("i am fine") || lowerMsg === "good") {
             await wait(600);
             return { reply: "> ACKNOWLEDGED.\n\nExcellent. What is our next objective?" };
        }

        // 4. IDENTITY / ORIGIN (Added this to fix your error)
        if (lowerMsg.includes("where are you from") || lowerMsg.includes("who created you") || lowerMsg.includes("who made you")) {
            await wait(800);
            return { reply: "> ORIGIN_TRACE_COMPLETE...\n\nI am a custom AI architecture developed by **Hammad** to assist with portfolio operations. My core servers are distributed globally." };
        }

        // ============================================================
        // REAL AI PROCESSING
        // ============================================================

        let locationContext = "";
        if (location) {
            locationContext = `[SYSTEM DATA: User Coordinates -> Lat: ${location.latitude}, Long: ${location.longitude}]`;
        }

        const recentHistory = history.slice(-6); 
        const contextLines = recentHistory.map(msg => 
            `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
        ).join("\n");

        const parts = [];
        const fullPrompt = `
${SYSTEM_PROMPT}

--- LOG ---
${contextLines}

--- INPUT ---
${locationContext}
User: "${userMessage}"
Assistant:
`;
        parts.push({ text: fullPrompt });

        if (imageBase64 && imageBase64.length > 100) {
            const matches = imageBase64.match(/^data:(.+);base64,(.+)$/);
            if (matches && matches.length === 3) {
                parts.push({
                    inlineData: { mimeType: matches[1], data: matches[2] }
                });
            }
        }

        const contents = [{ parts: parts }];

        console.log(`Processing...`);
        const rawText = await queuedGeminiCall(contents);
        console.log("Response sent.");

        let reply = rawText;
        let action = null;

        if (rawText.includes("[ACTION:LAYOUT_SWITCH]")) {
            action = { type: "LAYOUT_SWITCH", layout: "frontend" };
            reply = rawText.replace("[ACTION:LAYOUT_SWITCH]", "").trim();
        }

        return { reply, action };

    } catch (err) {
        console.error("Gemini Error:", err.message);
        return { reply: "> NETWORK_ERROR: Signal weak. Rerouting... Please try again." };
    }
}

async function callGemini(url, contentsPayload) {
    if (!API_KEY) throw new Error("API Key missing");

    const response = await fetch(`${url}?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: contentsPayload })
    });

    if (!response.ok) {
        const err = await response.json();
        const msg = err.error?.message || `Status ${response.status}`;
        throw new Error(`${response.status} - ${msg}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}