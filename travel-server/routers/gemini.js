require('dotenv').config();

const express = require('express');
const router = express.Router();
const geminiController = require('../controllers/geminiController');

router.post('/gemini/generate-gemini-content', geminiController.generateGeminiContent);

module.exports = router;