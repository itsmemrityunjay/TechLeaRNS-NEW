// Import the main Express app
const mongoose = require("mongoose");
const app = require("../index.js");

// Improved database connection handling
async function ensureDbConnected() {
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB connected in serverless function");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }
  return true;
}

// Create a handler for the serverless function
module.exports = async (req, res) => {
  try {
    // Ensure database is connected before processing request
    await ensureDbConnected();

    // Forward the request to the Express app
    return app(req, res);
  } catch (error) {
    console.error("Serverless function error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
      path: req.path,
      method: req.method,
    });
  }
};
