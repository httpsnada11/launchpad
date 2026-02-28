import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { getLenis } from '../../../App';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, ChevronRight, Image, FileText, Key, Star, Shield, Zap, Info,
    CheckCircle2, Leaf, MapPin, Ruler, Bed, Bath, Calendar,
    Maximize2, ChevronLeft, Download, Home, TrendingUp, Building
} from 'lucide-react';

// Tab Button Component
const TabButton = ({ active, onClick, icon: Icon, label }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-sm transition-all ${active
            ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/10'
            : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5 hover:border-white/10'
            }`}
    >
        <Icon size={16} />
        {label}
    </button>
);

// Feature Badge Component
const FeatureBadge = ({ feature }) => (
    <div className="flex items-center gap-2 bg-white/5 text-gray-300 border border-white/10 px-4 py-3 rounded-sm text-sm font-medium hover:bg-white/10 transition-colors">
        <CheckCircle2 size={18} className="text-emerald-500" />
        {feature}
    </div>
);


// Floor Plan Card
const FloorPlanCard = ({ plan }) => (
    <div className="bg-white/5 border border-white/10 rounded-sm p-4 hover:bg-white/10 transition-colors group">
        <div className="aspect-video bg-black/40 rounded-sm mb-3 flex items-center justify-center overflow-hidden border border-white/5">
            <img
                src={plan.image}
                alt={plan.name}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
        </div>
        <p className="font-semibold text-white">{plan.name}</p>
    </div>
);

// Gallery Image Card
const GalleryImageCard = ({ image, index, onClick, isMain }) => (
    <button
        onClick={() => onClick(index)}
        className="relative aspect-square rounded-sm overflow-hidden group"
    >
        <img
            src={image}
            alt={`Property ${index + 1}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
        {isMain && (
            <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-semibold">
                Main
            </div>
        )}
    </button>
);

// Full Screen Gallery Modal
const FullScreenGallery = ({ images, currentIndex, onClose, onNext, onPrev }) => (
    <AnimatePresence>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center backdrop-blur-md"
            onClick={onClose}
        >
            <button onClick={onClose} className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2 hover:bg-white/10 rounded-full transition-all">
                <X size={32} />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-6 text-white/70 hover:text-white z-50 p-4 hover:bg-white/10 rounded-full transition-all"
            >
                <ChevronLeft size={40} />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-6 text-white/70 hover:text-white z-50 p-4 hover:bg-white/10 rounded-full transition-all"
            >
                <ChevronRight size={40} />
            </button>
            <div className="max-w-6xl max-h-screen p-4" onClick={(e) => e.stopPropagation()}>
                <motion.img
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    src={images[currentIndex]}
                    alt={`Property image ${currentIndex + 1}`}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
                <div className="text-white font-bold tracking-widest mt-6 bg-white/10 px-4 py-2 rounded-full inline-block left-1/2 -translate-x-1/2 relative uppercase text-xs">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>
        </motion.div>
    </AnimatePresence>
);

// Document Row
const DocumentRow = ({ doc }) => (
    <div className="flex items-center justify-between bg-white/5 border border-white/5 rounded-sm p-4 hover:bg-white/10 hover:border-white/10 transition-all group">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-sm">
                <FileText size={20} className="text-emerald-500" />
            </div>
            <div>
                <p className="font-semibold text-white">{doc.name}</p>
                <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors uppercase tracking-wider">{doc.type} • {doc.size}</p>
            </div>
        </div>
        <button className="p-2 bg-white/5 hover:bg-white/20 rounded-sm transition-all border border-white/5 hover:border-white/20">
            <Download size={18} className="text-white" />
        </button>
    </div>
);

