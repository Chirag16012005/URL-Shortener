const express=require('express');
const url = require('../models/url');

const router=express.Router();

router.get('/',async (req,res)=>{
    const allurls=await url.find({})
    return res.render("home",{
        name:"Piyush",
         urls: allurls
    });
});
module.exports=router;