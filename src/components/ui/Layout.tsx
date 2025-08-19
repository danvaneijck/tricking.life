// src/components/ui/Layout.tsx

import React from 'react';
import Navbar from '../common/NavBar';
import Footer from '../common/Footer';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <Navbar />
            <main className="flex-grow container mx-auto px-6 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;