require('dotenv').config();

const express = require('express');
const cors = require('cors');
const router = require('./routers/index.js');
const gemini = require('./routers/gemini.js');

const app = express();

// Middleware

app.use(cors()); 
app.use(express.json()); 

// Routes
app.use('/', router);
app.use('/gemini', gemini);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Export the app for testing or server
module.exports = app;
