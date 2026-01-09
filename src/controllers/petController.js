const Pet = require("../models/Pet");
const Swipe = require("../models/Swipe");

// Create pet
exports.createPet = async (req, res) => {
    try {
        const petData = { ...req.body, ownerId: req.user.id };
        const pet = await Pet.create(petData);
        res.status(201).json(pet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get pets by user
exports.getPetsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId || userId === "null") {
            return res.json([]);
        }
        const pets = await Pet.find({ ownerId: userId });
        res.json(pets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Get all pets (excluding user's own pets and already swiped pets)
exports.getAllPets = async (req, res) => {
    try {
        const { activePetId } = req.query;

        // 1. Find the current user's pets (to exclude them from discovery)
        const myPets = await Pet.find({ ownerId: req.user.id });
        const myPetIds = myPets.map(p => p._id);

        // 2. Determine which swipes to filter out
        let swipedPetIds = [];
        if (activePetId) {
            // Filter only swipes made by the specifically active pet
            swipedPetIds = await Swipe.find({ swiperId: activePetId }).distinct("swipeeId");
        } else {
            // Default: Filter swipes made by ANY of the user's pets
            swipedPetIds = await Swipe.find({ swiperId: { $in: myPetIds } }).distinct("swipeeId");
        }

        // 3. Find pets that are not owned by the user AND have not been swiped yet
        const pets = await Pet.find({
            ownerId: { $ne: req.user.id },
            _id: { $nin: swipedPetIds }
        });

        res.json(pets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get current user's pets
exports.getMyPets = async (req, res) => {
    try {
        const pets = await Pet.find({ ownerId: req.user.id });
        res.json(pets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
