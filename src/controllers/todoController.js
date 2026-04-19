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

async function getTodoById(req, res, next) {
  try {
    const { id } = req.params;

    const result = await sql.query`
      SELECT * FROM Todos WHERE id = ${id}
    `;

    if (!result.recordset[0]) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(result.recordset[0]);
  } catch (error) {
    next(error);
  }
}


async function createTodo(req, res, next) {
  try {
    const { title } = req.body;

    const result = await sql.query`
      INSERT INTO Todos (title, completed)
      OUTPUT INSERTED.*
      VALUES (${title}, ${false})
    `;

    res.status(201).json(result.recordset[0]);
  } catch (error) {
    next(error);
  }
}


async function updateTodo(req, res, next) {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const result = await sql.query`
      UPDATE Todos
      SET title = ${title}, completed = ${completed}
      OUTPUT INSERTED.*
      WHERE id = ${id}
    `;

    res.status(200).json(result.recordset[0]);
  } catch (error) {
    next(error);
  }
}


async function deleteTodo(req, res, next) {
  try {
    const { id } = req.params;

    const result = await sql.query`
      DELETE FROM Todos
      OUTPUT DELETED.*
      WHERE id = ${id}
    `;

    // If no record found
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
      data: result.recordset[0],
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { 
  getTodos, 
  createTodo, 
  updateTodo, 
  getTodoById ,
  deleteTodo
};
