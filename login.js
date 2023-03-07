const express = require('express');

const passport = require('passport');
const loginRoute = express.Router();

loginRoute.get('/login', (req, res, next)=>{
    res.render('login')
});

loginRoute.post('/login', passport.authenticate('localLogin',{
    successRedirect: '/',
    failureRedirect: '/register',
}));

module.exports = loginRoute