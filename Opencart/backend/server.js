// backend/server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1); // Exit if connection fails
});

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Default test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
