const express = require("express");
const router = express.Router();
const { createSwipe } = require("../controllers/swipeController");

router.post("/", createSwipe);

module.exports = router;
