const express = require('express');
const router=express.Router()

const Education =require("../models/education")


router.get("/alleducation",async (req,res)=>{
    try {
        const educationDetails = await Education.find()
        res.json(educationDetails)
        console.log("eucation details fetched");
        
    } catch (error) {
        res.status(500).json({error:"not able fetch edu details"})
    }

})

router.post("/addeducation",async(req,res)=>{
    try {
        const neweducation = new Education(req.body);
        const savededucation =await neweducation.save()
        const alldetails =await Education.find()
        res.json(alldetails);
        console.log("eucation details added");
    } catch (error) {
        res.status(400).json({error:'Failed to create education entry'})
    }
})

module.exports=router