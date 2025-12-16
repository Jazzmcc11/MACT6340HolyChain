// utils/database.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

// 🧠 Local Database Configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "BigSis123!",
  database: process.env.DB_NAME || "holychain_db",
  port: process.env.DB_PORT || 3306,
};

// 🧪 Test Connection (runs once on startup)
const testConnection = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("✅ Connected successfully to MySQL!");
    await connection.end();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
};
testConnection();

// 📦 Function to Fetch All Projects
export async function getAllProjects() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Connected to MySQL (Local)");
    const [rows] = await connection.execute("SELECT * FROM projects");
    console.log("🪄 Projects fetched:", rows.length);
    return rows;
  } catch (err) {
    console.error("❌ Error loading projects:", err.message);
    return [];
  } finally {
    if (connection) await connection.end();
  }
}

// 📦 Function to Fetch ONE Project by ID
export async function getProjectById(id) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Connected to MySQL (Local) for single project");
    const [rows] = await connection.execute(
      "SELECT * FROM projects WHERE id = ?",
      [id]
    );
    console.log("🪄 Single project fetched:", rows.length);
    return rows[0] || null;
  } catch (err) {
    console.error("❌ Error loading single project:", err.message);
    return null;
  } finally {
    if (connection) await connection.end();
  }
}
