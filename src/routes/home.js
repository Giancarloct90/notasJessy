const express = require('express');
const app = express();
const {
    isAuth
} = require('../utils/utils');


app.get('/', (req, res) => {
    res.render('login');
});

app.get('/home', isAuth, (req, res) => {
    res.render('home');
});

module.exports = app;