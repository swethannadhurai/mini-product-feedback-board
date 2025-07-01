const mongoose = require('mongoose');

// Comment Schema (defined separately for clarity)
const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Main Feedback Schema
const feedbackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Feature', 'Bug', 'UI', 'Other'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Open', 'Planned', 'In Progress', 'Done'],
    default: 'Open',
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  comments: [commentSchema], // nested array of comment objects
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Feedback', feedbackSchema);

