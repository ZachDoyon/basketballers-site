const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Passport configuration
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ 'socialAccounts.google': profile.id });
    
    if (user) {
      return done(null, user);
    }
    
    // Check if user exists with email
    user = await User.findOne({ email: profile.emails[0].value });
    
    if (user) {
      // Link Google account
      user.socialAccounts.google = profile.id;
      await user.save();
      return done(null, user);
    }
    
    // Create new user
    user = new User({
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      username: profile.emails[0].value.split('@')[0] + Math.random().toString(36).substr(2, 5),
      avatar: profile.photos[0].value,
      socialAccounts: {
        google: profile.id
      },
      isVerified: true
    });
    
    await user.save();
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: "/api/auth/facebook/callback",
  profileFields: ['id', 'emails', 'name', 'picture.type(large)']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ 'socialAccounts.facebook': profile.id });
    
    if (user) {
      return done(null, user);
    }
    
    // Check if user exists with email
    if (profile.emails && profile.emails.length > 0) {
      user = await User.findOne({ email: profile.emails[0].value });
      
      if (user) {
        // Link Facebook account
        user.socialAccounts.facebook = profile.id;
        await user.save();
        return done(null, user);
      }
    }
    
    // Create new user
    user = new User({
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails ? profile.emails[0].value : '',
      username: (profile.emails ? profile.emails[0].value.split('@')[0] : 'user') + Math.random().toString(36).substr(2, 5),
      avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : '',
      socialAccounts: {
        facebook: profile.id
      },
      isVerified: true
    });
    
    await user.save();
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '7d'
  });
};

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (user) {
      return res.status(400).json({ 
        message: 'User already exists with this email or username' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = generateToken(req.user._id);
    res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
  }
);

// Facebook OAuth routes
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  (req, res) => {
    const token = generateToken(req.user._id);
    res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
  }
);

// @route   POST /api/auth/logout
// @desc    Logout user (client-side token removal)
// @access  Public
router.post('/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

module.exports = router; 