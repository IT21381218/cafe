const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// @route POST /api/auth/signup
// @desc Register new user
// @access Public
router.post('/signup', signup);

// @route POST /api/auth/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', login);

module.exports = router;