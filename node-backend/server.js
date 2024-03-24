import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { createRequire } from 'module';
import multer from 'multer';
dotenv.config();


const require = createRequire(import.meta.url);
const accountRoute = require('./routes/account.cjs');
const classesRoute = require('./routes/classes.cjs');
const uploadFile = require('./routes/uploadFile.cjs');
const messageRoute = require('./routes/message.cjs');
const chatRoute = require('./routes/chat.cjs');
const passwordRoute = require('./routes/password.cjs');
const profileUpdatesRoute = require('./routes/profileUpdates.cjs');

const db = require('./database.cjs')



const app = express();

// built in middleware function express.json for parsing json data
app.use(express.json());

app.use('/uploads', express.static('uploads'));


// cors is a built in middleware to allow users to request recources
app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true
  }
))

// Nodemailer transporter setup

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
  },
});

export const otpStore = new Map();

// Send OTP endpoint
app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, otp);

  try {
      await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Your OTP',
          text: `Your OTP is: ${otp}`,
      });
      console.log('OTP sent to ' + email);
      // Ideally, you should store the OTP in the database with an expiration time
      res.json({ message: 'OTP sent successfully.' });
  } catch (error) {
      console.error('Error sending OTP:', error);
      res.status(500).json({ error: 'Failed to send OTP.' });
  }
});

// Verify OTP endpoint (placeholder for your logic)
app.post('/api/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  console.log(`Verification attempt for email: ${email} with OTP: ${otp}`);
  const storedOtp = otpStore.get(email);
  console.log(`Stored OTP for ${email}: ${storedOtp}`);

  if (!storedOtp) {
    console.log(`No OTP found for ${email}.`);
    return res.status(400).json({ error: 'Invalid OTP or OTP expired.' });
  }

  if (otp === storedOtp) {
    otpStore.delete(email); // Only delete OTP after successful verification
    console.log(`OTP verified successfully for ${email}`);
    res.json({ message: 'OTP verified successfully.' });
  } else {
    console.log(`Invalid OTP for ${email}. Received: ${otp}, Expected: ${storedOtp}`);
    res.status(400).json({ error: 'Invalid OTP.' });
  }
});


// Reset Password endpoint
app.post('/api/reset-password', async (req, res) => {
  const { email, password } = req.body;

  console.log(email,password);

  const resetPasswordStudentSql = "UPDATE slogin SET password = ? WHERE email = ?";

  db.query(resetPasswordStudentSql, [password,email], (studentErr, studentData) => {
    if (studentErr) {
      return res.status(500).json({ error: studentErr.message });
    }

    if (studentData.length > 0) {
      
      return res.json({ Status: "Success"});
    }

    // If no student account found, search for teacher account
    const resetPasswordTeacherSql = "UPDATE tlogin SET password = ? WHERE email = ?";

    db.query(resetPasswordTeacherSql, [password,email], (teacherErr, teacherData) => {
      if (teacherErr) {
        return res.status(500).json({ error: teacherErr.message });
      }

      if (teacherData.length > 0) {
          return res.json({ Status: "Success"});
      }

      return res.json({ Message: "No account found" });

      });
    });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });



// Inside server.js or a dedicated route file, after all imports and before the listen call
app.get('/getUserProfile', async (req, res) => {
  const { email } = req.query;
  // Assuming you want to search in both slogin and tlogin tables.
  // Adjust SQL queries according to your schema
  const query = `
    (SELECT displayName, bio FROM slogin WHERE email = ? LIMIT 1)
    UNION
    (SELECT displayName, bio FROM tlogin WHERE email = ? LIMIT 1);
  `;

  db.query(query, [email, email], (error, results) => {
    if (error) {
      console.error('Error fetching user profile:', error);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});





// Point to routes
app.use('/upload', uploadFile);
app.use('/account', accountRoute);
app.use('/classes', classesRoute);
app.use('/message', messageRoute);
app.use('/chat', chatRoute);
app.use('/password', passwordRoute);
app.use('/account', profileUpdatesRoute);
app.use('/uploads', express.static('uploads'));


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
