const express=require('express');
const app=express();
const port=8002;
const urlrouter=require('./routes/url');
const connectDB=require('./connect');
const URL=require('./models/url');
app.use(express.json());

connectDB('mongodb://localhost:27017/URL_Shortener').then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log("Error connecting to DB",err);
});

app.use('/url', urlrouter);


app.get('/:shortID',async (req,res)=>{
    const shortID=req.params.shortID.trim();

    const entry=await URL.findOneAndUpdate(
        {
        shortID,
        },

        {
            $push:{visithistory:{timestamp:Date.now()}}
        },
        {new:true},{runValidators:true}
    );
    if (!entry) 
    {
        return res.status(404).json({ error: "Short URL not found" });
    }
    res.redirect(entry.redirectURL);
});

app.listen(port,()=>{
   console.log(`Server is running on port ${port}`);
});