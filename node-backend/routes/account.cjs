const express = require("express");
const router = express.Router();
const db = require("../database.cjs");
const bcrypt = require("bcrypt");

////// Create Teacher Account API //////
router.post("/create_Taccount", (req, res) => {
  // pattern that email must match to be valid
  // "example@example.edu"
  var pattern = /^[^@]+@[^@]+\.(edu)$/i;

  // check if email is valid before querying to database
  if (!pattern.test(req.body.email)) {
    return res.json({ Status: "Please enter a valid edu email" });
  }

  // Check if password is long enough
  if (req.body.password.length < 6) {
    return res.json({
      Status: "Password is too short. Must be at least six characters",
    });
  }

  // Check that passwords match from user
  if (req.body.password != req.body.cpassword) {
    return res.json({ Status: "Password mismatch" });
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

    // Store the users default username as the portion of their email before the @
    const atIndex = req.body.email.indexOf("@");
    const username = req.body.email.slice(0, atIndex);

    // Hashing the users password
    bcrypt.hash(req.body.password, 5, (err, hashedPassword) => {
      if (err) {
        return res.json({ Status: "Server Side Error" });
      }

      // If the email doesn't exist, insert the new user into the database
      // by default verified = false because an admin will need to verify they are a teacher via their submitted document
      const insertUserQuery =
        "INSERT INTO Tlogin (name, email, password, verified) VALUES (?, ?, ?, false)";
      db.query(
        insertUserQuery,
        [username, req.body.email, hashedPassword],
        (err) => {
          if (err) {
            return res.json({ Status: "Server Side Error" });
          }
          return res.json({ Status: "Success" });
        }
      );
    });
  });
});

////// Create Student Account API //////
router.post("/create_Saccount", (req, res) => {
  // pattern that email must match to be valid
  // "example@example.edu"
  var pattern = /^[^@]+@[^@]+\.(edu)$/i;

  // check if email is valid before querying to database
  if (!pattern.test(req.body.email)) {
    return res.json({ Status: "Please enter a valid edu email" });
  }

  // Check if password is long enough
  if (req.body.password.length < 6) {
    return res.json({
      Status: "Password is too short. Must be at least six characters",
    });
  }

  // Check that passwords match from user
  if (req.body.password != req.body.cpassword) {
    return res.json({ Status: "Password mismatch" });
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

    // Store the users default username as the portion of their email before the @
    const atIndex = req.body.email.indexOf("@");
    const username = req.body.email.slice(0, atIndex);

    // Hashing the users password
    bcrypt.hash(req.body.password, 5, (err, hashedPassword) => {
      if (err) {
        return res.json({ Status: "Server Side Error" });
      }

      // If the email doesn't exist, insert the new user into the database
      const insertUserQuery =
        "INSERT INTO Slogin (name, email, password) VALUES (?, ?, ?)";
      db.query(
        insertUserQuery,
        [username, req.body.email, hashedPassword],
        (err) => {
          if (err) {
            return res.json({ Status: "Server Side Error" });
          }
          return res.json({ Status: "Success" });
        }
      );
    });
  });
});

////// Login API //////
// Used for both students and teachers
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Query to search for student account
  const studentSql = "SELECT Sid, email, password FROM Slogin WHERE email = ?";

  db.query(studentSql, [email], (studentErr, studentData) => {
    if (studentErr) {
      return res.status(500).json({ error: studentErr.message });
    }

    if (studentData.length > 0) {
      const studentSid = studentData[0].Sid;
      const pass = studentData[0].password;

      bcrypt.compare(password, pass, (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (result) {
          return res.json({
            Status: "Success",
            ID: studentSid,
            Account: "Student",
          });
        } else {
          // If password doesn't match, continue to check for teacher account
          checkTeacherAccount();
        }
      });
    } else {
      // If no student account found, check for teacher account
      checkTeacherAccount();
    }
  });

  function checkTeacherAccount() {
    // Query to search for teacher account
    const teacherSql =
      "SELECT Tid, email, password, verified FROM Tlogin WHERE email = ?";

    db.query(teacherSql, [email], (teacherErr, teacherData) => {
      if (teacherErr) {
        return res.status(500).json({ error: teacherErr.message });
      }

      if (teacherData.length > 0) {
        const teacher = teacherData[0];
        const pass = teacherData[0].password;
        const teacherTid = teacher.Tid;
        const verified = teacher.verified;

        if (verified === 1) {
          // Compare password using bcrypt
          bcrypt.compare(password, pass, (err, result) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }

            if (result) {
              // If password matches, send success response
              return res.json({
                Status: "Success",
                ID: teacherTid,
                Account: "Teacher",
              });
            } else {
              // If password doesn't match, send response indicating no account
              return res.json({
                Status: "No Account",
                Message: "No account found",
              });
            }
          });
        } else {
          // If account is not verified, send response
          return res.json({
            Status: "Not Verified",
            Message:
              "Your account has not been verified. Please try logging in later",
          });
        }
      } else {
        // If no teacher account found, send response indicating no account
        return res.json({ Status: "No Account", Message: "No account found" });
      }
    });
  }
});



router.post("/get_profile", (req, res) => {

  const id = req.body.ID;
  const account = req.body.account;

  if (account == 'student') {
    getStudentProfile();
  }

  else 
  {
    getTeacherProfile();
  }


  function getStudentProfile() {
    const getStudentProfileSql = "SELECT name, bio FROM Slogin WHERE Sid = ?";

    db.query(getStudentProfileSql, [id], (studentErr, studentData) => {

      if (studentErr) {
        return res.status(500).json({ error: studentErr.message });
      }
      else {
        return res.json({ Status: "Success", Profile: studentData });
      }
    });
  }

  function getTeacherProfile() {
    const getTeacherProfileSql = "SELECT name, bio FROM Tlogin WHERE Tid = ?";

    db.query(getTeacherProfileSql, [id], (teacherErr, teacherData) => {

      if (teacherErr) {
        return res.status(500).json({ error: teacherErr.message });
      }
      else {
        return res.json({ Status: "Success", Profile: teacherData });
      }
    });
  }
});


module.exports = router;
