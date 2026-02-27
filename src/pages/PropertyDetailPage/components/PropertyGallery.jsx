import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, Maximize2,
    DollarSign, TrendingUp, PieChart, Award,
    Zap, CheckCircle2
} from 'lucide-react';

export default function PropertyGallery({ images, onOpenFullScreen, stats }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="relative aspect-[21/9] md:aspect-[24/10] w-full overflow-hidden bg-gray-100 group">
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Property view ${currentIndex + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => onOpenFullScreen(currentIndex)}
                />
            </AnimatePresence>

            {/* Glassy Stat Pills - Strategy and Status only */}
            {stats && (
                <div className="absolute bottom-5 left-5 right-5 flex flex-nowrap gap-1.5 z-10 overflow-x-auto no-scrollbar py-1 select-none">
                    <div className="flex gap-1.5 pr-36"> {/* Reserved space for View All button */}
                        <StatPill icon={TrendingUp} label="Strategy" value={stats.strategy} />
                        <StatPill icon={Award} label="Status" value={stats.status} />
                    </div>
                </div>
            )}

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-sm bg-white/40 backdrop-blur-md text-[#0F172A] opacity-0 group-hover:opacity-100 transition-all hover:bg-white/60 shadow-sm border border-white/20"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-sm bg-white/40 backdrop-blur-md text-[#0F172A] opacity-0 group-hover:opacity-100 transition-all hover:bg-white/60 shadow-sm border border-white/20"
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}

            {/* Fullscreen Button */}
            <button
                onClick={() => onOpenFullScreen(currentIndex)}
                className="absolute bottom-5 right-5 px-4 py-2 rounded-sm bg-[#0F172A]/80 backdrop-blur-md text-white hover:bg-[#0F172A] transition-all flex items-center gap-2 text-sm font-medium border border-white/10 shadow-lg z-20"
            >
                <Maximize2 size={18} />
                View All
            </button>
        </div>
    );
}

const StatPill = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-2.5 py-1.5 rounded-sm border border-white/20 shadow-[0_4px_24px_0_rgba(0,0,0,0.2)] hover:bg-white/20 transition-all group/pill cursor-default flex-shrink-0">
        <div className="p-1 bg-white/10 rounded-sm group-hover/pill:bg-white/20 transition-colors flex items-center justify-center">
            <Icon size={12} className="text-white" />
        </div>
        <div className="flex items-center gap-2 pr-1">
            <span className="text-[7px] text-white/50 font-bold uppercase tracking-wider leading-none">{label}</span>
            <span className="text-[10px] font-bold text-white leading-none whitespace-nowrap">{value}</span>
        </div>
    </div>
);
