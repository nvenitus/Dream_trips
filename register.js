const express = require('express');

const registrationRoute = express.Router();
const {connection} = require('../databaseConnection');
const {userExits, generatePassword} = require('../function');

registrationRoute.get('/register', (req, res, next)=>{
    res.render('sign-up');
})
registrationRoute.post('/register', userExits, (req, res, next)=>{
    const credentials = generatePassword(req.body.psword);
    console.log(credentials);
    connection.query("INSERT INTO dream_users(username, email, phoneNumber, idNumber, hash, salt) VALUES(?, ?, ?, ?, ?, ?)",
    [req.body.username, req.body.email, req.body.phnNumb, req.body.idNumb, credentials.hash, credentials.salt],
    (err, results)=>{
        console.log(`This is the signin page: ${credentials.salt} and ${credentials.hash}`)
        if(err){
            console.log(`The error is ${err}`);
            res.redirect('/register');
            }else{
                res.redirect('/');
            }
    })
})

module.exports = registrationRoute;