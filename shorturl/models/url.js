const mongoose=require('mongoose');

const urlSchema=new mongoose.Schema({
    shortID:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true
    },
    visithistory:{
        type:[{timestamp:{type:Number}}],
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    }
},{timestamps:true});

const url=mongoose.model('url',urlSchema);

module.exports=url;