import { Request, Response } from 'express';
import { registerUser as registerUserService, loginUser as loginUserService } from '../services/authService';
import Signup from '../model/signupmodel'; // Import the Signup model
import { hashPassword } from '../utils/utils'; // Import the hashPassword utility

// Mock database
const users: { username: string; password: string }[] = [];

// Register user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const hashedPassword = await hashPassword(password); // Hash the password
        const newUser = new Signup({ firstName, lastName, email, password: hashedPassword });
        await newUser.save(); // Save the user to the database
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// Login user
export const loginUser = (req: Request, res: Response): void => {
    const { email, password } = req.body;

    try {
        loginUserService(email, password);
        res.status(200).json({ message: 'Login successful' });
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
}; 