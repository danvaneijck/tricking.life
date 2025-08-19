// src/components/common/Footer.tsx

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-gray-400 mt-auto">
            <div className="container mx-auto px-6 py-4 text-center">
                <p>&copy; {currentYear} Tricking.Life All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;