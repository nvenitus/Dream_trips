const crypto = require('crypto');

function generatePassword(passwd){
    const hash = crypto.pbkdf2Sync.toString(passwd, crypto.randomBytes, 10000, 1000, 'sha1');
    // const salt = crypto
    console.log(hash);
    return hash;
}

function isValid(){

}

function userExits(){

}

    