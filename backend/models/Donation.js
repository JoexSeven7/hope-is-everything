const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true,
    trim: true
  },
  donorEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  currency: {
    type: String,
    required: true,
    default: 'USD'
  },
  frequency: {
    type: String,
    required: true,
    enum: ['one-time', 'monthly', 'yearly'],
    default: 'one-time'
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['stripe', 'crypto']
  },
  stripePaymentIntentId: {
    type: String,
    default: null
  },
  cryptoTransactionHash: {
    type: String,
    default: null
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  message: {
    type: String,
    default: null
  },
  anonymous: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

donationSchema.index({ donorEmail: 1 });
donationSchema.index({ status: 1 });
donationSchema.index({ createdAt: 1 });

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
