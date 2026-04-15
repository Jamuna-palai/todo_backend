const sql = require("mssql");

// SQL Server connection config read from environment variables.
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || "localhost",
  port: Number(process.env.DB_PORT || 1433),
  database: process.env.DB_NAME,
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: process.env.DB_TRUST_CERT !== "false",
  },
};

let pool;

async function connectDB() {
  try {
    // Reuse existing connection pool in long-running Node process.
    if (pool) {
      return pool;
    }

    // Create pool once and share it across controllers.
    pool = await sql.connect(dbConfig);
    console.log("SQL connected");
    return pool;
  } catch (error) {
    console.error("DB connection failed:", error.message);
    throw error;
  }
}

module.exports = { sql, connectDB };
