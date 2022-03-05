const mysql = require('mysql');
let connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '77273745',
  database: 'teamup'
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + connection.threadId);
  });


module.exports = connection;