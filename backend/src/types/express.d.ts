import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: { id: string; username: string }; // Define the user object structure
        }
    }
}