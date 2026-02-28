import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="relative bg-black text-white overflow-hidden pb-12 pt-20">
            {/* Atmospheric glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-black" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 mb-4 md:mb-0">
                        <img
                            loading="lazy"
                            src="/assets/images/avif/Copym-01-1.avif"
                            alt="COPYM"
                            className="h-16 md:h-20 w-auto object-contain"
                        />
                    </div>

                    {/* Links Section */}
                    <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 text-[15px] font-medium tracking-wide">
                        <Link to="/about" className="text-gray-400 hover:text-[#15a36e] transition-colors duration-300">About</Link>
                        <Link to="/how-it-works" className="text-gray-400 hover:text-[#15a36e] transition-colors duration-300">How it Works</Link>
                        <Link to="/marketplace" className="text-gray-400 hover:text-[#15a36e] transition-colors duration-300">Marketplace</Link>
                        <Link to="/terms" className="text-gray-400 hover:text-[#15a36e] transition-colors duration-300">Terms & Support</Link>
                        <Link to="/privacy" className="text-gray-400 hover:text-[#15a36e] transition-colors duration-300">Privacy</Link>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-12 pt-8 border-t border-white/5 text-center">
                    <p className="text-[12px] text-gray-500 font-medium tracking-[0.15em]">
                        © 2026 COPYM. ALL RIGHTS RESERVED.
                    </p>
                </div>
            </div>

            {/* Right Side Ellipse Gradient - Absolute positioned */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute right-0 bottom-0 w-[120%] sm:w-[90%] md:w-[80%] lg:w-[60%] translate-x-[20%] translate-y-[20%] opacity-40 md:opacity-60 mix-blend-screen overflow-hidden">
                    <img
                        src="/assets/images/avif/Ellipse.avif"
                        alt=""
                        className="w-full h-full object-contain scale-125 origin-bottom-right"
                    />
                </div>
            </div>
        </footer>
    );
}
