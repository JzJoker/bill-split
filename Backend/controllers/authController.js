const passport = require('passport');
const User = require('../models/User');

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
};

exports.createAccount = async (req, res, next) => {
  try {
    const { username } = req.body;
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    // Create a new user
    const newUser = new User({ username });
    await newUser.save();
    return res.status(201).json({ message: 'Account created successfully', user: newUser });
  } catch (err) {
    return next(err);
  }
};
