// src/components/Header.tsx
"use client"; // Add this line to mark the component as a client component
import React from 'react';
import Link from 'next/link';
import { useUser } from '../context/UserContext'; // Import useUser

const Header = () => {
    const { isLoggedIn, logout } = useUser(); // Get login status and logout function

    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="text-lg font-bold cursor-pointer" onClick={() => window.location.href = '/'}>
                MyAppLogo
            </div>
            <div>
                {isLoggedIn ? (
                    <>
                        <Link href="/qrcode">
                            <button className="bg-white text-blue-600 px-4 py-2 rounded mr-2 hover:bg-gray-200">
                                QR Code Generator
                            </button>
                        </Link>
                        <button 
                            onClick={() => {
                                logout(); // Call logout function
                                window.location.href = '/login'; // Redirect to login
                            }}
                            className="bg-white text-blue-600 px-4 py-2 rounded mr-2 hover:bg-gray-200"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login">
                            <button className="bg-white text-blue-600 px-4 py-2 rounded mr-2 hover:bg-gray-200">
                                Login
                            </button>
                        </Link>
                        <Link href="/signup">
                            <button className="bg-white text-blue-600 px-4 py-2 rounded mr-2 hover:bg-gray-200">
                                Sign Up
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;