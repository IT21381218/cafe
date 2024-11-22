// authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
};

// Signup Controller
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if username or email already exists
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            const existingField = user.email === email ? 'email' : 'username';
            return res.status(400).json({ msg: `The ${existingField} is already in use. Please choose another.` });
        }

        // Create new user
        user = new User({ username, email, password });
        await user.save();

        // Generate JWT Token
        const token = generateToken(user._id);
        res.status(201).json({ msg: 'Signup successful!', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'An error occurred while processing your signup request.' });
    }
};

// Login Controller
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials, please check your username and password.' });
        }

        // Compare password with hashed password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials, please check your username and password.' });
        }

        // Generate JWT Token
        const token = generateToken(user._id);
        res.json({ msg: 'Login successful!', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'An error occurred while processing your login request.' });
    }
};
