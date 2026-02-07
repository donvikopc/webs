require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const blogRoutes = require('./routes/blogRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const siteConfigRoutes = require('./routes/siteConfigRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const clientRoutes = require('./routes/clientRoutes');
const jobApplicationRoutes = require('./routes/jobApplicationRoutes');
const jobRoutes = require('./routes/jobRoutes');
const path = require('path');

const app = express();

connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.json({ message: 'Donvik API Server' });
});

app.use('/api/blogs', blogRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/config', siteConfigRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/careers', jobApplicationRoutes);
app.use('/api/jobs', jobRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
