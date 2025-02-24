import Interaction from '../models/interaction.model.js';
import Content from '../models/content.model.js';
import { verifyToken } from './auth.controller.js'; // Import verifyToken

export const getRecommendations = async (req, res) => {
    try {
        const userId = req.userId; // From verifyToken
        const interactions = await Interaction.find({ userId }).sort({ timestamp: -1 }).limit(50);
        
        if (!interactions.length) {
            // Fallback: Return generic popular content if no interactions yet
            const popularContent = await Content.find().sort({ createdAt: -1 }).limit(5);
            return res.json(popularContent);
        }

        const tags = interactions
            .map(i => i.details?.tag || i.context?.weather)
            .filter(Boolean);

        const recommendations = await Content.find({
            $or: [
                { tags: { $in: tags } },
                { tags: interactions[0]?.context?.weather }
            ]
        }).limit(5);

        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recommendations', details: error.message });
    }
};

export { verifyToken };