import { Request, Response } from 'express';
import Signup from '../model/signupmodel'; // Ensure this path is correct
import { hashPassword, comparePasswords } from '../utils/utils'; // Ensure this path is correct
import jwt from 'jsonwebtoken';
import User from '../model/userreset'; // Import your User model
import crypto from 'crypto'; // For generating tokens
import bcrypt from 'bcrypt';
import { sendResetEmail } from '../utils/emailService';

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

// Reset Password
export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        // Find user by email in the Signup model instead of User model
        const user = await Signup.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // Convert to Date object

        // Save reset token to user
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiry;
        await user.save();

        // Create reset URL
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        // Send reset email
        try {
            await sendResetEmail(user.email, resetUrl);
            res.status(200).json({
                success: true,
                message: 'Password reset instructions sent to your email'
            });
        } catch (emailError) {
            console.error('Email sending error:', emailError);
            // If email fails, clear the reset token
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();

            res.status(500).json({
                success: false,
                message: 'Error sending reset email. Please try again.'
            });
        }
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing password reset request'
        });
    }
};

// Update Password
export const updatePassword = async (req: Request, res: Response) => {
    try {
        const { token, newPassword } = req.body;

        // Find user by reset token
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password and clear reset token
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        // Generate new JWT token
        const jwtToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            message: 'Password has been reset successfully',
            token: jwtToken
        });
    } catch (error) {
        console.error('Update password error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating password'
        });
    }
};