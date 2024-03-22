import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// jeremy attempt at email stuff, pls ignore for now

dotenv.config();

const router = express.Router();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "jwo011@email.latech.edu",
    subject: 'Test Email',
    text: `This is a test email sent from the EDU Hub testing server. 
    No action needs to be taken.`,
});

