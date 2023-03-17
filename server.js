const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MYSQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');

const app = express();
const PORT = 3020;
//routes imports
const loginRoute = require('./routes/login');
const registrationRoute = require('./routes/register');

const {connection, dbOptions}= require('./databaseConnection.js');
const {verifycallback} = require('./function');

const sessionStore = new MYSQLStore(dbOptions);

//setting up the views
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"..","client","public")));
app.use(favicon(path.join(__dirname, "..", "client", "public", "assets", "favicon.ico")))
app.set('views', path.join(__dirname,'..', 'client', 'views'))

app.use(session({
    key: "Dream trip",
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    secret: 'none',
    cookie: {
        maxAge: 1000 * 24 * 60 * 60
    }
}))

const fields = {
    usernameField: 'username',
    emailField: 'email',
    phoneField: 'phnNumb',
    idField: 'idNumb',
    passwordField: 'psword'
}

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const strategy = new LocalStrategy(fields, verifycallback);
passport.use('localLogin', strategy);

passport.serializeUser((user, done) =>{
    console.log(user.phoneNumber);
    done(null, user.id);
})
passport.deserializeUser((userId, done) => {
    connection.query("SELECT * FROM dream_users WHERE id = ?", [userId],
    (err, result) => {
        if(err){
            console.error(err);
        }else{
            done(null, result)
        }
    })
})

app.use('/', registrationRoute);
app.use('/', loginRoute);
app.get('/', (req, res, next)=>{
    res.render('index')
    console.log('the home route is readii')
})
// app.use('/', loginRoute);

app.listen(PORT, () =>{
    console.log(`The app runs on http://localhost:${PORT}`);
})