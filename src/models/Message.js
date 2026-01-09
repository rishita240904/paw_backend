const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        matchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Match"
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pet"
        },
        content: String,
        isRead: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
