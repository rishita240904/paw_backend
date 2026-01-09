const Playdate = require("../models/Playdate");
const Match = require("../models/Match");

exports.createPlaydate = async (req, res) => {
    try {
        const playdate = await Playdate.create({
            ...req.body,
            createdBy: req.user.id
        });
        res.status(201).json(playdate);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getMyPlaydates = async (req, res) => {
    try {
        // 1. Find all matches the current user's pets are part of
        const Pet = require("../models/Pet");
        const myPets = await Pet.find({ ownerId: req.user.id });
        const myPetIds = myPets.map(p => p._id);

        const myMatches = await Match.find({
            $or: [
                { pet1Id: { $in: myPetIds } },
                { pet2Id: { $in: myPetIds } }
            ]
        });
        const matchIds = myMatches.map(m => m._id);

        // 2. Find all playdates for these matches
        const playdates = await Playdate.find({ matchId: { $in: matchIds } })
            .populate({
                path: "matchId",
                populate: [
                    { path: "pet1Id" },
                    { path: "pet2Id" }
                ]
            })
            .sort({ scheduledAt: 1 });

        res.json(playdates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPlaydatesByMatch = async (req, res) => {
    try {
        const playdates = await Playdate.find({ matchId: req.params.matchId })
            .populate("createdBy", "name")
            .sort({ scheduledAt: 1 });
        res.json(playdates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Respond (Accept/Reject) to a playdate
exports.respondToPlaydate = async (req, res) => {
    try {
        const { playdateId } = req.params;
        const { status } = req.body; // 'confirmed' or 'rejected'

        if (!['confirmed', 'rejected'].includes(status)) {
            return res.status(400).json({ error: "Invalid status. Use 'confirmed' or 'rejected'." });
        }

        const playdate = await Playdate.findById(playdateId).populate("matchId");
        if (!playdate) {
            return res.status(404).json({ error: "Playdate not found" });
        }

        // Verify user is part of this match
        const Pet = require("../models/Pet");
        const myPets = await Pet.find({ ownerId: req.user.id });
        const myPetIds = myPets.map(p => p._id.toString());

        const isParticipant = myPetIds.includes(playdate.matchId.pet1Id.toString()) ||
            myPetIds.includes(playdate.matchId.pet2Id.toString());

        if (!isParticipant) {
            return res.status(403).json({ error: "You are not a participant in this playdate's match" });
        }

        // Prevent creator from responding to their own request
        if (playdate.createdBy.toString() === req.user.id) {
            return res.status(403).json({ error: "Wait for your friend to respond to your playdate request!" });
        }

        playdate.status = status;
        if (status === 'confirmed') {
            playdate.confirmedBy = req.user.id;
        }

        await playdate.save();
        res.json(playdate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};