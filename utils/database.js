import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

let connection;

// -------------------------
// CONNECT TO MYSQL
// -------------------------
export async function connect() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });
    console.log("✅ Connected to MySQL");
  }
  return connection;
}

// -------------------------
// GET ALL PROJECTS
// -------------------------
export async function getAllProjects() {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM projects;");
  return rows;
}
