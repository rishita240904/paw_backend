const express = require("express");
const router = express.Router();
const { createMatch, getMatches, getMatchById } = require("../controllers/matchController");

router.post("/", createMatch);
router.get("/", getMatches);
router.get("/:matchId", getMatchById);

module.exports = router;
