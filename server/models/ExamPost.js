const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // e.g., "SSC CGL 2025 Notification"
  },
  officialSite: {
    type: String,
    required: true, // Link to official website
  },
  admitCardLink: {
    type: String,
  },
  resultLink: {
    type: String,
  },
  notificationLink: {
    type: String,
  },
  state:{
    type: String,
    required: true, // e.g., Gujrat
  },
  status:{
    type: String
  },
  type: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  examDate:{
    type: Date, // starting date
  },
  seoTitle: {type: String},
  seoDescription: {type: String},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ExamPost', examSchema); 