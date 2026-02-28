import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { getLenis } from '../../App';
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
                title: 'Prime Kensington Location',
                description: 'Situated in one of London\'s most resilient and prestigious residential markets with strong historical price appreciation.'
            },
            {
                title: 'Elite Rental Demand',
                description: 'High demand from corporate professionals and international students ensures consistent occupancy and premium yields.'
            },
            {
                title: 'Resilient Capital Growth',
                description: 'London\'s luxury real estate has historically outperformed other asset classes during global economic shifts.'
            },
            {
                title: 'World-Class Amenities',
                description: 'Proximity to Royal Parks, elite schools, and Michelin-starred dining boosts long-term asset desirability.'
            }
        ],
        developerDetails: {
            name: 'London Estates',
            logo: 'https://ui-avatars.com/api/?name=London+Estates&background=0D8ABC&color=fff',
            description: 'London Estates is a boutique real estate firm specializing in prime residential properties across Central London. With over 20 years of experience, they have established a reputation for identifying high-potential assets and delivering exceptional value through strategic acquisitions and meticulous property management.'
        }
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
                title: 'Exclusive Golf Course Views',
                description: 'Unparalleled panoramic views of the Montgomerie Golf Club, significantly increasing the property\'s resale appeal and value.'
            },
            {
                title: 'Ultra-Luxury Specifications',
                description: 'Features bespoke Italian finishes, a private home cinema, and state-of-the-art smart home automation for a premium lifestyle.'
            },
            {
                title: 'High Net Rental Yields',
                description: 'Dubai\'s tax-free rental income environment offers some of the highest net yields globally for luxury residential assets.'
            },
            {
                title: 'Absolute Supply Scarcity',
                description: 'Emirates Hills is a fully mature, "closed" community with extremely limited new inventory, driving long-term value preservation.'
            }
        ],
        developerDetails: {
            name: 'Emaar Properties',
            logo: 'https://ui-avatars.com/api/?name=Emaar&background=3B82F6&color=fff',
            description: 'One of the world\'s most valuable and admired real estate development companies, Emaar Properties has reshaped Dubai\'s skyline. Known for the Burj Khalifa and Dubai Mall, Emaar consistently delivers world-class residential, commercial, and hospitality assets that define modern luxury and urban excellence.'
        }
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
                title: 'Iconic Skyline Views',
                description: 'Floor-to-ceiling windows offering breathtaking 360-degree views of Central Park and the world-famous Manhattan skyline.'
            },
            {
                title: 'Institutional Grade Asset',
                description: 'Built by world-renowned architects with museum-quality finishes, attracting global ultra-high-net-worth and institutional investors.'
            },
            {
                title: 'Manhattan Market Resilience',
                description: 'Prime New York real estate serves as a premier global "safe haven" asset for long-term wealth preservation and growth.'
            },
            {
                title: 'Exclusive Lifestyle Services',
                description: 'Includes 24/7 white-glove concierge, private elevator access, and a comprehensive suite of five-star wellness amenities.'
            }
        ],
        developerDetails: {
            name: 'NYC Realty',
            logo: 'https://ui-avatars.com/api/?name=NYC&background=6366F1&color=fff',
            description: 'NYC Realty is a leading developer of luxury tall buildings in New York City. They are renowned for their commitment to architectural innovation and sustainable design, creating iconic residences that offer unparalleled views and lifestyle experiences in the world\'s most vibrant city.'
        }
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
        investmentHighlights: [
            {
                title: 'Strategic Growth District',
                description: 'JVC is one of Dubai\'s fastest-growing residential hubs with massive infrastructure and community expansion planned.'
            },
            {
                title: 'High ROI Potential',
                description: 'Approved for G+4 mixed-use construction, offering rapid capital recycling through a strategic "build-to-sell" development model.'
            },
            {
                title: 'Immediate Capital Gain',
                description: 'Acquired at a significant discount to current market valuation in a high-demand corridor with rising absorption rates.'
            },
            {
                title: 'Infrastructure Readiness',
                description: 'Corner plot with direct road access and all utilities connected, significantly minimizing pre-development lead times.'
            }
        ],
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
        developerDetails: {
            name: 'Nakheel',
            logo: 'https://ui-avatars.com/api/?name=Nakheel&background=10B981&color=fff',
            description: 'Nakheel is a world-leading master developer whose innovative, landmark projects form an iconic portfolio of master communities and residential, retail, hospitality and leisure developments that are pivotal to realizing Dubai\'s vision. Nakheel\'s waterfront projects, including the world-famous Palm Jumeirah, have added more than 300 kilometers to Dubai\'s original coastline.'
        }
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


            <div className={`p-8 rounded-xl border border-white/10 bg-black relative overflow-hidden shadow-2xl shadow-emerald-900/10 group`}>
                {/* Background Graphic Overlay */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10" />
                    <img
                        src="/investment_strategy_bg.png"
                        alt=""
                        className="w-full h-full object-cover object-center opacity-60 group-hover:scale-110 transition-transform duration-1000 brightness-75 contrast-125"
                    />
                </div>

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div className="max-w-xl">
                            <h4 className="text-2xl font-bold mb-2 text-white">{strategy.title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {strategy.description}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md rounded-sm p-6 border border-white/10">
                        <div className="flex flex-wrap items-start gap-6">
                            {strategy.highlights.map((item, idx) => (
                                <React.Fragment key={idx}>
                                    {idx > 0 && <span className="text-white/20 self-stretch text-4xl leading-none font-thin text-center flex items-center">|</span>}
                                    <div className="flex-1 min-w-[200px]">
                                        <h5 className="font-bold text-white mb-1 uppercase text-xs tracking-widest">{item.title}</h5>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            {item.text}
                                        </p>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
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

    const howItWorksScrollRef = useRef(null);

    // Lock body scroll when any modal is open
    useEffect(() => {
        const lenis = getLenis();
        if (showDetailsModal || showHowItWorks || showGallery) {
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
    }, [showDetailsModal, showHowItWorks, showGallery]);

    // Local smooth scroll (Lenis) for How It Works modal
    useEffect(() => {
        if (!showHowItWorks || !howItWorksScrollRef.current) return;

        const localLenis = new Lenis({
            wrapper: howItWorksScrollRef.current,
            content: howItWorksScrollRef.current.querySelector('.lenis-content') || howItWorksScrollRef.current,
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
    }, [showHowItWorks]);

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

            {/* Navigation & Actions */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        to="/marketplace"
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm md:text-base"
                    >
                        <ChevronLeft size={20} />
                        Back to Marketplace
                    </Link>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsWishlisted(!isWishlisted)}
                            className={`p-2 rounded-sm border transition-all ${isWishlisted
                                ? 'bg-red-50 border-red-200 text-red-500'
                                : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                                } `}
                        >
                            <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                        </button>
                        <button
                            onClick={handleShare}
                            className="p-2 bg-white border border-gray-200 rounded-sm text-gray-500 hover:bg-gray-50 transition-all"
                        >
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Redesigned Hero / Top Section */}
            <div className="bg-white">
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

                <div className="max-w-7xl mx-auto px-6 py-6 md:py-4">
                    <div className="flex flex-col h-full w-full mt-4">
                        <div className="mb-6">
                            <span className={`inline-flex px-3 py-1 rounded-sm text-[10px] font-semibold tracking-widest mb-4 w-fit ${property.status === 'open'
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
                                    <div className="flex items-center gap-1.5">
                                        <Building size={16} className="text-[#15a36e]" />
                                        <span className="font-semibold text-gray-700">{property.developerDetails?.name || property.issuerName}</span>
                                    </div>
                                    <div className="h-4 w-px bg-gray-300" />
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

                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-white px-5 py-3 rounded-sm border border-gray-100 shadow-sm flex items-center gap-6 group transition-all duration-300">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-none mb-2">Listing Price per token</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-black tracking-tight text-[#0F172A] group-hover:text-emerald-600 transition-colors uppercase">AED {property.tokenPriceAED}</span>
                                            <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-sm">/ Token</span>
                                        </div>
                                    </div>
                                    <div className="h-10 w-px bg-gray-100" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-none mb-2">Total Return</span>
                                        <span className="text-lg font-black text-emerald-600 uppercase tabular-nums">{property.financials?.totalReturn}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-0 pb-6">
                            <p className="text-gray-600 text-base leading-relaxed">{property.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Details & Insights */}
                    <div className="lg:col-span-8 space-y-12">
                        <TokenDetails property={property} />

                        <InvestmentStrategy type={property.strategyType} />

                        {/* Mobile Investment Card (Hidden on Desktop) */}
                        <div className="lg:hidden">
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
                            <div ref={paymentPlansRef} className="pt-4">
                                <PaymentPlans property={property} />
                            </div>
                        )}

                        <PropertyDocuments documents={property.documents} />

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

                        <div className="pt-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center justify-start uppercase tracking-wider">
                                ASSET LOCATION
                            </h2>
                            <PropertyMap
                                address={property.fullAddress}
                                coordinates={property.coordinates}
                                city={property.city}
                            />
                        </div>

                    </div>

                    {/* Right Column: Sticky Sidebar Card (Desktop Only) */}
                    <div className="hidden lg:block lg:col-span-4">
                        <div className="sticky top-10 space-y-6">
                            <InvestmentCard property={property} />
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <ContactExpert />
                </div>
            </div>

            {/* Modals */}
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
                            ref={howItWorksScrollRef}
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="fixed inset-0 z-[101] overflow-y-auto flex justify-center p-4 md:p-12 pointer-events-none"
                        >
                            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl pointer-events-auto relative p-6 md:p-10 my-auto">
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

            <AnimatePresence>
                {showGallery && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center"
                    >
                        <button
                            onClick={() => setShowGallery(false)}
                            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-sm text-white transition-all z-50 backdrop-blur-md border border-white/10"
                        >
                            <X size={28} />
                        </button>

                        <button
                            onClick={() => setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)}
                            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-sm text-white transition-all z-50 backdrop-blur-md border border-white/10"
                        >
                            <ChevronLeft size={32} />
                        </button>
                        <button
                            onClick={() => setCurrentImageIndex((prev) => (prev + 1) % property.images.length)}
                            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-sm text-white transition-all z-50 backdrop-blur-md border border-white/10"
                        >
                            <ChevronRight size={32} />
                        </button>

                        <div className="relative w-full h-[80vh] flex items-center justify-center p-4">
                            <motion.img
                                key={currentImageIndex}
                                src={property.images[currentImageIndex]}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-full max-h-full object-contain shadow-2xl"
                            />
                        </div>

                        <div className="absolute bottom-10 flex flex-col items-center gap-6">
                            <p className="text-white font-bold tracking-widest uppercase text-sm">
                                {currentImageIndex + 1} / {property.images.length}
                            </p>
                            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                                {property.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`w-16 h-16 rounded-sm overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-emerald-500 scale-110 shadow-lg shadow-emerald-500/20' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                    >
                                        <img src={img} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
