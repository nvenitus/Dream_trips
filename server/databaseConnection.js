const connection = require('mysql');

//All the alphabet below can be replaced with the appropriate info
const dbOptions = {
    user: a,
    host: b,
    port: c,
    password: d,
    database: e
};

const db = connection.createConnection(dbOptions);
const cntion = db.connect((err, res) => {
    if(err){
        console.log(err);
    }else{
        console.log('The connection was successful')
        alert(res);
    }
})

module.exports = {
    cntion
}