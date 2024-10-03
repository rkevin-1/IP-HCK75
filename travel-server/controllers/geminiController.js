const axios = require('axios');

// Make sure your .env file contains your API key
const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

const generateGeminiContent = async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await axios.post(`${GEMINI_API_URL}?key=${API_KEY}`, {
            contents: [{ parts: [{ text: prompt }] }]
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Send back the generated content
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error generating content:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error generating content', error: error.message });
    }
};

module.exports = { generateGeminiContent };
