// backend/config/passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'username'
  },
  async (username, password, done) => {
    try {
      // Check if the user exists
      let user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { message: 'Username not found' });
      }

      // No password required, just return the user
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
