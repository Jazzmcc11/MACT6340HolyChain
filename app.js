import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { sendMessage } from "./utils/utils.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Fix directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serves everything from /public

// 📨 Email endpoint
app.post("/mail", async (req, res) => {
  console.log("📬 Mail endpoint hit!");
  console.log("Request body:", req.body);

  try {
    const { sub, txt } = req.body;

    console.log("Attempting to send email...");
    await sendMessage(sub, txt);

    console.log("✅ Message sent successfully via utils.js");
    res.json({ result: "success" });
  } catch (error) {
    console.error("❌ Error sending mail:", error.message);
    res.json({ result: "failure", error: error.message });
  }
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log("🔐 MAIL_USERNAME:", process.env.MAIL_USERNAME);
  console.log("🔐 MAIL_HOST:", process.env.MAIL_HOST);
});
