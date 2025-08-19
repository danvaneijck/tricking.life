import { useState } from 'react'; // 1. Import useState
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { logout } from '../../services/authService';
import logo from "../../assets/logo.png";

const Navbar = () => {
    const { currentUser, userProfile } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // 2. State to manage menu visibility

    const handleLogout = async () => {
        try {
            await logout();
            setIsMenuOpen(false); // Close menu on logout
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    // 3. To avoid duplicating links, we define them in a variable
    const navLinks = (
        <>
            <li>
                <Link to="/submit-event" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:text-sky-400">
                    Submit Event
                </Link>
            </li>

            {currentUser ? (
                <>
                    {userProfile?.role === 'admin' && (
                        <li>
                            <Link to="/admin/dashboard" onClick={() => setIsMenuOpen(false)} className="block py-2 font-bold text-yellow-400 hover:text-yellow-300">
                                Admin
                            </Link>
                        </li>
                    )}
                    <li className="py-2 text-gray-300 hidden sm:block">{currentUser.email}</li>
                    <li>
                        <button onClick={handleLogout} className="w-full text-left py-2 border border-white hover:bg-white hover:text-gray-800 font-bold px-4 rounded transition-colors duration-200">
                            Logout
                        </button>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-4 rounded transition-colors duration-200">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block py-2 border border-white hover:bg-white hover:text-gray-800 font-bold px-4 rounded transition-colors duration-200">
                            Sign Up
                        </Link>
                    </li>
                </>
            )}
        </>
    );

    return (
        <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Site Title/Logo */}
                <Link to="/" className="text-2xl flex items-center font-bold hover:text-sky-300">
                    <img src={logo} className='w-18 rounded-md mr-4' alt="Tricking Life Logo" />
                    <div className='hidden md:block'>tricking.life</div>
                </Link>

                {/* 4. Desktop Navigation Links (hidden on mobile) */}
                <ul className="hidden md:flex items-center space-x-6">
                    {navLinks}
                </ul>

                {/* 5. Mobile Burger Menu Button (hidden on desktop) */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </nav>

            {/* 6. Mobile Slide-out Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                style={{ zIndex: 1000 }} // Ensure menu is on top
            >
                <div className="p-6">
                    <button onClick={() => setIsMenuOpen(false)} className="float-right mb-4" aria-label="Close menu">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <ul className="mt-12 space-y-4">
                        {navLinks}
                    </ul>
                </div>
            </div>

            {/* 7. Overlay for when the menu is open */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ zIndex: 999 }} // Below menu, above content
                ></div>
            )}
        </header>
    );
};

export default Navbar;