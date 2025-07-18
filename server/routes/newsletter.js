const express = require('express');
const nodemailer = require('nodemailer');
const Newsletter = require('../models/Newsletter');
const auth = require('../middleware/auth');

const router = express.Router();

// Create email transporter (configure with your email service)
const transporter = nodemailer.createTransporter({
  // Use environment variables for email configuration
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// @route   POST /api/newsletter/subscribe
// @desc    Subscribe to newsletter
// @access  Public
router.post('/subscribe', async (req, res) => {
  try {
    const { email, preferences = {} } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if already subscribed
    let subscription = await Newsletter.findOne({ email });

    if (subscription) {
      // Update preferences if already subscribed
      subscription.preferences = {
        ...subscription.preferences,
        ...preferences
      };
      subscription.updatedAt = new Date();
      await subscription.save();

      return res.json({ 
        message: 'Subscription updated successfully',
        subscription: subscription.toJSON()
      });
    }

    // Create new subscription
    subscription = new Newsletter({
      email,
      preferences: {
        nba: preferences.nba ?? true,
        wnba: preferences.wnba ?? false,
        ncaa: preferences.ncaa ?? false,
        international: preferences.international ?? false,
        breaking: preferences.breaking ?? true
      }
    });

    await subscription.save();

    // Send welcome email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@basketballers.com',
        to: email,
        subject: 'Welcome to BasketBallers Newsletter!',
        html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <h1 style="color: #7C3AED;">Welcome to BasketBallers!</h1>
            <p>Thank you for subscribing to our newsletter. You'll receive the latest basketball news and updates based on your preferences:</p>
            <ul>
              ${subscription.preferences.nba ? '<li>NBA News</li>' : ''}
              ${subscription.preferences.wnba ? '<li>WNBA News</li>' : ''}
              ${subscription.preferences.ncaa ? '<li>NCAA Basketball</li>' : ''}
              ${subscription.preferences.international ? '<li>International Basketball</li>' : ''}
              ${subscription.preferences.breaking ? '<li>Breaking News Alerts</li>' : ''}
            </ul>
            <p>You can update your preferences or unsubscribe at any time by visiting our website.</p>
            <p>Stay in the game!</p>
            <p>The BasketBallers Team</p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Welcome email error:', emailError);
      // Don't fail the subscription if email fails
    }

    res.status(201).json({ 
      message: 'Subscribed successfully',
      subscription: subscription.toJSON()
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/newsletter/preferences
// @desc    Update newsletter preferences
// @access  Public
router.put('/preferences', async (req, res) => {
  try {
    const { email, preferences } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const subscription = await Newsletter.findOne({ email });

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    subscription.preferences = {
      ...subscription.preferences,
      ...preferences
    };
    subscription.updatedAt = new Date();

    await subscription.save();

    res.json({ 
      message: 'Preferences updated successfully',
      subscription: subscription.toJSON()
    });
  } catch (error) {
    console.error('Newsletter preferences update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/newsletter/unsubscribe
// @desc    Unsubscribe from newsletter
// @access  Public
router.delete('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const subscription = await Newsletter.findOneAndDelete({ email });

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    // Send goodbye email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@basketballers.com',
        to: email,
        subject: 'You\'ve been unsubscribed from BasketBallers',
        html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <h1 style="color: #7C3AED;">Sorry to see you go!</h1>
            <p>You have been successfully unsubscribed from the BasketBallers newsletter.</p>
            <p>We're sorry to see you leave. If you change your mind, you can always subscribe again on our website.</p>
            <p>Thanks for being part of the BasketBallers community!</p>
            <p>The BasketBallers Team</p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Unsubscribe email error:', emailError);
    }

    res.json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/newsletter/stats
// @desc    Get newsletter statistics (admin only)
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const totalSubscribers = await Newsletter.countDocuments({});
    const nbaSubscribers = await Newsletter.countDocuments({ 'preferences.nba': true });
    const wnbaSubscribers = await Newsletter.countDocuments({ 'preferences.wnba': true });
    const ncaaSubscribers = await Newsletter.countDocuments({ 'preferences.ncaa': true });
    const internationalSubscribers = await Newsletter.countDocuments({ 'preferences.international': true });
    const breakingSubscribers = await Newsletter.countDocuments({ 'preferences.breaking': true });

    res.json({
      totalSubscribers,
      preferenceStats: {
        nba: nbaSubscribers,
        wnba: wnbaSubscribers,
        ncaa: ncaaSubscribers,
        international: internationalSubscribers,
        breaking: breakingSubscribers
      }
    });
  } catch (error) {
    console.error('Newsletter stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 