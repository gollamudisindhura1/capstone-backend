// server.js - Main entry point of our backend application

//1. Importing required packages
// 2. Load environment variables from .env file
require("dotenv").config();
const express = require("express"); // Web framework for Node.js
const mongoose = require("mongoose"); // ODM to work with MongoDB easily
const dotenv = require("dotenv"); // Loads variables from .env file
const cors = require("cors"); // Allows frontend (different origin) to make requests
const PORT = process.env.PORT || 3000;
const app = express();
const User = require("./models/User");
const connectDB = require("./config/connection-db");
//Database Connection
connectDB();

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Basic test route - to check if server is alive
app.get("/", (req, res) => {
  res.json({ message: "Pro-Tasker Backend is running!" });
});

// Enable CORS so React frontend (localhost:5173 or deployed) can talk to backend
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

//  Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
