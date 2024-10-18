import User from'../models/User';
import generateToken from'../utils/generateToken';
import { OAuth2Client } from'google-auth-library';
import fetch from'node-fetch';

// Google OAuth
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.register = async ({ name, email, password }) => {
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('User already exists');
    }

    const user = await User.create({ name, email, password });
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    };
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        };
    } else {
        throw new Error('Invalid email or password');
    }
};

// Login via Google
exports.googleLogin = async (tokenId) => {
    const ticket = await googleClient.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email_verified, name, email } = ticket.getPayload();

    if (email_verified) {
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ name, email, password: 'google' });
        }
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        };
    } else {
        throw new Error('Google login failed');
    }
};

// Login via Facebook
exports.facebookLogin = async (accessToken) => {
    const url = `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email`;
    const response = await fetch(url);
    const data = await response.json();

    const { email, name } = data;
    let user = await User.findOne({ email });
    if (!user) {
        user = await User.create({ name, email, password: 'facebook' });
    }

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    };
};
