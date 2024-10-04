const express = require("express");
const router = express.Router();

const PersonalDetails = require("../models/personalDetails");

// GET route to fetch personal details
router.get("/personal", async (req, res) => {
    try {
        const details = await PersonalDetails.findOne(); // Fetch the first entry
        res.json(details);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch personal details" });
    }
});

// POST route to add/update personal details
router.post("/personal", async (req, res) => {
    try {
        // Check if details already exist
        const existingDetails = await PersonalDetails.findOne();
        if (existingDetails) {
            // Update existing details
            await PersonalDetails.updateOne({}, req.body);
        } else {
            // Create new entry if no details exist
            const newDetails = new PersonalDetails(req.body);
            await newDetails.save();
        }
        const updatedDetails = await PersonalDetails.findOne();
        res.json(updatedDetails); // Respond with updated details
    } catch (error) {
        res.status(400).json({ error: "Failed to save/update personal details" });
    }
});

module.exports = router;