export default function PropertyDetailsModal({ property, isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [showFullScreenGallery, setShowFullScreenGallery] = useState(false);

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

    const tabs = [
        { id: 'overview', icon: Info, label: 'Overview' },
        { id: 'features', icon: Star, label: 'Features' },
        { id: 'developer', icon: Building, label: 'Developer' },
        { id: 'gallery', icon: Image, label: 'Gallery' },
        { id: 'floorplans', icon: FileText, label: 'Floor Plans' },
    ];

    const openFullScreenGallery = (index) => {
        setGalleryIndex(index);
        setShowFullScreenGallery(true);
    };

    if (!isOpen || !property) return null;

    return (
        <AnimatePresence>
            <motion.div
                ref={scrollRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 overflow-y-auto flex justify-center p-4 md:p-12"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-[#0a0a0b] rounded-xl w-full max-w-5xl shadow-2xl relative my-auto border border-white/10 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-black text-white p-6 flex items-center justify-between border-b border-white/10">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">{property.title}</h2>
                            <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
                                <MapPin size={14} className="text-emerald-500" />
                                {property.fullAddress}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                        >
                            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="p-4 bg-black border-b border-white/10">
                        <div className="flex flex-wrap gap-2">
                            {tabs.map((tab) => (
                                <TabButton
                                    key={tab.id}
                                    active={activeTab === tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    icon={tab.icon}
                                    label={tab.label}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                        <Info size={20} className="text-emerald-500" />
                                        Description
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed text-lg">{property.description}</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-white/5 border border-white/5 rounded-sm p-4 hover:border-white/10 transition-colors">
                                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                                            <Home size={16} className="text-emerald-500" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Property Type</span>
                                        </div>
                                        <p className="font-bold text-white text-lg">{property.propertyType}</p>
                                    </div>
                                    <div className="bg-white/5 border border-white/5 rounded-sm p-4 hover:border-white/10 transition-colors">
                                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                                            <TrendingUp size={16} className="text-emerald-500" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Strategy</span>
                                        </div>
                                        <p className="font-bold text-white text-lg">{property.investmentStrategy}</p>
                                    </div>
                                    {property.beds > 0 && (
                                        <div className="bg-white/5 border border-white/5 rounded-sm p-4 hover:border-white/10 transition-colors">
                                            <div className="flex items-center gap-2 text-gray-500 mb-2">
                                                <Bed size={16} className="text-emerald-500" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Bedrooms</span>
                                            </div>
                                            <p className="font-bold text-white text-lg">{property.beds}</p>
                                        </div>
                                    )}
                                    {property.baths > 0 && (
                                        <div className="bg-white/5 border border-white/5 rounded-sm p-4 hover:border-white/10 transition-colors">
                                            <div className="flex items-center gap-2 text-gray-500 mb-2">
                                                <Bath size={16} className="text-emerald-500" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Bathrooms</span>
                                            </div>
                                            <p className="font-bold text-white text-lg">{property.baths}</p>
                                        </div>
                                    )}
                                    <div className="bg-white/5 border border-white/5 rounded-sm p-4 hover:border-white/10 transition-colors">
                                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                                            <Ruler size={16} className="text-emerald-500" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Area</span>
                                        </div>
                                        <p className="font-bold text-white text-lg">{property.area}</p>
                                    </div>
                                    {property.yearBuilt && (
                                        <div className="bg-white/5 border border-white/5 rounded-sm p-4 hover:border-white/10 transition-colors">
                                            <div className="flex items-center gap-2 text-gray-500 mb-2">
                                                <Calendar size={16} className="text-emerald-500" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Year Built</span>
                                            </div>
                                            <p className="font-bold text-white text-lg">{property.yearBuilt}</p>
                                        </div>
                                    )}
                                    <div className="bg-white/5 border border-white/5 rounded-sm p-4 hover:border-white/10 transition-colors">
                                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                                            <Shield size={16} className="text-emerald-500" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Status</span>
                                        </div>
                                        <p className="font-bold text-white text-lg">{property.completionStatus}</p>
                                    </div>
                                </div>

                                {/* Quick Gallery Preview */}
                                {property.images && property.images.length > 0 && (
                                    <div className="pt-4">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                                <Image size={20} className="text-emerald-500" />
                                                Preview
                                            </h3>
                                            <button
                                                onClick={() => openFullScreenGallery(0)}
                                                className="text-white hover:text-emerald-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-emerald-500/20"
                                            >
                                                <Maximize2 size={14} />
                                                View All ({property.images.length})
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            {property.images.slice(0, 3).map((image, idx) => (
                                                <GalleryImageCard
                                                    key={idx}
                                                    image={image}
                                                    index={idx}
                                                    onClick={openFullScreenGallery}
                                                    isMain={idx === 0}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Developer Tab */}
                        {activeTab === 'developer' && property.developerDetails && (
                            <div className="space-y-8">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Building size={20} className="text-emerald-500" />
                                    Property Developer
                                </h3>
                                <div className="bg-white/5 rounded-xl p-8 border border-white/10 shadow-2xl">
                                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
                                        <div className="w-40 h-40 rounded-xl overflow-hidden bg-black/40 border border-white/10 p-6 flex items-center justify-center shadow-inner shrink-0 group hover:border-emerald-500/30 transition-all duration-500">
                                            <img
                                                src={property.developerDetails.logo}
                                                alt={property.developerDetails.name}
                                                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="text-center md:text-left pt-4">
                                            <h4 className="text-4xl font-bold text-white mb-3 tracking-tight">{property.developerDetails.name}</h4>
                                            <div className="flex items-center justify-center md:justify-start gap-3 text-emerald-500">
                                                <div className="bg-emerald-500/20 p-1.5 rounded-full border border-emerald-500/30">
                                                    <Shield size={16} className="text-emerald-500" />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-[0.2em]">Verified Developer</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6 bg-black/20 p-6 rounded-xl border border-white/5">
                                        <h5 className="font-bold text-white text-lg flex items-center gap-2">
                                            <Info size={18} className="text-emerald-500" />
                                            About the Developer
                                        </h5>
                                        <p className="text-gray-400 leading-relaxed text-lg italic opacity-90">
                                            "{property.developerDetails.description}"
                                        </p>
                                    </div>

                                    <div className="mt-10 pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="text-center p-6 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group">
                                            <div className="text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors">15+</div>
                                            <div className="text-[10px] text-gray-500 uppercase font-black mt-2 tracking-widest group-hover:text-gray-400">Years Experience</div>
                                        </div>
                                        <div className="text-center p-6 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group">
                                            <div className="text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors">50+</div>
                                            <div className="text-[10px] text-gray-500 uppercase font-black mt-2 tracking-widest group-hover:text-gray-400">Projects Delivered</div>
                                        </div>
                                        <div className="text-center p-6 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group">
                                            <div className="text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors">Premium</div>
                                            <div className="text-[10px] text-gray-500 uppercase font-black mt-2 tracking-widest group-hover:text-gray-400">Portfolio Tier</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Features Tab */}
                        {activeTab === 'features' && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Star size={20} className="text-emerald-500" />
                                    Features & Amenities
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {property.features.map((feature, idx) => (
                                        <FeatureBadge key={idx} feature={feature} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Gallery Tab */}
                        {activeTab === 'gallery' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        <Image size={20} className="text-emerald-500" />
                                        Property Gallery
                                    </h3>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                        {property.images.length} High-Res Images
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {property.images.map((image, idx) => (
                                        <GalleryImageCard
                                            key={idx}
                                            image={image}
                                            index={idx}
                                            onClick={openFullScreenGallery}
                                            isMain={idx === 0}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Floor Plans Tab */}
                        {activeTab === 'floorplans' && property.floorPlans && property.floorPlans.length > 0 && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <FileText size={20} className="text-emerald-500" />
                                    Architectural Floor Plans
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {property.floorPlans.map((plan, idx) => (
                                        <FloorPlanCard key={idx} plan={plan} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Full Screen Gallery */}
                {showFullScreenGallery && (
                    <FullScreenGallery
                        images={property.images}
                        currentIndex={galleryIndex}
                        onClose={() => setShowFullScreenGallery(false)}
                        onNext={() => setGalleryIndex((prev) => (prev + 1) % property.images.length)}
                        onPrev={() => setGalleryIndex((prev) => (prev - 1 + property.images.length) % property.images.length)}
                    />
                )}
            </motion.div>
        </AnimatePresence>
    );
}
