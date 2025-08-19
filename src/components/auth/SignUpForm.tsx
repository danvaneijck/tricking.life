// src/components/auth/SignUpForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpWithEmail } from '../../services/authService';
import Input from '../ui/Input';
import Button from '../ui/Button';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await signUpWithEmail(email, password);
            navigate('/'); // Redirect to home page on successful sign up
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email Address
                </label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="mt-1"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                </label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="mt-1"
                />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
                <Button type="submit" isLoading={isLoading}>
                    Create Account
                </Button>
            </div>
        </form>
    );
};

export default SignUpForm;