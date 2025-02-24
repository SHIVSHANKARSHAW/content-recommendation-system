import express from 'express';
import { logInteraction, getUserInteractions, verifyToken } from '../controllers/interaction.controller.js';

const router = express.Router();

router.post('/log', verifyToken, logInteraction);
router.get('/me', verifyToken, getUserInteractions);

export default router;