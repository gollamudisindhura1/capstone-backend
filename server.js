// 1. Import required packages
require('dotenv').config();           
const express = require('express');   
const cors = require('cors');         
const connectDB = require('./config/connection-db'); 
const app = express();
//const morgan = require('morgan');

// 2. Set port
const PORT = process.env.PORT || 3000;

// 3. Middleware
app.use(express.json());              
app.use(express.urlencoded({ extended: true })); 


// 4. CORS - allow frontend to connect 
app.use(cors({
  origin: 'https://pro-tasker-capstone-frontend.onrender.com',                        
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 5. Connect to MongoDB
connectDB();                          
// 6. Routes 
app.use('/api/auth', require('./routes/authRoutes'));    
app.use('/api/projects', require('./routes/projectRoutes'));  
app.use('/api/projects/:projectId/tasks', require('./routes/taskRoutes'));

// 7. Basic health check route
app.get('/', (req, res) => {
  res.json({ message: 'Pro-Tasker Backend is running!' });
});
//Adding Global error handler 
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log full error
  res.status(500).json({
    message: 'Something went wrong on the server',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 8. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});