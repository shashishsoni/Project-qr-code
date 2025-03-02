import QRCode from 'qrcode';

export const generateQRCode = async (data: string, style: any): Promise<string> => {
    try {
        const qrCodeDataUrl = await QRCode.toDataURL(data, { errorCorrectionLevel: 'H' });
        return qrCodeDataUrl;
    } catch (error) {
        throw new Error('Failed to generate QR Code');
    }
}; 