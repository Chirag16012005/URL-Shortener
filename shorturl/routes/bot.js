const express = require("express");
const router = express.Router();
const { shortenurl } = require("../controllers/url");
const { verifyBotToken } = require("../service/auth");

router.post("/create", verifyBotToken, shortenurl);

module.exports = router;
