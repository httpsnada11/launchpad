import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function PropertyGallery({ images, onOpenFullScreen }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="space-y-4">
            {/* Main Image View */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 group">
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

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </>
                )}

                {/* Fullscreen Button */}
                <button
                    onClick={() => onOpenFullScreen(currentIndex)}
                    className="absolute bottom-4 right-4 p-2 rounded-lg bg-black/50 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 flex items-center gap-2 text-sm font-medium"
                >
                    <Maximize2 size={18} />
                    View All
                </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${currentIndex === idx
                                ? 'border-[#0F172A] scale-105 shadow-lg'
                                : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                    >
                        <img
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
