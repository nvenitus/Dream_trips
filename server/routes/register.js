const { Router } = require('express');

const registrationRoute = Router();
const {cntion} = require('../databaseConnection');
const {userExist, generatePassword} = require('../function');

registrationRoute.get('/register', (req, res, next)=>{
    res.render('register');
})

registrationRoute.post('/register', userExist, (req, res, next)=>{
    const credentials = generatePassword(req.body.psword);

    cntion.query("INSERT INTO user(username, email, phoneNumber, hash, salt) VALUES(?, ?, ?, ?, ?)",
    [req.body.username, req.body.email, req.body.phnNumb, credentials.hash, credentials.salt],
    (err, results)=>{
        if(err){
             console.log(`The error is ${err}`);
            res.redirect('/register');
            }else{
                res.redirect('/');
            }
    })
})

module.exports = registrationRoute;