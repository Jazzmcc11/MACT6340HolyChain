import dotenv from "dotenv";
import * as db from "./utils/database.js";

dotenv.config();

async function testDatabase() {
  console.log("🧪 Testing database connection...\n");

  try {
    // Test connection
    console.log("1️⃣ Connecting to database...");
    await db.connect();
    console.log("✅ Connected successfully!\n");

    // Test getting projects
    console.log("2️⃣ Fetching projects from database...");
    const projects = await db.getAllProjects();
    console.log(`✅ Found ${projects.length} project(s):\n`);
    
    projects.forEach((project, i) => {
      console.log(`   ${i + 1}. ${project.title}`);
    });

    console.log("\n🎉 Database test passed!");
    process.exit(0);

  } catch (error) {
    console.error("\n❌ Database test failed:");
    console.error("Error:", error.message);
    console.error("\nPlease check:");
    console.error("  - MySQL is installed and running");
    console.error("  - .env file has correct credentials");
    console.error("  - Database 'GenartNFT' exists with a 'projects' table");
    process.exit(1);
  }
}

testDatabase();


