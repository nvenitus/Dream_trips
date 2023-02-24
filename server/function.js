const crypto = require('crypto');
const { cntion } = require('./databaseConnection');

function generatePassword(passwd){
    const genSalt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto.pbkdf2Sync(passwd, genSalt, 1000, 60, "sha512").toString('hex');
    
    return {salt: genSalt, hash: genHash};
}

function isAuth(req, res, next){
    if(req.isAthenticated){
        next()
    }else{
        confirm("It didn't work, try refreshing");
        res.redirect('/register');
    }
}
function validUser(password, salt, hash){
    const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 60, "sha512").toString();
    console.log(`This is the hash that was generated ${verifyHash}`);
    return verifyHash === hash;
}

function userExits(req, res, next){
    cntion.query("SELECT * FROM user WHERE username = ?", [req.body.username],
    (err, results, fields) => {
        if(err){
            console.error(err);
        }else if(results.length > 0){
            confirm("This user already exist");
            res.redirect('/register');
        }else{
            next();
        }
    })    
}

//the middleware function
function verifycallback(username, password, done){
    cntion.query("SELECT * FROM user WHERE username = ?", [username],
    (err, result)=>{
        if(err) return done(err);
        if(result.length == 0) return done(null, false);

    const isVAlid = validUser(password, result[0].salt, result[0].hash);
    console.log(`This is the original hash that is being generated`);
    user = {
        id: result[0].id,
        email: result[0].email,
        phoneNumb: result[0].phnNumb,
        salt: result[0].salt,
        hash: result[0].hash
    }
    if(isVAlid){
        return done(null, user);
    }else{
        return done(null, false);
    }
    })
};

module.exports = {
    generatePassword,
    isAuth,
    validUser,
    verifycallback
}