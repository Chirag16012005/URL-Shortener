const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next)
{
    const userid=req.cookies?.uid;

    if(!userid)
        return res.redirect("/login");

    if(!getUser(userid))
        return res.redirect("/login");

    req.user=getUser(userid);
    next();
}
async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next();
}
module.exports={restrictToLoggedInUserOnly,checkAuth}; 