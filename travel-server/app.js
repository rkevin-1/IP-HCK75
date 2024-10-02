const express = require('express');
const cors = require('cors');
const router = require('./routers/index.js'); 
const app = express();
app.use(cors());
app.use(express.json());

app.use('/destinations', router); 

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
