// src/app/login.tsx    
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock authentication logic        
        if (username === 'user' && password === 'password') {
            alert('Login successful!');
            router.push('/');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleLogin} className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-200">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;