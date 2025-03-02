"use client"
import { useState, useEffect } from "react"
import type React from "react"
import Image from "next/image"

import axios, { isAxiosError } from "axios"
import { useUser } from "../../context/UserContext"
import { Download, Copy, ExternalLink, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface StyleOptions {
  name: string
  border: string
  color: string
  size: number
  margin: number
  errorCorrectionLevel: "L" | "M" | "Q" | "H"
  bgColor: string
  borderRadius: string
  borderColor: string
}

const predefinedStyles: StyleOptions[] = [
  {
    name: "Default",
    border: "solid",
    color: "#000000",
    size: 256,
    margin: 2,
    errorCorrectionLevel: "L",
    bgColor: "#ffffff",
    borderRadius: "0px",
    borderColor: "#e5e7eb",
  },
  {
    name: "Rounded",
    border: "dashed",
    color: "#8b5cf6",
    size: 256,
    margin: 4,
    errorCorrectionLevel: "M",
    bgColor: "#f9fafb",
    borderRadius: "12px",
    borderColor: "#d1d5db",
  },
  {
    name: "Bold",
    border: "solid",
    color: "#ec4899",
    size: 300,
    margin: 2,
    errorCorrectionLevel: "Q",
    bgColor: "#ffffff",
    borderRadius: "8px",
    borderColor: "#9ca3af",
  },
  {
    name: "Minimal",
    border: "none",
    color: "#10b981",
    size: 256,
    margin: 2,
    errorCorrectionLevel: "H",
    bgColor: "#f3f4f6",
    borderRadius: "0px",
    borderColor: "transparent",
  },
  {
    name: "Dark Mode",
    border: "solid",
    color: "#ffffff",
    size: 280,
    margin: 3,
    errorCorrectionLevel: "Q",
    bgColor: "#1f2937",
    borderRadius: "16px",
    borderColor: "#4b5563",
  },
  {
    name: "Gradient",
    border: "solid",
    color: "#6366f1",
    size: 256,
    margin: 2,
    errorCorrectionLevel: "M",
    bgColor: "#ffffff",
    borderRadius: "8px",
    borderColor: "#c7d2fe",
  },
]

const QRCodeGenerator = () => {
  const { token } = useUser()
  const [data, setData] = useState<string>("")
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [style, setStyle] = useState<StyleOptions>(predefinedStyles[0])
  const [error, setError] = useState<string | null>(null)
  const [qrColor, setQrColor] = useState<string>(style.color)
  const [background, setBackground] = useState<string>(style.bgColor)
  const [borderType, setBorderType] = useState<string>(style.border)
  const [borderRadius, setBorderRadius] = useState<string>(style.borderRadius)
  const [borderColor, setBorderColor] = useState<string>(style.borderColor)
  const [size, setSize] = useState<number>(style.size)
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">(style.errorCorrectionLevel)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [recentQRCodes, setRecentQRCodes] = useState<string[]>([])

  // Load recent QR codes from localStorage on component mount
  useEffect(() => {
    const savedCodes = localStorage.getItem("recentQRCodes")
    if (savedCodes) {
      setRecentQRCodes(JSON.parse(savedCodes))
    }
  }, [])

  // Save recent QR codes to localStorage when they change
  useEffect(() => {
    if (recentQRCodes.length > 0) {
      localStorage.setItem("recentQRCodes", JSON.stringify(recentQRCodes))
    }
  }, [recentQRCodes])

  const handleGenerateQRCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!data.trim()) {
      setError("Please enter a URL or text")
      return
    }

    if (!token) {
      setError("You must be logged in to generate a QR code")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/qrcode`,
        {
          data,
          style: {
            size,
            color: qrColor,
            bgColor: background,
            border: borderType,
            borderRadius,
            borderColor,
            errorCorrectionLevel: errorLevel,
            margin: style.margin,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const newQrCode = response.data.qrCode
      setQrCode(newQrCode)

      // Add to recent QR codes (avoid duplicates)
      if (!recentQRCodes.includes(newQrCode)) {
        setRecentQRCodes((prev) => [newQrCode, ...prev].slice(0, 5))
      }

      toast.success("QR code generated successfully!")
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error("Error generating QR Code:", error.response?.data || error.message)
        setError(error.response?.data?.message || "Failed to generate QR code")
      } else {
        console.error("Unexpected error:", error)
        setError("An unexpected error occurred")
      }
      toast.error("Failed to generate QR code")
    } finally {
      setIsLoading(false)
    }
  }

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStyle = predefinedStyles.find((s) => s.name === e.target.value)
    if (selectedStyle) {
      setStyle(selectedStyle)
      setQrColor(selectedStyle.color)
      setBackground(selectedStyle.bgColor)
      setBorderType(selectedStyle.border)
      setBorderRadius(selectedStyle.borderRadius)
      setBorderColor(selectedStyle.borderColor)
      setSize(selectedStyle.size)
      setErrorLevel(selectedStyle.errorCorrectionLevel)
    }
  }

  const downloadQRCode = () => {
    if (!qrCode) return

    const link = document.createElement("a")
    link.href = qrCode
    link.download = `qrcode-${new Date().getTime()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("QR code downloaded!")
  }

  const copyQRCodeURL = () => {
    if (!qrCode) return

    navigator.clipboard
      .writeText(qrCode)
      .then(() => toast.success("QR code URL copied to clipboard!"))
      .catch(() => toast.error("Failed to copy URL"))
  }

  const loadRecentQRCode = (url: string) => {
    setQrCode(url)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 flex-1">
          {token ? (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">QR Code Generator</h2>
              {error && <div className="bg-red-50 p-4 rounded-lg text-red-600 text-center mb-4">{error}</div>}
              <form onSubmit={handleGenerateQRCode} className="space-y-4">
                <div>
                  <label htmlFor="data" className="text-sm font-medium text-gray-700 block mb-1">
                    URL or Text
                  </label>
                  <input
                    id="data"
                    type="text"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    placeholder="Enter URL or text"
                    className="text-black w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="style" className="text-sm font-medium text-gray-700 block mb-1">
                      Style Presets
                    </label>
                    <select
                      id="style"
                      onChange={handleStyleChange}
                      className="text-black w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                    >
                      {predefinedStyles.map((style) => (
                        <option key={style.name} value={style.name}>
                          {style.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="size" className="text-sm font-medium text-gray-700 block mb-1">
                      QR Code Size
                    </label>
                    <input
                      id="size"
                      type="range"
                      value={size}
                      onChange={(e) => setSize(Number(e.target.value))}
                      min="128"
                      max="512"
                      step="8"
                      className="w-full h-10 rounded-lg cursor-pointer"
                    />
                    <div className="text-xs text-gray-500 text-right">{size}px</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="qrColor" className="text-sm font-medium text-gray-700 block mb-1">
                      QR Color
                    </label>
                    <div className="flex items-center">
                      <input
                        id="qrColor"
                        type="color"
                        value={qrColor}
                        onChange={(e) => setQrColor(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer border border-gray-200 mr-2"
                      />
                      <input
                        type="text"
                        value={qrColor}
                        onChange={(e) => setQrColor(e.target.value)}
                        className="flex-1 p-2 text-sm border border-gray-200 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bgColor" className="text-sm font-medium text-gray-700 block mb-1">
                      Background Color
                    </label>
                    <div className="flex items-center">
                      <input
                        id="bgColor"
                        type="color"
                        value={background}
                        onChange={(e) => setBackground(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer border border-gray-200 mr-2"
                      />
                      <input
                        type="text"
                        value={background}
                        onChange={(e) => setBackground(e.target.value)}
                        className="flex-1 p-2 text-sm border border-gray-200 rounded"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="borderType" className="text-sm font-medium text-gray-700 block mb-1">
                      Border Type
                    </label>
                    <select
                      id="borderType"
                      value={borderType}
                      onChange={(e) => setBorderType(e.target.value)}
                      className="text-black w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="solid">Solid</option>
                      <option value="dashed">Dashed</option>
                      <option value="dotted">Dotted</option>
                      <option value="double">Double</option>
                      <option value="none">None</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="borderRadius" className="text-sm font-medium text-gray-700 block mb-1">
                      Border Radius
                    </label>
                    <select
                      id="borderRadius"
                      value={borderRadius}
                      onChange={(e) => setBorderRadius(e.target.value)}
                      className="text-black w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="0px">Square</option>
                      <option value="8px">Slightly Rounded</option>
                      <option value="16px">Rounded</option>
                      <option value="24px">Very Rounded</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="borderColor" className="text-sm font-medium text-gray-700 block mb-1">
                      Border Color
                    </label>
                    <div className="flex items-center">
                      <input
                        id="borderColor"
                        type="color"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer border border-gray-200 mr-2"
                      />
                      <input
                        type="text"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="flex-1 p-2 text-sm border border-gray-200 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="errorLevel" className="text-sm font-medium text-gray-700 block mb-1">
                      Error Correction Level
                    </label>
                    <select
                      id="errorLevel"
                      value={errorLevel}
                      onChange={(e) => setErrorLevel(e.target.value as "L" | "M" | "Q" | "H")}
                      className="text-black w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="L">Low (7%)</option>
                      <option value="M">Medium (15%)</option>
                      <option value="Q">Quartile (25%)</option>
                      <option value="H">High (30%)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-violet-600 text-white p-3 rounded-lg hover:bg-violet-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate QR Code"
                  )}
                </button>
              </form>

              {recentQRCodes.length > 0 && !qrCode && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Recent QR Codes</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {recentQRCodes.map((url, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-2 cursor-pointer hover:border-violet-300 transition-all"
                        onClick={() => loadRecentQRCode(url)}
                      >
                        <Image src={url || "/placeholder.svg"} alt={`Recent QR Code ${index + 1}`} className="w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
              <p className="text-gray-700 mb-6">Please log in to access the QR Code Generator.</p>
              <button
                className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                onClick={() => (window.location.href = "/login")}
              >
                Log In
              </button>
            </div>
          )}
        </div>

        {qrCode && (
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center lg:w-1/3">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your QR Code</h3>
            <div
              className="relative"
              style={{
                border: borderType !== "none" ? `2px ${borderType} ${borderColor}` : "none",
                borderRadius: borderRadius,
                padding: "12px",
                backgroundColor: background,
                maxWidth: `${size}px`,
                maxHeight: `${size}px`,
              }}
            >
              <Image
                src={qrCode || "/placeholder.svg"}
                alt="Generated QR Code"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-wrap gap-2 mt-6 justify-center">
              <button
                onClick={downloadQRCode}
                className="flex items-center gap-1 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                Download
              </button>

              <button
                onClick={copyQRCodeURL}
                className="flex items-center gap-1 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-200"
              >
                <Copy className="w-4 h-4" />
                Copy URL
              </button>

              <button
                onClick={() => window.open(qrCode, "_blank")}
                className="flex items-center gap-1 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                Open
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p>Scan with any QR code reader</p>
              <p className="mt-1 text-center break-all">{data}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QRCodeGenerator

