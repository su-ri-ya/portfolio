const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const Projects = require("../models/projects");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads'); // Updated path for uploads
    
    // Create uploads folder if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get("/allprojects", async (req, res) => {
  try {
    const projectDetails = await Projects.find();
    res.json(projectDetails);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch project details" });
  }
});

router.post("/addprojects", upload.single('image'), async (req, res) => {
  try {
    const newProject = new Projects({
      projectName: req.body.projectName,
      description: req.body.description,
      techUsed: req.body.techUsed.split(','), // Convert comma-separated string to array
      githubLink: req.body.githubLink,
      liveLink: req.body.liveLink,
      imageUrls: [`/uploads/${req.file.filename}`] // Save relative path
    });
    await newProject.save(); // Save the new project in the database
    const allProjects = await Projects.find(); // Retrieve all projects
    res.json(allProjects); // Send all projects as response
  } catch (error) {
    res.status(400).json({ error: 'Failed to create project entry' });
  }
});

module.exports = router;
