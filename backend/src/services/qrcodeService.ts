import QRCode from 'qrcode';

export const generateQRCode = async (data: string, options: QRCode.QRCodeToDataURLOptions) => {
    try {
        const qrCodeDataUrl = await QRCode.toDataURL(data, options);
        return qrCodeDataUrl;
    } catch (error) {
        throw new Error('Error generating QR code');
    }
}; 