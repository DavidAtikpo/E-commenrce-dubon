import User from'../models/userModel.js';
import generateToken from'../utils/generateToken.js';
import nodemailer from'nodemailer';
import fetch from 'node-fetch';


const register = async (req, res) => {
    const { name, email,mobile, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email,mobile, password });

    res.status(201).json({
        message: 'User create successful'
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.isPasswordMatched(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' })}}


// Route pour la demande de réinitialisation de mot de passe
// const forgotPassword= async (req, res) => {
//   const { email } = req.body;
  
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ success: false, message: 'Utilisateur non trouvé.' });
//     }

//     // Générer un token pour la réinitialisation
//     const resetToken = crypto.randomBytes(32).toString('hex');
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = Date.now() + 3600000; // 1 heure

//     await user.save();

//     // Envoyer l'e-mail
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: "maximnyansa75@gmail.com",
//         pass: "uqpo lean remu tzjb"
//       }
//     });

//     const mailOptions = {
//       to: user.email,
//       from: "maximnyansa75@gmail.com",
//       subject: 'Réinitialisation du mot de passe',
//       text: `Vous recevez ceci parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n\n
//       Cliquez sur le lien suivant pour réinitialiser votre mot de passe:\n\n
//       http://localhost:3000/reset-password/${resetToken}\n\n
//       Si vous n'avez pas demandé cela, ignorez cet e-mail et votre mot de passe restera inchangé.\n`
//     };

//     transporter.sendMail(mailOptions, (err) => {
//       if (err) {
//         console.error('Erreur lors de l\'envoi de l\'e-mail:', err);
//         return res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi de l\'e-mail.' });
//       }
//       res.json({ success: true, message: 'E-mail de réinitialisation envoyé avec succès.' });
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Une erreur est survenue.' });
//   }
// };

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Utilisateur non trouvé.' });
    }

    // Générer un code de vérification à 4 chiffres
    const verificationCode = Math.floor(100000 + Math.random() * 9000);  // génère un code à 4 chiffres
    user.verificationCode = verificationCode;
    user.verificationCodeExpires = Date.now() + 3600000; // 1 heure pour expirer

    await user.save();

    // Envoyer le code de vérification par email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL, // utilisez des variables d'environnement
        pass: process.env.PASSWORD
      }
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: 'Code de vérification pour réinitialisation du mot de passe',
      text: `Votre code de vérification pour la réinitialisation du mot de passe est : ${verificationCode}. Ce code est valable pendant 1 heure.`
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', err);
        return res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi de l\'e-mail.' });
      }
      res.json({ success: true, message: 'E-mail avec le code de vérification envoyé avec succès.' });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue.' });
  }
};


// code de verifiaction 
const verifyCode = async (req, res) => {
  const { email, code } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ success: false, message: 'Utilisateur non trouvé.' });
    }

    // Vérifier si le code est correct et s'il n'a pas expiré
    if (user.verificationCode !== parseInt(code) || user.verificationCodeExpires < Date.now()) {
      return res.status(400).json({ success: false, message: 'Code de vérification invalide ou expiré.' });
    }

    // Si le code est correct, autoriser l'utilisateur à réinitialiser son mot de passe
    res.json({ success: true, message: 'Code vérifié avec succès. Vous pouvez maintenant réinitialiser votre mot de passe.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue.' });
  }
};

// Route pour réinitialiser le mot de passe avec le token
const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  
  console.log("data",email , password);

  try {
    const user = await User.findOne({ email });
console.log(user);

    if (!user) {
      return res.status(400).json({ success: false, message: 'Utilisateur non trouvé.' });
    }

    // Réinitialiser le mot de passe
    user.password = password; // Assurez-vous de hasher le mot de passe avant de le stocker
    user.verificationCode = undefined; // Supprimer le code de vérification
    user.verificationCodeExpires = undefined;

    await user.save();

    res.json({ success: true, message: 'Mot de passe réinitialisé avec succès.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue.' });
  }
};

// user logout
const SECRET_KEY = process.env.JWT_SECRET;

const logoutUser = async (req, res) => {
  try {
   const userId = req.user._id
   console.log("userId:",userId);
   

    if (!userId) {
      return res.status(400).json({ message: 'No refresh token provided' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the token matches the stored refreshToken
    // if (user.refreshToken == refreshToken) {
    //   return res.status(400).json({ message: 'Invalid refresh token' });
    // }

    // Clear the refresh token
    user.refreshToken = null;
    await user.save();

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// reCAPTURER 


const verifyCaptcha = async (req, res) => {
  const captchaResponse = req.body.captcha;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Définissez la clé secrète dans votre fichier .env

  if (!captchaResponse) {
    return res.status(400).json({ error: 'Captcha est requis' });
  }

  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaResponse}`;

  try {
    const response = await fetch(verificationUrl, { method: 'POST' });
    const data = await response.json();

    if (data.success) {
      res.status(200).json({ message: 'Vérification réussie' });
    } else {
      res.status(400).json({ error: 'Échec de la vérification du captcha', details: data['error-codes'] });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la vérification du captcha' });
  }
};



export default {verifyCaptcha,resetPassword,forgotPassword,register,login,verifyCode,logoutUser}
