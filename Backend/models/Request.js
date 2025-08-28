const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  requestType: {
    type: String,
    required: [true, 'Request type is required'],
    enum: ['urgent', 'normal', 'emergency']
  },
  patientName: {
    type: String,
    required: [true, 'Patient name is required'],
    trim: true
  },
  hospitalName: {
    type: String,
    required: [true, 'Hospital name is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  urgency: {
    type: String,
    required: [true, 'Urgency level is required'],
    enum: ['low', 'medium', 'high', 'critical']
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
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required'],
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  status: {
    type: String,
    enum: ['active', 'matched', 'completed', 'cancelled'],
    default: 'active'
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  matchedDonor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor'
  }
}, {
  timestamps: true
});

// Index for efficient searching
requestSchema.index({ organType: 1, bloodGroup: 1, city: 1, status: 1 });
requestSchema.index({ urgency: -1, requestDate: 1 });

module.exports = mongoose.model('Request', requestSchema);