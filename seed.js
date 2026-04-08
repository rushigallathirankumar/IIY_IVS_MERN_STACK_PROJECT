const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email: 'admin@university.edu' });
    if (existingAdmin) {
      console.log('Admin already exists. Use: admin@university.edu / admin123');
      process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const admin = new Admin({
      name: 'Super Admin',
      email: 'admin@university.edu',
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    console.log('Default Admin created successfully!');
    console.log('Email: admin@university.edu');
    console.log('Password: admin123');
    process.exit();
  })
  .catch(err => {
    console.error('Connection error', err);
    process.exit(1);
  });
