// emailService.js

import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config();

const router = express.Router();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Define otpStore as a Map
export const otpStore = new Map();

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, otp);

  try {
      await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Your OTP',
          text: `Your OTP is: ${otp}.`,
      });
      console.log('OTP sent to ' + email);
      res.json({ message: 'OTP sent successfully.' });
  } catch (error) {
      console.error('Error in /send-otp:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/verify-otp', async (req, res) => {
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


export default router;
