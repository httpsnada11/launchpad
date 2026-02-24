import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md py-3 px-8 border-b border-white/10">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="cursor-pointer">
                    <img
                        loading="lazy"
                        src="/assets/images/avif/Copym-01-1.avif"
                        alt="COPYM"
                        className="h-10 w-auto object-contain"
                    />
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/login" className="text-white font-semibold text-sm hover:text-green-400 transition-colors">
                        Login
                    </Link>
                    <Link to="/signup" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all hover:scale-105 active:scale-95">
                        Signup
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
