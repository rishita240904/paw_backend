const express = require("express");
const router = express.Router();
const { createPlaydate, getMyPlaydates, getPlaydatesByMatch, respondToPlaydate } = require("../controllers/playdateController");
const auth = require("../middlewares/authMiddleware");

router.post("/", auth, createPlaydate);
router.get("/mine", auth, getMyPlaydates);
router.get("/match/:matchId", auth, getPlaydatesByMatch);
router.put("/:playdateId/respond", auth, respondToPlaydate);


module.exports = router;
