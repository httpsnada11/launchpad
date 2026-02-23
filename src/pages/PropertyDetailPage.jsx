import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin, BadgeCheck, Clock, Calendar, DollarSign, TrendingUp,
    Home, Building, Ruler, Bed, Bath, Car, Percent,
    ChevronLeft, Share2, Heart, ExternalLink,
    CheckCircle2, BarChart3, PieChart, Layers,
    Navigation, Globe, Award, Maximize2, X, ChevronRight, ChevronDown, Search
} from 'lucide-react';
import Checkbox from '../components/Checkbox';
import InvestmentCalculator from '../components/InvestmentCalculator';
import HowItWorks from '../components/HowItWorks';
import InvestmentCard from '../components/InvestmentCard';

// Mock Property Data - Extended with comprehensive details
const PROPERTY_DETAILS = {
    1: {
        id: 1,
        title: 'UK Property Tokens',
        tokenSymbol: 'UKPT',
        category: 'REAL ESTATE',
        esgScore: 'A+',
        roi: '12%',
        cagr: '15.50%',
        issuerName: 'London Estates',
        issuerLogo: 'https://ui-avatars.com/api/?name=London+Estates&background=0D8ABC&color=fff',
        assetPrice: 'AED 1M',
        tokenPriceETH: '0.015 ETH',
        tokenPriceUSD: '$45 USD',
        availableTokens: 100000,
        totalTokens: 1000000,
        status: 'coming-soon',
        image: '/assets/publicm/villa.jpeg',
        badge: 'COMING SOON',
        launchDate: 'Coming soon',
        propertyType: 'Residential',
        investmentStrategy: 'Capital Growth',
        beds: 2,
        baths: 2,
        area: '1,200 sqft',
        country: 'UK',
        city: 'London',
        location: 'Kensington',
        fullAddress: '123 Kensington High Street, London W8 5SU, UK',
        coordinates: { lat: 51.5074, lng: -0.1278 },
        completionStatus: 'Ready',
        yearBuilt: 2019,
        priceVal: 100000,
        tokenPercentage: 100,
        description: 'Prime residential property in the heart of Kensington, offering exceptional capital growth potential. This beautifully appointed 2-bedroom apartment features modern finishes, excellent natural light, and proximity to world-class amenities.',
        features: [
            '24-hour Concierge',
            'Gym & Spa Facilities',
            'Underground Parking',
            'Private Balcony',
            'Smart Home System',
            'Communal Gardens'
        ],
        floorPlans: [
            { name: 'Ground Floor', image: '/assets/publicm/floorplan1.png' },
            { name: 'First Floor', image: '/assets/publicm/floorplan2.png' }
        ],
        images: [
            '/assets/publicm/villa.jpeg',
            '/assets/publicm/vilaa2.jpeg',
            '/assets/publicm/penthouse.jpeg'
        ],
        financials: {
            projectedRentalYield: '4.5%',
            annualAppreciation: '6.2%',
            totalReturn: '10.7%',
            holdingPeriod: '5 years',
            exitStrategy: 'Sale or Refinance',
            distributionFrequency: 'Quarterly'
        },
        esgDetails: {
            energyRating: 'B',
            carbonFootprint: 'Low',
            sustainabilityFeatures: [
                'Solar Panels',
                'Energy Efficient Windows',
                'Smart Thermostat',
                'Rainwater Harvesting'
            ],
            certifications: ['LEED Gold', 'BREEAM Excellent']
        },
        documents: [
            { name: 'Investment Memorandum', type: 'PDF', size: '2.4 MB' },
            { name: 'Title Deed', type: 'PDF', size: '1.1 MB' },
            { name: 'Property Valuation Report', type: 'PDF', size: '3.2 MB' },
            { name: 'Floor Plans', type: 'PDF', size: '1.8 MB' }
        ],
        timeline: [
            { date: 'Q1 2024', event: 'Acquisition Complete', status: 'completed' },
            { date: 'Q2 2024', event: 'Renovation Started', status: 'completed' },
            { date: 'Q4 2024', event: 'Token Launch', status: 'current' },
            { date: 'Q1 2025', event: 'First Distribution', status: 'upcoming' }
        ],
        similarProperties: [2, 3]
    },
    2: {
        id: 2,
        title: 'Dubai Luxury Villa',
        tokenSymbol: 'DLXV',
        category: 'REAL ESTATE',
        esgScore: 'B',
        roi: '10%',
        cagr: '12.00%',
        issuerName: 'Emaar Properties',
        issuerLogo: 'https://ui-avatars.com/api/?name=Emaar&background=3B82F6&color=fff',
        assetPrice: 'AED 12M',
        tokenPriceETH: '0.25 ETH',
        tokenPriceUSD: '$750 USD',
        availableTokens: 500000,
        totalTokens: 2000000,
        status: 'open',
        image: '/assets/publicm/vilaa2.jpeg',
        badge: 'OPEN',
        launchDate: 'Live Now',
        progress: 75,
        propertyType: 'Residential',
        investmentStrategy: 'High-Yield',
        beds: 5,
        baths: 6,
        area: '8,500 sqft',
        country: 'UAE',
        city: 'Dubai',
        location: 'Downtown Dubai',
        fullAddress: 'Villa 45, Emirates Hills, Dubai, UAE',
        coordinates: { lat: 25.2048, lng: 55.2708 },
        completionStatus: 'Under Construction',
        yearBuilt: 2025,
        priceVal: 200000,
        tokenPercentage: 75,
        description: 'Ultra-luxury villa in the prestigious Emirates Hills community. This architectural masterpiece offers unparalleled luxury with panoramic views of the Dubai skyline and golf course.',
        features: [
            'Private Pool',
            'Home Cinema',
            'Wine Cellar',
            'Maid\'s Room',
            'Driver\'s Room',
            '6 Covered Parking',
            'Smart Home Automation',
            'Landscaped Garden'
        ],
        floorPlans: [
            { name: 'Ground Floor', image: '/assets/publicm/floorplan1.png' },
            { name: 'First Floor', image: '/assets/publicm/floorplan2.png' },
            { name: 'Basement', image: '/assets/publicm/floorplan1.png' }
        ],
        images: [
            '/assets/publicm/vilaa2.jpeg',
            '/assets/publicm/villa.jpeg',
            '/assets/publicm/penthouse.jpeg',
            '/assets/publicm/monet lilies.jpeg'
        ],
        financials: {
            projectedRentalYield: '6.8%',
            annualAppreciation: '8.5%',
            totalReturn: '15.3%',
            holdingPeriod: '7 years',
            exitStrategy: 'Capital Appreciation',
            distributionFrequency: 'Quarterly'
        },
        esgDetails: {
            energyRating: 'A',
            carbonFootprint: 'Medium',
            sustainabilityFeatures: [
                'District Cooling',
                'LED Lighting',
                'Water Recycling System',
                'EV Charging Station'
            ],
            certifications: ['Dubai Green Building Regulations']
        },
        documents: [
            { name: 'Investment Memorandum', type: 'PDF', size: '3.1 MB' },
            { name: 'Oqood Registration', type: 'PDF', size: '0.8 MB' },
            { name: 'Master Floor Plan', type: 'PDF', size: '4.5 MB' },
            { name: 'Payment Plan', type: 'PDF', size: '1.2 MB' }
        ],
        timeline: [
            { date: 'Q1 2024', event: 'Land Acquisition', status: 'completed' },
            { date: 'Q3 2024', event: 'Construction Started', status: 'completed' },
            { date: 'Q4 2024', event: 'Token Launch', status: 'current' },
            { date: 'Q4 2025', event: 'Handover', status: 'upcoming' }
        ],
        similarProperties: [1, 4]
    },
    3: {
        id: 3,
        title: 'New York Penthouse',
        tokenSymbol: 'NYPH',
        category: 'REAL ESTATE',
        esgScore: 'A',
        roi: '15%',
        cagr: '18.50%',
        issuerName: 'NYC Realty',
        issuerLogo: 'https://ui-avatars.com/api/?name=NYC&background=6366F1&color=fff',
        assetPrice: '$5M',
        tokenPriceETH: '1.5 ETH',
        tokenPriceUSD: '$4,500 USD',
        availableTokens: 0,
        totalTokens: 1000000,
        status: 'sold-out',
        image: '/assets/publicm/penthouse.jpeg',
        badge: 'SOLD OUT',
        launchDate: 'Sold Out',
        progress: 100,
        propertyType: 'Residential',
        investmentStrategy: 'Prime',
        beds: 3,
        baths: 4,
        area: '4,200 sqft',
        country: 'USA',
        city: 'New York',
        location: 'Manhattan',
        fullAddress: '432 Park Avenue, PH92, New York, NY 10022',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        completionStatus: 'Ready',
        yearBuilt: 2020,
        priceVal: 5000,
        tokenPercentage: 100,
        description: 'Iconic penthouse in one of Manhattan\'s most prestigious addresses. Floor-to-ceiling windows offer breathtaking 360-degree views of Central Park and the city skyline.',
        features: [
            'Private Elevator',
            'Terrace',
            'Chef\'s Kitchen',
            'Master Suite with Spa Bath',
            'Library',
            'Staff Quarters',
            'Building Gym & Pool',
            '24/7 Doorman'
        ],
        floorPlans: [
            { name: 'Penthouse Level', image: '/assets/publicm/floorplan1.png' }
        ],
        images: [
            '/assets/publicm/penthouse.jpeg',
            '/assets/publicm/villa.jpeg',
            '/assets/publicm/vilaa2.jpeg'
        ],
        financials: {
            projectedRentalYield: '3.2%',
            annualAppreciation: '9.8%',
            totalReturn: '13.0%',
            holdingPeriod: '10 years',
            exitStrategy: 'Long-term Hold',
            distributionFrequency: 'Annual'
        },
        esgDetails: {
            energyRating: 'A+',
            carbonFootprint: 'Low',
            sustainabilityFeatures: [
                'Triple-glazed Windows',
                'High-efficiency HVAC',
                'Green Roof',
                'Waste Management System'
            ],
            certifications: ['LEED Platinum', 'Energy Star']
        },
        documents: [
            { name: 'Investment Memorandum', type: 'PDF', size: '2.8 MB' },
            { name: 'Condo Declaration', type: 'PDF', size: '1.5 MB' },
            { name: 'Building Financials', type: 'PDF', size: '2.1 MB' }
        ],
        timeline: [
            { date: 'Q2 2023', event: 'Acquisition', status: 'completed' },
            { date: 'Q4 2023', event: 'Token Launch', status: 'completed' },
            { date: 'Q1 2024', event: 'Sold Out', status: 'completed' },
            { date: 'Q4 2024', event: 'First Distribution', status: 'completed' }
        ],
        similarProperties: [1, 2]
    },
    4: {
        id: 4,
        title: 'Development Plot',
        tokenSymbol: 'DEV-PLT',
        category: 'REAL ESTATE',
        esgScore: 'N/A',
        roi: '20%',
        cagr: '25.00%',
        issuerName: 'Nakheel',
        issuerLogo: 'https://ui-avatars.com/api/?name=Nakheel&background=10B981&color=fff',
        assetPrice: 'AED 5M',
        tokenPriceETH: '0.1 ETH',
        tokenPriceUSD: '$300 USD',
        availableTokens: 100000,
        totalTokens: 1000000,
        status: 'coming-soon',
        image: '/assets/publicm/plot.jpeg',
        badge: 'NEW',
        launchDate: 'Coming soon',
        propertyType: 'Land',
        investmentStrategy: 'Fix & Flip',
        beds: 0,
        baths: 0,
        area: '15,000 sqft',
        country: 'UAE',
        city: 'Dubai',
        location: 'JVC',
        fullAddress: 'Plot 456, JVC District 12, Dubai, UAE',
        coordinates: { lat: 25.0657, lng: 55.2444 },
        completionStatus: 'Off-Plan',
        yearBuilt: null,
        priceVal: 10000,
        tokenPercentage: 0,
        description: 'Prime development land in the rapidly growing JVC district. Approved for mixed-use development with excellent ROI potential through strategic development and sale.',
        features: [
            'Mixed-Use Zoning',
            'G+4 Approval',
            'Utilities Connected',
            'Main Road Access',
            'Corner Plot',
            'No Service Charges'
        ],
        floorPlans: [
            { name: 'Site Plan', image: '/assets/publicm/floorplan1.png' },
            { name: 'Proposed Development', image: '/assets/publicm/floorplan2.png' }
        ],
        images: [
            '/assets/publicm/plot.jpeg',
            '/assets/publicm/villa.jpeg'
        ],
        financials: {
            projectedRentalYield: 'N/A',
            annualAppreciation: '15.0%',
            totalReturn: '25.0%',
            holdingPeriod: '3 years',
            exitStrategy: 'Development & Sale',
            distributionFrequency: 'Exit Proceeds'
        },
        esgDetails: {
            energyRating: 'N/A',
            carbonFootprint: 'To Be Determined',
            sustainabilityFeatures: [
                'Sustainable Development Plan',
                'Green Building Compliance'
            ],
            certifications: ['Dubai Municipality Approved']
        },
        documents: [
            { name: 'Title Deed', type: 'PDF', size: '0.9 MB' },
            { name: 'NOC from Authorities', type: 'PDF', size: '0.5 MB' },
            { name: 'Development Guidelines', type: 'PDF', size: '2.3 MB' }
        ],
        timeline: [
            { date: 'Q1 2024', event: 'Land Acquisition', status: 'completed' },
            { date: 'Q2 2024', event: 'Approvals Obtained', status: 'completed' },
            { date: 'Q1 2025', event: 'Token Launch', status: 'upcoming' },
            { date: 'Q3 2025', event: 'Development Start', status: 'upcoming' }
        ],
        similarProperties: [2]
    }
};

