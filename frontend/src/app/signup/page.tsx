// src/app/signup/page.tsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signupUser } from '../../utils/api'; // Import the signup function

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await signupUser({ firstName, lastName, email, password });
            alert(response.message); // Show success message
            router.push('/'); // Redirect to home or another page
        } catch (error: any) {
            setError(error.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <form onSubmit={handleSignup} className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">Create an Account</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
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
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;