import Interaction from '../models/interaction.model.js';
import { verifyToken } from './auth.controller.js'; // Import verifyToken

export const logInteraction = async (req, res) => {
    try {
        const { type, contentId, details, context } = req.body;
        const userId = req.userId; // From verifyToken
        if (!type) {
            return res.status(400).json({ message: "Interaction type is required" });
        }
        const interaction = new Interaction({ userId, type, contentId, details, context });
        await interaction.save();
        res.status(201).json({ message: 'Interaction logged', interactionId: interaction._id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to log interaction', details: error.message });
    }
};

export const getUserInteractions = async (req, res) => {
    try {
        const userId = req.userId; // From verifyToken
        const interactions = await Interaction.find({ userId }).sort({ timestamp: -1 }).limit(50);
        res.json(interactions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch interactions', details: error.message });
    }
};

// Export verifyToken for use in routes if needed directly
export { verifyToken };