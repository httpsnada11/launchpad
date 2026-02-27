import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show navbar at the very top, otherwise hide on scroll down
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: '-100%' },
            }}
            animate={hidden ? 'hidden' : 'visible'}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed top-0 left-0 w-full z-[100] bg-black/80 backdrop-blur-md py-3 px-8 border-b border-white/10"
        >
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
        </motion.nav>
    );
};

export default Navbar;
