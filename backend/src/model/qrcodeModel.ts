// models/qrcodeModel.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IQRCode extends Document {
  data: string;
  style: {
    border: string;
    color: string;
  };
  qrCodeDataUrl: string;
  createdAt: Date;
  background: string;
}

const QRCodeSchema: Schema = new Schema({
  data: {
    type: String,
    required: true,
  },
  style: {
    border: { type: String, default: 'solid' },
    color: { type: String, default: '#000000' },
  },
  qrCodeDataUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  background: {
    type: String,
    required: true,
  },
});

const QRCodeModel = mongoose.model<IQRCode>("QRCode", QRCodeSchema);
export default QRCodeModel;