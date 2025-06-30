// Import the main Express app
const express = require("express");
const mongoose = require("mongoose");
const app = require("../index.js");

// Ensure MongoDB is connected before handling requests
// This is critical in serverless environments where connections may not persist
async function ensureDbConnected() {
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(
        process.env.MONGODB_URI ||
          "mongodb://localhost:27017/your_database_name"
      );
      console.log("MongoDB connected in serverless function");
    } catch (error) {
      console.error("MongoDB connection error in serverless function:", error);
      throw error;
    }
  }
}

// Create a handler for the serverless function
module.exports = async (req, res) => {
  try {
    // Ensure database is connected
    await ensureDbConnected();

    // Forward the request to the Express app
    return app(req, res);
  } catch (error) {
    // Handle any errors
    console.error("Serverless function error:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
