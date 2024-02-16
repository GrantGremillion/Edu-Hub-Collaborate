import express from "express";
import mysql from 'mysql2';
import cors from 'cors';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import emailService from './emailService.js';

dotenv.config();

// These lines are necessary to import multer using require keyword
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const app = express();
app.use(cors());
app.use(express.json());

// multer library allows us to store images on our local machine
const multer = require('multer')
const upload = multer({ dest: 'C:/Users/Grant/OneDrive/Desktop/images/' })

app.use('/api', emailService);

<<<<<<< Updated upstream
// cors is a built in middleware to allow users to request recources
app.use(cors(
  {
    origin: "*"
  }
))


// Creating connection to mysql database
=======
>>>>>>> Stashed changes
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "database"
});

db.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});




////// Login API //////
// Used for both students and teachers
app.post('/login', (req,res) => {
  const sql = "SELECT * FROM Slogin WHERE email = ? AND password = ?"

  // Send query to db to search for account with email=req.body.email and password=req.body.password
  db.query(sql, [req.body.email, req.body.password], (err,data) => {
    
    if(data.length > 0){
      console.log("Data:", data)
    }

    // If a result was found with matching email and password in the db
    if(data.length > 0){
        // Student account was found
        return res.json({Status: "Success", Account: "Student"})
    }
    else{
      // If no records were found in the student table, then search the teacher table
      // verified must be true (indicating an admin has verified that the user is a teacher) in order for them to login
      const sql = "SELECT * FROM Tlogin WHERE email = ? AND password = ? AND verified = 1"

      db.query(sql, [req.body.email, req.body.password], (err,data) => {
    
        console.log("Data:", data)

        // If a result was found with matching email and password in the db
        if(data.length > 0){
            // Teacher account was found
            return res.json({Status: "Success", Account: "Teacher"})
        }
        else{
          return res.json({Message: "No account found"});
        }
      })
    }
  })
}) 


////// Create Student Account API //////
app.post('/create_Saccount', (req,res) => {

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


<<<<<<< Updated upstream
////// Create Teacher Account API //////
app.post('/create_Taccount', (req,res) => {

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


////// Upload File API //////
app.post('/upload', upload.single('image'), (req, res) => {
  
  const imageName = req.file.filename   
  console.log(imageName)
  //console.log(imageName)
  res.send({imageName})
})



// Start app
app.listen(8081, ()=> {
  console.log("Running")
})
=======
// Forgot Password Endpoint
app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate OTP
  const expirationTime = new Date(new Date().getTime() + 30*60000); // OTP expires in 30 min
>>>>>>> Stashed changes

  // Store OTP and expiration in your DB associated with the email
  const updateOtpQuery = 'UPDATE login SET reset_otp = ?, otp_expiration = ? WHERE email = ?';
  db.query(updateOtpQuery, [otp, expirationTime, email], (err, result) => {
    if (err) {
      console.error('Error updating user with OTP:', err);
      return res.json({ Status: "Server Side Error" });
    }
  
    // Send email with OTP
    const mailOptions = {
      from: 'eduhubcollaborate@gmail.com',
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP is ${otp}. It will expire in 30 minutes.`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('OTP sent to your email');
      }
    });
  });
});

// Verify OTP and Reset Password Endpoint
app.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  // Verify OTP and expiration
  const verifyOtpQuery = 'SELECT * FROM login WHERE email = ?';
  db.query(verifyOtpQuery, [email], async (err, users) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ Status: "Server Side Error" });
    }
    const user = users[0];
    if (!user) {
      return res.status(404).json({ Status: "User not found" });
    }
    if (user.reset_otp === otp && new Date() < new Date(user.otp_expiration)) {
      // Hash new password and update in the database
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const updatePasswordQuery = 'UPDATE login SET password = ? WHERE email = ?';
      db.query(updatePasswordQuery, [hashedPassword, email], (err, result) => {
        if (err) {
          console.error('Error updating password:', err);
          return res.status(500).json({ Status: "Server Side Error" });
        }
        res.json({ Status: "Password updated successfully" });
      });
    } else {
      return res.status(400).json({ Status: "Invalid OTP or OTP expired" });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});