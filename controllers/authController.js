// controllers/authController.js
// Handles the business logic for user registration and login

const User = require('../models/User');
const jwt = require('jsonwebtoken'); 

// REGISTER: Create a new user
const register = async (req, res) => {
  try {
    const { email, password, firstName, LastName } = req.body;

    // Input validation
    if (!email || !password || !firstName || !LastName) {
      return res.status(400).json({ message: 'Email, password, first name, last name are required!' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // Create new user (password will be auto-hashed by pre-save hook)
    const user = new User({ email, password, firstName, lastName });
    await user.save();

    // Generate JWT token
    const token = user.generateAuthToken();

    // Send response (never send password!)
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// LOGIN: Authenticate user and return token
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = user.generateAuthToken();

    // Send success response
    res.json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
    lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' }); 
  }
};

module.exports = {
  register,
  login
};