const express = require('express');
const BlogPost = require('../models/BlogPost');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/blogs
// @desc    Get all blog posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, tag, author } = req.query;
    
    let query = { published: true };
    
    if (tag) {
      query.tags = { $in: [tag] };
    }
    
    if (author) {
      query.userId = author;
    }

    const blogs = await BlogPost.find(query)
      .populate('userId', 'firstName lastName username avatar isVerified')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await BlogPost.countDocuments(query);

    res.json({
      blogs,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      },
      total
    });
  } catch (error) {
    console.error('Blogs fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/blogs
// @desc    Create a new blog post
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, summary, tags = [], published = false } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const blogPost = new BlogPost({
      title: title.trim(),
      content: content.trim(),
      summary: summary ? summary.trim() : content.substring(0, 200) + '...',
      tags: tags.map(tag => tag.trim()),
      published,
      userId: req.user.userId
    });

    await blogPost.save();
    await blogPost.populate('userId', 'firstName lastName username avatar isVerified');

    res.status(201).json({
      message: 'Blog post created successfully',
      blog: blogPost
    });
  } catch (error) {
    console.error('Blog creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blogs/:id
// @desc    Get single blog post
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id)
      .populate('userId', 'firstName lastName username avatar isVerified bio')
      .populate({
        path: 'comments',
        populate: {
          path: 'userId',
          select: 'firstName lastName username avatar isVerified'
        }
      });

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (!blog.published && blog.userId._id.toString() !== req.user?.userId) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Increment view count
    blog.views += 1;
    await blog.save();

    res.json(blog);
  } catch (error) {
    console.error('Blog fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update blog post
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content, summary, tags, published } = req.body;

    const blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Check if user owns the blog post
    if (blog.userId.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update fields
    if (title) blog.title = title.trim();
    if (content) blog.content = content.trim();
    if (summary !== undefined) blog.summary = summary.trim();
    if (tags) blog.tags = tags.map(tag => tag.trim());
    if (published !== undefined) blog.published = published;

    blog.updatedAt = new Date();
    await blog.save();

    await blog.populate('userId', 'firstName lastName username avatar isVerified');

    res.json({
      message: 'Blog post updated successfully',
      blog
    });
  } catch (error) {
    console.error('Blog update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete blog post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Check if user owns the blog post or is admin
    if (blog.userId.toString() !== req.user.userId.toString() && 
        req.user.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await BlogPost.findByIdAndDelete(req.params.id);

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Blog deletion error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/blogs/:id/like
// @desc    Like/unlike a blog post
// @access  Private
router.post('/:id/like', auth, async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const userId = req.user.userId;
    const hasLiked = blog.likes.includes(userId);

    if (hasLiked) {
      blog.likes = blog.likes.filter(id => id.toString() !== userId.toString());
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    res.json({
      message: hasLiked ? 'Blog post unliked' : 'Blog post liked',
      likes: blog.likes.length,
      hasLiked: !hasLiked
    });
  } catch (error) {
    console.error('Blog like error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blogs/user/:userId
// @desc    Get blog posts by user
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10, includeDrafts = false } = req.query;

    let query = { userId };
    
    // Only show published posts unless user is viewing their own posts
    if (!includeDrafts || req.user?.userId !== userId) {
      query.published = true;
    }

    const blogs = await BlogPost.find(query)
      .populate('userId', 'firstName lastName username avatar isVerified')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await BlogPost.countDocuments(query);

    res.json({
      blogs,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      },
      total
    });
  } catch (error) {
    console.error('User blogs fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blogs/tags/popular
// @desc    Get popular blog tags
// @access  Public
router.get('/tags/popular', async (req, res) => {
  try {
    const tags = await BlogPost.aggregate([
      { $match: { published: true } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);

    res.json(tags.map(tag => ({ name: tag._id, count: tag.count })));
  } catch (error) {
    console.error('Popular tags fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 