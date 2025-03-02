import express from 'express';
import { createQRCode, getUserQRCodes } from '../controller/qrcodeController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

// QR Code generation route
router.post('/', authenticateToken, createQRCode);
router.get('/', authenticateToken, getUserQRCodes);

export default router; 