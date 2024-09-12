import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';

const sendEmail = asyncHandler(async (data, res) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"Hey 👻" <${process.env.EMAIL}>`,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });
    console.log('Email sent:', info);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

export default sendEmail;
