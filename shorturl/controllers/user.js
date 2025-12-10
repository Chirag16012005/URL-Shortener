const User=require('../models/user');
const {v4:uuidv4}=require('uuid');
const {setuser}=require('../service/auth');

async function handleSignUp(req,res)
{
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.redirect('/login');
}
async function handleLogin(req,res)
{
    const {email,password}=req.body;

    const user=await User.findOne({
        email,
        password
    });

    if(!user)
    return res.render("login",{error:"Invalid credentials"});


   const token=setuser(user);
    res.cookie("uid",token);

    return res.redirect('/');
    
}
module.exports={handleSignUp, handleLogin};