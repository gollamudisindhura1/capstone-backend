// This file defines the MOngoose Schema and model for Users
//It handles email/password storage, password hashing with bcrypt, and JWT generation
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

//Define the User Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [6,'Password must be at least 6 characters']
    },
    firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters'],
    maxlength: [50]
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters'],
    maxlength: [50]
  },
   // Timestamps: automatically adds createdAt and updatedAt fields
}, {
  timestamps: true
});

//Pre-save Hook

userSchema.pre('save', async function () {
  // Skip if password was not modified
  if (!this.isModified('password')) return;

  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  } catch (err) {
    throw err; // Pass error to Mongoose  save will fail
  }
});

// Method to compare password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Optional but very useful: generate JWT after successful login
userSchema.methods.generateAuthToken = function () {
  const jwt = require('jsonwebtoken');
  return jwt.sign(
    { _id: this._id.toString() },           // payload (minimal)
    process.env.JWT_SECRET,
    { expiresIn: '7d' }                 
  );
};

module.exports = model('User', userSchema);

