import express from 'express';
import { registerUser, loginUser } from '../controller/authController';
import { validateSignup, validateLogin } from '../middlewares/validationMiddleware';
import { Request, Response } from 'express';

const router = express.Router();

// Registration route
router.post('/signup', validateSignup, registerUser);

// Login route
router.post('/login', validateLogin, loginUser);

export default router; 
