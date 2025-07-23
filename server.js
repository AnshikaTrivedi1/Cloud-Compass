require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || 'AWS Guide';
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint for cloud services data
app.get('/api/services/:provider', (req, res) => {
    const provider = req.params.provider.toLowerCase();
    const servicesData = require('./data/services.json');
    
    if (servicesData[provider]) {
        res.json(servicesData[provider]);
    } else {
        res.status(404).json({ error: 'Provider not found' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 ${APP_NAME} Server running on http://localhost:${PORT}`);
    console.log(`🌟 Interactive Cloud Services Guide is ready!`);
    console.log(`📊 Environment: ${NODE_ENV}`);
});
