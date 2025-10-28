# Testing Guide for MACT6340HolyChain

## Prerequisites

1. **Install MySQL** (if not already installed):
   - Download [MAMP](https://www.mamp.info/) (easiest for macOS)
   - OR install via Homebrew: `brew install mysql && brew services start mysql`

2. **Configure .env file**:
   - Open `.env` in your project root
   - Add your MySQL password:
     ```
     DB_PASS=your_password_here
     ```
   - If using MAMP: `DB_PASS=root` (default)
   - If using Homebrew: your MySQL root password

## Step 1: Set Up the Database

Open terminal and run:

```bash
# Create database and tables
mysql -u root -p < scratch/build_db.sql
```

(Enter your MySQL password when prompted)

## Step 2: Test Database Connection

```bash
npm start
node test-db.js
```

Expected output:
```
🧪 Testing database connection...
1️⃣ Connecting to database...
✅ Connected successfully!
2️⃣ Fetching projects from database...
✅ Found 3 project(s):
   1. Sole Intentions
   2. Dear Black Girl
   3. Mood Equalizer
🎉 Database test passed!
```

## Step 3: Start the Server

```bash
npm start
```

Open browser: http://localhost:3000

You should see your projects displayed!

## Troubleshooting

**"Can't connect to MySQL"**
- Make sure MySQL is running
- Check your `.env` credentials
- Verify database exists: `SHOW DATABASES;`

**"Table doesn't exist"**
- Run: `mysql -u root -p < scratch/build_db.sql`

**"Module not found"**
- Run: `npm install`


