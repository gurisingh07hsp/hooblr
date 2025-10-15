const mongoose = require('mongoose');

const govtjobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // e.g., "SSC CGL 2025 Notification"
  },
  officialLink: {
    type: String,
    required: true, // Link to official notification or website
  },
  state:{
    type: String,
    required: true, // e.g., Gujrat
  },
  category:{
    type: String,
    required: true, // e.g., police, railway
  },
  eligibilityCriteria: {
    type: String,
    required: true, // Detailed eligibility (e.g., educational qualification)
  },
  ageLimit: {
    type: String,
    required: true, // e.g., "18–27 years"
  },
  salary: {
    type: String,
    required: true, // e.g., "₹35,000 – ₹1,12,400 per month"
  },
  applicationFees: {
    type: String,
    required: true, // e.g., "₹100 for General/OBC, No fee for SC/ST"
  },
  selectionProcess: {
    type: String,
    required: true, // e.g., "Written Exam, Interview, Document Verification"
  },
  howToApply: {
    type: String,
    required: true, // Step-by-step guide for applying
  },
  lastDateToApply: {
    type: Date, // Optional but useful
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('GovtJob', govtjobSchema); 