// seeds/seedUsers.js
// Run this script once to create test users
// Usage: node seeds/seedUsers.js

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const seedUsers = async () => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    // Optional: Clear existing users (careful in production!)
    // await User.deleteMany({});

    // Test users (change passwords/emails as needed)
    const users = [
      {
        email: 'demo1@example.com',
        password: 'demo123456',  // will be hashed automatically
      },
      {
        email: 'demo2@example.com',
        password: 'demo123456',
      },
    ];

    // Check if they already exist to avoid duplicates
    for (const userData of users) {
      const existing = await User.findOne({ email: userData.email });
      if (!existing) {
        const user = new User(userData);
        await user.save();
        console.log(`Created user: ${user.email}`);
      } else {
        console.log(`User already exists: ${userData.email}`);
      }
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Seeding error:', error.message);
  } finally {
    mongoose.connection.close();
    console.log('DB connection closed');
  }
};

seedUsers();