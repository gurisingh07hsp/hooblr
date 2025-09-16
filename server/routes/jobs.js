const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Job = require('../models/Job');
const User = require('../models/User');
const { auth, authorize, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const jobValidation = [
  body('title').notEmpty().trim().withMessage('Job title is required'),
  body('description').notEmpty().withMessage('Job description is required'),
  body('requirements').notEmpty().withMessage('Job requirements are required'),
  body('responsibilities').notEmpty().withMessage('Job responsibilities are required'),
  body('location').notEmpty().trim().withMessage('Job location is required'),
  body('type').isIn(['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship',]).withMessage('Invalid job type'),
  // body('category').isIn(['government', 'law-enforcement', 'administration', 'healthcare', 'education', 'technology', 'finance', 'engineering', 'marketing', 'sales', 'customer-service', 'other']).withMessage('Invalid category'),
  body('department').notEmpty().trim().withMessage('Department is required'),
  body('salary.min').isNumeric().withMessage('Minimum salary must be a number'),
  body('salary.max').isNumeric().withMessage('Maximum salary must be a number'),
  body('experience').isIn(['Entry-level', 'Mid-level', 'Senior-level', 'Executive']).withMessage('Invalid experience level'),
  body('education').isIn(['high-school', 'associate', 'bachelor', 'master', 'phd']).withMessage('Invalid education level')
];

// @route   GET /api/jobs
// @desc    Get all jobs with filters
// @access  Public
// router.get('/', optionalAuth, [
//   query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
//   query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
//   query('category').optional().isString().withMessage('Category must be a string'),
//   query('location').optional().isString().withMessage('Location must be a string'),
//   query('type').optional().isIn(['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship',]).withMessage('Invalid job type'),
//   query('experience').optional().isIn(['Entry-level', 'Mid-level', 'Senior-level', 'Executive']).withMessage('Invalid experience level'),
//   query('search').optional().isString().withMessage('Search must be a string')
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const {
//       page = 1,
//       limit = 10,
//       category,
//       location,
//       type,
//       experience,
//       search,
//       sort = 'createdAt',
//       order = 'desc'
//     } = req.query;

//     // Build filter object
//     const filter = { status: 'active' };

//     if (category) filter.category = category;
//     if (location) filter.location = { $regex: location, $options: 'i' };
//     if (type) filter.type = type;
//     if (experience) filter.experience = experience;

//     // Text search
//     if (search) {
//       filter.$text = { $search: search };
//     }

//     // Build sort object
//     const sortObj = {};
//     sortObj[sort] = order === 'desc' ? -1 : 1;

//     const skip = (page - 1) * limit;

//     const jobs = await Job.find(filter)
//       .populate('company', 'company.name company.logo company.location')
//       .sort(sortObj)
//       .skip(skip)
//       .limit(parseInt(limit));

//     const total = await Job.countDocuments(filter);

//     res.json({
//       jobs,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//         pages: Math.ceil(total / limit)
//       }
//     });
//   } catch (error) {
//     console.error('Get jobs error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });




router.get(
  "/",
  [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 50 }),
    query("category").optional().isString(),
    query("location").optional().isString(),
    query("type").optional().isIn([
      "Full-time",
      "Part-time",
      "Contract",
      "Temporary",
      "Internship",
    ]),
    query("experience").optional().isIn([
      "Entry-level",
      "Mid-level",
      "Senior-level",
      "Executive",
    ]),
    query("search").optional().isString(),
    query("minSalary").optional().isInt(),
    query("maxSalary").optional().isInt(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        page = 1,
        limit = 20,
        category,
        location,
        type,
        experience,
        search,
        sort = "createdAt",
        order = "desc",
        minSalary,
        maxSalary,
      } = req.query;

      const filter = { status: "active" };

      if (category) filter.category = category;
      if (location) filter.location = { $regex: location, $options: "i" };
      if (type) filter.type = type;
      if (experience) filter.experience = experience;
      if (search) filter.$text = { $search: search };

      // Salary filter
      if (minSalary || maxSalary) {
        filter["salary.min"] = minSalary ? { $gte: parseInt(minSalary) } : {};
        filter["salary.max"] = maxSalary ? { $lte: parseInt(maxSalary) } : {};
      }

      const sortObj = {};
      sortObj[sort] = order === "desc" ? -1 : 1;

      const skip = (page - 1) * limit;

      const jobs = await Job.find(filter)
        .populate("company", "name logo location")
        .sort(sortObj)
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Job.countDocuments(filter);

      res.json({
        jobs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error("Get jobs error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);




// @route   GET /api/jobs/:id
// @desc    Get job by ID
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('company', 'company.name company.logo company.location company.description')
      .populate('applications.user', 'profile.firstName profile.lastName profile.avatar');

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Increment views if user is not the job poster
    if (!req.user || req.user._id.toString() !== job.company._id.toString()) {
      job.views += 1;
      await job.save();
    }

    res.json({ job });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/jobs
// @desc    Create a new job
// @access  Private (Company only)
router.post('/', auth, authorize('company', 'admin'), jobValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const jobData = {
      ...req.body,
      company: req.user._id
    };

    const job = new Job(jobData);
    await job.save();

    const populatedJob = await Job.findById(job._id)
      .populate('company', 'company.name company.logo company.location');

    res.status(200).json({
      message: 'Job created successfully',
      job: populatedJob
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/jobs/:id
// @desc    Update a job
// @access  Private (Job owner or admin)
router.put('/:id', auth, authorize('company', 'admin'), jobValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if user owns the job or is admin
    if (req.user.role !== 'admin' && job.company.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this job' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('company', 'company.name company.logo company.location');

    res.json({
      message: 'Job updated successfully',
      job: updatedJob
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete a job
// @access  Private (Job owner or admin)
router.delete('/:id', auth, authorize('company', 'admin'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if user owns the job or is admin
    if (req.user.role !== 'admin' && job.company.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/jobs/:id/apply
// @desc    Apply for a job
// @access  Private (User only)
router.post('/:id/apply', auth, authorize('user'), [
  body('coverLetter').optional().isString().withMessage('Cover letter must be a string'),
  body('resume').optional().isString().withMessage('Resume must be a string')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.status !== 'active') {
      return res.status(400).json({ error: 'Job is not accepting applications' });
    }

    // Check if user already applied
    const existingApplication = job.applications.find(
      app => app.user.toString() === req.user._id.toString()
    );

    if (existingApplication) {
      return res.status(400).json({ error: 'You have already applied for this job' });
    }

    // Add application
    job.applications.push({
      user: req.user._id,
      coverLetter: req.body.coverLetter,
      resume: req.body.resume
    });

    await job.save();

    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Apply for job error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/jobs/my-applications
// @desc    Get user's job applications
// @access  Private (User only)
router.get('/my-applications', auth, authorize('user'), async (req, res) => {
  try {
    const jobs = await Job.find({
      'applications.user': req.user._id
    })
    .populate('company', 'company.name company.logo')
    .select('title location type applications');

    const applications = jobs.map(job => {
      const application = job.applications.find(
        app => app.user.toString() === req.user._id.toString()
      );
      return {
        job: {
          _id: job._id,
          title: job.title,
          location: job.location,
          type: job.type,
          company: job.company
        },
        application
      };
    });

    res.json({ applications });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/jobs/my-jobs
// @desc    Get company's posted jobs
// @access  Private (Company only)
router.get('/my-jobs', auth, authorize('company', 'admin'), async (req, res) => {
  try {
    const jobs = await Job.find({ company: req.user._id })
      .populate('applications.user', 'profile.firstName profile.lastName profile.avatar')
      .sort({ createdAt: -1 });

    res.json({ jobs });
  } catch (error) {
    console.error('Get my jobs error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/jobs/search
// @desc    Advanced job search
// @access  Public
router.get('/search', optionalAuth, [
  query('q').optional().isString().withMessage('Search query must be a string'),
  query('location').optional().isString().withMessage('Location must be a string'),
  query('category').optional().isString().withMessage('Category must be a string'),
  query('type').optional().isIn(['full-time', 'part-time', 'contract', 'internship', 'remote']).withMessage('Invalid job type'),
  query('experience').optional().isIn(['entry', 'mid', 'senior', 'executive']).withMessage('Invalid experience level'),
  query('salary_min').optional().isNumeric().withMessage('Minimum salary must be a number'),
  query('salary_max').optional().isNumeric().withMessage('Maximum salary must be a number'),
  query('remote').optional().isBoolean().withMessage('Remote must be a boolean'),
  query('urgent').optional().isBoolean().withMessage('Urgent must be a boolean'),
  query('featured').optional().isBoolean().withMessage('Featured must be a boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      q,
      location,
      category,
      type,
      experience,
      salary_min,
      salary_max,
      remote,
      urgent,
      featured,
      page = 1,
      limit = 10,
      sort = 'createdAt',
      order = 'desc'
    } = req.query;

    // Build filter object
    const filter = { status: 'active' };

    // Text search
    if (q) {
      filter.$text = { $search: q };
    }

    // Location filter
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Type filter
    if (type) {
      filter.type = type;
    }

    // Experience filter
    if (experience) {
      filter.experience = experience;
    }

    // Salary range filter
    if (salary_min || salary_max) {
      filter['salary.min'] = {};
      if (salary_min) filter['salary.min'].$gte = parseInt(salary_min);
      if (salary_max) filter['salary.max'] = { $lte: parseInt(salary_max) };
    }

    // Remote filter
    if (remote !== undefined) {
      filter.isRemote = remote === 'true';
    }

    // Urgent filter
    if (urgent !== undefined) {
      filter.urgent = urgent === 'true';
    }

    // Featured filter
    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }

    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;

    const jobs = await Job.find(filter)
      .populate('company', 'company.name company.logo company.location')
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Job.countDocuments(filter);

    res.json({
      jobs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      filters: {
        query: q,
        location,
        category,
        type,
        experience,
        salary_min,
        salary_max,
        remote,
        urgent,
        featured
      }
    });
  } catch (error) {
    console.error('Job search error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/jobs/categories
// @desc    Get job categories with counts
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Job.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/jobs/locations
// @desc    Get job locations with counts
// @access  Public
router.get('/locations', async (req, res) => {
  try {
    const locations = await Job.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: '$location', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 50 }
    ]);

    res.json({ locations });
  } catch (error) {
    console.error('Get locations error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/jobs/featured
// @desc    Get featured jobs
// @access  Public
router.get('/featured', optionalAuth, async (req, res) => {
  try {
    const jobs = await Job.find({ 
      status: 'active', 
      featured: true 
    })
    .populate('company', 'company.name company.logo company.location')
    .sort({ createdAt: -1 })
    .limit(10);

    res.json({ jobs });
  } catch (error) {
    console.error('Get featured jobs error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/jobs/urgent
// @desc    Get urgent jobs
// @access  Public
router.get('/urgent', optionalAuth, async (req, res) => {
  try {
    const jobs = await Job.find({ 
      status: 'active', 
      urgent: true 
    })
    .populate('company', 'company.name company.logo company.location')
    .sort({ createdAt: -1 })
    .limit(10);

    res.json({ jobs });
  } catch (error) {
    console.error('Get urgent jobs error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 