const express = require('express');
const app = express();

// Simple endpoint to keep the bot alive
app.get('/', (req, res) => {
    res.send('Self-bot is alive!');
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Keep-alive server running on port 3000');
});

module.exports = app;
