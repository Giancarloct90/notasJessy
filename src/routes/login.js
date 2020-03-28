const express = require('express');
const app = express();

app.post('/login', (req, res) => {
    console.log(req.body);
    res.send('recived')
});

module.exports = app;