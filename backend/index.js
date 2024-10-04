const express = require('express'); // Import express
const dotenv = require('dotenv'); // Import dotenv
const { mongoose } = require('mongoose');
const EducationRoutes=require("./routes/educationRoutes")
const projectRoutes=require("./routes/projectsRoutes")
const SocialMediaLinksRoutes=require("./routes/socialLInksRouter")
const personalDetailsRoutes= require("./routes/personalDetailsRouter")
const ResumeRoutes= require("./routes/ResumeRoute")
const certificateRoutes =require("./routes/CertifcateRoutes")
const cors = require('cors');
const path =require("path")
// Load environment variables from .env file
dotenv.config();

const app = express(); // Create an express application

// Middleware to parse JSON requests
app.use(cors())
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI, {})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

app.use("/",EducationRoutes);
app.use("/",projectRoutes)
app.use("/",SocialMediaLinksRoutes)
app.use("/",personalDetailsRoutes)
app.use("/",ResumeRoutes)
app.use("/",certificateRoutes)
// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
