const express = require('express');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/comments/:articleId
// @desc    Get comments for an article
// @access  Public
router.get('/:articleId', async (req, res) => {
  try {
    const { articleId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const comments = await Comment.find({ 
      articleId, 
      parentId: null // Only top-level comments
    })
    .populate('userId', 'firstName lastName username avatar isVerified')
    .populate({
      path: 'replies',
      populate: {
        path: 'userId',
        select: 'firstName lastName username avatar isVerified'
      }
    })
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

    const total = await Comment.countDocuments({ 
      articleId, 
      parentId: null 
    });

    res.json({
      comments,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      },
      total
    });
  } catch (error) {
    console.error('Comments fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/comments
// @desc    Create a new comment
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { articleId, content, parentId } = req.body;

    if (!articleId || !content) {
      return res.status(400).json({ message: 'Article ID and content are required' });
    }

    if (content.trim().length < 1) {
      return res.status(400).json({ message: 'Comment cannot be empty' });
    }

    if (content.length > 1000) {
      return res.status(400).json({ message: 'Comment too long (max 1000 characters)' });
    }

    const comment = new Comment({
      articleId,
      userId: req.user.userId,
      content: content.trim(),
      parentId: parentId || null
    });

    await comment.save();

    // If this is a reply, add it to the parent's replies
    if (parentId) {
      await Comment.findByIdAndUpdate(
        parentId,
        { $push: { replies: comment._id } }
      );
    }

    // Populate user data
    await comment.populate('userId', 'firstName lastName username avatar isVerified');

    res.status(201).json({
      message: 'Comment created successfully',
      comment
    });
  } catch (error) {
    console.error('Comment creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/comments/:id
// @desc    Update a comment
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length < 1) {
      return res.status(400).json({ message: 'Comment cannot be empty' });
    }

    if (content.length > 1000) {
      return res.status(400).json({ message: 'Comment too long (max 1000 characters)' });
    }

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user owns the comment or is admin
    if (comment.userId.toString() !== req.user.userId.toString() && 
        req.user.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    comment.content = content.trim();
    comment.updatedAt = new Date();
    await comment.save();

    await comment.populate('userId', 'firstName lastName username avatar isVerified');

    res.json({
      message: 'Comment updated successfully',
      comment
    });
  } catch (error) {
    console.error('Comment update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/comments/:id
// @desc    Delete a comment
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user owns the comment or is admin/moderator
    if (comment.userId.toString() !== req.user.userId.toString() && 
        !['admin', 'moderator'].includes(req.user.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // If comment has replies, just mark as deleted instead of removing
    if (comment.replies && comment.replies.length > 0) {
      comment.content = '[This comment has been deleted]';
      comment.isDeleted = true;
      await comment.save();
    } else {
      // Remove from parent's replies if it's a reply
      if (comment.parentId) {
        await Comment.findByIdAndUpdate(
          comment.parentId,
          { $pull: { replies: comment._id } }
        );
      }
      await Comment.findByIdAndDelete(req.params.id);
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Comment deletion error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/comments/:id/like
// @desc    Like/unlike a comment
// @access  Private
router.post('/:id/like', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const userId = req.user.userId;
    const hasLiked = comment.likes.includes(userId);

    if (hasLiked) {
      // Unlike
      comment.likes = comment.likes.filter(id => id.toString() !== userId.toString());
    } else {
      // Like
      comment.likes.push(userId);
    }

    await comment.save();

    res.json({
      message: hasLiked ? 'Comment unliked' : 'Comment liked',
      likes: comment.likes.length,
      hasLiked: !hasLiked
    });
  } catch (error) {
    console.error('Comment like error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/comments/user/:userId
// @desc    Get comments by user
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const comments = await Comment.find({ userId })
      .populate('userId', 'firstName lastName username avatar isVerified')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Comment.countDocuments({ userId });

    res.json({
      comments,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      },
      total
    });
  } catch (error) {
    console.error('User comments fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 