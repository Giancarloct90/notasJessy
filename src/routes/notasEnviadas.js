const express = require('express');
const app = express();

app.get('/notasEnviadas', (req, res) => {
    res.render('notasEnviadas');
});

module.exports = app;