const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [18, 'Must be at least 18 years old'],
    max: [65, 'Must be under 65 years old']
  },
  bloodGroup: {
    type: String,
    required: [true, 'Blood group is required'],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  organType: {
    type: String,
    required: [true, 'Organ type is required'],
    enum: ['heart', 'liver', 'kidney', 'lung', 'pancreas', 'cornea', 'skin', 'bone', 'blood']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient searching
donorSchema.index({ organType: 1, bloodGroup: 1, city: 1, isAvailable: 1 });

module.exports = mongoose.model('Donor', donorSchema);