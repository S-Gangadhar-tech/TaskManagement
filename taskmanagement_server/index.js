const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connectDB = require('./Config/database');
const authRoutes = require('./Routes/authRoutes');
const taskRoutes = require('./Routes/taskRoutes');
const errorHandler = require('./Middlewares/errorHandler');

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));   // 1. Enable CORS early

app.options('*', cors(corsOptions)); // 2. Allow preflight requests success

app.use(limiter);             // 3. Rate limiter comes after CORS

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// Assuming connectDB returns a mongoose connection or a promise:


// Health check endpoint with more detailed status
app.get('/health', (req, res) => {
  const mongoState = mongoose.connection.readyState;
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting

  let mongoStatus = 'disconnected';
  switch (mongoState) {
    case 0: mongoStatus = 'disconnected'; break;
    case 1: mongoStatus = 'connected'; break;
    case 2: mongoStatus = 'connecting'; break;
    case 3: mongoStatus = 'disconnecting'; break;
  }

  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    mongoConnectionStatus: mongoStatus,
    timestamp: new Date().toISOString()
  });
});

// Start server only after connecting to MongoDB




// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// 404 handler
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1); // Exit process if db connection fails
});

module.exports = app;