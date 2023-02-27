const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MYSQLStore = require('express-mysql-session')(session);
const  passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;
//routes imports
const loginRoute = require('./routes/login');
const registrationRoute = require('./routes/register');

const {cntion, dbOptions}= require('./databaseConnection.js');
const {verifycallback} = require('./function');

const sessionStore = new MYSQLStore(dbOptions);
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

//setting up the views
app.set('view-engine', 'ejs');
app.use(express.static(path.join(__dirname),"style"));
app.set('views', path.join(__dirname), "views")

passport.serializeUser()
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const strategy = new LocalStrategy(fields, verifycallback);
passport.use('localLogin', strategy);

passport.serializeUser((user, done) =>{
    done(null, user.id);
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

app.use('/', loginRoute);
app.use('/', registrationRoute);

app.listen(PORT, () =>{
    console.log(`The app runs on http://localhost:${PORT}`);
})