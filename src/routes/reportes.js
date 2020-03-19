const express = require('express');
const app = express();

app.get('/reportes', (req, res) => {
    res.render('reportes');
});

module.exports = app;