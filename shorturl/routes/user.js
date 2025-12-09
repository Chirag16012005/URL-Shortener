const express = require("express");
const router = express.Router();
const { handleSignUp,handleLogin} = require("../controllers/user");


router.post("/", handleSignUp);
router.post("/login", handleLogin);
module.exports = router;