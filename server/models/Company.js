const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
      type: String,
    },
    companyemail: {
      type: String,
    },
    companyowner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    size: {
      type: String,
      enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],
    },
    industry: {
      type: String,
    },
    website: String,
    description: String,
    logo: String,
    location: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
});

companySchema.virtual('jobs', {
  ref: 'Job',
  localField: '_id',
  foreignField: 'company'
});

companySchema.set('toObject', { virtuals: true });
companySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Company', companySchema); 
