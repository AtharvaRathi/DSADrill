import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import executionRoutes from './routes/execution';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Set port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// API Routes
app.use('/api/execute', executionRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
