// src/components/ORcodeGenerator.tsx
"use client";
import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = () => {
    const [inputData, setInputData] = useState('');

    return (
        <div className="flex flex-col min-h-screen justify-between">
            <div className="flex-grow flex items-center justify-center">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold text-center mb-4">Generate Your QR Code</h2>
                    <input
                        type="text"
                        value={inputData}
                        onChange={(e) => setInputData(e.target.value)}
                        placeholder="Enter URL or text"
                        className="border border-gray-300 p-4 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {inputData && (
                        <div className="flex justify-center mb-4">
                            <QRCodeCanvas value={inputData} size={256} />
                        </div>
                    )}
                    <button className="w-full bg-blue-600 text-white p-4 rounded hover:bg-blue-700 transition duration-200">
                        Generate QR Code
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QRCodeGenerator;