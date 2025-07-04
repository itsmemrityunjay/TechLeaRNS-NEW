// Import the main Express app
const app = require("../index.js");

// Create a handler for the serverless function
module.exports = async (req, res) => {
  try {
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
