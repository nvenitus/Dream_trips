const { Router } = require('express');

const {cntion} = require('../databaseConnection');
const passport = require('passport');
const loginRoute = Router();

loginRoute.get('/login', (req, res, next)=>{
    res.render('login')
});

loginRoute.post('/login', passport.authenticate('localLogin',{
    successRedirect: '/',
    failureRedirect: '/redirect',
    successFlash: "Great! let's get on this ride together"
}));

module.exports = {
    loginRoute
}