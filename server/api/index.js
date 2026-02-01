import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoute from "../routes/chat.js"; 
import ContactRoutes from "../routes/contact.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routing
app.use("/api/chat", chatRoute);    
app.use("/api/contact", ContactRoutes);

// Base route for testing
app.get("/api", (req, res) => res.send("Server is running!"));

export default app; 
