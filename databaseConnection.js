const mysql = require('mysql');

//All the alphabet below can be replaced with the appropriate info
const dbOptions = {
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'dream_trip'
};

const connection = mysql.createConnection(dbOptions);
connection.connect((err, res) => {
    if(err){
        console.log(err);
    }else{
        console.log('The connection was successful')
        // console.log(res);
    }
})

module.exports = {
    connection,
    dbOptions
}