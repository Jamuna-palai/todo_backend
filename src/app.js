const express = require("express");
const todoRoutes = require("./routes/todoRoutes");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express();

// Parse incoming JSON request bodies.
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Todo backend is running" });
});

// All todo endpoints start with /api/todos.
app.use("/api/todos", todoRoutes);

// Keep these at the end so they catch unmatched routes/errors.
app.use(notFound);
app.use(errorHandler);

module.exports = app;
