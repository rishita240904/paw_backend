const Match = require("../models/Match");

exports.createMatch = async (req, res) => {
    const match = await Match.create(req.body);
    res.status(201).json(match);
};

exports.getMatches = async (req, res) => {
    try {
        const { petId } = req.query;
        let query = {};

        if (petId) {
            query = {
                $or: [{ pet1Id: petId }, { pet2Id: petId }]
            };
        }

        const matches = await Match.find(query)
            .populate("pet1Id")
            .populate("pet2Id")
            .sort({ createdAt: -1 });

        // Filter out matches where one of the pets was deleted (populated to null)
        const validMatches = matches.filter(match => match.pet1Id && match.pet2Id);

        res.json(validMatches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMatchById = async (req, res) => {
    try {
        const match = await Match.findById(req.params.matchId)
            .populate("pet1Id")
            .populate("pet2Id");
        if (!match) return res.status(404).json({ message: "Match not found" });
        res.json(match);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
