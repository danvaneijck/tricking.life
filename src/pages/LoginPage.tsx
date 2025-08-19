// src/pages/LoginPage.tsx
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import GoogleSignInButton from '../components/auth/GoogleSignInButton';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

const LoginPage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    if (currentUser) {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Log in to your Account</h1>
                    <p className="mt-2 text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-medium text-sky-400 hover:text-sky-300">
                            Sign up
                        </Link>
                    </p>
                </div>
                <LoginForm />

                <div className="flex items-center justify-center">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="mx-4 text-gray-400">OR</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                </div>

                <GoogleSignInButton />
            </div>
        </div>
    );
};

export default LoginPage;