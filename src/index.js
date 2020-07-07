const express = require('express');
const app = express();
const path = require('path');
const engine = require('ejs-mate');
const session = require('express-session');
const multer = require('multer');
const passport = require('passport');
const flash = require('connect-flash');

require('../passport/local-auth');

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
    saveUninitialized: true,
    // cookie: {
    //     secure: false,
    //     maxAge: 60000
    // }
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    next();
});
//PASSPORT
app.use(passport.initialize());
app.use(passport.session());
// MULTER FOR IMAGES/FILES
// destination: path.join(__dirname, `../public/rrpp/${new Date().getFullYear()}/${new Date().getMonth() + 1}/`),
// console.log(getFecha().anio, getFecha().mes);
const storage = multer.diskStorage({
    destination: path.join(__dirname, `../public/rrpp/Imagenes/`),
    filename: (req, file, fnCallback) => {
        fnCallback(null, `${new Date().getMonth() + 1}${new Date().getFullYear()}_${new Date().getTime() + path.extname(file.originalname)}`);
    }
});
app.use(multer({
    storage
}).array('imagenes', 10));

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