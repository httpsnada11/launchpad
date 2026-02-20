import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, Github, Send } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative bg-black text-white overflow-hidden pb-12 sm:pb-20">
            {/* Atmospheric glow */}
            <div className="pointer-events-none absolute inset-0 text-white">
                <div className="absolute inset-0 bg-black" />
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 pt-16 sm:pt-20 md:pt-24 lg:pt-32">
                {/* Desktop Layout (Large Screens) */}
                <div className="hidden lg:grid grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr_1.8fr] gap-x-12 items-start">
                    {/* Left Side - Logo, Description */}
                    <div className="flex flex-col">
                        <div className="flex items-center mb-0">
                            <img
                                loading="lazy"
                                src="/assets/images/avif/Copym-01-1.avif"
                                alt="COPYM"
                                className="h-20 w-auto object-contain"
                            />
                        </div>
                        <p className="text-white text-base leading-relaxed translate-x-1 -mt-2 mb-2.5" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                            Investing for outliers. Build wealth with<br />
                            our modern entitlement platform designed<br />
                            for the next generation.
                        </p>
                        {/* Social Media Icons */}
                        <div className="flex gap-5 mt-2 ml-1">
                            <a href="#" className="text-white hover:text-[#15a36e] transition-colors duration-300"><Twitter size={20} /></a>
                            <a href="#" className="text-white hover:text-[#15a36e] transition-colors duration-300"><Linkedin size={20} /></a>
                            <a href="#" className="text-white hover:text-[#15a36e] transition-colors duration-300"><Instagram size={20} /></a>
                            <a href="#" className="text-white hover:text-[#15a36e] transition-colors duration-300"><Github size={20} /></a>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div className="flex flex-col mt-5">
                        <div className="relative w-fit mb-3">
                            <h3 className="uppercase tracking-wide text-sm text-[#15a36e] font-semibold pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                PRODUCT
                            </h3>
                            <div className="absolute bottom-0 left-0 bg-[#15a36e]" style={{ width: '100%', height: '1px' }}></div>
                        </div>
                        <ul className="space-y-2">
                            {['Carbon Credits', 'Real Estate', 'Commodities', 'Arts', 'Sports'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to="/marketplace"
                                        className="text-white hover:text-[#15a36e] text-base transition-colors duration-300"
                                        style={{ fontFamily: 'Palanquin, sans-serif' }}
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className="flex flex-col mt-5">
                        <div className="relative w-fit mb-3">
                            <h3 className="uppercase tracking-wide text-sm text-[#15a36e] font-semibold pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                COMPANY
                            </h3>
                            <div className="absolute bottom-0 left-0 bg-[#15a36e]" style={{ width: '100%', height: '1px' }}></div>
                        </div>
                        <ul className="space-y-2">
                            {[
                                { name: 'About', path: '/about' },
                                { name: 'How it Works', path: '/how-it-works' },
                                { name: 'Marketplace', path: '/marketplace' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className="text-white hover:text-[#15a36e] text-base transition-colors duration-300"
                                        style={{ fontFamily: 'Palanquin, sans-serif' }}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="flex flex-col mt-5">
                        <div className="relative w-fit mb-3">
                            <h3 className="uppercase tracking-wide text-sm text-[#15a36e] font-semibold pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                SUPPORT
                            </h3>
                            <div className="absolute bottom-0 left-0 bg-[#15a36e]" style={{ width: '100%', height: '1px' }}></div>
                        </div>
                        <ul className="space-y-2">
                            {[
                                { name: 'Terms & Support', path: '/terms' },
                                { name: 'Privacy', path: '/privacy' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className="text-white hover:text-[#15a36e] text-base transition-colors duration-300"
                                        style={{ fontFamily: 'Palanquin, sans-serif' }}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="flex flex-col space-y-3 mt-5">
                        <div>
                            <div className="relative w-fit mb-3">
                                <h3 className="uppercase tracking-wide text-sm text-[#15a36e] font-semibold pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                    JOIN OUR NEWS LETTER
                                </h3>
                                <div className="absolute bottom-0 left-0 bg-[#15a36e]" style={{ width: '100%', height: '1px' }}></div>
                            </div>
                            <p className="mt-2.5 text-base text-white leading-relaxed whitespace-nowrap" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                To know more subscribe to our newsletter
                            </p>
                        </div>
                        <form className="space-y-2">
                            <div
                                className="flex items-center overflow-hidden w-full max-w-[360px]"
                                style={{
                                    height: '36px',
                                    background: '#ffffff',
                                    borderRadius: '18px',
                                }}
                            >
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your E-Mail Address"
                                    className="flex-1 h-full focus:outline-none rounded-l-[18px] placeholder:text-gray-400"
                                    style={{
                                        paddingLeft: '12px',
                                        paddingRight: '8px',
                                        color: '#000000',
                                        fontSize: '12px',
                                        background: 'transparent',
                                        fontFamily: 'Palanquin, sans-serif',
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="h-full flex items-center justify-center hover:opacity-90 transition rounded-r-[18px] whitespace-nowrap px-4 min-w-[100px]"
                                    style={{
                                        background: '#15a36e',
                                        color: '#ffffff',
                                        fontFamily: 'Palanquin, sans-serif',
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: '12px',
                                            fontWeight: 600,
                                        }}
                                    >
                                        Subscribe
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Mobile & Tablet Layout (<Large Screens) */}
                <div className="lg:hidden space-y-12 text-left">
                    {/* Logo and Tagline */}
                    <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <img
                                loading="lazy"
                                src="/assets/images/avif/Copym-01-1.avif"
                                alt="COPYM"
                                className="h-16 w-auto object-contain"
                            />
                        </div>
                        <p className="text-white text-sm sm:text-base leading-relaxed mb-6" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                            Investing for outliers. Build wealth with our modern entitlement platform designed for the next generation.
                        </p>
                        {/* Social Media Icons */}
                        <div className="flex gap-5 mb-8">
                            <a href="#" className="text-white hover:text-[#15a36e] transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-white hover:text-[#15a36e] transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="text-white hover:text-[#15a36e] transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-white hover:text-[#15a36e] transition-colors"><Github size={20} /></a>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 sm:gap-8">
                        {/* Product Links */}
                        <div>
                            <div className="relative w-fit mb-4 text-left">
                                <h3 className="uppercase tracking-wide text-[10px] sm:text-xs text-[#15a36e] font-semibold pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                    PRODUCT
                                </h3>
                                <div className="absolute bottom-0 left-0 bg-[#15a36e]" style={{ width: '100%', height: '1px' }}></div>
                            </div>
                            <ul className="space-y-2">
                                {['Carbon Credits', 'Real Estate', 'Commodities'].map((item) => (
                                    <li key={item}>
                                        <Link to="/marketplace" className="text-white text-[10px] sm:text-sm hover:text-[#15a36e] transition-colors" style={{ fontFamily: 'Palanquin, sans-serif' }}>{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Company Links */}
                        <div>
                            <div className="relative w-fit mb-4 text-left">
                                <h3 className="uppercase tracking-wide text-[10px] sm:text-xs text-[#15a36e] font-semibold pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                    COMPANY
                                </h3>
                                <div className="absolute bottom-0 left-0 bg-[#15a36e]" style={{ width: '100%', height: '1px' }}></div>
                            </div>
                            <ul className="space-y-2">
                                {['About', 'How it Works', 'Marketplace'].map((item) => (
                                    <li key={item}>
                                        <Link to={item === 'Marketplace' ? '/marketplace' : `/${item.toLowerCase().replace(/ /g, '-')}`} className="text-white text-[10px] sm:text-sm hover:text-[#15a36e] transition-colors" style={{ fontFamily: 'Palanquin, sans-serif' }}>{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Support Links */}
                        <div>
                            <div className="relative w-fit mb-4 text-left">
                                <h3 className="uppercase tracking-wide text-[10px] sm:text-xs text-[#15a36e] font-semibold pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                    SUPPORT
                                </h3>
                                <div className="absolute bottom-0 left-0 bg-[#15a36e]" style={{ width: '100%', height: '1px' }}></div>
                            </div>
                            <ul className="space-y-2">
                                {['Terms & Support', 'Privacy'].map((item) => (
                                    <li key={item}>
                                        <Link to={item === 'Privacy' ? '/privacy' : '/terms'} className="text-white text-[10px] sm:text-sm hover:text-[#15a36e] transition-colors" style={{ fontFamily: 'Palanquin, sans-serif' }}>{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="relative w-fit mb-4 text-left">
                            <h3 className="uppercase tracking-wide text-xs sm:text-sm text-[#15a36e] font-semibold pb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                JOIN OUR NEWS LETTER
                            </h3>
                            <div className="absolute bottom-0 left-0 bg-[#15a36e]" style={{ width: '100%', height: '1px' }}></div>
                        </div>
                        <p className="mt-2 text-sm text-white leading-relaxed mb-4" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                            To know more subscribe to our newsletter
                        </p>
                        <form className="w-full max-w-[400px]">
                            <div
                                className="flex items-center overflow-hidden w-full h-10 bg-white rounded-full"
                            >
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your E-Mail Address"
                                    className="flex-1 px-4 text-sm text-black focus:outline-none placeholder:text-gray-400 bg-transparent"
                                    style={{ fontFamily: 'Palanquin, sans-serif' }}
                                />
                                <button
                                    type="submit"
                                    className="h-full bg-[#15a36e] text-white px-6 text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity"
                                    style={{ fontFamily: 'Palanquin, sans-serif' }}
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Copyright and Disclaimer Section */}
                <div className="mt-20 sm:mt-32 pt-12 border-t border-white/10 space-y-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <p className="text-gray-400 text-sm sm:text-base text-left" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                            &copy; 2026 COPYM. All rights reserved.
                        </p>
                    </div>
                    <p className="text-gray-400 text-[10px] sm:text-xs text-left max-w-5xl leading-relaxed text-justify" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                        Copym is not a registered broker-dealer, funding portal, underwriter, entitlement bank, entitlement adviser, or entitlement manager. Copym does not provide brokerage services, entitlement banking services, underwriting services, entitlement recommendations, or entitlement advice to any person. Copym does not participate in the negotiation or execution of secondary market transactions for the purchase or sale of securities. Copym does not, at any time, have possession or control of investor funds or securities in connection with such transactions. Copym operates as a technology platform focused on distributed ledger technology to improve efficiency, accessibility, and transparency in financial technologies and T & C apply.
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
