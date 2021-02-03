const mongoose = require('mongoose');

const SolutionSchema = new mongoose.Schema({
  discriminant: {
    type: Number,
    required: true
  },
  roots: {
    type: [Number],
    required: true
  }
});

const TaskSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  coeffs: {
    type: [],
    required: true
  },
  solution: {
    type: SolutionSchema,
    required: false
  },
  errorMessage: {
    type: String,
    required: false
  },
  lastUpdate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Task', TaskSchema);
