import { Request, Response } from 'express';
import QRCode from 'qrcode'; // Import the QRCode library
import QRCodeModel from '../model/qrcodeModel'; // Import the QR Code model

// Function to create a QR code and save it to the database
export const generateQRCode = async (req: Request, res: Response) => {
    try {
        const { data, style, qrColor, background } = req.body; // Get data and style from the request body

        if (!data) {
            return res.status(400).json({ message: "QR Code data is required" });
        }

        // Generate QR code image as a Data URL
        const qrCodeDataUrl = await QRCode.toDataURL(data, {
            color: {
                dark: qrColor || "#000000", // Default dark color
                light: background || "#ffffff", // Default light color
            },
        });

        // Save to the database
        const newQRCode = new QRCodeModel({
            data,
            style: {
                border: style.border || 'solid', // Default to 'solid' if not provided
                color: style.color || '#000000', // Default color
            },
            qrCodeDataUrl, // Set the generated QR code data URL
            createdAt: new Date(), // Add createdAt field
            background: background || "#ffffff", // Use provided background or default
        });

        await newQRCode.save(); // Save the QR code to the database

        res.status(201).json({ qrCode: qrCodeDataUrl, message: "QR Code saved successfully" });
    } catch (error: unknown) {
        console.error("QR Code generation error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        res.status(500).json({ message: "Internal Server Error", error: errorMessage });
    }
};

export const getUserQRCodes = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id; // Get user ID from the token, safely

    if (!userId) {
        res.status(401).json({ message: 'Unauthorized: User ID is missing' });
        return;
    }

    try {
        const qrCodes = await QRCodeModel.find({ userId }); // Find QR codes for the user
        res.status(200).json(qrCodes);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// Function to save QR code data (if needed)
export const saveQRCodeData = async (data: string, style: any) => {
    try {
        const qrCodeData = new QRCodeModel({
            data,
            style: {
                border: style.border || 'solid',
                color: style.color || '#000000',
            },
            qrCodeDataUrl: "", // Placeholder, needs to be generated before saving
            background: "#ffffff", // Default background
            borderStyle: style.border || 'solid',
            borderRadius: style.borderRadius || 0,
            createdAt: new Date(),
        });

        await qrCodeData.save();
    } catch (error) {
        console.error("Error saving QR Code data:", error);
    }
};
