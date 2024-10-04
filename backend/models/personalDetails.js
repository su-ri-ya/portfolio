const mongoose = require("mongoose");
const { Schema } = mongoose;

const personalDetailsSchema = new Schema({
    name: { type: String, required: true }, // Your name
    email: { type: String, required: true }, // Your email address
    phoneNumber: { type: String, required: true }, // Your contact number
    aboutMe: { type: String,required: true}, // Brief description about yourself
    address: { type: String,required: true}, // Optional: Address (if you want to include)
});

const PersonalDetails = mongoose.model("PersonalDetails", personalDetailsSchema);

module.exports = PersonalDetails;
