const dns = require('dns');
// Set custom DNS to bypass local ISP resolution errors for MongoDB Atlas SRV records
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allow requests from all origins (useful since frontend might run on local file:// or another port)
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Root route for check
app.get('/', (req, res) => {
  res.send('Resume Studio API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
