import express, { Request, Response, RequestHandler } from 'express';
import { registerUser, loginUser, resetPassword, updatePassword } from '../controller/authController';
import { validateSignup, validateLogin } from '../middlewares/validationMiddleware';

const router = express.Router();

// Registration route
router.post('/signup', validateSignup, registerUser);

// Login route
router.post('/login', validateLogin, loginUser);

// POST /api/auth/reset-password
router.post('/reset-password', resetPassword as RequestHandler);

// POST /api/auth/update-password
router.post('/update-password', updatePassword as RequestHandler);

export default router; 
