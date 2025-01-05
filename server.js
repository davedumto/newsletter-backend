require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const subscriberRoutes = require('./routes/subscriber');

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', subscriberRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});