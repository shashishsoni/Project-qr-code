"use client";
import type React from "react";
import { useState } from "react";
import QRCode from "qrcode";

interface StyleOptions {
  border: string;
  color: string;
  size: number;
  margin: number;
  errorCorrectionLevel: "L" | "M" | "Q" | "H";
  bgColor: string;
  borderRadius: string;
  borderColor: string;
}

const predefinedStyles = [
  { name: "Default", border: "solid", color: "#000000", size: 256, margin: 2, errorCorrectionLevel: "L", bgColor: "#ffffff", borderRadius: "0px", borderColor: "#e5e7eb" },
  { name: "Rounded", border: "dashed", color: "#8b5cf6", size: 256, margin: 4, errorCorrectionLevel: "M", bgColor: "#f9fafb", borderRadius: "12px", borderColor: "#d1d5db" },
  { name: "Bold", border: "solid", color: "#ec4899", size: 300, margin: 2, errorCorrectionLevel: "Q", bgColor: "#ffffff", borderRadius: "8px", borderColor: "#9ca3af" },
  { name: "Minimal", border: "none", color: "#10b981", size: 256, margin: 2, errorCorrectionLevel: "H", bgColor: "#f3f4f6", borderRadius: "0px", borderColor: "transparent" },
];

const QRCodeGenerator = () => {
  const [data, setData] = useState<string>("");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [style, setStyle] = useState<StyleOptions>(predefinedStyles[0] as StyleOptions);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const handleGenerateQRCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const qrCodeDataURL = await QRCode.toDataURL(data, {
        width: style.size,
        margin: style.margin,
        color: {
          dark: style.color,
          light: style.bgColor,
        },
        errorCorrectionLevel: style.errorCorrectionLevel,
      });
      setQrCode(qrCodeDataURL);
    } catch (error) {
      console.error("Error generating QR code:", error);
      setQrCode(null);
    }
  };

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStyle = predefinedStyles.find((style) => style.name === e.target.value);
    if (selectedStyle) {
      setStyle({
        ...selectedStyle,
        errorCorrectionLevel: selectedStyle.errorCorrectionLevel as "L" | "M" | "Q" | "H",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8">
        {/* Generator Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 flex-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">QR Code Generator</h2>
          
          {!isLoggedIn ? (
            <div className="bg-rose-50 p-4 rounded-lg text-rose-600 text-center">
              Please log in to generate a QR code
            </div>
          ) : (
            <form onSubmit={handleGenerateQRCode} className="space-y-6 text-black">
              {/* Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">URL or Text</label>
                <input
                  id="data"
                  type="text"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  placeholder="Enter URL or text"
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Style Presets */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Style Presets</label>
                <select
                  onChange={handleStyleChange}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                >
                  {predefinedStyles.map((style) => (
                    <option key={style.name} value={style.name}>
                      {style.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Customization Options */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">QR Color</label>
                  <input
                    type="color"
                    value={style.color}
                    onChange={(e) => setStyle({ ...style, color: e.target.value })}
                    className="w-full h-10 rounded-lg cursor-pointer border border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Background</label>
                  <input
                    type="color"
                    value={style.bgColor}
                    onChange={(e) => setStyle({ ...style, bgColor: e.target.value })}
                    className="w-full h-10 rounded-lg cursor-pointer border border-gray-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Border Style</label>
                <select
                  value={style.border}
                  onChange={(e) => setStyle({ ...style, border: e.target.value })}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                  <option value="none">None</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Border Radius</label>
                <select
                  value={style.borderRadius}
                  onChange={(e) => setStyle({ ...style, borderRadius: e.target.value })}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="0px">Square</option>
                  <option value="8px">Slightly Rounded</option>
                  <option value="12px">Rounded</option>
                  <option value="20px">Very Rounded</option>
                </select>
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                className="w-full bg-violet-600 text-white p-3 rounded-lg hover:bg-violet-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
              >
                Generate QR Code
              </button>
            </form>
          )}
        </div>

        {/* QR Code Display */}
        {qrCode && (
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your QR Code</h3>
            <div
              className="p-4"
              style={{
                border: `${style.border} 4px ${style.borderColor}`,
                borderRadius: style.borderRadius,
                backgroundColor: style.bgColor,
              }}
            >
              <img src={qrCode} alt="Generated QR Code" className="max-w-[300px]" />
            </div>
            <button
              onClick={() => window.open(qrCode, "_blank")}
              className="mt-4 text-violet-600 hover:text-violet-800 font-medium transition-colors duration-200"
            >
              Open in New Tab
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;