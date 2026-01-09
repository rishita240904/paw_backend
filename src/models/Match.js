const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
    {
        pet1Id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pet"
        },
        pet2Id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pet"
        },
        status: {
            type: String,
            default: "active"
        },
        lastMessageAt: Date
    },
    { timestamps: true }
);

module.exports = mongoose.model("Match", matchSchema);
