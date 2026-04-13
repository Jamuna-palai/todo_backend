const sql = require('mssql');

const config = {
  user: 'testuser',
  password: '12345',
  server: 'localhost',
  port: 1433,
  database: 'todoDB',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

let pool;

async function connectDB() {
  try {
    pool = await sql.connect(config);
    console.log("✅ SQL Connected");
    return pool;
  } catch (err) {
    console.log("❌ DB Error:", err.message);
    throw err;
  }
}

module.exports = { sql, connectDB };