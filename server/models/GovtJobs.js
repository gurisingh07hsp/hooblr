const mongoose = require('mongoose');

const govtjobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // e.g., "SSC CGL 2025 Notification"
  },
  officialLink: {
    type: String,
    required: true, // Link to official website
  },
  applyLink: {
    type: String,
    required: true,
  },
  notificationLink: {
    type: String,
  },
  state:{
    type: String,
    required: true, // e.g., Gujrat
  },
  location:{
    type: String,
  },
  category:{
    type: String,
    required: true, // e.g., police, railway
  },
  eligibilityCriteria: {
    type: String,
    required: true, // Detailed eligibility (e.g., educational qualification)
  },
  totalPosts:{
    type: String,
    required: true
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
  description: {
    type: String,
    required: true
  },
  selectionProcess: {
    type: String,
    required: true, // e.g., "Written Exam, Interview, Document Verification"
  },
  howToApply: {
    type: String,
    required: true, // Step-by-step guide for applying
  },
  startDateToApply:{
    type: Date, // starting date
  },
  lastDateToApply: {
    type: Date, // Optional but useful
  },
  expiryDate: { type: Date },
  seoTitle: {type: String},
  seoDescription: {type: String},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

govtjobSchema.pre("save", function (next) {
  if (this.lastDateToApply) {
    const expiry = new Date(this.lastDateToApply);
    expiry.setDate(expiry.getDate() + 5);
    this.expiryDate = expiry;
  }
  next();
});

govtjobSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });


module.exports = mongoose.model('GovtJob', govtjobSchema); 