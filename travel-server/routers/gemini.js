const express = require('express');
const router = express.Router();
const geminiController = require('../controllers/geminiController');

router.post('/generate-gemini-content', geminiController.generateGeminiContent);

module.exports = router;