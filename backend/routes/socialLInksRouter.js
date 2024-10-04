const express = require("express");
const router = express.Router();

const SocialMediaLinks = require("../models/SocialMedia");

// GET route to fetch all social media links
router.get("/socialmedia", async (req, res) => {
    try {
        const links = await SocialMediaLinks.find();
        res.json(links);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch social media links" });
    }
});

// POST route to add a new social media link
router.post("/addsocialmedia", async (req, res) => {
    try {
        const newLink = new SocialMediaLinks(req.body);
        await newLink.save();
        const allLinks = await SocialMediaLinks.find();
        res.json(allLinks); // Respond with all links after adding the new one
    } catch (error) {
        res.status(400).json({ error: "Failed to create social media link" });
    }
});

module.exports = router;
