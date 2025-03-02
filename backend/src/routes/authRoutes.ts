import express from 'express';
import { registerUser, loginUser } from '../controller/authController';
import { validateSignup, validateLogin } from '../middlewares/validationMiddleware';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

// Registration route
router.post('/signup', validateSignup, registerUser);

// Login route
router.post('/login', validateLogin, loginUser);

// Example of a protected route
router.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});

export default router; 