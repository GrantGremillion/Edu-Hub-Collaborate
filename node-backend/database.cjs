
var mysql = require('mysql2');

// Creating connection to mysql database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "database"
  })
  
  db.connect(err => {
    if (err) {
        return console.error('error connecting: ' + err.stack);
    }
    console.log('Connected to database as id ' + db.threadId);
  });

  module.exports = db;