const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
   authProvider: {
    type: String,
    enum: ["credentials", "google"],
    default: "credentials",
  },
  password: {
    type: String,
   required: function() {
    return this.authProvider === "credentials";
  },
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user','admin'],
    default: 'user'
  },
  profile: {
    name: {
      type: String,
      required: function() { return this.role === 'user'; }
    },
    phone: String,
    location: String,
    bio: String,
    skills: [String],
    experience: String,
    education: String,
    resume: String,
    avatar: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  preferences: {
    jobAlerts: {
      type: Boolean,
      default: true
    },
    emailNotifications: {
      type: Boolean,
      default: true
    }
  },
  savedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],
  jobAlerts: [{
    keywords: String,
    location: String,
    category: String,
    type: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship', 'remote']
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'weekly'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  otp: {
      code: String,
      expiresAt: Date
  },
},
 {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Get public profile (without sensitive data)
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.virtual("companies", {
  ref: "Company",
  localField: "_id",        // User _id
  foreignField: "companyowner", // Match with Company.companyowner
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model('User', userSchema); 