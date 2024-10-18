import express from'express';
import passport from'passport';
import { register, login } from'../controllers/authController';

const router = express.Router();

// Routes pour inscription et connexion classique
router.post('/register', register);
router.post('/login', login);

// Google OAuth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login',
}), (req, res) => {
    res.redirect('/');  // Redirection après succès de Google OAuth
});

// Facebook OAuth Routes
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/login',
}), (req, res) => {
    res.redirect('/');  // Redirection après succès de Facebook OAuth
});

module.exports = router;
