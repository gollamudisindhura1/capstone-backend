// server.js - Main entry point of our backend application

// 1. Import required packages
require('dotenv').config();           // Load .env variables FIRST
const express = require('express');   // Web framework
const cors = require('cors');         // Cross-origin requests
const connectDB = require('./config/connection-db'); // Your DB connection file

const app = express();

// 2. Set port
const PORT = process.env.PORT || 3000;

// 3. Middleware - IMPORTANT: parsers FIRST, before routes
app.use(express.json());              // Parse JSON bodies → this fixes req.body undefined!
app.use(express.urlencoded({ extended: true })); // Optional: parse form data

// 4. CORS - allow frontend to connect (use * for dev, change to specific URL later)
app.use(cors({
  origin: '*',                        // For development only
  credentials: true
}));

// 5. Connect to MongoDB
connectDB();                          // Your DB connection function

// 6. Routes - mount AFTER middleware
app.use('/api/auth', require('./routes/authRoutes'));    // Auth routes (register/login)
app.use('/api/projects', require('./routes/projectRoutes'));  // Protected project routes
app.use('/api/projects/:projectId/tasks', require('./routes/taskRoutes'));

// 7. Basic health check route
app.get('/', (req, res) => {
  res.json({ message: 'Pro-Tasker Backend is running!' });
});

// 8. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});