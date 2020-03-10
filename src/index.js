const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const engine = require('ejs-mate');
const session = require('express-session');

// SETTING
// SET VIEW ENGINE
app.set('views', path.join(__dirname, '../views/'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
// SET PUBLIC FOLDER
app.use(express.static(path.join(__dirname, '../public/')));
// SET PORT 3000
app.set('port', process.env.PORT || 3000);

// MIDDLEWARE
// TO RECIVE INFO FROM FRONTEND
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
//SESSION
app.use(session({
    secret: 'XAXAXAXA',
    resave: true,
    saveUninitialized: true
}));

// ROUTES
app.use(require('./routes/index'));

// DATABASE
require('./database');

(async () => {
    try {
        app.listen(app.get('port'));
        console.log('online');
    } catch {
        console.log('Error');
    }
})();