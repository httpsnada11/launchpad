import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin, DollarSign, TrendingUp, Home, Building, Ruler, Bed, Bath,
    ChevronLeft, Share2, Heart, ChevronRight, PieChart,
    Navigation, Globe, Award, Info, FileText, Calendar, Shield, Sparkles,
    Sprout, ShieldCheck, Coins, Hammer, Percent, X
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import Button from '../../components/Button';
import InvestmentCalculator from './components/InvestmentCalculator';
import HowItWorks from './components/HowItWorks';
import InvestmentCard from './components/InvestmentCard';
import PropertyDetailsModal from './components/PropertyDetailsModal';
import ContactExpert from './components/ContactExpert';
import PropertyGallery from './components/PropertyGallery';
import InvestmentTimeline from './components/InvestmentTimeline';
import PropertyMap from './components/PropertyMap';
import TokenDetails from './components/TokenDetails';
import PaymentPlans from './components/PaymentPlans';
import ExpectedProcess from './components/ExpectedProcess';
import PropertyDocuments from './components/PropertyDocuments';
import WhyInvest from './components/WhyInvest';

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
        assetPrice: 'AED 1,000,000',
        tokenPriceETH: '0.015 ETH',
        tokenPriceAED: '165 AED',
        availableTokens: 1000,
        totalTokens: 6061,
        minInvestment: 'AED 165',
        status: 'coming-soon',
        image: '/assets/publicm/villa.jpeg',
        badge: 'COMING SOON',
        launchDate: 'Coming soon',
        propertyType: 'Residential',
        investmentStrategy: 'Capital growth',
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
            { date: 'Q1 2024', event: 'Acquisition complete', status: 'completed' },
            { date: 'Q2 2024', event: 'Renovation started', status: 'completed' },
            { date: 'Q4 2024', event: 'Token launch', status: 'current' },
            { date: 'Q1 2025', event: 'First distribution', status: 'upcoming' }
        ],
        similarProperties: [2, 3],
        investmentHighlights: [
            {
                title: 'High Capital Growth Potential',
                description: 'Located in Kensington, one of London\'s most resilient and sought-after residential markets with strong historical price appreciation.'
            },
            {
                title: 'Premium Rental Demand',
                description: 'Strong demand from high-net-worth professionals and international students ensures consistent occupancy and premium rental yields.'
            },
            {
                title: 'Strategic Urban Infrastructure',
                description: 'Proximity to major transport links, elite schools, and cultural landmarks boosts long-term asset value and liquidity.'
            }
        ]
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
        assetPrice: 'AED 12,000,000',
        tokenPriceETH: '0.25 ETH',
        tokenPriceAED: '2,570 AED',
        availableTokens: 100,
        totalTokens: 4669,
        minInvestment: 'AED 2,570',
        status: 'open',
        image: '/assets/publicm/vilaa2.jpeg',
        badge: 'OPEN',
        launchDate: 'Live Now',
        progress: 75,
        propertyType: 'Residential',
        investmentStrategy: 'High-yield',
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
            holdingPeriod: '5 years',
            exitStrategy: 'Capital Appreciation',
            distributionFrequency: 'Quarterly',
            marketValue: 'AED 12,750,000',
            originalTokenValue: '2,570 AED',
            tokensSold: 4569,
            maxTokensToSell: 4669,
            paymentPlan: [
                { step: 1, percentage: 10, label: "Booking Deposit", date: "Immediate", active: true },
                { step: 2, percentage: 40, label: "During Construction", date: "Within 24 Months", active: false },
                { step: 3, percentage: 50, label: "On Completion", date: "Q4 2025", active: false }
            ]
        },
        documents: [
            { name: 'Investment Memorandum', type: 'PDF', size: '3.1 MB' },
            { name: 'Oqood Registration', type: 'PDF', size: '0.8 MB' },
            { name: 'Master Floor Plan', type: 'PDF', size: '4.5 MB' },
            { name: 'Payment Plan', type: 'PDF', size: '1.2 MB' }
        ],
        timeline: [
            { date: 'Q1 2024', event: 'Land acquisition', status: 'completed' },
            { date: 'Q3 2024', event: 'Construction started', status: 'completed' },
            { date: 'Q4 2024', event: 'Token launch', status: 'current' },
            { date: 'Q4 2025', event: 'Handover', status: 'upcoming' }
        ],
        similarProperties: [1, 4],
        investmentHighlights: [
            {
                title: 'Luxury Waterfront Living',
                description: 'Prive by Damac is a twin-tower luxury development in Business Bay offering fully serviced apartments with stunning views and five-star hotel-style amenities.'
            },
            {
                title: 'Rare Full Lake View',
                description: 'The subject 2-bedroom unit on the 10th floor is one of the few in the tower featuring a full lake view, enhancing its appeal for both rental and resale.'
            },
            {
                title: 'Strong Rental Potential',
                description: 'Projected gross rental income of AED 175,000 annually, with a first-year net yield of up to 5.17%, ensuring reliable income generation.'
            },
            {
                title: 'High ROI Opportunity',
                description: 'Estimated annualized ROI of up to 14.77% over a 5-year period, combining rental income and capital appreciation.'
            },
            {
                title: 'Below Market Purchase',
                description: 'Acquired at AED 2,400,000—secured significantly below the DLD smart valuation of AED 2,890,000—offering an immediate 16.96% discount or a 20.42% unrealized gain.'
            },
            {
                title: 'Prestigious Business Bay Address',
                description: 'Located in the heart of Business Bay with direct canal views and minutes from Downtown Dubai and DIFC, boosting long-term investment value.'
            }
        ]
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
        assetPrice: 'AED 18,000,000',
        tokenPriceETH: '1.5 ETH',
        tokenPriceAED: '16,500 AED',
        availableTokens: 0,
        totalTokens: 1091,
        minInvestment: 'AED 16,500',
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
            holdingPeriod: '5 years',
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
            { date: 'Q4 2023', event: 'Token launch', status: 'completed' },
            { date: 'Q1 2024', event: 'Sold out', status: 'completed' },
            { date: 'Q4 2024', event: 'First distribution', status: 'completed' }
        ],
        similarProperties: [1, 2],
        investmentHighlights: [
            {
                title: 'World-Class Connectivity',
                description: 'Unmatched access to global business hubs, high-end shopping, and the cultural heart of Manhattan.'
            },
            {
                title: 'Asset Scarcity',
                description: 'Limited availability of ultra-luxury penthouses in prime New York locations ensures long-term wealth preservation.'
            },
            {
                title: 'Institutional Grade Quality',
                description: 'Built to the highest standards with premium finishes and exclusive amenities, attracting global institutional investors.'
            }
        ]
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
        assetPrice: 'AED 5,000,000',
        tokenPriceETH: '0.1 ETH',
        tokenPriceAED: '1,100 AED',
        availableTokens: 4545,
        totalTokens: 4545,
        status: 'coming-soon',
        image: '/assets/publicm/plot.jpeg',
        badge: 'NEW',
        launchDate: 'Coming soon',
        propertyType: 'Plot',
        investmentStrategy: 'Fix n\' flip',
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
            distributionFrequency: 'Exit Proceeds',
            paymentPlan: [
                { step: 1, percentage: 10, label: "Booking Deposit", date: "Immediate", active: true },
                { step: 2, percentage: 30, label: "During Construction", date: "Q3 2025", active: false },
                { step: 3, percentage: 40, label: "Handover", date: "Q4 2026", active: false },
                { step: 4, percentage: 20, label: "Final Payment", date: "Q1 2027", active: false }
            ]
        },
        documents: [
            { name: 'Title Deed', type: 'PDF', size: '0.9 MB' },
            { name: 'NOC from Authorities', type: 'PDF', size: '0.5 MB' },
            { name: 'Development Guidelines', type: 'PDF', size: '2.3 MB' }
        ],
        timeline: [
            { date: 'Q1 2024', event: 'Land acquisition', status: 'completed' },
            { date: 'Q2 2024', event: 'Approvals obtained', status: 'completed' },
            { date: 'Q1 2025', event: 'Token launch', status: 'upcoming' },
            { date: 'Q3 2025', event: 'Development start', status: 'upcoming' }
        ],
        similarProperties: [2],
        investmentHighlights: [
            {
                title: 'Strategic Development Zone',
                description: 'JVC is one of Dubai\'s fastest-growing residential hubs with a high volume of new construction and infrastructure investment.'
            },
            {
                title: 'Favorable Zoning Regulations',
                description: 'Approved for mixed-use G+4 development, providing flexibility for diverse residential and commercial project planning.'
            },
            {
                title: 'Entry-Level Investment Opportunity',
                description: 'Lower plot entry costs relative to surrounding areas offer higher potential margins for developers and fix-and-flip investors.'
            }
        ]
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
        colorClass: 'border-emerald-100 text-emerald-900',
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
        colorClass: 'border-emerald-100 text-emerald-900',
        iconBgClass: 'bg-emerald-600',
        highlights: [
            { title: 'Reputable developer', text: 'Built by one of Dubai\'s leading real estate developers with a stellar reputation.' },
            { title: 'Established neighborhood', text: 'Benefit from a well developed community with mature infrastructure, offering reliability and convenience.' }
        ]
    },
    'high-yield': {
        title: 'High yield',
        description: 'Properties that offer higher than average rental yields, designed to maximise rental income.',
        icon: Coins,
        colorClass: 'border-emerald-100 text-emerald-900',
        iconBgClass: 'bg-emerald-600',
        highlights: [
            { title: 'High-end amenities', text: 'Luxurious amenities enhance lifestyle and justify premium rents, attracting high-end tenants.' },
            { title: 'Booming neighborhood', text: 'Benefit from a growing community with developing infrastructure and increasing demand.' }
        ]
    },
    'fix-and-flip': {
        title: 'Fix n’ Flip',
        description: 'Purchase a market-undervalued property, renovate it, and quickly resell at a higher value.',
        icon: Hammer,
        colorClass: 'border-emerald-100 text-emerald-900',
        iconBgClass: 'bg-emerald-600',
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
        <div className="pb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 tracking-wider">
                Investment strategy
            </h3>

            <div className={`p-8 rounded-3xl border-2 ${strategy.colorClass} bg-white relative overflow-hidden shadow-sm`}>
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

                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/50">
                    <div className="flex flex-wrap items-start gap-6">
                        {strategy.highlights.map((item, idx) => (
                            <React.Fragment key={idx}>
                                {idx > 0 && <span className="text-gray-300 self-stretch text-4xl leading-none">|</span>}
                                <div className="flex-1 min-w-[200px]">
                                    <h5 className="font-bold text-gray-900 mb-1">{item.title}</h5>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {item.text}
                                    </p>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
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
    const [showHowItWorks, setShowHowItWorks] = useState(false);

    const investmentOverviewRef = useRef(null);
    const expectedProcessRef = useRef(null);
    const paymentPlansRef = useRef(null);

    useEffect(() => {
        const propertyId = parseInt(id);
        const foundProperty = PROPERTY_DETAILS[propertyId];
        if (foundProperty) {
            setProperty(foundProperty);
            // Scroll to Payment Plans and Expected Process for Off-Plan properties
            if (foundProperty.completionStatus === 'Off-Plan') {
                setTimeout(() => {
                    if (paymentPlansRef.current) {
                        paymentPlansRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 500);
            }
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
        <div className="min-h-screen bg-white">
            {/* Property Details Modal */}
            <PropertyDetailsModal
                property={property}
                isOpen={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
            />

            {/* Redesigned Hero / Top Section */}
            <div className="bg-white">
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
                                className={`p-2 sm:p-2.5 rounded-xl border transition-all ${isWishlisted
                                    ? 'bg-red-50 border-red-200 text-red-500'
                                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                                    } `}
                            >
                                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                            </button>
                            <button
                                onClick={handleShare}
                                className="p-2 sm:p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-all"
                            >
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Left Side: Gallery */}
                        <div className="lg:col-span-12">
                            <PropertyGallery
                                images={property.images}
                                onOpenFullScreen={(index) => {
                                    setCurrentImageIndex(index);
                                    setShowGallery(true);
                                }}
                                stats={{
                                    strategy: property.investmentStrategy,
                                    status: property.completionStatus
                                }}
                            />
                        </div>

                        {/* Property Info Section */}
                        <div className="lg:col-span-12 max-w-5xl mx-auto mt-4">
                            <div className="flex flex-col h-full w-full">
                                <div className="mb-6">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest mb-4 w-fit ${property.status === 'open'
                                        ? 'bg-emerald-100 text-emerald-700'
                                        : property.status === 'sold-out'
                                            ? 'bg-red-100 text-red-700'
                                            : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {property.badge}
                                    </span>

                                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#0F172A] leading-tight mb-4 lowercase first-letter:uppercase">
                                        {property.title}
                                    </h1>

                                    <div className="flex flex-wrap items-center gap-y-2 text-gray-500 mb-6 font-medium">
                                        <div className="flex items-center gap-2 pr-4">
                                            <MapPin size={18} className="text-[#15a36e]" />
                                            <span className="text-base">{property.location}, {property.city}</span>
                                        </div>
                                        <div className="hidden sm:block h-4 w-px bg-gray-300 mr-4" />
                                        <div className="flex items-center gap-4 text-sm sm:text-base">
                                            <span>{property.propertyType || 'Apartment'}</span>
                                            <div className="h-4 w-px bg-gray-300" />
                                            <div className="flex items-center gap-1.5">
                                                <Bed size={18} className="text-gray-400" />
                                                <span>{property.beds}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Bath size={18} className="text-gray-400" />
                                                <span>{property.baths}</span>
                                            </div>
                                            <div className="h-4 w-px bg-gray-300" />
                                            <div className="flex items-center gap-1.5">
                                                <Ruler size={18} className="text-gray-400" />
                                                <span>{property.area}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8 pb-6 border-b border-gray-100">
                                    <p className="text-gray-600 text-base leading-relaxed">{property.description}</p>
                                </div>

                                {/* Dynamic Financials logic */}
                                {(() => {
                                    const parseAED = (str) => parseFloat(str?.replace(/[^0-9.]/g, '') || 0);
                                    const tokenPrice = parseAED(property.tokenPriceAED);
                                    const annualAppreciation = parseFloat(property.financials?.annualAppreciation) || 0;
                                    const appreciationFactor = 1 + (annualAppreciation / 100);
                                    const currentTokenMarketValue = tokenPrice * appreciationFactor;
                                    const availableValue = property.availableTokens * tokenPrice;

                                    return (
                                        <div className="space-y-6">
                                            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm relative w-full">
                                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 lg:gap-x-12 relative z-10">
                                                    <div>
                                                        <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider mb-2">Listing price</p>
                                                        <div className="flex items-baseline gap-1">
                                                            <span className="text-gray-300 text-xs font-semibold">AED</span>
                                                            <span className="text-[#0F172A] text-2xl font-semibold tracking-tight">{property.assetPrice.replace('AED ', '')}</span>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider">Market value</p>
                                                            <div className="flex items-center gap-0.5 text-[#10B981] font-semibold text-[10px]">
                                                                <TrendingUp size={12} strokeWidth={2} />
                                                                <span>+{annualAppreciation}%</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-baseline gap-1">
                                                            <span className="text-gray-300 text-xs font-semibold">AED</span>
                                                            <span className="text-[#0F172A] text-2xl font-semibold tracking-tight">{(property.financials?.marketValue || property.assetPrice).replace('AED ', '')}</span>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider mb-2">Price per token</p>
                                                        <div className="flex items-baseline gap-1">
                                                            <span className="text-gray-300 text-xs font-semibold">AED</span>
                                                            <span className="text-[#0F172A] text-2xl font-semibold tracking-tight">{property.tokenPriceAED.replace(' AED', '')}</span>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider mb-2">Token availability</p>
                                                        <div className="flex items-baseline gap-1.5">
                                                            <span className="text-[#0F172A] text-2xl font-semibold tracking-tight">{property.availableTokens.toLocaleString()}</span>
                                                            <span className="text-gray-300 text-lg font-semibold">/</span>
                                                            <span className="text-gray-400 text-sm font-medium">{property.totalTokens.toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white rounded-xl p-4 md:p-5 border border-gray-100 shadow-sm w-full overflow-hidden">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                                                        <div className="w-2.5 h-2.5 bg-blue-600 rounded-sm opacity-80"></div>
                                                    </div>
                                                    <span className="text-sm md:text-base font-semibold text-gray-900 uppercase">
                                                        Token availability: {property.availableTokens.toLocaleString()} / {property.totalTokens.toLocaleString()}
                                                    </span>
                                                </div>

                                                <div className="h-2.5 bg-gray-100 rounded-full mb-5 overflow-hidden w-full">
                                                    <div
                                                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                                                        style={{ width: `${(1 - (property.availableTokens / property.totalTokens)) * 100}%` }}
                                                    />
                                                </div>

                                                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <Percent className="w-4 h-4 text-blue-600" strokeWidth={3} />
                                                        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Available Value:</span>
                                                        <span className="text-xs text-gray-400 font-semibold">AED</span>
                                                        <span className="text-sm md:text-base font-semibold text-gray-900 tracking-tight">
                                                            {availableValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white rounded-xl p-4 md:p-5 border border-gray-100 shadow-sm w-full">
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 mb-4">
                                                    <span className="text-xs md:text-sm text-gray-500 font-semibold uppercase tracking-wide">Current token market value</span>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-[10px] md:text-xs text-gray-400 font-semibold">AED</span>
                                                        <span className="text-sm md:text-base font-semibold text-gray-900 tracking-tight">
                                                            {currentTokenMarketValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 mb-4">
                                                    <span className="text-xs md:text-sm text-gray-500 font-semibold uppercase tracking-wide">Appreciation</span>
                                                    <div className="flex items-center gap-1 text-[#10B981]">
                                                        <TrendingUp className="w-4 h-4 stroke-[2]" />
                                                        <span className="text-sm md:text-base font-semibold tracking-tight">+{annualAppreciation}%</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                                                    <span className="text-xs md:text-sm text-gray-500 font-semibold uppercase tracking-wide">Original token market value</span>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-[10px] md:text-xs text-gray-400 font-semibold">AED</span>
                                                        <span className="text-sm md:text-base font-semibold text-gray-900 tracking-tight">
                                                            {tokenPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="max-w-5xl mx-auto space-y-6">
                    <InvestmentStrategy type={property.strategyType} />

                    <div className="py-6">
                        <InvestmentCard property={property} />
                    </div>

                    <div className="overflow-hidden">
                        <InvestmentCalculator
                            property={property}
                            onShowHowItWorks={() => setShowHowItWorks(true)}
                        />
                    </div>

                    <WhyInvest highlights={property.investmentHighlights} />

                    <div ref={expectedProcessRef}>
                        <ExpectedProcess />
                    </div>

                    {property.completionStatus === 'Off-Plan' && (
                        <div ref={paymentPlansRef} className="pt-8">
                            <PaymentPlans property={property} />
                        </div>
                    )}

                    <InvestmentTimeline
                        timeline={property.timeline}
                        action={
                            <Button
                                text="About this property"
                                onClick={() => setShowDetailsModal(true)}
                                className="w-fit px-8"
                            />
                        }
                    />



                    <div className="pt-6 pb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2 uppercase tracking-wider">
                            <MapPin size={20} className="text-red-600" />
                            ASSET LOCATION
                        </h2>
                        <PropertyMap
                            address={property.fullAddress}
                            coordinates={property.coordinates}
                            city={property.city}
                        />
                    </div>

                    <PropertyDocuments documents={property.documents} />
                    <ContactExpert />
                </div>
            </div>

            {/* How It Works Modal */}
            <AnimatePresence>
                {showHowItWorks && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowHowItWorks(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none"
                        >
                            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto pointer-events-auto relative p-6 md:p-10">
                                <button
                                    onClick={() => setShowHowItWorks(false)}
                                    className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                                >
                                    <X size={24} className="text-gray-500" />
                                </button>
                                <HowItWorks />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
