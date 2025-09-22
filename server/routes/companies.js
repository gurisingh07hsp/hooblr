const express = require('express');
const { query, validationResult } = require('express-validator');
const User = require('../models/User');
const Company = require('../models/Company')
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
    const filter = {};

    if (industry) filter['industry'] = industry;
    if (size) filter['size'] = size;
    if (search) {
      filter.$or = [
        { 'name': { $regex: search, $options: 'i' } },
        { 'description': { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;

    const companies = await Company.find(filter)
      .populate('jobs')
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Company.countDocuments(filter);

    res.status(200).json({
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
    const company = await Company.findById(req.params.id)


    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    // Get company's active jobs
    const jobs = await Job.find({
      company: req.params.id,
      status: 'active'
    })
    .select('title location type salary category createdAt')
    .sort({ createdAt: -1 })
    .limit(10);

    console.log(jobs);

    res.json({
      company,
      jobs
    });
  } catch (error) {
    console.error('Get company error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// router.put('/profile', auth, async(req, res) => {
//   try {
//       const { company } = req.body;

//       const updatedUser = await Company.findByIdAndUpdate(
//         company._id,
//         { $set: { company } },
//         { new: true, runValidators: true }
//       );

//       if (!updatedUser) {
//         return res.status(404).json({ message: 'Company not found' });
//       }

//       res.status(200).json(updatedUser);
//     } catch (error) {
//       console.error('Error updating company profile:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
// })


router.put('/profile', auth, async (req, res) => {
  try {
    const { company, id } = req.body;
    const userId = req.user._id;

    let updatedCompany;

    if (id && id !== '') {
      // ✅ Update existing company
      updatedCompany = await Company.findByIdAndUpdate(
        id,
        { $set: company }, // update fields
        { new: true, runValidators: true }
      );
    } else {
      // ✅ Create new company with current user as owner
      updatedCompany = new Company({
        ...company,
        companyowner: userId
      });
      await updatedCompany.save();
    }

    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json(updatedCompany);

  } catch (error) {
    console.error('Error updating company profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


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