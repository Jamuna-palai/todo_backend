const { sql } = require("../config/db");

async function getTodos(req, res, next) {
  try {
    // Run raw SQL query; mssql returns rows inside recordset.
    const result = await sql.query("SELECT * FROM Todos");
    res.status(200).json(result.recordset);
  } catch (error) {
    // Pass error to centralized Express error middleware.
    next(error);
  }
}

module.exports = { getTodos };
