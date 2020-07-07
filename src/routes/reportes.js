const express = require('express');
const app = express();
const {
    getMonthNotes,
    isAuth
} = require('../utils/utils');


app.get('/reportes', isAuth, async (req, res) => {
    res.render('reportes', {
        notasAniosMesesEnviadasDB: await getMonthNotes('E'),
        notasAniosMesesRecibidasDB: await getMonthNotes('R')
    });

});

module.exports = app;