const express = require('express');
const { body, validationResult, query } = require('express-validator');
const BlogPost = require('../models/BlogPost');
const User = require('../models/User');
const { auth, authorize, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const blogPostValidation = [
  body('title').notEmpty().trim().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('excerpt').notEmpty().trim().isLength({ max: 200 }).withMessage('Excerpt is required and must be less than 200 characters'),
  body('category').isIn(['Interview Tips', 'Workplace', 'Government Jobs', 'Career Growth', 'Networking', 'Salary Guide', 'Resume Tips', 'Industry News']).withMessage('Invalid category'),
  body('featuredImage').notEmpty().withMessage('Featured image is required'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('status').optional().isIn(['draft', 'published', 'archived']).withMessage('Invalid status')
];

// @route   GET /api/blog
// @desc    Get all blog posts
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('category').optional().isString().withMessage('Category must be a string'),
  query('search').optional().isString().withMessage('Search must be a string'),
  query('featured').optional().isBoolean().withMessage('Featured must be a boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      page = 1,
      limit = 10,
      category,
      search,
      featured,
      sort = 'publishedAt',
      order = 'desc'
    } = req.query;

    // Build filter object
    const filter = { status: 'published' };

    if (category) filter.category = category;
    if (featured !== undefined) filter.featured = featured === 'true';
    if (search) {
      filter.$text = { $search: search };
    }

    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;

    const posts = await BlogPost.find(filter)
      .populate('author', 'profile')
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await BlogPost.countDocuments(filter);

    res.status(200).json({
      posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/blog/:slug
// @desc    Get blog post by slug
// @access  Public
router.get('/:slug', optionalAuth, async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, status: 'published' })
      .populate('author', 'profile');

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.status(200).json({ post });
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/blog
// @desc    Create a new blog post
// @access  Private (Admin only)
router.post('/', auth, authorize('admin'), blogPostValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const postData = {
      ...req.body,
      author: req.user._id
    };

    // Set publishedAt if status is published
    if (req.body.status === 'published') {
      postData.publishedAt = new Date();
    }

    const post = new BlogPost(postData);
    await post.save();

    const populatedPost = await BlogPost.findById(post._id)
      .populate('author', 'profile.name');

    res.status(200).json({
      message: 'Blog post created successfully',
      post: populatedPost
    });
  } catch (error) {
    console.error('Create blog post error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/blog/:id
// @desc    Update a blog post
// @access  Private (Admin only)
router.put('/:id', auth, authorize('admin'), blogPostValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Set publishedAt if status is being changed to published
    if (req.body.status === 'published' && post.status !== 'published') {
      req.body.publishedAt = new Date();
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: 'Blog post updated successfully',
      post: updatedPost
    });
  } catch (error) {
    console.error('Update blog post error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/blog/:id
// @desc    Delete a blog post
// @access  Private (Admin only)
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    await BlogPost.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Delete blog post error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/blog/:id/comment
// @desc    Add a comment to a blog post
// @access  Private
router.post('/:id/comment', auth, [
  body('content').notEmpty().trim().withMessage('Comment content is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    if (post.status !== 'published') {
      return res.status(400).json({ error: 'Cannot comment on unpublished posts' });
    }

    // Auto-approve comments from verified users
    const isApproved = req.user.isVerified;

    post.comments.push({
      user: req.user._id,
      content: req.body.content,
      isApproved
    });

    await post.save();

    res.json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/blog/categories
// @desc    Get blog categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await BlogPost.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 