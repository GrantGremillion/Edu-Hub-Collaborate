const express = require('express')
// Express Mysql API
const mysql = require('mysql')
//const serveIndex = require('serve-index');

const app = express()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'database'
  })
  
  connection.connect()
  
  connection.query('SELECT 1+1 AS solution', (err, rows, fields) => {
    if (err) throw err
  
    console.log('The solution is: ', rows[0].solution)
  })
  
  connection.end()

// // Sample middleware function
// app.use((req, res, next) => {
//     console.log('Time: ', Date.now());
//     // tells the middleware to go to the next middleware function
//     next();
// });

// // Will only work for requests sent to localhost:3000/request-type
// app.use('/request-type', (req, res, next) => {
//     console.log('Request type: ', req.method);
//     next();
// });

//app.use('/public', express.static('public'));
//app.use('/public', serveIndex('public'));

// routes
app.get('/', (req,res) =>{
    res.send('Hello Node API')
})



app.listen(5000, ()=>{
    console.log('Node API app is running on port 5000')
})