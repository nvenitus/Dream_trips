const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MYSQLStore = require('express-mysql-session')(session);
const  passport = require('passport');
const bodyParser = require('body-parser');

const {cntion, dbOptions}= require('./databaseConnection.js');
const MySQLStore = require('express-mysql-session');
const app = express();
const PORT = 3000;

const sessionStore = new MySQLStore(dbOptions);
express.use(session({
    key: "no key",
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    secret: 'none',
    cookie: {
    maxAge: 1000 * 24 * 60 * 60
    }
}))

const fields = {
    usernameField: uname,
    passwordField: psword,
    phoneField: phnNumb
}

const strategy = new LocalStrategy(fields, /*a later used function */)
passport.serializeUser()
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

passport.serializeUser((user, done) =>{
    done(false, user.id);
})
passport.deserializeUser((userId, done) => {
    connection.cntion.query("SELECT * FROM NOTYETSETDB WHERE id = ?", [userId],
    (err, result) => {
        if(err){
            console.error(err);
            alert(err);
        }else{
            return result;
        }
    })
})
app.listen(PORT, () =>{
    console.log(`The app runs on http://localhost:${PORT}`);
})