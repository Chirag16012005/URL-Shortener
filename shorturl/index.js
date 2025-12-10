const express=require('express');
const app=express();
const path=require('path');
const connectDB=require('./connect');
const URL=require('./models/url');
const {restrictTo,checkAuthentication}=require('./middlewares/auth');
const dotenv=require('dotenv');
dotenv.config();

const {restrictToLoggedInUserOnly,checkAuth}=require('./middlewares/auth');
const cookieParser = require('cookie-parser');

const port=8002;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const urlrouter=require('./routes/url');
const staticRoute=require('./routes/staticRouter');
const userRoute=require('./routes/user');

connectDB('mongodb://localhost:27017/URL_Shortener').then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log("Error connecting to DB",err);
});

app.get('/test',async (req,res)=>{
    const allurls= await URL.find({});
    return res.render("home",{
        urls:allurls,
        name:"Piyush"
    });
});

app.use('/url', restrictTo(["NORMAL",'ADMIN']), urlrouter);
app.use('/',checkAuthentication, staticRoute);
app.use('/user',userRoute);
app.use('/bot',require('./routes/bot'));


app.set('view engine', 'ejs');
app.set("views",path.resolve("./views"));

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