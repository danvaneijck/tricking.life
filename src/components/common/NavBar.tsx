import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { logout } from '../../services/authService';

const Navbar = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    console.log(currentUser)

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    return (
        <header className="bg-gray-800 text-white shadow-md">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Site Title/Logo */}
                <Link to="/" className="text-2xl font-bold text-sky-400 hover:text-sky-300">
                    Tricking Life
                </Link>

                {/* Navigation Links */}
                <ul className="flex items-center space-x-6">
                    <li>
                        <Link to="/submit-event" className="hover:text-sky-400 transition-colors duration-200">
                            Submit Event
                        </Link>
                    </li>

                    {currentUser ? (
                        <>
                            {/* Optional: Show user email */}
                            <li className="text-gray-300 hidden sm:block">{currentUser.email}</li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="border border-white hover:bg-white hover:text-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup" className="border border-white hover:bg-white hover:text-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;