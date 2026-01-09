const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register user
exports.registerUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            token,
            userId: user._id,
            user
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};
// Get current user info
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
