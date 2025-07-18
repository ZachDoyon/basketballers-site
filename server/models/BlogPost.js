const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  summary: {
    type: String,
    maxlength: 500,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  published: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type: Number,
    default: 0
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  isModerated: {
    type: Boolean,
    default: false
  },
  moderatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  moderatedAt: {
    type: Date
  },
  readTime: {
    type: Number, // in minutes
    default: 1
  }
}, {
  timestamps: true
});

// Index for faster queries
blogPostSchema.index({ userId: 1, createdAt: -1 });
blogPostSchema.index({ published: 1, createdAt: -1 });
blogPostSchema.index({ tags: 1 });
blogPostSchema.index({ 'likes.length': -1 });

// Virtual for like count
blogPostSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for comment count
blogPostSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Calculate read time based on content length
blogPostSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  }
  next();
});

module.exports = mongoose.model('BlogPost', blogPostSchema); 