const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: String,
        species: String,
        breed: String,
        age: Number,
        gender: String,
        size: String,
        photos: [String]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Pet", petSchema);
