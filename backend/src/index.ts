import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { generalLimiter, executionLimiter } from './middleware/rateLimiter';
import errorHandler from './middleware/errorHandler';

import executionRoutes from './routes/execution';
import questionRoutes from './routes/questionRoutes';
import authRoutes from './routes/authRoutes';
import progressRoutes from './routes/progressRoutes';
import studyPlanRoutes from './routes/studyPlanRoutes';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Set port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser
app.use(express.json());

// Connect to Database
connectDB();

// Apply general rate limiter to ALL routes
app.use('/api', generalLimiter);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'DSADrill API is running',
    timestamp: new Date().toISOString()
  });
});

// Apply execution limiter SPECIFICALLY to execute route
app.use('/api/execute', executionLimiter);

// API Routes
app.use('/api/execute', executionRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/studyplan', studyPlanRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: `Route ${req.originalUrl} not found` 
  });
});

// Global error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`
  ================================
  🚀 DSADrill API Running
  ================================
  Port     : ${PORT}
  Database : MongoDB Connected
  Env      : ${process.env.NODE_ENV || 'development'}
  ================================
  `);
});
