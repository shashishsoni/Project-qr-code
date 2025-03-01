// src/components/Header.tsx
"use client"; // Add this line to mark the component as a client component
import React from 'react';
import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="text-lg font-bold cursor-pointer" onClick={() => window.location.href = '/'}>
                MyAppLogo
            </div>
            <div>
                <Link href="/login">
                    <button className="bg-white text-blue-600 px-4 py-2 rounded mr-2 hover:bg-gray-200">
                        Login
                    </button>
                </Link>
                <Link href="/signup">
                    <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">
                        Sign Up
                    </button>
                </Link>
            </div>
        </header>
    );
};

export default Header;