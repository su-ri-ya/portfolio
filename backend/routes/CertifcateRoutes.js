const express=require("express")
const router=express.Router()
const Certificate=require("../models/Certificate")

router.get("/certificates",async(req,res)=>{
    try {
        const data =await Certificate.find();
        res.json(data)
        console.log(data);
    } catch (error) {
        res.status(500).json({error:"not able fetch Certficate details"})
        
    }
})


router.post('/addcertificate', async (req, res) => {
    const { Title, organization,year  } = req.body;
    
    const certificate = new Certificate({
      Title,
      organization,
      year
    });
  
    try {
      const newCertificate = await certificate.save();
      res.status(201).json(newCertificate);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


module.exports = router;