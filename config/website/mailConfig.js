const nodemailer = require("nodemailer");

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: process.env.MAILPORT,
    secure: true, // Use true for port 465, false for port 587
    auth: {
        user: process.env.USERMAIL,
        pass: process.env.APPPASSWORD,
    },
});

module.exports = { transporter }