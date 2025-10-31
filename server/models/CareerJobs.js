const mongoose = require('mongoose');

const careerjobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: [true, 'Please enter your description'],
  },
  type:{
    type: String,
    required: true,
  },
  vacancies: {
    type: String,
    required: true,
  },
  requirements: {
    type: String
  },
  benefits: {
    type: String
  },
  status: {
    type: String,
    required: true,
    enum: ['Open', 'Closed']
  },
  enteries: {
    type: [
    {
      name: String,
      email: String,
      phone: String,
      experience: String,
      coverletter: String,
      appliedAt: { type: Date, default: Date.now }
    }
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CareerJob', careerjobSchema); 