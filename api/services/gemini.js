import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
// using the stable 2.5 models to ensure zero crashes and better availability
const MODEL_PRIMARY = "gemini-2.5-flash-lite"; 
const MODEL_BACKUP = "gemini-3-flash-preview"; 

// --- QUEUE SYSTEM ---
let requestQueue = Promise.resolve();
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Updated to accept 'useTools' parameter
async function queuedGeminiCall(payload, useTools = false) {
    requestQueue = requestQueue.then(async () => {
        await wait(2000); 
        return attemptRequestWithFallback(payload, useTools);
    }).catch(err => {
        throw err; 
    });
    return requestQueue;
}

// --- ENGINE SWITCHING LOGIC ---
async function attemptRequestWithFallback(payload, useTools) {
    const apiKey = process.env.GEMINI_API_KEY;
    const engines = [MODEL_PRIMARY, MODEL_BACKUP];

    for (const modelName of engines) {
        try {
            console.log(`Attempting Engine: ${modelName} (Tools: ${useTools})...`);
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
            
            // Only attach tools if specifically requested (Arithmetic only)
            const requestBody = {
                contents: payload,
                ...(useTools && { tools: [{ codeExecution: {} }] }) 
            };

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            });

            if (response.status === 429) throw new Error("QUOTA_EXCEEDED");
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error?.message || "Unknown Error");
            }

            const data = await response.json();
            const parts = data.candidates[0].content.parts;
            
            // Clean output: Join text and ignore system logs
            return parts.map(p => p.text || (p.executableCode ? "" : "")).join("").trim();

        } catch (error) {
            console.warn(` ${modelName} failed: ${error.message}`);
            if (error.message.includes("QUOTA")) continue; // Try next model
            throw error;
        }
    }
    throw new Error("All engines exhausted.");
}

// ------- REVERSE GEOCODING ---
async function getRealAddress(lat, lon) {
    try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
        // Native fetch (Node 18+)
        const res = await fetch(url, { headers: { 'User-Agent': 'HammadAssistant/1.0' } });
        if (!res.ok) return null;
        const data = await res.json();
        // Return a clean string: "City, Country"
        const address = data.address;
        const city = address.city || address.town || address.village || "Unknown City";
        const country = address.country || "Unknown Country";
        return `${city}, ${country}`;
    } catch (error) {
        return null;
    }
}

const SYSTEM_PROMPT = `
You are Hammad's Advanced AI Assistant.

YOUR MODES:
1. **ARITHMETIC EXPERT:** If the user asks about Math, Physics formulas,Math formulas or Calculus, you MUST:
   - Provide the exact formula.
   - Solve it step-by-step.
   - Use LaTeX formatting for all math (e.g., $E=mc^2$).
   - Be extremely precise.

2. **LOCATION TRACKER:** If the user sends coordinates (Lat/Long), you MUST:
   - Identify the City, State, and Country.
   - Provide a brief interesting fact about that location (e.g., "Lagos is the economic hub of Nigeria").

3. **GENERAL CHAT:** Be witty and professional, no long epistle.
`

export async function handleChat(userMessage, history, imageBase64, location) {
    try {
        const lowerMsg = userMessage.toLowerCase().trim();

        // ============================================================
        // 1. LOCATION LOGIC (Tools DISABLED)
        // ============================================================
        if (lowerMsg.includes("exact location name based on these coordinates") && location) {
            console.log("📍 Resolving Coordinates...");
            
            // 1. Get the real name first
            let realLocation = await getRealAddress(location.latitude, location.longitude);
            
            // 2. Fallback if geocoding fails
            if (!realLocation) realLocation = `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;

            // 3. Construct a strict prompt
            const locationPrompt = `
            [SYSTEM ALERT]: Coordinates resolved to "${realLocation}".
            MISSION: Output the location and one fun fact. 
            Keep it strictly text. No code blocks.
            `;
            
            const contents = [{ parts: [{ text: `${SYSTEM_PROMPT}\n\n${locationPrompt}` }] }];
            
            // PASS 'FALSE' TO DISABLE TOOLS -> Prevents Python/Glitch text
            const reply = await queuedGeminiCall(contents, false);
            return { reply };
        }

        // ============================================================
        // 2. GENERAL & ARITHMETIC LOGIC (Tools ENABLED)
        // ============================================================
        const recentHistory = history.slice(-6); 
        const contextLines = recentHistory.map(msg => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`).join("\n");
        
        const parts = [{ text: `${SYSTEM_PROMPT}\n\n--- LOG ---\n${contextLines}\n\n--- INPUT ---\nUser: "${userMessage}"\nAssistant:` }];

        if (imageBase64 && imageBase64.length > 100) {
            const matches = imageBase64.match(/^data:(.+);base64,(.+)$/);
            if (matches) parts.push({ inlineData: { mimeType: matches[1], data: matches[2] } });
        }

        console.log(`Processing query...`);
        // PASS 'TRUE' TO ENABLE TOOLS -> Allows Math/Python only here
        const reply = await queuedGeminiCall([{ parts }], true);
        
        return { reply };

    } catch (err) {
        console.error("Critical Error:", err.message);
        return { reply: "> SYSTEM_ERROR: Connection throttled. Try again in 10s." };
    }
}