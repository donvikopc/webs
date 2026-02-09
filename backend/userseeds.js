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
    } else {
      const admin = new Admin({
        username: 'admin',
        email: 'pcharan214@gmail.com',
        password: 'password123'
      });
      await admin.save();
      console.log('Admin user created successfully');
      console.log('Email: pcharan214@gmail.com');
      console.log('Password: password123');
    }

    const admin2Exists = await Admin.findOne({ email: 'donvik@gmail.com' });

    if (admin2Exists) {
        admin2Exists.password = '123Donvik@';
        await admin2Exists.save();
        console.log('Admin user 2 updated successfully');
        console.log('Email: donvik@gmail.com');
        console.log('Password: 123Donvik@');
    } else {
        const admin2 = new Admin({
            username: 'admin2',
            email: 'donvik@gmail.com',
            password: '123Donvik@'
        });
        await admin2.save();
        console.log('Admin user 2 created successfully');
        console.log('Email: donvik@gmail.com');
        console.log('Password: 123Donvik@');
    }

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
