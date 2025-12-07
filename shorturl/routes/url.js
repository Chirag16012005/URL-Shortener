const express=require('express');
const {shortenurl, getAnalytics}=require('../controllers/url');
const router=express.Router();

router.post('/',shortenurl);

router.get('/analytics/:shortID',getAnalytics);
module.exports=router;