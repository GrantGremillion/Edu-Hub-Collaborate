

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
  const email = req.body.email;
  const password = req.body.password;

  // Query to search for student account
  const studentSql = "SELECT Sid, email, password FROM Slogin WHERE email = ? AND password = ?";
    
  db.query(studentSql, [email, password], (studentErr, studentData) => {
    if (studentErr) {
      return res.status(500).json({ error: studentErr.message });
    }

    if (studentData.length > 0) {
      const studentSid = studentData[0].Sid;
      return res.json({ Status: "Success", ID: studentSid, Account: "Student" });
    }

    // If no student account found, search for teacher account
    const teacherSql = "SELECT Tid, email, password, verified FROM Tlogin WHERE email = ? AND password = ?";

    db.query(teacherSql, [email, password], (teacherErr, teacherData) => {
      if (teacherErr) {
        return res.status(500).json({ error: teacherErr.message });
      }

      if (teacherData.length > 0) {
        const teacher = teacherData[0];
        const teacherTid = teacher.Tid;
        const verified = teacher.verified;

        if (verified === 1) {
          return res.json({ Status: "Success", ID: teacherTid, Account: "Teacher" });
        } 
        else {
          return res.json({ Message: "Your account has not been verified. Please try logging in later" });
        }
      }

      return res.json({ Message: "No account found" });

      });
  });
}) 
  
module.exports = router;