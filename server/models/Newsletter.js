const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  preferences: {
    nba: {
      type: Boolean,
      default: true
    },
    wnba: {
      type: Boolean,
      default: false
    },
    ncaa: {
      type: Boolean,
      default: false
    },
    international: {
      type: Boolean,
      default: false
    },
    breaking: {
      type: Boolean,
      default: true
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  source: {
    type: String,
    default: 'website',
    enum: ['website', 'social', 'referral', 'import']
  }
}, {
  timestamps: true
});

// Index for faster queries
newsletterSchema.index({ email: 1 });
newsletterSchema.index({ isActive: 1 });
newsletterSchema.index({ 'preferences.breaking': 1 });

module.exports = mongoose.model('Newsletter', newsletterSchema); 