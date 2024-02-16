import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { Router } from 'express';


dotenv.config();

const router = Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const otpStore = new Map();

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore.set(email, otp);

  try {    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP',
      text: `Your OTP is: ${otp}.`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('Error in /send-otp:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  // Retrieve OTP from the map
  const validOtp = otpStore.get(email);

  if (otp === validOtp) {
    // Clear OTP from the map after successful verification
    otpStore.delete(email);
    res.json({ message: 'OTP verified successfully.' });
  } else {
    res.status(400).json({ error: 'Invalid OTP.' });
  }
});

export default router;