const express = require('express');
const router = express.Router();

// Import & Setup Authorization
const passport = require('passport');
const auth = passport.authenticate('jwt', { session: false });

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const UserController = require('../../controllers/user.controller');

// User Model
const User = require('../../models/User');

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register', UserController.register);

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', UserController.login);

// @route   GET api/users/profile
// @desc    Gets authenticated user's profile
// @access  Private
router.get('/profile', auth, UserController.get_profile);

// @route   GET api/users/current
// @desc    Gets authenticated user as JSON
// @access  Private
router.get('/current', auth, UserController.get_current_user);

module.exports = router;
