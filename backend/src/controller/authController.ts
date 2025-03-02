import { Request, Response } from 'express';
import Signup from '../model/signupmodel'; // Ensure this path is correct
import { hashPassword, comparePasswords } from '../utils/utils'; // Ensure this path is correct
import jwt from 'jsonwebtoken';

// Use environment variable for JWT secret, with a fallback
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Register user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ message: 'Username, email, and password are required' });
        return;
    }

    try {
        const hashedPassword = await hashPassword(password);
        const newUser = new Signup({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error: any) {
        console.error('Registration error:', error);
        res.status(400).json({ message: error.message || 'Failed to register user' });
    }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
    }

    try {
        const user = await Signup.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        const isPasswordValid = await comparePasswords(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ message: 'Login successful', token });
    } catch (error: unknown) {
        console.error('Login error:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
};