const mongoose =require("mongoose")

const {Schema} = mongoose;

const CertficateSchema = new Schema({
    Title:{type:String,required:true},
    organization:{type:String,required:true},
    year:{type:String,required:true}
})
const Certficate=mongoose.model("Certficate",CertficateSchema);
module.exports=Certficate;