const mongoose = require("mongoose");
const { Schema } = mongoose;

const socialMediaSchema = new Schema({
    platform: { type: String, required: true }, // Name of the platform (e.g., LinkedIn, GitHub)
    url: { type: String, required: true }, // The URL of your profile on that platform
});

const SocialMediaLinks = mongoose.model("SocialMediaLinks", socialMediaSchema);

module.exports = SocialMediaLinks;
