const emailtouuidmap=new Map();

function setuser(id,user){
    emailtouuidmap.set(id,user);
}

function getUser(id){
    return emailtouuidmap.get(id);
}
module.exports={setuser,getUser};