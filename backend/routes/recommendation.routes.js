import express from 'express';
import { getRecommendations, verifyToken } from '../controllers/recommendation.controller.js';

const router = express.Router();

router.get('/me', verifyToken, getRecommendations);

export default router;