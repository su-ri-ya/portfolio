const mongoose = require('mongoose');

// Define the schema for storing resume data
const resumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  resume: {
    type: Buffer,  // Storing resume as binary data
    required: true
  },
});

// Create the model
const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
