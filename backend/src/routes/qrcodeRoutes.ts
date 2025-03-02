import express from "express";
import { generateQRCode } from "../controller/qrcodeController";

const router = express.Router();

// POST /api/qrcode - Generate a QR code
router.post("/", async (req, res) => {
    await generateQRCode(req, res); // Properly handle the async function
});

export default router;