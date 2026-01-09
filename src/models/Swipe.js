const mongoose = require("mongoose");

const swipeSchema = new mongoose.Schema(
    {
        swiperId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pet"
        },
        swipeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pet"
        },
        type: {
            type: String,
            enum: ["like", "dislike"]
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Swipe", swipeSchema);
