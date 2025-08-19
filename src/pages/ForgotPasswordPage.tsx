// src/pages/ForgotPasswordPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { passwordReset } from '../services/authService';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsLoading(true);

        try {
            await passwordReset(email);
            setMessage('Check your email for a link to reset your password.');
        } catch (err) {
            setError('Failed to send password reset email. Please check the address and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Reset Your Password</h1>
                    <p className="mt-2 text-gray-400">
                        Enter your email and we'll send you a reset link.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                    {message && <p className="text-green-400 text-sm">{message}</p>}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button type="submit" isLoading={isLoading}>
                        Send Reset Link
                    </Button>
                </form>
                <div className="text-sm text-center">
                    <Link to="/login" className="font-medium text-sky-400 hover:text-sky-300">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;