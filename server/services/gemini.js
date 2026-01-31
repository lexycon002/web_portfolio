import dotenv from "dotenv";
import axios from "axios"; // REQUIRED: npm install axios
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";

// CONFIGURATION: USE YOUR VERIFIED MODELS
const MODEL_PRIMARY = "gemini-2.0-flash"; 
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
        console.log(`Trying Primary Engine (${MODEL_PRIMARY})...`);
        const url = `${BASE_URL}/${MODEL_PRIMARY}:generateContent`;
        return await callGemini(url, payload);
    } catch (error) {
        console.warn(`Primary failed. Switching to Backup (${MODEL_BACKUP})...`);
        await wait(1000);
        const backupUrl = `${BASE_URL}/${MODEL_BACKUP}:generateContent`;
        return await callGemini(backupUrl, payload);
    }
}

// --- NEW TOOL: REAL REVERSE GEOCODING (OpenStreetMap) ---
// This prevents "Network Errors" by fetching the real address first
async function getRealAddress(lat, lon) {
    try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
        const res = await axios.get(url, { headers: { 'User-Agent': 'HammadPortfolio/1.0' } });
        
        if (res.data && res.data.display_name) {
            return res.data.display_name;
        }
        return null;
    } catch (error) {
        console.error("Geocoding Error:", error.message);
        return null;
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
        // 1. LOCATION SPECIAL HANDLER (THE FIX)
        // ============================================================
        // This catches the specific request from your frontend
        if (lowerMsg.includes("exact location name based on these coordinates") && location) {
            console.log("📍 Processing Location Lookup...");

            // A. Get Real Data (OpenStreetMap)
            let realAddress = await getRealAddress(location.latitude, location.longitude);
            
            // B. Fallback if OSM fails
            if (!realAddress) {
                realAddress = `Latitude ${location.latitude.toFixed(4)}, Longitude ${location.longitude.toFixed(4)}`;
            }

            // C. Feed Real Data to Gemini for "Hacker" Styling
            const locationPrompt = `
            SYSTEM DATA: The user is currently located at: "${realAddress}".
            
            YOUR TASK:
            1. Report this location to the user.
            2. Format it like a high-tech satellite lock-on message.
            3. Keep it concise.
            
            Example Output:
            > SATELLITE LOCK CONFIRMED.
            > TARGET DETECTED: [Insert Address Here]
            > STATUS: Verified.
            `;
            
            const contents = [{ parts: [{ text: locationPrompt }] }];
            
            try {
                const response = await queuedGeminiCall(contents);
                return { reply: response };
            } catch (e) {
                // Final fallback if AI fails, just return the raw address
                return { reply: `> SATELLITE DATA RAW: ${realAddress}` };
            }
        }

        // ============================================================
        // 2. SAFE MODE INTERCEPTORS (Guaranteed Responses)
        // ============================================================
        
        // Greetings
        if (["hi", "hello", "hey"].includes(lowerMsg)) {
            await wait(500);
            return { reply: "> CONNECTION_ESTABLISHED.\n\nGreetings. Ready for your command." };
        }

        // Status Check
        if (lowerMsg.includes("how are you")) {
            await wait(800); 
            return { reply: "> ASKING_MODE_ACTIVATED...\n\nI am functioning at 100% efficiency. Ready to serve." };
        }
        
        // Small Talk
        if (lowerMsg.includes("i am fine") || lowerMsg === "good") {
             await wait(600);
             return { reply: "> ACKNOWLEDGED.\n\nExcellent. What is our next objective?" };
        }

        // Identity
        if (lowerMsg.includes("where are you from") || lowerMsg.includes("who created you") || lowerMsg.includes("who made you")) {
            await wait(800);
            return { reply: "> ORIGIN_TRACE_COMPLETE...\n\nI am a custom AI architecture developed by **Hammad** to assist with portfolio operations. My core servers are distributed globally." };
        }

        // ============================================================
        // 3. REAL AI PROCESSING
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

        console.log(`Processing General Query...`);
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