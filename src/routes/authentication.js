const express = require('express');
const passport = require('passport');
const router = express.Router();
const pool = require('../database');
const helpers = require('../lib/helpers');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');


//Principal
router.get('/', isNotLoggedIn, (req, res) => {
    res.render('./Admin/Login');
});

router.post('/Login', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/Dashboard',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
});




router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;