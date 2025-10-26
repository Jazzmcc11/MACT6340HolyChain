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

// ---------- MIDDLEWARE ----------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ---------- VIEW ENGINE ----------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ---------- ROUTES ----------

// 🏠 Home
app.get("/", (req, res) => {
  res.render("index", {
    pageTitle: "The Anointed Mixtape | Home",
    page: "home",
  });
});

// 🎵 Projects
app.get("/projects", (req, res) => {
  res.render("projects", {
    pageTitle: "The Anointed Mixtape | Projects",
    page: "projects",
  });
});

// ✉️ Contact
app.get("/contact", (req, res) => {
  res.render("contact", {
    pageTitle: "The Anointed Mixtape | Contact",
    page: "contact",
  });
});

// 💎 Mint
app.get("/mint", (req, res) => {
  res.render("mint", {
    pageTitle: "The Anointed Mixtape | Mint",
    page: "mint",
  });
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
    console.error("❌ Email error:", error);
    res.json({ result: "error" });
  }
});

// ---------- 404 FALLBACK ----------
app.use((req, res) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    page: "404",
  });
});

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`🚀 Server running → http://localhost:${PORT}`);
  console.log(`📧 Using mail account: ${process.env.MAIL_USERNAME || "none"}`);
});
