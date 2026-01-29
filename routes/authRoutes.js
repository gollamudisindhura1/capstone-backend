// Defines the API route for authentication (register and login)
//No auth middleware here -- these are the public endpoints

const express = require('express');
const router = express.Router();

const {register, login} = require('../controllers/authController');

// POST /api/auth/register
// Public - anyone can register
router.post('/register', register);

//POST /api/auth/login
// Public - returns JWT on success
router.post('/login', login);

module.exports = router;

