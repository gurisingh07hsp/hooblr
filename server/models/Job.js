const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  responsibilities: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship',],
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true
  },
  salary: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    },
    period: {
      type: String,
      enum: ['hourly', 'monthly', 'yearly'],
      default: 'yearly'
    }
  },
  benefits: [String],
  skills: [String],
  experience: {
    type: String,
    enum: ['Entry-level', 'Mid-level', 'Senior-level', 'Executive'],
    required: true
  },
  education: {
    type: String,
    enum: ['high-school', 'associate', 'bachelor', 'master', 'phd'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'closed', 'draft'],
    default: 'active'
  },
  isRemote: {
    type: Boolean,
    default: false
  },
  isGovernment: {
    type: Boolean,
    default: false
  },
  applicationDeadline: Date,
  views: {
    type: Number,
    default: 0
  },
  applications: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'],
      default: 'pending'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    coverLetter: String,
    resume: String,
    phone: String
  }],
  tags: [String],
  featured: {
    type: Boolean,
    default: false
  },
  urgent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for search functionality
jobSchema.index({
  title: 'text',
  description: 'text',
  requirements: 'text',
  location: 'text',
  category: 'text',
  department: 'text'
});

// Virtual for application count
// jobSchema.virtual('applicationCount').get(function() {
//   return this.applications.length;
// });

// // Ensure virtuals are serialized
// jobSchema.set('toJSON', { virtuals: true });
// jobSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Job', jobSchema); 