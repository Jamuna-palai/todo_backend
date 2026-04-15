function notFound(req, res) {
  // Runs when no route matches the requested URL.
  res.status(404).json({ message: "Route not found" });
}

function errorHandler(err, req, res, next) {
  // If response is already started, delegate to Express default handler.
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal server error",
  });
}

module.exports = { notFound, errorHandler };
