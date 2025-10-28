import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import { getAllProjects } from "./utils/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Support ES Modules for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===============================
// ⚙️ Middleware
// ===============================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // for POST form data

// ===============================
// 🏠 Home Page
// ===============================
app.get("/", async (req, res) => {
  try {
    const projects = await getAllProjects();
    res.render("index", { pageTitle: "Home", projects });
  } catch (error) {
    console.error("❌ Error loading home page:", error.message);
    res.status(500).send("Something went wrong loading the home page.");
  }
});

// ===============================
// 💿 Projects Page
// ===============================
app.get("/projects", async (req, res) => {
  try {
    const projectArray = await getAllProjects();
    res.render("projects", {
      pageTitle: "Projects",
      projectArray,
    });
  } catch (error) {
    console.error("❌ Error loading projects:", error.message);
    res.status(500).send("Error loading projects.");
  }
});

// ===============================
// 🪙 Mint Page
// ===============================
app.get("/mint", (req, res) => {
  res.render("mint", { pageTitle: "Mint NFT" });
});

// ===============================
// ✉️ Contact Page (GET)
// ===============================
app.get("/contact", (req, res) => {
  res.render("contact", {
    pageTitle: "Contact",
    successMessage: null,
    errorMessage: null,
  });
});

// ===============================
// 📤 Contact Page (POST - Send Email)
// ===============================
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    console.log("🚀 Attempting to send email via iCloud...");

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false, // iCloud uses STARTTLS on port 587
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      debug: true,
    });

    // Verify SMTP connection
    await transporter.verify();
    console.log("✅ iCloud SMTP verified successfully.");

    const mailOptions = {
      from: `"${name}" <${process.env.MAIL_USERNAME}>`,
      to: process.env.MESSAGE_TO,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `
      Name: ${name}
      Email: ${email}

      Message:
      ${message}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.response);

    res.render("contact", {
      pageTitle: "Contact",
      successMessage: "✅ Your message was sent successfully!",
      errorMessage: null,
    });
  } catch (error) {
    console.error("❌ Email send failed:", error.message);
    res.render("contact", {
      pageTitle: "Contact",
      successMessage: null,
      errorMessage:
        "⚠️ There was a problem sending your message. Please try again later.",
    });
  }
});

// ===============================
// 🧱 Error Handling Middleware
// ===============================
app.use((err, req, res, next) => {
  console.error("🔥 Unhandled Server Error:", err);
  res.status(500).send("Server Error: Something went wrong!");
});

// ===============================
// 🚀 Start Server
// ===============================
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
