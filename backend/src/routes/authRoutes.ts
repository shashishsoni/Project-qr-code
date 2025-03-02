import express, { RequestHandler } from 'express';
import { registerUser, loginUser, resetPassword, updatePassword } from '../controller/authController';

const router = express.Router();

// Registration route
router.post('/signup', registerUser as RequestHandler);

// Login route
router.post('/login', loginUser as RequestHandler);

// POST /api/auth/reset-password
router.post('/reset-password', resetPassword as RequestHandler);

// POST /api/auth/update-password
router.post('/update-password', updatePassword as RequestHandler);

export default router; 
