const express = require('express');
const app = express();
const passport = require('passport');


// FOR USERS AUTHENTICATIONS
app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/',
    passReqToCallback: true
}));

// FOR LOGOUT
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});



module.exports = app;