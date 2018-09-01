const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// Import Models
const User = require('../models/User');

// Load input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

module.exports.register = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      // Create User object
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      // Hash User password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

module.exports.login = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check for user
    if (!user) {
      errors.email = 'Email not found';
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User Matched
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email
        };

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 86400 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
};

module.exports.get_profile = (req, res) => {
  User.find({ username: req.user.username })
    .populate('dilemmas')
    .exec()
    .then((user) => {
      if (!user) {
        errors.nouser = 'There is no user';
        return res.status(404).json(errors);
      }
      res.json(user);
    })
    .catch((err) => res.status(400).json(err));
};

module.exports.get_current_user = (req, res) => {
  res.json(req.user);
};
