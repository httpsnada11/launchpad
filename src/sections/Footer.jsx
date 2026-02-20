import React from 'react';

export default function Footer() {
    return (
        <footer className="relative bg-black text-white overflow-hidden pb-12 pt-20">
            {/* Atmospheric glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-black" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-10">
                    <img
                        loading="lazy"
                        src="/assets/images/avif/Copym-01-1.avif"
                        alt="COPYM"
                        className="h-14 w-auto object-contain"
                    />
                </div>

                {/* Links Section */}
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10 text-[15px] font-medium tracking-wide">
                    {['About', 'How it Works', 'Marketplace', 'Support', 'Terms', 'Privacy'].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="text-gray-400 hover:text-[#15a36e] transition-colors duration-300"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* Copyright Section */}
                <div className="text-[13px] text-gray-500 font-medium tracking-wider" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                    © 2026 COPYM. ALL RIGHTS RESERVED.
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
