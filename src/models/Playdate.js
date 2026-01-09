const mongoose = require("mongoose");

const playdateSchema = new mongoose.Schema(
    {
        matchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Match"
        },
        location: Object,
        scheduledAt: Date,
        status: {
            type: String,
            default: "pending"
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        confirmedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        notes: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("Playdate", playdateSchema);
