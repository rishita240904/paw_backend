const express = require("express");
const router = express.Router();
const { createPet, getPetsByUser, getAllPets, getMyPets } = require("../controllers/petController");
const auth = require("../middlewares/authMiddleware");

router.post("/", auth, createPet);
router.get("/", auth, getAllPets);
router.get("/mine", auth, getMyPets);
router.get("/user/:userId", getPetsByUser);

module.exports = router;
