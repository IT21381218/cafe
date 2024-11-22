// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const app = express();

app.use(cors());
app.use(express.json());

// Use auth routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// MongoDB connection with retry logic
const connectWithRetry = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000 // Adjust timeout for server selection if needed
    }).then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }).catch((err) => {
        console.error('MongoDB connection failed:', err.message);
        setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    });
};

connectWithRetry();
