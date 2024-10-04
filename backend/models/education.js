const mongoose = require("mongoose");
const {Schema} = mongoose;

const educationSchema =new Schema({
    institution:{type:String,required:true},
    title:{type:String,required:true},
    startYear: { type:String, required: true },
    endYear: { type:String }, // Optional for ongoing education
    grade: { type: String,required:true}, // Optional for grade or CGPA
})

const Education =mongoose.model("Education",educationSchema)
module.exports=Education;