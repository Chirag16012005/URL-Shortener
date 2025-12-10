const express=require('express');
const url = require('../models/url');
const {restrictTo}=require('../middlewares/auth');

const router=express.Router();

router.get('/admin/urls',restrictTo(["ADMIN"]), async (req,res)=>{
     if(!req.user)
    {
        return res.redirect('/login');
    }
    const allurls=await url.find({});

    return res.render("home",{
        name: req.user.name,
         urls: allurls
    });
});


router.get('/',restrictTo(["NORMAL","ADMIN"]), async (req,res)=>{
    if(!req.user)
    {
        return res.redirect('/login');
    }
    const allurls=await url.find({createdBy: req.user._id})

    return res.render("home",{
        name: req.user.name,
         urls: allurls
    });
});

router.get('/signup',(req,res)=>{
    res.render("signup");
})

router.get('/login',(req,res)=>{
    res.render("login");
});
module.exports=router;