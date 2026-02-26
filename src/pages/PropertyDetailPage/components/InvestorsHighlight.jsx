import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const InvestorsHighlight = () => {
    return (
        <div className="bg-black rounded-3xl overflow-hidden relative border border-white/10 my-8">
            <div className="flex flex-col md:flex-row items-center">
                {/* Text Content */}
                <div className="flex-1 p-8 md:p-14 z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Investors
                    </h2>
                    <p className="text-gray-400 text-lg mb-8 font-medium">
                        Access curated RWA opportunities worldwide.
                    </p>

                    <ul className="space-y-4 mb-10">
                        {['Fractional tickets', 'Zero-gas trades & instant settlement', 'Portfolio dashboards and automated income reinvestment'].map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                <span className="text-white text-base font-medium leading-relaxed">
                                    {benefit}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <button className="flex items-center gap-3 px-8 py-3.5 bg-transparent border-2 border-white/20 hover:border-emerald-500 rounded-full transition-all group active:scale-95">
                        <span className="text-white font-bold">Learn More</span>
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                            <ArrowRight size={18} className="text-black group-hover:text-white transition-colors" />
                        </div>
                    </button>
                </div>

                {/* 3D Graphic Content */}
                <div className="flex-1 relative w-full h-[300px] md:h-[500px] overflow-hidden">
                    <img
                        src="/investors_highlight_graphic.png"
                        alt="Investors Highlight"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                    {/* Artistic gradient overlays for seamless integration */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black via-black/20 to-transparent hidden md:block" />
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black opacity-60 hidden md:block" />
                </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-emerald-600/5 blur-[120px] -translate-y-1/2 -ml-32 pointer-events-none" />
        </div>
    );
};

export default InvestorsHighlight;
