// ===============================
// 📦 Imports & Setup
// ===============================
import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import { getAllProjects, getProjectById } from "./utils/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ===============================
// 🛠 Middleware
// ===============================
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// ===============================
// 🏠 Home Page
// ===============================
app.get("/", async (req, res) => {
  try {
    const projects = await getAllProjects();

    // Pick ONE random project
    let featuredProject = null;
    if (projects.length > 0) {
      const randomIndex = Math.floor(Math.random() * projects.length);
      featuredProject = projects[randomIndex];
    }

    res.render("index", {
      pageTitle: "Home",
      featuredProject, // ONE project
    });
  } catch (error) {
    console.error("❌ Home Page Error:", error.message);
    res.status(500).send("Something went wrong loading the homepage.");
  }
});

// ===============================
// 📂 All Projects Page
// ===============================
app.get("/projects", async (req, res) => {
  try {
    const projectArray = await getAllProjects();

    res.render("projects", {
      pageTitle: "Projects",
      projectArray, // full list for the gallery page
    });
  } catch (error) {
    console.error("❌ Projects Page Error:", error.message);
    res.status(500).send("Error loading projects.");
  }
});

// ===============================
// 🔍 Single Project Page
// ===============================
app.get("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await getProjectById(id);

    if (!project) {
      // Simple 404 for now
      return res.status(404).send("Project not found");
    }

    res.render("project", {
      pageTitle: project.title,
      project, // this is what project.ejs is using
    });
  } catch (error) {
    console.error("❌ Single Project Page Error:", error.message);
    res.status(500).send("Error loading project.");
  }
});

// ===============================
// 🪙 Mint Page
// ===============================
app.get("/mint", (req, res) => {
  res.render("mint", { pageTitle: "Mint NFT" });
});

// ===============================
// ✉️ Contact Page
// ===============================
app.get("/contact", (req, res) => {
  res.render("contact", {
    pageTitle: "Contact",
    successMessage: null,
    errorMessage: null,
  });
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
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

    await transporter.verify();

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

    await transporter.sendMail(mailOptions);

    res.render("contact", {
      pageTitle: "Contact",
      successMessage: "✅ Your message was sent successfully!",
      errorMessage: null,
    });
  } catch (error) {
    console.error("❌ Email Send Error:", error.message);
    res.render("contact", {
      pageTitle: "Contact",
      successMessage: null,
      errorMessage:
        "⚠️ There was a problem sending your message. Please try again later.",
    });
  }
});

// ===============================
// 🚨 Error Handler
// ===============================
app.use((err, req, res, next) => {
  console.error("🔥 Unhandled Error:", err);
  res.status(500).send("Server Error: Something went wrong!");
});

// ===============================
// 🚀 Start Server
// ===============================
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
