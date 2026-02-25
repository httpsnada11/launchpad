import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin, DollarSign, TrendingUp,
    Home, Building, Ruler, Bed, Bath,
    ChevronLeft, Share2, Heart, ChevronRight,
    PieChart,
    Navigation, Globe, Award, Info,
    FileText, Calendar, Shield, Sparkles,
    Sprout, ShieldCheck, Coins, Hammer
} from 'lucide-react';
import Button from '../../components/Button';
import InvestmentCalculator from './components/InvestmentCalculator';
import HowItWorks from './components/HowItWorks';
import InvestmentCard from './components/InvestmentCard';
import PropertyDetailsModal from './components/PropertyDetailsModal';
import ContactExpert from './components/ContactExpert';
import PropertyGallery from './components/PropertyGallery';
import InvestmentTimeline from './components/InvestmentTimeline';
import PropertyMap from './components/PropertyMap';

// Mock Property Data - Extended with comprehensive details
const PROPERTY_DETAILS = {
    1: {
        id: 1,
        title: 'UK Property Tokens',
        tokenSymbol: 'UKPT',
        category: 'REAL ESTATE',
        roi: '12%',
        cagr: '15.50%',
        issuerName: 'London Estates',
        issuerLogo: 'https://ui-avatars.com/api/?name=London+Estates&background=0D8ABC&color=fff',
        assetPrice: 'AED 1M',
        tokenPriceETH: '0.015 ETH',
        tokenPriceAED: '165 AED',
        availableTokens: 100000,
        totalTokens: 1000000,
        status: 'coming-soon',
        image: '/assets/publicm/villa.jpeg',
        badge: 'COMING SOON',
        launchDate: 'Coming soon',
        propertyType: 'Residential',
        investmentStrategy: 'Capital Growth',
        strategyType: 'capital-growth',
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
        roi: '10%',
        cagr: '12.00%',
        issuerName: 'Emaar Properties',
        issuerLogo: 'https://ui-avatars.com/api/?name=Emaar&background=3B82F6&color=fff',
        assetPrice: 'AED 12M',
        tokenPriceETH: '0.25 ETH',
        tokenPriceAED: '2,750 AED',
        availableTokens: 500000,
        totalTokens: 2000000,
        status: 'open',
        image: '/assets/publicm/vilaa2.jpeg',
        badge: 'OPEN',
        launchDate: 'Live Now',
        progress: 75,
        propertyType: 'Residential',
        investmentStrategy: 'High-Yield',
        strategyType: 'high-yield',
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
        roi: '15%',
        cagr: '18.50%',
        issuerName: 'NYC Realty',
        issuerLogo: 'https://ui-avatars.com/api/?name=NYC&background=6366F1&color=fff',
        assetPrice: 'AED 18M',
        tokenPriceETH: '1.5 ETH',
        tokenPriceAED: '16,500 AED',
        availableTokens: 0,
        totalTokens: 1000000,
        status: 'sold-out',
        image: '/assets/publicm/penthouse.jpeg',
        badge: 'SOLD OUT',
        launchDate: 'Sold Out',
        progress: 100,
        propertyType: 'Residential',
        investmentStrategy: 'Prime',
        strategyType: 'prime',
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
        roi: '20%',
        cagr: '25.00%',
        issuerName: 'Nakheel',
        issuerLogo: 'https://ui-avatars.com/api/?name=Nakheel&background=10B981&color=fff',
        assetPrice: 'AED 5M',
        tokenPriceETH: '0.1 ETH',
        tokenPriceAED: '1,100 AED',
        availableTokens: 100000,
        totalTokens: 1000000,
        status: 'coming-soon',
        image: '/assets/publicm/plot.jpeg',
        badge: 'NEW',
        launchDate: 'Coming soon',
        propertyType: 'Plot',
        investmentStrategy: 'Fix n\' Flip',
        strategyType: 'fix-and-flip',
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

// Info Card Component
const InfoCard = ({ icon: Icon, label, value, subtext, color = 'blue' }) => {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        purple: 'bg-purple-50 text-purple-600',
        orange: 'bg-orange-50 text-orange-600'
    };

    return (
        <div className="bg-white rounded-xl p-4 flex items-start gap-3 shadow-sm border border-gray-100">
            <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
                <Icon size={20} />
            </div>
            <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">{label}</p>
                <p className="font-bold text-gray-900">{value}</p>
                {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
            </div>
        </div>
    );
};

// Investment Strategy Data Mapping
const STRATEGY_DATA = {
    'capital-growth': {
        title: 'Capital growth',
        description: 'High appreciation potential due to market trends, upcoming infrastructure, or prime locations.',
        icon: Sprout,
        colorClass: 'bg-emerald-50 border-emerald-100 text-emerald-900',
        iconBgClass: 'bg-emerald-500',
        highlights: [
            { title: 'Booming neighborhood', text: 'Benefit from a growing community with developing infrastructure and increasing demand.' },
            { title: 'High rental occupancy', text: 'Apartments in this building typically have a 95% occupancy rate.' }
        ]
    },
    'prime': {
        title: 'Prime',
        description: 'A prime strategy built on resilient assets designed for steady income and durable capital growth.',
        icon: ShieldCheck,
        colorClass: 'bg-amber-50 border-amber-100 text-amber-900',
        iconBgClass: 'bg-amber-600',
        highlights: [
            { title: 'Reputable developer', text: 'Built by one of Dubai\'s leading real estate developers with a stellar reputation.' },
            { title: 'Established neighborhood', text: 'Benefit from a well developed community with mature infrastructure, offering reliability and convenience.' }
        ]
    },
    'high-yield': {
        title: 'High yield',
        description: 'Properties that offer higher than average rental yields, designed to maximise rental income.',
        icon: Coins,
        colorClass: 'bg-blue-50 border-blue-100 text-blue-900',
        iconBgClass: 'bg-blue-600',
        highlights: [
            { title: 'High-end amenities', text: 'Luxurious amenities enhance lifestyle and justify premium rents, attracting high-end tenants.' },
            { title: 'Booming neighborhood', text: 'Benefit from a growing community with developing infrastructure and increasing demand.' }
        ]
    },
    'fix-and-flip': {
        title: 'Fix n’ Flip',
        description: 'Purchase a market-undervalued property, renovate it, and quickly resell at a higher value.',
        icon: Hammer,
        colorClass: 'bg-purple-50 border-purple-100 text-purple-900',
        iconBgClass: 'bg-purple-600',
        highlights: [
            { title: 'Central location', text: 'Located in the center of the region, with key commercial hubs within short walking distance.' },
            { title: 'Reputable developer', text: 'Built by one of Dubai\'s leading real estate developers with a stellar reputation.' }
        ]
    }
};

const InvestmentStrategy = ({ type }) => {
    const strategy = STRATEGY_DATA[type] || STRATEGY_DATA['capital-growth'];
    const Icon = strategy.icon;

    return (
        <div className="pt-6 pb-6 pl-12 pr-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 uppercase tracking-wider">
                <Sparkles size={20} className="text-emerald-600" />
                Investment strategy
            </h3>

            <div className={`p-8 rounded-3xl border-2 ${strategy.colorClass} relative overflow-hidden`}>
                <div className="flex justify-between items-start mb-6">
                    <div className="max-w-xl">
                        <h4 className="text-2xl font-bold mb-2">{strategy.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {strategy.description}
                        </p>
                    </div>
                    <div className={`${strategy.iconBgClass} p-4 rounded-full text-white shadow-lg`}>
                        <Icon size={32} />
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/50 space-y-6">
                    {strategy.highlights.map((item, idx) => (
                        <div key={idx} className={idx !== 0 ? "pt-6 border-t border-gray-100" : ""}>
                            <h5 className="font-bold text-gray-900 mb-1">{item.title}</h5>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Main Component
export default function PropertyDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [showGallery, setShowGallery] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        const propertyId = parseInt(id);
        const foundProperty = PROPERTY_DETAILS[propertyId];
        if (foundProperty) {
            setProperty(foundProperty);
        } else {
            navigate('/marketplace');
        }
    }, [id, navigate]);

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
        <div className="min-h-screen bg-gray-50">
            {/* Property Details Modal */}
            <PropertyDetailsModal
                property={property}
                isOpen={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
            />

            {/* Redesigned Hero / Top Section */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-6 md:py-10">
                    {/* Breadcrumbs / Back Link & Actions */}
                    <div className="flex items-center justify-between mb-8">
                        <Link
                            to="/marketplace"
                            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium"
                        >
                            <ChevronLeft size={20} />
                            Back to Marketplace
                        </Link>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className={`p - 2.5 rounded - xl border transition - all ${isWishlisted
                                    ? 'bg-red-50 border-red-200 text-red-500'
                                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                                    } `}
                            >
                                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                            </button>
                            <button
                                onClick={handleShare}
                                className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-all"
                            >
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Left Side: Gallery (lg: 7 cols) */}
                        <div className="lg:col-span-7">
                            <PropertyGallery
                                images={property.images}
                                onOpenFullScreen={(index) => {
                                    setCurrentImageIndex(index);
                                    setShowGallery(true);
                                }}
                                stats={{
                                    price: property.assetPrice,
                                    strategy: property.investmentStrategy,
                                    available: property.availableTokens.toLocaleString(),
                                    status: property.completionStatus
                                }}
                            />
                        </div>

                        {/* Right Side: Primary Info & Engagement (lg: 5 cols) */}
                        <div className="lg:col-span-5 flex flex-col h-full">
                            <div className="mb-6">
                                <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest mb-4 w-fit ${property.status === 'open'
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : property.status === 'sold-out'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-blue-100 text-blue-700'
                                    }`}>
                                    {property.badge}
                                </span>

                                <h1 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] leading-tight mb-4 lowercase first-letter:uppercase">
                                    {property.title}
                                </h1>

                                <div className="flex items-center gap-2 text-gray-500 mb-6 font-medium">
                                    <MapPin size={18} className="text-[#15a36e]" />
                                    <span className="text-base">{property.location}, {property.city}</span>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Token Price</p>
                                                <p className="text-2xl font-black text-[#0F172A]">{property.tokenPriceAED}</p>
                                                <p className="text-sm text-gray-400 font-medium">{property.tokenPriceETH}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Target ROI</p>
                                                <p className="text-2xl font-black text-[#15a36e]">{property.roi}</p>
                                                <p className="text-sm text-gray-400 font-medium">Est. CAGR: {property.cagr}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl p-6 text-white">
                                        <Button
                                            text="About this property"
                                            onClick={() => setShowDetailsModal(true)}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Main Content - Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="pt-6 pb-6 pl-12 pr-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider">INVESTMENT OVERVIEW</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
                        </div>

                        {/* Investment Strategy */}
                        <InvestmentStrategy type={property.strategyType} />

                        {/* Investment Calculator */}
                        <div className="overflow-hidden">
                            <InvestmentCalculator property={property} />
                        </div>

                        {/* Investment Timeline */}
                        <InvestmentTimeline timeline={property.timeline} />

                        {/* How It Works */}
                        <div className="pt-4 mb-6">
                            <HowItWorks />
                        </div>

                        {/* Location Details */}
                        <div className="pt-6 pb-6 pl-12 pr-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 uppercase tracking-wider">
                                <MapPin size={20} className="text-red-600" />
                                ASSET LOCATION
                            </h2>

                            <PropertyMap
                                address={property.fullAddress}
                                coordinates={property.coordinates}
                                city={property.city}
                            />

                        </div>


                        {/* Contact Expert Section */}
                        <ContactExpert />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6 pt-6 pb-6 pl-6 pr-12">
                        <div className="sticky top-24">
                            <InvestmentCard property={property} />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
