const express = require("express");
const { getTodos } = require("../controllers/todoController");

const router = express.Router();

// GET /api/todos -> fetch all todo rows from SQL table.
router.get("/", getTodos);

module.exports = router;
