const mongoose=require("mongoose")
const {Schema} = mongoose
const projectSchema = new Schema({
    projectName: { type: String, required: true }, // Name of the project
    description: { type: String, required: true }, // Brief description
    techUsed: { type: [String], required: true }, // Technologies used (array of strings)
    githubLink: { type: String, required: true }, // GitHub repository link
    liveLink: { type: String }, // Live demo link (if available)
    imageUrls: { type: [String] }, // URLs of project images/screenshots
});

const Projects = mongoose.model("Projects", projectSchema);

module.exports = Projects;
