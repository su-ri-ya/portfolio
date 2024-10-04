const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Resume = require('../models/Resume');
const router = express.Router();

// Multer configuration to store file in memory as binary
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route for uploading resume
router.post('/upload_resume', upload.single('resume'), async (req, res) => {
  try {
    const { originalname, mimetype, buffer } = req.file;

    // Save the binary data into MongoDB
    const newResume = new Resume({
      name: originalname,
      contentType: mimetype,
      resume: buffer,
    });

    await newResume.save();
    res.status(200).json({ message: 'Resume uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload resume', error: error.message });
  }
});

// Route for downloading the latest uploaded resume
router.get('/resume', async (req, res) => {
  try {
    // Find the latest resume by sorting in descending order of upload time
    const latestResume = await Resume.findOne().sort({ _id: -1 });

    if (!latestResume) {
      return res.status(404).json({ message: 'No resume found' });
    }

    // Set headers to trigger file download
    res.set({
      'Content-Disposition': `attachment; filename="${latestResume.name}"`,
      'Content-Type': latestResume.contentType,
    });

    res.send(latestResume.resume); // Send the binary data
  } catch (error) {
    res.status(500).json({ message: 'Failed to download resume', error: error.message });
  }
});

module.exports = router;
