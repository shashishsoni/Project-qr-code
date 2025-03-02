import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use the same secret

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        res.sendStatus(401); // Unauthorized
        return; // Ensure to return after sending the response
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({ message: 'Forbidden' }); // Forbidden
            return; // Ensure to return after sending the response
        }
        if (typeof user === 'string' || !user) {
            res.sendStatus(403); // Forbidden if user is a string or undefined
            return; // Ensure to return after sending the response
        }
        req.user = user as { id: string; username: string }; // Attach user info to request
        next();
    });
}; 