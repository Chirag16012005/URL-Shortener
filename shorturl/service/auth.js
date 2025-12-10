const jwt = require('jsonwebtoken');

function setuser(user)
{
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secretkey');
    return token;
}

function getUser(token)
{
    if(!token) 
        return null;

    try{
        const user = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
        return user;
    }catch(err){
        return null;
    }
}

/* =========================
   DISCORD BOT AUTH (NEW)
   ========================= */

function verifyBotToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) 
    {
        return res.status(401).json({ error: "Bot token missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.API_KEY);

        // Extra identity check
        if (decoded.user !== "discordbot") {
            return res.status(403).json({ error: "Invalid bot identity" });
        }

        req.bot = decoded;   // optional use later
        next();              // ✅ Authorized bot request

    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired bot token" });
    }
}

module.exports = {
    setuser,
    getUser,
    verifyBotToken   // ✅ export bot verifier
};
