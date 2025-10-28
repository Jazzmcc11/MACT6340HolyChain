// utils/database.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // make sure this matches your .env exactly
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

export async function getAllProjects() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Connected to MySQL");
    const [rows] = await connection.execute("SELECT * FROM projects");
    console.log("🪄 Projects fetched:", rows);
    return rows;
  } catch (err) {
    console.error("❌ Error loading projects:", err.message);
    return [];
  } finally {
    if (connection) await connection.end();
  }
}
