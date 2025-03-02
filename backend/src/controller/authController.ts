import { Request, Response } from 'express';
import Signup from '../model/signupmodel'; // Import the Signup model
import { hashPassword, comparePasswords } from '../utils/utils'; // Import the hashPassword utility
import jwt from 'jsonwebtoken'; // Import JWT

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variable for secret

// Mock database
const users: { username: string; password: string }[] = [];

// Register user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body; // Get username, email, and password

    try {
        const hashedPassword = await hashPassword(password); // Hash the password
        const newUser = new Signup({ username, email, password: hashedPassword }); // Create new user
        await newUser.save(); 
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await Signup.findOne({ email }); // Find user by email
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
            return; // Ensure to return after sending the response
        }

        const isPasswordValid = await comparePasswords(password, user.password); // Compare passwords
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid email or password' });
            return; // Ensure to return after sending the response
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token }); // Send token to client
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(401).json({ message: error.message });
        } else {
            res.status(401).json({ message: 'An unknown error occurred' });
        }
    }
}; 