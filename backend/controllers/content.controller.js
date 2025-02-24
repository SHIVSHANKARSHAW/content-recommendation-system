import Content from '../models/content.model.js';
import { verifyToken } from './auth.controller.js';

export const getContent = async (req, res) => {
    try {
        const { networkSpeed } = req.query; // Optional query param
        const speedThreshold = 2; // Mbps threshold
        const content = await Content.find();

        const adaptedContent = content.map(item => ({
            ...item._doc,
            url: networkSpeed && networkSpeed < speedThreshold && item.lowResUrl 
                ? item.lowResUrl 
                : item.contentUrl
        }));

        res.json(adaptedContent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch content', details: error.message });
    }
};

// Optional: Authenticated content fetch
export const getUserSpecificContent = async (req, res) => {
    try {
        const userId = req.userId; // From verifyToken
        const { networkSpeed } = req.query;
        const speedThreshold = 2;
        const content = await Content.find(); // Could filter based on user preferences later

        const adaptedContent = content.map(item => ({
            ...item._doc,
            url: networkSpeed && networkSpeed < speedThreshold && item.lowResUrl 
                ? item.lowResUrl 
                : item.contentUrl
        }));

        res.json(adaptedContent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user-specific content', details: error.message });
    }
};

export { verifyToken };