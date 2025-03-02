// src/components/Header.tsx
"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "../context/UserContext"; // Import useUser
import { LogOutIcon, LogInIcon, UserPlusIcon, QrCodeIcon } from "lucide-react"; // Icons for better UX

const Header = () => {
  const { token, logout } = useUser(); // Get token and logout function from context
  const isLoggedIn = !!token; // Boolean to check if user is logged in (true if token exists)

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
      {/* Logo */}
      <Link href="/">
        <div className="text-xl font-bold tracking-tight cursor-pointer flex items-center space-x-2 transform transition-transform duration-300 hover:scale-105">
          <span className="bg-white text-indigo-600 p-2 rounded-full">QR Code Generator</span>
        </div>
      </Link>

      {/* Navigation Buttons */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <Link href="/qrcode">
              <button className="flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-indigo-200 hover:shadow-md transform hover:-translate-y-0.5">
                <QrCodeIcon className="w-5 h-5" />
                <span>QR Code Generator</span>
              </button>
            </Link>
            <button
              onClick={() => {
                logout(); // Clear the token
                window.location.href = "/login"; // Redirect to login page
              }}
              className="flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-indigo-200 hover:shadow-md transform hover:-translate-y-0.5"
            >
              <LogOutIcon className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-indigo-200 hover:shadow-md transform hover:-translate-y-0.5">
                <LogInIcon className="w-5 h-5" />
                <span>Login</span>
              </button>
            </Link>
            <Link href="/signup">
              <button className="flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-indigo-200 hover:shadow-md transform hover:-translate-y-0.5">
                <UserPlusIcon className="w-5 h-5" />
                <span>Sign Up</span>
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;