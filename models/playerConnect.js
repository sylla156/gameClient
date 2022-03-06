const connection = require('./connection');

class playerConnect {


    static  check(email,password,callback){
       connection.query('SELECT * FROM player WHERE email=? && password=?;',[email,password],function (error,results,field){
           if (error ) throw new error;
           callback(results);
       })
    }

   
}

module.exports = playerConnect;