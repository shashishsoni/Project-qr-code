import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the QR Code model
export interface IQRCode extends Document {
    userId: string; // Reference to the user who created the QR code
    data: string; // The data encoded in the QR code
    style: {
        border: string;
        color: string;
    };
    createdAt: Date;
}

// Create the QR Code schema
const QRCodeSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    data: {
        type: String,
        required: true,
    },
    style: {
        border: {
            type: String,
            default: 'solid',
        },
        color: {
            type: String,
            default: '#000000',
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the QR Code model
const QRCode = mongoose.model<IQRCode>('QRCode', QRCodeSchema);

export default QRCode; 