const express = require('express');
const cors = require('cors');
const router = require('./routers/index.js');
const gemini = require('./routers/gemini.js');

const app = express();
app.use(cors());
app.use(express.json());

// Define routes
app.use('/', router); 
app.use('/gemini', gemini);

// Export the app for testing
module.exports = app;
