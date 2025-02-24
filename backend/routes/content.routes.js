import express from 'express';
import { getContent, getUserSpecificContent, verifyToken } from '../controllers/content.controller.js';

const router = express.Router();

router.get('/', getContent); // Public access
router.get('/me', verifyToken, getUserSpecificContent); // Authenticated access

export default router;