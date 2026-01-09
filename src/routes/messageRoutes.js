const express = require("express");
const router = express.Router();
const { sendMessage, getMessages } = require("../controllers/messageController");
const auth = require("../middlewares/authMiddleware");

router.post("/", auth, sendMessage);
router.get("/:matchId", getMessages);

module.exports = router;
