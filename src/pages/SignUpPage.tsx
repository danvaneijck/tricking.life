// src/pages/SignUpPage.tsx
import { Link } from 'react-router-dom';
import SignUpForm from '../components/auth/SignUpForm';

const SignUpPage = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Create an Account</h1>
                    <p className="mt-2 text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-sky-400 hover:text-sky-300">
                            Log in
                        </Link>
                    </p>
                </div>
                <SignUpForm />
            </div>
        </div>
    );
};

export default SignUpPage;