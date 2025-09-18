const express = require('express');
const { query, validationResult } = require('express-validator');
const User = require('../models/User');
const Job = require('../models/Job');
const { auth,optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/companies
// @desc    Get all companies
// @access  Public
router.get('/', optionalAuth, [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('industry').optional().isString().withMessage('Industry must be a string'),
  query('size').optional().isIn(['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']).withMessage('Invalid company size'),
  query('search').optional().isString().withMessage('Search must be a string')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      page = 1,
      limit = 10,
      industry,
      size,
      search,
      sort = 'createdAt',
      order = 'desc'
    } = req.query;

    // Build filter object
    const filter = { role: 'company', isActive: true };

    if (industry) filter['company.industry'] = industry;
    if (size) filter['company.size'] = size;
    if (search) {
      filter.$or = [
        { 'company.name': { $regex: search, $options: 'i' } },
        { 'company.description': { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;

    const companies = await User.find(filter)
      .select('company email createdAt')
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    res.json({
      companies,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get companies error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/companies/:id
// @desc    Get company by ID
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const company = await User.findById(req.params.id)
      .select('company email createdAt')
      .where({ role: 'company', isActive: true });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    // Get company's active jobs
    const jobs = await Job.find({
      company: req.params.id,
      status: 'active'
    })
    .select('title location type category createdAt')
    .sort({ createdAt: -1 })
    .limit(10);

    res.json({
      company,
      recentJobs: jobs
    });
  } catch (error) {
    console.error('Get company error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/profile', auth, async(req, res) => {
  try {
      const userId = req.user._id;
      const { company } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { company } },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'Company not found' });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating company profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
})

// @route   GET /api/companies/:id/jobs
// @desc    Get company's jobs
// @access  Public
router.get('/:id/jobs', optionalAuth, [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('status').optional().isIn(['active', 'paused', 'closed']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      page = 1,
      limit = 10,
      status = 'active'
    } = req.query;

    // Check if company exists
    const company = await User.findById(req.params.id)
      .where({ role: 'company', isActive: true });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const skip = (page - 1) * limit;

    const jobs = await Job.find({
      company: req.params.id,
      status
    })
    .populate('company', 'company.name company.logo')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

    const total = await Job.countDocuments({
      company: req.params.id,
      status
    });

    res.json({
      jobs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get company jobs error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 