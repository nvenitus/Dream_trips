const crypto = require('crypto');
const { connection } = require('./databaseConnection');

function generatePassword(passwd){
    const genSalt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto.pbkdf2Sync(passwd, genSalt, 1000, 60, "sha512").toString('hex');
    
    return {salt: genSalt, hash: genHash};
}

function isAuth(req, res, next){
    if(req.isAthenticated){
        next()
    }else{
        console.log("It didn't work, try refreshing");
        res.redirect('/register');
    }
}
function validUser(psword, salt, hash){
    const verifyHash = crypto.pbkdf2Sync(psword, salt, 1000, 60, "sha512").toString('hex');
    console.log(`This is the verifiedHash that was generated ${verifyHash}`);
    return verifyHash === hash;
}

function userExits(req, res, next){
    connection.query("SELECT * FROM dream_users WHERE username = ?", [req.body.username],
    (err, results, fields) => {
        if(err){
            console.error(err);
        }else if(results.length > 0){
            console.log("This user already exist");
            res.redirect('/register');
        }else{
            next();
        }
    })    
}

//the middleware function
function verifycallback(username, password, done){
    connection.query("SELECT * FROM dream_users WHERE username = ?", [username],
    (err, result)=>{
        if(err) return done(err);
        if(result.length == 0) return done(null, false);

    const isVAlid = validUser(password, result[0].salt, result[0].hash);
    console.log(`This is the original hash that is being generated ${result[0].hash}`);
    console.log(`this are the results ${result[0].phoneNumber}`);
    user = {
        id: result[0].id,
        idNumb: result[0].idNumber,
        phoneNumb: result[0].phoneNumber,
        salt: result[0].salt,
        hash: result[0].hash
    }
    if(isVAlid){
          return done(null, user);
    }else{
        console.log('It is not valid')
        return done(null, false);
    }
    })
};

module.exports = {
    generatePassword,
    isAuth,
    validUser,
    verifycallback,
    userExits
}