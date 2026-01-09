const Swipe = require("../models/Swipe");
const Match = require("../models/Match");

exports.createSwipe = async (req, res) => {
    try {
        const { swiperId, swipeeId, type } = req.body;

        // 1. Prevent multiple swipes for the same pair
        const existingSwipe = await Swipe.findOne({ swiperId, swipeeId });
        if (existingSwipe) {
            return res.status(400).json({ message: "You have already swiped on this pet" });
        }

        // 2. Create the swipe
        const swipe = await Swipe.create({ swiperId, swipeeId, type });

        // 3. Check for match if it's a 'like'
        if (type === "like") {
            const reciprocalSwipe = await Swipe.findOne({
                swiperId: swipeeId,
                swipeeId: swiperId,
                type: "like"
            });

            if (reciprocalSwipe) {
                // It's a match!
                const match = await Match.create({
                    pet1Id: swiperId,
                    pet2Id: swipeeId
                });
                return res.status(201).json({ swipe, match, isMatch: true });
            }
        }

        res.status(201).json({ swipe, isMatch: false });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
