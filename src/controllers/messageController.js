const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getMessages = async (req, res) => {
    const messages = await Message.find({ matchId: req.params.matchId });
    res.json(messages);
};

