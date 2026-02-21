import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 py-4 px-8">
            <div className="max-w-7xl mx-auto flex justify-center items-center">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 group cursor-pointer"
                >
                    {/* Logo Icon */}
                    <div className="w-8 h-8 relative group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute inset-0 bg-white/20 blur-lg rounded-full animate-pulse group-hover:bg-white/40 transition-colors"></div>
                        <div className="relative w-full h-full bg-white rounded-lg rotate-12 flex items-center justify-center p-1 shadow-2xl border border-white/20">
                            <span className="text-black text-xl font-black italic tracking-tighter">C</span>
                        </div>
                    </div>

                    {/* Logo Text */}
                    <span className="text-white text-2xl font-black tracking-tighter uppercase font-palanquin">
                        Copy<span className="text-gray-400">m</span>
                    </span>
                </motion.div>
            </div>
        </nav>
    );
};

export default Navbar;
