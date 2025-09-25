const express = require('express');
const { body, validationResult, query } = require('express-validator');
const User = require('../models/User');
const Job = require('../models/Job');
const BlogPost = require('../models/BlogPost');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// All admin routes require admin authentication
router.use(auth, authorize('admin'));

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard stats
// @access  Private (Admin only)
router.get('/dashboard', async (req, res) => {
  try {
    // Get various statistics
    const stats = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'user' }),
      Job.countDocuments(),
      Job.countDocuments({ status: 'active' }),
      BlogPost.countDocuments(),
      BlogPost.countDocuments({ status: 'published' })
    ]);

    const [
      totalUsers,
      totalJobSeekers,
      totalCompanies,
      totalJobs,
      activeJobs,
      totalBlogPosts,
      publishedBlogPosts
    ] = stats;

    // Get recent activities
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('email role createdAt');

    const recentJobs = await Job.find()
      .populate('company', 'name')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title company status createdAt');

    const recentBlogPosts = await BlogPost.find()
      .populate('author', 'profile.firstName profile.lastName')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title author status createdAt');

    res.json({
      stats: {
        totalUsers,
        totalJobSeekers,
        totalCompanies,
        totalJobs,
        activeJobs,
        totalBlogPosts,
        publishedBlogPosts
      },
      recentActivities: {
        users: recentUsers,
        jobs: recentJobs,
        blogPosts: recentBlogPosts
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users (admin view)
// @access  Private (Admin only)
router.get('/users', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('role').optional().isIn(['user', 'company', 'admin']).withMessage('Invalid role'),
  query('status').optional().isIn(['active', 'inactive']).withMessage('Invalid status'),
  query('search').optional().isString().withMessage('Search must be a string')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      page = 1,
      limit = 20,
      role,
      status,
      search,
      sort = 'createdAt',
      order = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};

    if (role) filter.role = role;
    if (status === 'inactive') filter.isActive = false;
    else filter.isActive = true;

    if (search) {
      filter.$or = [
        { email: { $regex: search, $options: 'i' } },
        { 'profile.firstName': { $regex: search, $options: 'i' } },
        { 'profile.lastName': { $regex: search, $options: 'i' } },
        { 'company.name': { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;

    const users = await User.find(filter)
      .select('-password')
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/admin/users/:id/status
// @desc    Update user status
// @access  Private (Admin only)
router.put('/users/:id/status', [
  body('isActive').isBoolean().withMessage('isActive must be a boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: req.body.isActive },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: `User ${req.body.isActive ? 'activated' : 'deactivated'} successfully`,
      user
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/admin/jobs
// @desc    Get all jobs (admin view)
// @access  Private (Admin only)
router.get('/jobs', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['active', 'paused', 'closed', 'draft']).withMessage('Invalid status'),
  query('category').optional().isString().withMessage('Category must be a string')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      page = 1,
      limit = 20,
      status,
      category,
      sort = 'createdAt',
      order = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};

    if (status) filter.status = status;
    if (category) filter.category = category;

    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;

    const jobs = await Job.find(filter)
      .populate('company', 'name logo')
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
      }
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/admin/jobs/:id/status
// @desc    Update job status
// @access  Private (Admin only)
router.put('/jobs/:id/status', [
  body('status').isIn(['active', 'paused', 'closed', 'draft']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate('company', 'company.name company.logo');

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({
      message: 'Job status updated successfully',
      job
    });
  } catch (error) {
    console.error('Update job status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/admin/blog
// @desc    Get all blog posts (admin view)
// @access  Private (Admin only)
router.get('/blog', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['draft', 'published', 'archived']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      page = 1,
      limit = 20,
      status,
      sort = 'createdAt',
      order = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};

    if (status) filter.status = status;

    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;

    const posts = await BlogPost.find(filter)
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

// @route   PUT /api/admin/blog/:id/status
// @desc    Update blog post status
// @access  Private (Admin only)
router.put('/blog/:id/status', [
  body('status').isIn(['draft', 'published', 'archived']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updateData = { status: req.body.status };
    
    // Set publishedAt if status is being changed to published
    if (req.body.status === 'published') {
      updateData.publishedAt = new Date();
    }

    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('author', 'profile.firstName profile.lastName company.name');

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({
      message: 'Blog post status updated successfully',
      post
    });
  } catch (error) {
    console.error('Update blog post status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/admin/analytics
// @desc    Get analytics data
// @access  Private (Admin only)
router.get('/analytics', async (req, res) => {
  try {
    // Get analytics data for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const analytics = await Promise.all([
      // User registrations
      User.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]),
      // Job postings
      Job.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]),
      // Blog post views
      BlogPost.aggregate([
        { $match: { updatedAt: { $gte: thirtyDaysAgo } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' } }, views: { $sum: '$views' } } },
        { $sort: { _id: 1 } }
      ])
    ]);

    const [userRegistrations, jobPostings, blogViews] = analytics;

    res.json({
      userRegistrations,
      jobPostings,
      blogViews
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/admin/stats/detailed
// @desc    Get detailed statistics
// @access  Private (Admin only)
router.get('/stats/detailed', async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const detailedStats = await Promise.all([
      // User statistics
      User.aggregate([
        { $group: { _id: '$role', count: { $sum: 1 } } }
      ]),
      // Job statistics by category
      Job.aggregate([
        { $match: { status: 'active' } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      // Job statistics by type
      Job.aggregate([
        { $match: { status: 'active' } },
        { $group: { _id: '$type', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      // Recent registrations
      User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      // Recent job postings
      Job.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      // Total applications
      Job.aggregate([
        { $unwind: '$applications' },
        { $group: { _id: null, totalApplications: { $sum: 1 } } }
      ])
    ]);

    const [userRoles, jobCategories, jobTypes, recentRegistrations, recentJobs, totalApplications] = detailedStats;

    res.json({
      userRoles,
      jobCategories,
      jobTypes,
      recentRegistrations: recentRegistrations || 0,
      recentJobs: recentJobs || 0,
      totalApplications: totalApplications[0]?.totalApplications || 0
    });
  } catch (error) {
    console.error('Get detailed stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/admin/users/:id/verify
// @desc    Verify a user account
// @access  Private (Admin only)
router.post('/users/:id/verify', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'User verified successfully',
      user
    });
  } catch (error) {
    console.error('Verify user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user (admin only)
// @access  Private (Admin only)
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete user's jobs if they are a company
    if (user.role === 'company') {
      await Job.deleteMany({ company: user._id });
    }

    // Remove user's applications from jobs
    await Job.updateMany(
      { 'applications.user': user._id },
      { $pull: { applications: { user: user._id } } }
    );

    // Delete user
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/admin/applications
// @desc    Get all job applications (admin view)
// @access  Private (Admin only)
router.get('/applications', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['pending', 'reviewed', 'shortlisted', 'rejected', 'hired']).withMessage('Invalid status'),
  query('jobId').optional().isMongoId().withMessage('Invalid job ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      page = 1,
      limit = 20,
      status,
      jobId,
      sort = 'appliedAt',
      order = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};

    if (status) filter['applications.status'] = status;
    if (jobId) filter._id = jobId;

    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;

    const jobs = await Job.find(filter)
      .populate('company', 'company.name company.logo')
      .populate('applications.user', 'profile.firstName profile.lastName profile.avatar email')
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    // Flatten applications for easier handling
    const applications = [];
    jobs.forEach(job => {
      job.applications.forEach(application => {
        applications.push({
          _id: application._id,
          job: {
            _id: job._id,
            title: job.title,
            company: job.company
          },
          user: application.user,
          status: application.status,
          appliedAt: application.appliedAt,
          coverLetter: application.coverLetter
        });
      });
    });

    const total = await Job.aggregate([
      { $match: filter },
      { $unwind: '$applications' },
      { $count: 'total' }
    ]);

    res.json({
      applications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: total[0]?.total || 0,
        pages: Math.ceil((total[0]?.total || 0) / limit)
      }
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/admin/applications/:jobId/:applicationId
// @desc    Update application status
// @access  Private (Admin only)
router.put('/applications/:jobId/:applicationId', [
  body('status').isIn(['pending', 'reviewed', 'shortlisted', 'rejected', 'hired']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const application = job.applications.id(req.params.applicationId);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    application.status = req.body.status;
    await job.save();

    res.json({
      message: 'Application status updated successfully',
      application
    });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/admin/reports
// @desc    Get admin reports
// @access  Private (Admin only)
router.get('/reports', async (req, res) => {
  try {
    const reports = await Promise.all([
      // Top companies by job count
      Job.aggregate([
        { $match: { status: 'active' } },
        { $group: { _id: '$company', jobCount: { $sum: 1 } } },
        { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'company' } },
        { $unwind: '$company' },
        { $project: { 'company.company.name': 1, jobCount: 1 } },
        { $sort: { jobCount: -1 } },
        { $limit: 10 }
      ]),
      // Most viewed jobs
      Job.find({ status: 'active' })
        .populate('company', 'company.name company.logo')
        .sort({ views: -1 })
        .limit(10)
        .select('title company views createdAt'),
      // Recent activity
      Job.aggregate([
        { $match: { createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ])
    ]);

    const [topCompanies, mostViewedJobs, recentActivity] = reports;

    res.json({
      topCompanies,
      mostViewedJobs,
      recentActivity
    });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 