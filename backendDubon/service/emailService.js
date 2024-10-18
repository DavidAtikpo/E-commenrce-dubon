// services/emailService.js
import nodemailer from 'nodemailer';

 const sendOrderStatusEmail = async (userEmail, orderStatus) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Mise à jour de votre commande',
    text: `Votre commande a été mise à jour. Nouveau statut: ${orderStatus}`
  };

  await transporter.sendMail(mailOptions);
};
 export default {sendOrderStatusEmail}