import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, ChevronRight, Image, FileText, Key, Star, Shield, Zap, Info,
    CheckCircle2, Leaf, MapPin, Ruler, Bed, Bath, Calendar,
    Maximize2, ChevronLeft, Download, Home, TrendingUp
} from 'lucide-react';

// Tab Button Component
const TabButton = ({ active, onClick, icon: Icon, label }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${active
            ? 'bg-[#0F172A] text-white shadow-lg'
            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
    >
        <Icon size={16} />
        {label}
    </button>
);

// Feature Badge Component
const FeatureBadge = ({ feature }) => (
    <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm font-medium">
        <CheckCircle2 size={18} />
        {feature}
    </div>
);


// Floor Plan Card
const FloorPlanCard = ({ plan }) => (
    <div className="bg-gray-50 rounded-xl p-4">
        <div className="aspect-video bg-white rounded-lg mb-3 flex items-center justify-center overflow-hidden">
            <img
                src={plan.image}
                alt={plan.name}
                className="max-h-full max-w-full object-contain"
            />
        </div>
        <p className="font-semibold text-gray-900">{plan.name}</p>
    </div>
);

// Gallery Image Card
const GalleryImageCard = ({ image, index, onClick, isMain }) => (
    <button
        onClick={() => onClick(index)}
        className="relative aspect-square rounded-xl overflow-hidden group"
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
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={onClose}
        >
            <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-gray-300 z-50">
                <X size={32} />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-6 text-white hover:text-gray-300 z-50"
            >
                <ChevronLeft size={40} />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-6 text-white hover:text-gray-300 z-50"
            >
                <ChevronRight size={40} />
            </button>
            <div className="max-w-6xl max-h-screen p-4" onClick={(e) => e.stopPropagation()}>
                <img
                    src={images[currentIndex]}
                    alt={`Property image ${currentIndex + 1}`}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg"
                />
                <div className="text-white text-center mt-4">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>
        </motion.div>
    </AnimatePresence>
);

// Document Row
const DocumentRow = ({ doc }) => (
    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg">
                <FileText size={20} className="text-red-600" />
            </div>
            <div>
                <p className="font-semibold text-gray-900">{doc.name}</p>
                <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
            </div>
        </div>
        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <Download size={18} className="text-gray-600" />
        </button>
    </div>
);

export default function PropertyDetailsModal({ property, isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [showFullScreenGallery, setShowFullScreenGallery] = useState(false);

    const tabs = [
        { id: 'overview', icon: Info, label: 'Overview' },
        { id: 'features', icon: Star, label: 'Features' },
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4 md:p-8"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-[#0F172A] text-white p-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">{property.title}</h2>
                            <p className="text-gray-300 text-sm mt-1 flex items-center gap-2">
                                <MapPin size={14} />
                                {property.fullAddress}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="p-4 bg-gray-50 border-b border-gray-100">
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
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                                    <p className="text-gray-600 leading-relaxed">{property.description}</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                                            <Home size={16} />
                                            <span className="text-xs font-semibold uppercase">Property Type</span>
                                        </div>
                                        <p className="font-bold text-gray-900">{property.propertyType}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                                            <TrendingUp size={16} />
                                            <span className="text-xs font-semibold uppercase">Strategy</span>
                                        </div>
                                        <p className="font-bold text-gray-900">{property.investmentStrategy}</p>
                                    </div>
                                    {property.beds > 0 && (
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                                                <Bed size={16} />
                                                <span className="text-xs font-semibold uppercase">Bedrooms</span>
                                            </div>
                                            <p className="font-bold text-gray-900">{property.beds}</p>
                                        </div>
                                    )}
                                    {property.baths > 0 && (
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                                                <Bath size={16} />
                                                <span className="text-xs font-semibold uppercase">Bathrooms</span>
                                            </div>
                                            <p className="font-bold text-gray-900">{property.baths}</p>
                                        </div>
                                    )}
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                                            <Ruler size={16} />
                                            <span className="text-xs font-semibold uppercase">Area</span>
                                        </div>
                                        <p className="font-bold text-gray-900">{property.area}</p>
                                    </div>
                                    {property.yearBuilt && (
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                                                <Calendar size={16} />
                                                <span className="text-xs font-semibold uppercase">Year Built</span>
                                            </div>
                                            <p className="font-bold text-gray-900">{property.yearBuilt}</p>
                                        </div>
                                    )}
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                                            <Shield size={16} />
                                            <span className="text-xs font-semibold uppercase">Status</span>
                                        </div>
                                        <p className="font-bold text-gray-900">{property.completionStatus}</p>
                                    </div>
                                </div>

                                {/* Quick Gallery Preview */}
                                {property.images && property.images.length > 0 && (
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-bold text-gray-900">Preview</h3>
                                            <button
                                                onClick={() => openFullScreenGallery(0)}
                                                className="text-[#0F172A] font-semibold text-sm flex items-center gap-1 hover:underline"
                                            >
                                                <Maximize2 size={16} />
                                                View All ({property.images.length})
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
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

                        {/* Features Tab */}
                        {activeTab === 'features' && (
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Features & Amenities</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {property.features.map((feature, idx) => (
                                        <FeatureBadge key={idx} feature={feature} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Gallery Tab */}
                        {activeTab === 'gallery' && (
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Property Gallery</h3>
                                    <span className="text-sm text-gray-500">{property.images.length} images</span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Floor Plans</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
