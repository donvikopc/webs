require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await Admin.findOne({ username: 'admin' });

    if (adminExists) {
      adminExists.email = 'pcharan214@gmail.com';
      adminExists.password = 'password123';
      await adminExists.save();
      console.log('Admin user updated successfully');
      console.log('Email: pcharan214@gmail.com');
      console.log('Password: password123');
      process.exit();
    }

    const admin = new Admin({
      username: 'admin',
      email: 'pcharan214@gmail.com',
      password: 'password123'
    });

    await admin.save();

    console.log('Admin user created successfully');
    console.log('Email: pcharan214@gmail.com');
    console.log('Password: password123');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
