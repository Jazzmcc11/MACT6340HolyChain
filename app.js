import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import * as db from "./utils/database.js"; // imports connect() & getAllProjects()

// ================================
// SETUP
// ================================
dotenv.config(); // Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Log environment test
console.log("🌿 ENV CHECK:", process.env.DB_USER, process.env.DB_NAME);

// ================================
// VIEW ENGINE SETUP
// ================================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res, next) => {
  try {
    await db.connect(); // Connect to MySQL
    const projects = await db.getAllProjects(); // Fetch rows from DB
    console.log("✅ Projects from DB:", projects);

    res.render("index", {
      data: projects,
      pageTitle: "Home",
    });
  } catch (err) {
    console.error("❌ Error loading projects:", err);
    next(err);
  }
});

// PROJECTS PAGE
app.get("/projects", async (req, res, next) => {
  try {
    await db.connect();
    const projects = await db.getAllProjects();

    res.render("projects", {
      data: projects,
      pageTitle: "Projects",
    });
  } catch (err) {
    console.error("❌ Error loading /projects:", err);
    next(err);
  }
});

// ABOUT PAGE
app.get("/about", (req, res) => {
  res.render("about", { pageTitle: "About" });
});

// CONTACT PAGE
app.get("/contact", (req, res) => {
  res.render("contact", { pageTitle: "Contact" });
});

// ================================
// ERROR HANDLING
// ================================
app.use((err, req, res, next) => {
  console.error("🚨 Server Error:", err.message);
  res.status(500).send("Something went wrong on the server.");
});

// ================================
// START SERVER
// ================================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
