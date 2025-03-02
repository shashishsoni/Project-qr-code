import { Request, Response } from 'express';
import { generateQRCode } from '../services/qrcodeService';
import QRCode from '../model/qrcodeModel'; // Import the QR Code model

export const createQRCode = async (req: Request, res: Response): Promise<void> => {
    const { data, style } = req.body;
    const userId = req.user?.id; // Get user ID from the token safely

    if (!userId) {
        res.status(401).json({ message: 'Unauthorized: User ID is missing' });
        return;
    }

    try {
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay

        // Generate QR code
        const qrCodeDataUrl = await generateQRCode(data, style);

        // Save QR code to the database
        const newQRCode = new QRCode({ userId, data, style });
        await newQRCode.save();

        res.status(200).json({ qrCode: qrCodeDataUrl, message: 'QR Code created successfully' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// Add a function to retrieve user's QR codes if needed
export const getUserQRCodes = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id; // Get user ID from the token, safely

    if (!userId) {
        res.status(401).json({ message: 'Unauthorized: User ID is missing' });
        return;
    }

    try {
        const qrCodes = await QRCode.find({ userId }); // Find QR codes for the user
        res.status(200).json(qrCodes);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}; 
