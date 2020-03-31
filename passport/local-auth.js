const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuarios = require('../src/models/usuarios');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const usuariosDB = await Usuarios.findById(id);
    done(null, usuariosDB);
});

passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    try {
        const usuariosDB = await Usuarios.findOne({
            nombreUsuario: username
        });
        if (!usuariosDB) {
            console.log('el usuario NO existe');
            return done(null, false);
        }
        if (usuariosDB.password === password) {
            console.log('el usuario existe');
            return done(null, usuariosDB);
        } else {
            console.log('password mal escrito');
            return done(null, false);
        }
    } catch (e) {
        console.log('Error tratando de buscar al usuario', e);
    }
}));