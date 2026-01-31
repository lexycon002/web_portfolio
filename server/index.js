import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoute from "./routes/chat.js";
import ContactRoutes from "./routes/contact.js"

dotenv.config();

const app = express();

app.use(cors());

// FIX: Increase payload limit to 50MB to handle large images
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/chat", chatRoute);
app.use("/api/contact", ContactRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;