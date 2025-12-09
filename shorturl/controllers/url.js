const {nanoid}=require('nanoid');

const URL=require('../models/url');
async function shortenurl(req, res) {
    const {url}=req.body;

    if(!url)
    {
        return res.status(400).json({error:"URL is required"});
    }
    console.log("checkpoint1");
   const shortID=nanoid(8);
   console.log("chcckpoint2");

    await URL.create({
        shortID:shortID,
        redirectURL:url,
        visithistory:[]
    });
    return res.render("home",{
        id: shortID,
        name:"Piyush"
    });

return res.json({newID: shortID});
};

async function getAnalytics(req,res){
    const id=req.params.shortID;

    const result=await URL.findOne({shortID:id});
    if(!result){
        return res.status(404).json({error:"ShortID not found"});
    }

    return res.json({totalclicks: result.visithistory.length,
                    visithistory: result.visithistory,
    });
};
module.exports={shortenurl,getAnalytics};