const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next)
{
    const userid=req.header['authorization'];

    if(!userid)
        return res.redirect("/login");

    const token=userid.split('Bearer ')[1];

    if(!getUser(token))
        return res.redirect("/login");

    req.user=getUser(token);
    next();
}
async function checkAuth(req, res, next) {
  const token=req.header['authorization']?.split('Bearer ')[1];

  const user = getUser(token);

  req.user = user;
  next();
}
async function checkAuthentication(req, res, next) 
{
    const authorization=req.cookies?.uid;
    req.user=null;
    if(!authorization)
    return next();

    const user=getUser(authorization);
    req.user=user;
    next();
}

function restrictTo(roles=[]) {
    return function (req,res,next){
        if(!req.user)
            return res.redirect('/login');

        if(!roles.includes(req.user.role))
            return res.end("Unauthorized Access");

        return next();
    }
};
module.exports={restrictTo,checkAuthentication}; 