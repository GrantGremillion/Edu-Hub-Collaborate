import express from "express";
import mysql from 'mysql2';
import cors from 'cors';
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken'

const app = express();

// built in middleware function express.json for parsing json data
app.use(express.json());

// built in middleware to allow users to request recources
app.use(cors(
  {
    origin: "*",

  }
))

// Creating connection to mysql database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "database"
})



// Login API
app.post('/login', (req,res) => {
  const sql = "SELECT * FROM login WHERE email = ? AND password = ?"

  // Send query to db to search for account with email=req.body.email and password=req.body.password
  db.query(sql, [req.body.email, req.body.password], (err,data) => {
 
    console.log(data)
    if(err) return res.json({Message: "Server Side Error"});
    // If a result was found with matching email and password in the db
    if(data.length > 0){
        const id = data[0].id;
        // Store id of account in a cookie for later use
        res.cookie('id', id);
        return res.json({Status: "Success"})
    }
    else{
      return res.json({Message: "No Records existed"});
    }
  })
}) 



// Start app
app.listen(8081, ()=> {
  console.log("Running")
})

