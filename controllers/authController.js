// Handles the business logic for user registration and login

const User = require('../models/User');
const jwt = require('jsonwebtoken');


//REGISTER: Create a new user

const register = async (req, res)=>{
    try{
        const {email, password} = req.body;

        // Input validation
        if(!email || !password){
            return res.statu(400).json({message:'Email and password are required!'});
        }

        //Check if the user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'User with this email already exists.'});
        }

        //Create new user (password will be auto-hashed by pre-save hook)
        const user = new User({email, password});
        await user.save();

        // Generate JWT token

        const token = user.generateAuthToken()

        //send response not the password
        res.status(201).json({
            message: 'User registered succesfully',
            token,
            user:{
                id: user._id,
                email: user.email
            }
        });
    }catch(error){
        console.error('Registration Error:', error);
        res.status(500).json({message:'Server error during registration'})
    }
}
// LOGIN - Authenticate user and return token

const login = async (req, res)=>{
    try{
        // 1. Check if email and password provided
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({ message: 'Email and password are required' });
        }
        // 2. Find user by email
        const user = await User.findOne({email});
        if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
        // 3. Compare password
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({message:'Invalid email or password'})
        }

        // 4. Generate JWT
        const token = user.generateAuthToken();

        // 5. Send success response
        res.json({
            message: 'Login Successful!',
            token,
            user:{
                id: user._id,
                email: user.email
            }
        })

    }catch(error){
        console.error('Login Error:', error);
        res.status(500).json({message:'Server error during registration'})
    }
}
module.exports = {
    register, 
    login
}
