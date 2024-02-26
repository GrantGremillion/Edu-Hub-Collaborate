import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import emailService from './emailService.js';
import { otpStore } from './emailService.js';
import { createRequire } from 'module';
import bcrypt from 'bcrypt';
dotenv.config();


const require = createRequire(import.meta.url);
const accountRoute = require('./routes/account.cjs');
const classesRoute = require('./routes/classes.cjs');
const uploadFile = require('./routes/uploadFile.cjs');
const db = require('./database.cjs')


const app = express();

// built in middleware function express.json for parsing json data
app.use(express.json());


// cors is a built in middleware to allow users to request recources
app.use(cors(
  {
    origin: "*"
  }
))

app.use('/api',emailService);


// Nodemailer transporter setup

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
  },
});


// Send OTP endpoint
app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

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
app.post('/verify-otp', async (req, res) => {
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

  try {
      // Hash the new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Placeholder: Update the user's password in your database
      // Replace this with your actual database update logic
      console.log(`Password reset for email: ${email} with hashed password: ${hashedPassword}`);
      // Assuming the update is successful
      res.json({ message: 'Password reset successfully.' });
  } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ error: 'Failed to reset password.' });
  }
});


// Point to routes
app.use('/upload', uploadFile);
app.use('/account', accountRoute);
app.use('/classes', classesRoute);

const PORT = 8081;
app.listen(PORT, () => {
  console.log('Server running');
});

