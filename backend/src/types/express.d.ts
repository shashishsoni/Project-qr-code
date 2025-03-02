import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string; // or whatever type your user ID is
                username: string; // Include any other user properties you need
            };
        }
    }
} 