require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// MongoDB connection (using hardcoded URI)
mongoose
  .connect('mongodb://localhost:27017/edu2medu2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow CORS from localhost:5175
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const UserRouter = require('./routes/UserRouter');
app.use('/user', UserRouter);
app.use('/admin', UserRouter);
app.get('/', (req, res) => {
  res.send('Backend is working! 🚀');
});

// Set the server to listen on localhost:8002
const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export for Vercel
module.exports = app;
