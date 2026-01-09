const express = require("express");
const router = express.Router();
const { registerUser, getUsers, getMe } = require("../controllers/userController");

const auth = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.get("/me", auth, getMe);
router.get("/", getUsers);

module.exports = router;
