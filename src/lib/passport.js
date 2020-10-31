const pool = require('../database');
const helpers = require('./helpers');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local.signin', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, user, password, done) => {
    const rows = await pool.query('SELECT * FROM empleado WHERE  Id_Empleado = ?', [user]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.Password);
        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido ' + user.Nombre));
        } else {
            done(null, false, req.flash('failure', 'Contraseña incorrecta'));
        }
    } else {
        return done(null, false, req.flash('failure', 'El usuario no existe'));

    }
}));

passport.serializeUser((user, done) => {
    done(null, user.Id_Empleado);
});

passport.deserializeUser(async(id, done) => {
    const rows = await pool.query('SELECT * FROM empleado Where Id_Empleado =?', [id]);
    done(null, rows[0]);
});