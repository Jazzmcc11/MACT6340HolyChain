// app.js
"use strict";

import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ---------- ROUTES ----------

// Home
app.get("/", (req, res) => {
  res.render("index", { pageTitle: "Home" });
});

// Projects
app.get("/projects", (req, res) => {
  const projectArray = [
    { image: "Delilah.png", title: "The Delilah Mixtape: Soft Hands, Sharp Intentions" },
    { image: "Esther.png", title: "The Esther Mixtape: For Such a Time" },
    { image: "Eve.png", title: "The Eve Mixtape: Vol. O.G." },
    { image: "MM.png", title: "The Magdalene Mixtape: Vol. Hoe" },
    { image: "MMH.png", title: "The Magdalene Mixtape: Vol. Healed" },
    { image: "Ruth.png", title: "The Ruth Mixtape: Worth The Wait" },
    { image: "Sarah.png", title: "The Sarah Mixtape: Legacy and Laughter" },
  ];
  res.render("projects", { pageTitle: "Projects", projectArray });
});

// Individual Project Pages
app.get("/project/:id", (req, res, next) => {
  const projectArray = [
    { image: "Delilah.png", title: "The Delilah Mixtape: Soft Hands, Sharp Intentions" },
    { image: "Esther.png", title: "The Esther Mixtape: For Such a Time" },
    { image: "Eve.png", title: "The Eve Mixtape: Vol. O.G." },
    { image: "MM.png", title: "The Magdalene Mixtape: Vol. Hoe" },
    { image: "MMH.png", title: "The Magdalene Mixtape: Vol. Healed" },
    { image: "Ruth.png", title: "The Ruth Mixtape: Worth The Wait" },
    { image: "Sarah.png", title: "The Sarah Mixtape: Legacy and Laughter" },
  ];

  const id = parseInt(req.params.id);
  if (id < 1 || id > projectArray.length) {
    const error = new Error("No project with that ID");
    return next(error);
  }

  const project = projectArray[id - 1];
  res.render("project", { pageTitle: project.title, project });
});

// Contact Page
app.get("/contact", (req, res) => {
  res.render("contact", { pageTitle: "Contact" });
});

// Mint Page
app.get("/mint", (req, res) => {
  res.render("mint", { pageTitle: "Mint" });
});

// ---------- EMAIL HANDLER ----------
app.post("/mail", async (req, res) => {
  const { sub, txt } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: process.env.MAIL_USERNAME,
      subject: sub,
      text: txt,
    });

    res.json({ result: "success" });
  } catch (error) {
    console.error("Email error:", error);
    res.json({ result: "error" });
  }
});

// ---------- ERROR HANDLING ----------
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).render("error", { pageTitle: "Error" });
});

// 404 Fallback
app.use((req, res) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
