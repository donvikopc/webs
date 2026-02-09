require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
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

// CORS Middleware - Must be first
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://donvikopc.com',
    'https://www.donvikopc.com',
    process.env.CLIENT_URL
  ].filter(Boolean),
  credentials: true
}));

connectDB();

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow cross-origin for images
  contentSecurityPolicy: false // Disable CSP for now if it causes issues with external scripts/images
}));

// Logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter); // Apply to API routes only

// Compression Middleware
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory with caching
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '1d', // Cache for 1 day
  immutable: true
}));

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
