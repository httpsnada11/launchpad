import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin, DollarSign, TrendingUp,
    Home, Building, Ruler, Bed, Bath,
    ChevronLeft, Share2, Heart, ChevronRight,
    PieChart,
    Navigation, Globe, Award, Info,
    FileText, Calendar, Shield
} from 'lucide-react';
import InvestmentCalculator from './components/InvestmentCalculator';
import HowItWorks from './components/HowItWorks';
import InvestmentCard from './components/InvestmentCard';
import PropertyDetailsModal from './components/PropertyDetailsModal';
import ContactExpert from './components/ContactExpert';
import PropertyGallery from './components/PropertyGallery';

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
                                className={`p-2.5 rounded-xl border transition-all ${isWishlisted
                                    ? 'bg-red-50 border-red-200 text-red-500'
                                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                                    }`}
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
                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4 ${property.status === 'open'
                                    ? 'bg-green-100 text-green-700'
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
                                                <p className="text-2xl font-black text-[#0F172A]">{property.tokenPriceUSD}</p>
                                                <p className="text-sm text-gray-400 font-medium">{property.tokenPriceETH}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Target ROI</p>
                                                <p className="text-2xl font-black text-[#15a36e]">{property.roi}</p>
                                                <p className="text-sm text-gray-400 font-medium">Est. CAGR: {property.cagr}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-[#0F172A] rounded-2xl p-6 text-white shadow-xl shadow-slate-200">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-white/10 rounded-lg">
                                                <Info size={20} className="text-yellow-400" />
                                            </div>
                                            <h3 className="font-bold text-lg">Asset Summary</h3>
                                        </div>
                                        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                                            Access complete technical specifications, ESG ratings, amenities list, and historical valuation data for this asset.
                                        </p>
                                        <button
                                            onClick={() => setShowDetailsModal(true)}
                                            className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-[#0F172A] font-extrabold rounded-xl transition-all transform active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-yellow-400/20"
                                        >
                                            <FileText size={20} />
                                            About This Property
                                            <ChevronRight size={20} />
                                        </button>
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
                        {/* Property Description */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Investment Overview</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
                        </div>

                        {/* Investment Timeline */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Calendar size={20} className="text-blue-600" />
                                Investment Timeline
                            </h3>
                            <div className="pl-2">
                                {property.timeline.map((item, idx) => (
                                    <TimelineItem key={idx} item={item} isLast={idx === property.timeline.length - 1} />
                                ))}
                            </div>
                        </div>

                        {/* How It Works */}
                        <div className="pt-4 mb-6">
                            <HowItWorks />
                        </div>

                        {/* Investment Calculator */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <InvestmentCalculator property={property} />
                        </div>

                        {/* Location Details */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <MapPin size={20} className="text-red-600" />
                                Asset Location
                            </h2>

                            <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center mb-6 overflow-hidden relative">
                                <div className="absolute inset-0 bg-[#0F172A]/5 animate-pulse" />
                                <div className="relative text-center text-gray-400 z-10">
                                    <Navigation size={32} className="mx-auto mb-2 opacity-50" />
                                    <p className="text-sm font-medium italic">Interactive Geolocation Integration</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <Globe size={18} className="mx-auto mb-1 text-blue-600" />
                                    <p className="text-xs text-gray-500">Country</p>
                                    <p className="font-semibold text-sm">{property.country}</p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <MapPin size={18} className="mx-auto mb-1 text-green-600" />
                                    <p className="text-xs text-gray-500">City</p>
                                    <p className="font-semibold text-sm">{property.city}</p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <Navigation size={18} className="mx-auto mb-1 text-purple-600" />
                                    <p className="text-xs text-gray-500">District</p>
                                    <p className="font-semibold text-sm">{property.location}</p>
                                </div>
                            </div>
                        </div>


                        {/* Contact Expert Section */}
                        <ContactExpert />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="sticky top-24">
                            <InvestmentCard property={property} />

                            {/* Premium Recommendation Feed */}
                            <div className="mt-12">
                                <div className="flex items-center justify-between mb-6 px-1">
                                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Similar Assets</h3>
                                    <div className="h-px flex-1 bg-slate-100 ml-4 mr-2" />
                                    <Link to="/marketplace" className="text-[10px] font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-widest transition-colors">See All</Link>
                                </div>
                                <div className="space-y-4">
                                    {property.similarProperties.map((similarId) => {
                                        const similarProp = PROPERTY_DETAILS[similarId];
                                        if (!similarProp) return null;
                                        return (
                                            <Link
                                                key={similarId}
                                                to={`/property/${similarId}`}
                                                className="group block bg-white rounded-[2rem] p-3 border border-slate-100 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500"
                                            >
                                                <div className="flex gap-4 items-center">
                                                    <div className="relative w-20 h-20 shrink-0 rounded-[1.5rem] overflow-hidden shadow-md">
                                                        <img
                                                            src={similarProp.images[0]}
                                                            alt={similarProp.title}
                                                            className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-1000"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                                    </div>
                                                    <div className="flex-1 min-w-0 pr-2">
                                                        <div className="flex items-center gap-1.5 mb-1.5">
                                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[8px] font-black rounded-full uppercase tracking-tighter">
                                                                {similarProp.propertyType}
                                                            </span>
                                                            <span className="text-[8px] font-black text-emerald-600 uppercase tracking-tighter px-2">
                                                                {similarProp.badge}
                                                            </span>
                                                        </div>
                                                        <p className="font-black text-slate-900 truncate text-sm mb-1 group-hover:text-emerald-700 transition-colors">
                                                            {similarProp.title}
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                                                                <MapPin size={10} className="text-emerald-500" />
                                                                {similarProp.city}
                                                            </p>
                                                            <p className="text-sm font-black text-slate-900 tracking-tight">
                                                                {similarProp.tokenPriceUSD}
                                                            </p>
                                                        </div>
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
        </div>
    );
}
