import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { getLenis } from '../../../App';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Wallet, TrendingUp } from 'lucide-react';

export default function HowItWorksModal({ isOpen, onClose }) {
    const steps = [
        {
            icon: FileText,
            title: "Acquire your share of the property",
            description: "Browse through our curated properties and buy tokens representing fractional ownership. Each token is secured on the blockchain.",
            action: "ACCESS OWNERSHIP RECORDS"
        },
        {
            icon: Wallet,
            title: "Receive consistent monthly yields",
            description: "Our properties are managed professionally. You receive your share of the rental income directly in your wallet every month.",
            action: "HANDS-OFF PROPERTY MANAGEMENT"
        },
        {
            icon: TrendingUp,
            title: "Grow your capital over time",
            description: "benefit from the real estate market growth. Your tokens appreciate in value as the property market value increases.",
            action: "PROFIT FROM ASSET APPRECIATION"
        }
    ];

    const scrollRef = useRef(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        const lenis = getLenis();
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            if (lenis) lenis.stop();
        } else {
            document.body.style.overflow = 'unset';
            if (lenis) lenis.start();
        }
        return () => {
            document.body.style.overflow = 'unset';
            if (lenis) lenis.start();
        };
    }, [isOpen]);

    // Local smooth scroll (Lenis) for modal
    useEffect(() => {
        if (!isOpen || !scrollRef.current) return;

        const localLenis = new Lenis({
            wrapper: scrollRef.current,
            content: scrollRef.current.querySelector('.lenis-content') || scrollRef.current,
            smoothWheel: true,
            duration: 1.2,
        });

        function raf(time) {
            localLenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            localLenis.destroy();
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div ref={scrollRef} className="fixed inset-0 z-[200] overflow-y-auto flex justify-center p-4 md:p-12">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-5xl bg-[#0a0a0b] rounded-2xl border border-white/10 shadow-2xl my-auto"
                    >
                        {/* 3D Background Overlay */}
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                            <img
                                src="/assets/images/how-it-works-bg.png"
                                alt="Abstract Background"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-transparent to-[#0a0a0b]" />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row min-h-[400px]">
                            {/* Vertical Title Sidebar */}
                            <div className="w-full md:w-24 bg-black flex items-center justify-center p-8 md:p-0 border-b md:border-b-0 md:border-r border-white/10 shrink-0">
                                <h2 className="text-white font-extrabold text-2xl md:text-3xl uppercase tracking-[0.3em] md:[writing-mode:vertical-lr] md:rotate-180 whitespace-nowrap">
                                    HOW IT WORKS
                                </h2>
                            </div>

                            {/* Steps Grid */}
                            <div className="flex-1 p-8 md:p-12">
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                                    {steps.map((step, index) => (
                                        <div key={index} className="bg-white/[0.03] border border-white/5 rounded-xl p-6 flex flex-col h-full hover:bg-white/[0.05] transition-all hover:-translate-y-1">
                                            <div className="bg-white/5 w-10 h-10 rounded-lg flex items-center justify-center mb-6">
                                                <step.icon size={20} className="text-white" />
                                            </div>
                                            <h3 className="text-white font-bold text-lg leading-tight mb-4">
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm leading-relaxed mb-auto pb-8">
                                                {step.description}
                                            </p>
                                            <div className="flex items-center justify-between text-[10px] font-extrabold text-white/40 uppercase tracking-widest border-t border-white/5 pt-4">
                                                <span>{step.action}</span>
                                                <TrendingUp size={12} className="opacity-50" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
