import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {Strategy as FacebookStrategy} from'passport-facebook';
import User from'../models/userModel.js';
import passport from'passport';

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
    const name = profile.displayName;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return done(null, user);
        } else {
            user = new User({
                name: name,
                email: email,
                password: null,  // No password for OAuth users
                oauthProvider: 'google'
            });
            await user.save();
            return done(null, user);
        }
    } catch (error) {
        return done(error, false);
    }
}));

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'emails']
}, async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
    const name = profile.displayName;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return done(null, user);
        } else {
            user = new User({
                name: name,
                email: email,
                password: null,  // No password for OAuth users
                oauthProvider: 'facebook'
            });
            await user.save();
            return done(null, user);
        }
    } catch (error) {
        return done(error, false);
    }
}));

// Serialize and Deserialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;
