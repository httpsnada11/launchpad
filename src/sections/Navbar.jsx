import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black py-4 px-8 border-b border-white/10">
            <div className="max-w-7xl mx-auto flex justify-center items-center">
                <Link to="/" className="cursor-pointer">
                    <img
                        loading="lazy"
                        src="/assets/images/avif/Copym-01-1.avif"
                        alt="COPYM"
                        className="h-16 w-auto object-contain"
                    />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
