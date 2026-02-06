require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await Admin.findOne({ email: 'admin@donvik.com' });

    if (adminExists) {
      console.log('Admin user already exists');
      process.exit();
    }

    const admin = new Admin({
      username: 'admin',
      email: 'admin@donvik.com',
      password: 'password123'
    });

    await admin.save();

    console.log('Admin user created successfully');
    console.log('Email: admin@donvik.com');
    console.log('Password: password123');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
