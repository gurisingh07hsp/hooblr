const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');
const Job = require('../models/Job'); // Added Job model import

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    res.json({
      user: req.user.getPublicProfile()
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, [
  body('profile.firstName').optional().isString().withMessage('First name must be a string'),
  body('profile.lastName').optional().isString().withMessage('Last name must be a string'),
  body('profile.phone').optional().isString().withMessage('Phone must be a string'),
  body('profile.location').optional().isString().withMessage('Location must be a string'),
  body('profile.bio').optional().isString().withMessage('Bio must be a string'),
  body('profile.skills').optional().isArray().withMessage('Skills must be an array'),
  body('profile.experience').optional().isString().withMessage('Experience must be a string'),
  body('profile.education').optional().isString().withMessage('Education must be a string'),
  body('company.name').optional().isString().withMessage('Company name must be a string'),
  body('company.website').optional().isURL().withMessage('Website must be a valid URL'),
  body('company.description').optional().isString().withMessage('Description must be a string'),
  body('company.location').optional().isString().withMessage('Company location must be a string'),
  body('preferences.jobAlerts').optional().isBoolean().withMessage('Job alerts must be a boolean'),
  body('preferences.emailNotifications').optional().isBoolean().withMessage('Email notifications must be a boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { profile, company, preferences } = req.body;
    const updates = {};

    if (profile) {
      updates.profile = { ...req.user.profile, ...profile };
    }

    if (company && req.user.role === 'company') {
      updates.company = { ...req.user.company, ...company };
    }

    if (preferences) {
      updates.preferences = { ...req.user.preferences, ...preferences };
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user: user.getPublicProfile()
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/users/upload-avatar
// @desc    Upload user avatar
// @access  Private
router.post('/upload-avatar', auth, async (req, res) => {
  try {
    // In a real app, you would handle file upload here
    // For now, we'll just accept a URL
    const { avatarUrl } = req.body;

    if (!avatarUrl) {
      return res.status(400).json({ error: 'Avatar URL is required' });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { 'profile.avatar': avatarUrl },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Avatar updated successfully',
      user: user.getPublicProfile()
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/users/upload-resume
// @desc    Upload user resume
// @access  Private (User only)
router.post('/upload-resume', auth, authorize('user'), async (req, res) => {
  try {
    // In a real app, you would handle file upload here
    // For now, we'll just accept a URL
    const { resumeUrl } = req.body;

    if (!resumeUrl) {
      return res.status(400).json({ error: 'Resume URL is required' });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { 'profile.resume': resumeUrl },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Resume uploaded successfully',
      user: user.getPublicProfile()
    });
  } catch (error) {
    console.error('Upload resume error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/users/save-job
// @desc    Save a job for later
// @access  Private (User only)
router.post('/save-job', auth, authorize('user'), [
  body('jobId').isMongoId().withMessage('Valid job ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { jobId } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if job is already saved
    if (!req.user.savedJobs) {
      req.user.savedJobs = [];
    }

    const isAlreadySaved = req.user.savedJobs.includes(jobId);
    if (isAlreadySaved) {
      return res.status(400).json({ error: 'Job is already saved' });
    }

    // Add job to saved jobs
    req.user.savedJobs.push(jobId);
    await req.user.save();

    res.json({ message: 'Job saved successfully' });
  } catch (error) {
    console.error('Save job error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/users/save-job/:jobId
// @desc    Remove a saved job
// @access  Private (User only)
router.delete('/save-job/:jobId', auth, authorize('user'), async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!req.user.savedJobs) {
      return res.status(400).json({ error: 'No saved jobs found' });
    }

    const jobIndex = req.user.savedJobs.indexOf(jobId);
    if (jobIndex === -1) {
      return res.status(404).json({ error: 'Job not found in saved jobs' });
    }

    req.user.savedJobs.splice(jobIndex, 1);
    await req.user.save();

    res.json({ message: 'Job removed from saved jobs' });
  } catch (error) {
    console.error('Remove saved job error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/users/saved-jobs
// @desc    Get user's saved jobs
// @access  Private (User only)
router.get('/saved-jobs', auth, authorize('user'), async (req, res) => {
  try {
    if (!req.user.savedJobs || req.user.savedJobs.length === 0) {
      return res.json({ jobs: [] });
    }

    const jobs = await Job.find({
      _id: { $in: req.user.savedJobs },
      status: 'active'
    })
    .populate('company', 'company.name company.logo company.location')
    .sort({ createdAt: -1 });

    res.json({ jobs });
  } catch (error) {
    console.error('Get saved jobs error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/users/job-alerts
// @desc    Create a job alert
// @access  Private (User only)
router.post('/job-alerts', auth, authorize('user'), [
  body('keywords').optional().isString().withMessage('Keywords must be a string'),
  body('location').optional().isString().withMessage('Location must be a string'),
  body('category').optional().isString().withMessage('Category must be a string'),
  body('type').optional().isIn(['full-time', 'part-time', 'contract', 'internship', 'remote']).withMessage('Invalid job type'),
  body('frequency').optional().isIn(['daily', 'weekly', 'monthly']).withMessage('Invalid frequency')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { keywords, location, category, type, frequency = 'weekly' } = req.body;

    if (!req.user.jobAlerts) {
      req.user.jobAlerts = [];
    }

    const alert = {
      keywords,
      location,
      category,
      type,
      frequency,
      isActive: true,
      createdAt: new Date()
    };

    req.user.jobAlerts.push(alert);
    await req.user.save();

    res.json({
      message: 'Job alert created successfully',
      alert
    });
  } catch (error) {
    console.error('Create job alert error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/users/job-alerts
// @desc    Get user's job alerts
// @access  Private (User only)
router.get('/job-alerts', auth, authorize('user'), async (req, res) => {
  try {
    const alerts = req.user.jobAlerts || [];
    res.json({ alerts });
  } catch (error) {
    console.error('Get job alerts error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/users/job-alerts/:alertId
// @desc    Update a job alert
// @access  Private (User only)
router.put('/job-alerts/:alertId', auth, authorize('user'), [
  body('keywords').optional().isString().withMessage('Keywords must be a string'),
  body('location').optional().isString().withMessage('Location must be a string'),
  body('category').optional().isString().withMessage('Category must be a string'),
  body('type').optional().isIn(['full-time', 'part-time', 'contract', 'internship', 'remote']).withMessage('Invalid job type'),
  body('frequency').optional().isIn(['daily', 'weekly', 'monthly']).withMessage('Invalid frequency'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { alertId } = req.params;
    const alert = req.user.jobAlerts.id(alertId);

    if (!alert) {
      return res.status(404).json({ error: 'Job alert not found' });
    }

    Object.assign(alert, req.body);
    await req.user.save();

    res.json({
      message: 'Job alert updated successfully',
      alert
    });
  } catch (error) {
    console.error('Update job alert error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/users/job-alerts/:alertId
// @desc    Delete a job alert
// @access  Private (User only)
router.delete('/job-alerts/:alertId', auth, authorize('user'), async (req, res) => {
  try {
    const { alertId } = req.params;
    const alert = req.user.jobAlerts.id(alertId);

    if (!alert) {
      return res.status(404).json({ error: 'Job alert not found' });
    }

    alert.remove();
    await req.user.save();

    res.json({ message: 'Job alert deleted successfully' });
  } catch (error) {
    console.error('Delete job alert error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID (public profile)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('profile.firstName profile.lastName profile.avatar company.name company.logo role createdAt');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/users/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    // This would include various user statistics
    // For now, we'll return basic info
    const stats = {
      profileComplete: calculateProfileComplete(req.user),
      applicationsCount: 0, // Would be calculated from job applications
      savedJobsCount: 0, // Would be calculated from saved jobs
      lastActive: req.user.lastLogin
    };

    res.json({ stats });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Helper function to calculate profile completeness
const calculateProfileComplete = (user) => {
  let complete = 0;
  let total = 0;

  if (user.role === 'user') {
    if (user.profile.firstName) complete++;
    if (user.profile.lastName) complete++;
    if (user.profile.phone) complete++;
    if (user.profile.location) complete++;
    if (user.profile.bio) complete++;
    if (user.profile.skills && user.profile.skills.length > 0) complete++;
    if (user.profile.experience) complete++;
    if (user.profile.education) complete++;
    total = 8;
  } else if (user.role === 'company') {
    if (user.company.name) complete++;
    if (user.company.description) complete++;
    if (user.company.location) complete++;
    if (user.company.website) complete++;
    if (user.company.logo) complete++;
    total = 5;
  }

  return total > 0 ? Math.round((complete / total) * 100) : 0;
};

module.exports = router; 