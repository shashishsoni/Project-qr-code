import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import qrcodeRoutes from './routes/qrcodeRoutes'; // Adjust the path as necessary
import mongoose from 'mongoose';
import { createClient } from 'redis';
import dotenv from 'dotenv';
import { Request, Response} from 'express';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true // Allow credentials if needed
}));
app.use(bodyParser.json());

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI; // Use environment variable
if (!mongoURI) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
}

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Connect to Redis
const redisClient = createClient({ url: process.env.REDIS_URL }); // Use createClient
redisClient.connect() // Connect the client
    .then(() => {
        console.log('Connected to Redis');
    })
    .catch(err => {
        console.error('Redis connection error:', err);
    });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/qrcode', qrcodeRoutes); // Ensure this matches the route defined in qrcodeRoutes.ts

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Root route
app.get('/', (req: Request, res: Response) => {
    res.send('Backend is running successfully!');
});