// Image Gallery Modal
const ImageGalleryModal = ({ images, currentIndex, onClose, onNext, onPrev }) => {
    return (
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
            <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-6 text-white hover:text-gray-300 z-50">
                <ChevronLeft size={40} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-6 text-white hover:text-gray-300 z-50">
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
    );
};

// Info Card Component
const InfoCard = ({ icon: Icon, label, value, subtext }) => (
    <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
        <div className="bg-white p-2 rounded-lg shadow-sm">
            <Icon size={20} className="text-[#0F172A]" />
        </div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-bold text-gray-900">{value}</p>
            {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
        </div>
    </div>
);

// Feature Badge Component
const FeatureBadge = ({ feature }) => (
    <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium">
        <CheckCircle2 size={16} />
        {feature}
    </div>
);

// Timeline Item Component
const TimelineItem = ({ item, isLast }) => (
    <div className="flex gap-4">
        <div className="flex flex-col items-center">
            <div className={`w-3 h-3 rounded-full ${item.status === 'completed'
                    ? 'bg-green-500'
                    : item.status === 'current'
                        ? 'bg-blue-500 ring-4 ring-blue-100'
                        : 'bg-gray-300'
                }`} />
            {!isLast && <div className={`w-0.5 flex-1 my-2 ${item.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'}`} />}
        </div>
        <div className="pb-8">
            <p className="font-semibold text-gray-900">{item.event}</p>
            <p className="text-sm text-gray-500">{item.date}</p>
        </div>
    </div>
);

export default function PropertyDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [showGallery, setShowGallery] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        const propertyId = parseInt(id);
        const foundProperty = PROPERTY_DETAILS[propertyId];
        if (foundProperty) {
            setProperty(foundProperty);
        } else {
            navigate('/marketplace');
        }
    }, [id, navigate]);

    const openGallery = (index) => {
        setCurrentImageIndex(index);
        setShowGallery(true);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: property.title,
                text: property.description,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F172A] mx-auto mb-4" />
                    <p className="text-gray-600">Loading property details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Image Gallery Modal */}
            {showGallery && (
                <ImageGalleryModal
                    images={property.images}
                    currentIndex={currentImageIndex}
                    onClose={() => setShowGallery(false)}
                    onNext={() => setCurrentImageIndex((prev) => (prev + 1) % property.images.length)}
                    onPrev={() => setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)}
                />
            )}

            {/* Hero Section */}
            <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Back Button */}
                <Link
                    to="/marketplace"
                    className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-semibold hover:bg-white transition-colors"
                >
                    <ChevronLeft size={20} />
                    Back to Marketplace
                </Link>

                {/* Action Buttons */}
                <div className="absolute top-6 right-6 flex gap-3">
                    <button
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className={`p-3 rounded-full backdrop-blur-sm transition-colors ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-white'
                            }`}
                    >
                        <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                    </button>
                    <button
                        onClick={handleShare}
                        className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-colors"
                    >
                        <Share2 size={20} />
                    </button>
                </div>

                {/* Badge */}
                <div className="absolute top-20 left-6">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${property.badge === 'OPEN'
                            ? 'bg-green-500 text-white'
                            : property.badge === 'SOLD OUT'
                                ? 'bg-red-500 text-white'
                                : 'bg-blue-500 text-white'
                        }`}>
                        {property.badge}
                    </span>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-2 text-white/90 mb-2">
                            <MapPin size={16} />
                            <span className="text-sm">{property.fullAddress}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            {property.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-white/90">
                            <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm">
                                <Home size={16} />
                                {property.propertyType}
                            </span>
                            <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm">
                                <Building size={16} />
                                {property.investmentStrategy}
                            </span>
                            {property.beds > 0 && (
                                <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm">
                                    <Bed size={16} />
                                    {property.beds} Beds
                                </span>
                            )}
                            {property.baths > 0 && (
                                <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm">
                                    <Bath size={16} />
                                    {property.baths} Baths
                                </span>
                            )}
                            <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm">
                                <Ruler size={16} />
                                {property.area}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <InfoCard
                        icon={DollarSign}
                        label="Token Price"
                        value={property.tokenPriceUSD}
                        subtext={property.tokenPriceETH}
                    />
                    <InfoCard
                        icon={TrendingUp}
                        label="Expected ROI"
                        value={property.roi}
                        subtext={`CAGR: ${property.cagr}`}
                    />
                    <InfoCard
                        icon={PieChart}
                        label="Tokens Available"
                        value={property.availableTokens.toLocaleString()}
                        subtext={`of ${property.totalTokens.toLocaleString()}`}
                    />
                    <InfoCard
                        icon={Award}
                        label="ESG Score"
                        value={property.esgScore}
                        subtext="Sustainability Rating"
                    />
                </div>

                {/* Main Content - Single Page Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Property</h2>
                            <p className="text-gray-600 leading-relaxed">{property.description}</p>
                        </div>

                        {/* Features */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Features & Amenities</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {property.features.map((feature, idx) => (
                                    <FeatureBadge key={idx} feature={feature} />
                                ))}
                            </div>
                        </div>

                        {/* Image Gallery */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Gallery</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {property.images.map((image, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => openGallery(idx)}
                                        className="relative aspect-square rounded-xl overflow-hidden group"
                                    >
                                        <img
                                            src={image}
                                            alt={`Property ${idx + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                        {idx === 0 && (
                                            <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-semibold">
                                                Main
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => openGallery(0)}
                                className="mt-4 flex items-center gap-2 text-[#0F172A] font-semibold hover:underline"
                            >
                                <Maximize2 size={18} />
                                View All Images ({property.images.length})
                            </button>
                        </div>

                        {/* Floor Plans */}
                        {property.floorPlans && property.floorPlans.length > 0 && (
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Floor Plans</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {property.floorPlans.map((plan, idx) => (
                                        <div key={idx} className="bg-gray-50 rounded-xl p-4">
                                            <div className="aspect-video bg-white rounded-lg mb-3 flex items-center justify-center">
                                                <img
                                                    src={plan.image}
                                                    alt={plan.name}
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            </div>
                                            <p className="font-semibold text-gray-900">{plan.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Investment Timeline */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Timeline</h3>
                            <div className="bg-gray-50 rounded-xl p-6">
                                {property.timeline.map((item, idx) => (
                                    <TimelineItem key={idx} item={item} isLast={idx === property.timeline.length - 1} />
                                ))}
                            </div>
                        </div>

                        {/* Investment Calculator */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <InvestmentCalculator property={property} />
                        </div>

                        {/* Location Details Section */}
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Location Details</h2>
                            
                            {/* Map Placeholder */}
                            <div className="bg-gray-100 rounded-2xl h-64 md:h-80 flex items-center justify-center mb-6 relative overflow-hidden">
                                <div className="text-center text-gray-500 z-10">
                                    <img
                                        src="/assets/images/avif/mapicon.png"
                                        alt="Map Location"
                                        className="w-16 h-16 mx-auto mb-2 object-contain"
                                    />
                                    <p className="font-semibold">Interactive Map</p>
                                    <p className="text-sm">Integration with Google Maps / Mapbox</p>
                                </div>
                                {/* Decorative Map Background */}
                                <div className="absolute inset-0 opacity-10 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=0,0&zoom=1&size=800x400&sensor=false&key=YOUR_API_KEY')] bg-cover bg-center" />
                            </div>

                            {/* Location Highlights */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Globe size={20} className="text-blue-600" />
                                        <h4 className="font-semibold text-gray-900">Country</h4>
                                    </div>
                                    <p className="text-gray-600">{property.country}</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <MapPin size={20} className="text-green-600" />
                                        <h4 className="font-semibold text-gray-900">City</h4>
                                    </div>
                                    <p className="text-gray-600">{property.city}</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Navigation size={20} className="text-purple-600" />
                                        <h4 className="font-semibold text-gray-900">District</h4>
                                    </div>
                                    <p className="text-gray-600">{property.location}</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Ruler size={20} className="text-orange-600" />
                                        <h4 className="font-semibold text-gray-900">Coordinates</h4>
                                    </div>
                                    <p className="text-gray-600">
                                        {property.coordinates.lat}, {property.coordinates.lng}
                                    </p>
                                </div>
                            </div>

                            {/* Nearby Amenities */}
                            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-4">Nearby Amenities</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                                        <p className="text-sm text-gray-500 mb-1">Schools</p>
                                        <p className="text-lg font-bold text-gray-900">0.5 km</p>
                                    </div>
                                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                                        <p className="text-sm text-gray-500 mb-1">Hospitals</p>
                                        <p className="text-lg font-bold text-gray-900">1.2 km</p>
                                    </div>
                                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                                        <p className="text-sm text-gray-500 mb-1">Shopping Malls</p>
                                        <p className="text-lg font-bold text-gray-900">0.8 km</p>
                                    </div>
                                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                                        <p className="text-sm text-gray-500 mb-1">Public Transport</p>
                                        <p className="text-lg font-bold text-gray-900">0.3 km</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* How It Works */}
                        <div className="mt-12">
                            <HowItWorks />
                        </div>
                    </div>

                    {/* Sidebar - Investment Card */}
                    <div className="lg:col-span-1">
                        <InvestmentCard property={property} />

                        {/* Similar Properties */}
                        <div className="mt-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Similar Properties</h3>
                            <div className="space-y-4">
                                {property.similarProperties.map((similarId) => {
                                    const similarProp = PROPERTY_DETAILS[similarId];
                                    if (!similarProp) return null;
                                    return (
                                        <Link
                                            key={similarId}
                                            to={`/property/${similarId}`}
                                            className="block bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                                        >
                                            <img
                                                src={similarProp.images[0]}
                                                alt={similarProp.title}
                                                className="w-full h-32 object-cover"
                                            />
                                            <div className="p-3">
                                                <p className="font-semibold text-gray-900 truncate">{similarProp.title}</p>
                                                <div className="flex items-center justify-between mt-2">
                                                    <span className="text-sm text-gray-500">{similarProp.propertyType}</span>
                                                    <span className="text-sm font-bold text-gray-900">{similarProp.tokenPriceUSD}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
