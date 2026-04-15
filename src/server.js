const dotenv = require("dotenv");
const app = require("./app");
const { connectDB } = require("./config/db");

// Load values from .env into process.env before using them.
dotenv.config();

const PORT = Number(process.env.PORT || 5000);

async function startServer() {
  try {
    // Start API only after database is connected.
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    // Exit process on startup failure so it can be restarted cleanly.
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
