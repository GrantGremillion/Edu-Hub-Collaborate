

const express = require('express');
const router = express.Router();
const db = require('../database.cjs')


////// Create Teacher Account API //////
router.post('/create_Taccount', (req,res) => {

    // pattern that email must match to be valid
    // "example@example.edu"
    var pattern = /^[^@]+@[^@]+\.(edu)$/i;
  
    // check if email is valid before querying to database
    if (!pattern.test(req.body.email)) {
      return res.json({Status: "Please enter a valid edu email"});
    } 
  
    // Check if password is long enough
    if (req.body.password.length < 6){
      return res.json({Status: "Password is too short. Must be at least six characters"})
    }
  
    // Check that passwords match from user
    if (req.body.password != req.body.cpassword){
      return res.json({Status: "Password mismatch"})
    }
  
    // Check if email already exists in the database
    const checkEmailQuery = "SELECT * FROM Tlogin WHERE email = ?";
    db.query(checkEmailQuery, [req.body.email], (err, rows) => {
        if (err) {
            return res.json({ Status: "Server Side Error" });
        }
  
        // If the email already exists in the database
        if (rows.length > 0) {
            return res.json({ Status: "Email already exists" });
        }
  
        // If the email doesn't exist, insert the new user into the database
        // by default verified = false because an admin will need to verify they are a teacher via their submitted document
        const insertUserQuery = "INSERT INTO Tlogin (email, password, verified) VALUES (?, ?, false)";
        db.query(insertUserQuery, [req.body.email, req.body.password], (err) => {
            if (err) {
                return res.json({ Status: "Server Side Error" });
            }
            return res.json({ Status: "Success" });
        });
    });
  });

  ////// Create Student Account API //////
router.post('/create_Saccount', (req,res) => {

    // pattern that email must match to be valid
    // "example@example.edu"
    var pattern = /^[^@]+@[^@]+\.(edu)$/i;
  
    // check if email is valid before querying to database
    if (!pattern.test(req.body.email)) {
      return res.json({Status: "Please enter a valid edu email"});
    } 
  
    // Check if password is long enough
    if (req.body.password.length < 6){
      return res.json({Status: "Password is too short. Must be at least six characters"})
    }
  
    // Check that passwords match from user
    if (req.body.password != req.body.cpassword){
      return res.json({Status: "Password mismatch"})
    }
  
    // Check if email already exists in the database
    const checkEmailQuery = "SELECT * FROM Slogin WHERE email = ?";
    db.query(checkEmailQuery, [req.body.email], (err, rows) => {
        if (err) {
            return res.json({ Status: "Server Side Error" });
        }
  
        // If the email already exists in the database
        if (rows.length > 0) {
            return res.json({ Status: "Email already exists" });
        }
  
        // If the email doesn't exist, insert the new user into the database
        const insertUserQuery = "INSERT INTO Slogin (email, password) VALUES (?, ?)";
        db.query(insertUserQuery, [req.body.email, req.body.password], (err) => {
            if (err) {
                return res.json({ Status: "Server Side Error" });
            }
            return res.json({ Status: "Success" });
        });
    });
  });
  

  ////// Login API //////
// Used for both students and teachers
router.post('/login', (req,res) => {
    const sql = "SELECT Sid,email,password FROM Slogin WHERE email = ? AND password = ?"
  
    // Send query to db to search for account with email=req.body.email and password=req.body.password
    db.query(sql, [req.body.email, req.body.password], (err,data) => {
      
      try{
        const Sid = data[0].Sid;
        if(data.length > 0){
          console.log("Data:", data)
        }
        // If a result was found with matching email and password in the db
        if(data.length > 0){
        // Student account was found
        return res.json({Status: "Success", ID:Sid, Account: "Student"})
        }
      }
   
      
      catch{
        // If no records were found in the student table, then search the teacher table
        // verified must be true (indicating an admin has verified that the user is a teacher) in order for them to login
        const sql = "SELECT Tid,email,password FROM Tlogin WHERE email = ? AND password = ? AND verified = 1"
  
        db.query(sql, [req.body.email, req.body.password], (err,data) => {
      
          const Tid = data[0].Tid;
          console.log("Data:", data)
  
          // If a result was found with matching email and password in the db
          if(data.length > 0){
              // Teacher account was found
              return res.json({Status: "Success", ID:Tid, Account: "Teacher"})
          }
          else{
            return res.json({Message: "No account found"});
          }
        })
      }
    })
  }) 
  
module.exports = router;