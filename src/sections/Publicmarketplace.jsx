import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, ChevronDown, Flame, Clock, Check, X, MapPin, BadgeCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const MOCK_INVESTMENTS = [
    {
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
        country: 'UK',
        city: 'London',
        location: 'Kensington',
        completionStatus: 'Ready',
        priceVal: 100000,
        tokenPercentage: 100
    },
    {
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
        country: 'UAE',
        city: 'Dubai',
        location: 'Downtown',
        completionStatus: 'Under Construction',
        priceVal: 200000,
        tokenPercentage: 100
    },
    {
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
        country: 'USA',
        city: 'New York',
        location: 'Manhattan',
        completionStatus: 'Ready',
        priceVal: 5000,
        tokenPercentage: 100
    },
];

const MOCK_LAND_ITEMS = [
    {
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
        country: 'UAE',
        city: 'Dubai',
        location: 'JVC',
        completionStatus: 'Off-Plan',
        priceVal: 10000,
        tokenPercentage: 0
    }
];

MOCK_INVESTMENTS.push(...MOCK_LAND_ITEMS);

// Commodities Mock Data
const MOCK_COMMODITIES = [
    {
        id: 101,
        title: 'Gold Bullion Tokenized',
        tokenSymbol: 'GLD-T',
        category: 'COMMODITIES',
        commodityCategory: 'Precious Metals',
        commodityType: 'Gold',
        esgScore: 'A',
        roi: '8%',
        cagr: '10.50%',
        issuerName: 'Global Precious Metals',
        issuerLogo: 'https://ui-avatars.com/api/?name=Global+Precious+Metals&background=F59E0B&color=fff',
        assetPrice: '$1M',
        tokenPriceETH: '0.05 ETH',
        tokenPriceUSD: '$150 USD',
        availableTokens: 50000,
        totalTokens: 500000,
        status: 'open',
        image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&h=600&fit=crop',
        badge: 'OPEN',
        launchDate: 'Live Now',
        progress: 60,
        investmentStrategy: 'Capital Growth',
        country: 'South Africa',
        region: 'Africa',
        location: 'Johannesburg',
        priceVal: 50000,
        tokenPercentage: 60
    },
    {
        id: 102,
        title: 'Solar Farm Revenue Share',
        tokenSymbol: 'SOLAR-RS',
        category: 'COMMODITIES',
        commodityCategory: 'Energy Commodities',
        commodityType: 'Solar farm revenue share',
        esgScore: 'A+',
        roi: '14%',
        cagr: '16.00%',
        issuerName: 'Renewable Energy Corp',
        issuerLogo: 'https://ui-avatars.com/api/?name=Renewable+Energy&background=10B981&color=fff',
        assetPrice: '$2.5M',
        tokenPriceETH: '0.1 ETH',
        tokenPriceUSD: '$300 USD',
        availableTokens: 100000,
        totalTokens: 1000000,
        status: 'open',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop',
        badge: 'OPEN',
        launchDate: 'Live Now',
        progress: 45,
        investmentStrategy: 'High-Yield',
        country: 'USA',
        region: 'North America',
        location: 'California',
        priceVal: 75000,
        tokenPercentage: 45
    }
];

MOCK_INVESTMENTS.push(...MOCK_COMMODITIES);

// Arts Mock Data
const MOCK_ARTS = [
    {
        id: 201,
        title: 'Monet Water Lilies Fragment',
        tokenSymbol: 'MONET-WL',
        category: 'ARTS',
        artType: 'Paintings',
        artistName: 'Claude Monet',
        artistTier: 'Blue-Chip',
        yearCreated: 1906,
        esgScore: 'A',
        roi: '18%',
        cagr: '22.50%',
        issuerName: 'Christie\'s Tokenized Art',
        issuerLogo: 'https://ui-avatars.com/api/?name=Christies&background=7C3AED&color=fff',
        assetPrice: '$2.5M',
        tokenPriceETH: '0.5 ETH',
        tokenPriceUSD: '$1,500 USD',
        availableTokens: 75000,
        totalTokens: 500000,
        status: 'open',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb39279c23?w=800&h=600&fit=crop',
        badge: 'OPEN',
        launchDate: 'Live Now',
        progress: 85,
        investmentStrategy: 'Blue-Chip Stability',
        authentication: ['Authenticated', 'Museum Exhibited'],
        provenance: 'Private Collection, Paris',
        exhibitionHistory: 'Musée d\'Orsay 2019',
        country: 'France',
        region: 'Europe',
        location: 'Paris',
        priceVal: 150000,
        tokenPercentage: 85
    },
    {
        id: 202,
        title: 'Contemporary Sculpture Series',
        tokenSymbol: 'CONT-SCULPT',
        category: 'ARTS',
        artType: 'Sculptures',
        artistName: 'Anish Kapoor',
        artistTier: 'Established',
        yearCreated: 2020,
        esgScore: 'A',
        roi: '15%',
        cagr: '18.00%',
        issuerName: 'Sotheby\'s Digital',
        issuerLogo: 'https://ui-avatars.com/api/?name=Sothebys&background=DC2626&color=fff',
        assetPrice: '$1.8M',
        tokenPriceETH: '0.3 ETH',
        tokenPriceUSD: '$900 USD',
        availableTokens: 120000,
        totalTokens: 400000,
        status: 'open',
        image: 'https://images.unsplash.com/photo-1554188248-986adbb73be0?w=800&h=600&fit=crop',
        badge: 'OPEN',
        launchDate: 'Live Now',
        progress: 70,
        investmentStrategy: 'Capital Growth',
        authentication: ['Authenticated', 'Auction Proven'],
        provenance: 'Gallery Exhibition 2021',
        exhibitionHistory: 'Tate Modern 2022',
        country: 'UK',
        region: 'Europe',
        location: 'London',
        priceVal: 90000,
        tokenPercentage: 70
    },
    {
        id: 203,
        title: 'NFT Digital Art Masterpiece',
        tokenSymbol: 'NFT-DIGI',
        category: 'ARTS',
        artType: 'Digital / Mixed Media',
        artistName: 'Beeple',
        artistTier: 'Established',
        yearCreated: 2023,
        esgScore: 'B',
        roi: '35%',
        cagr: '45.00%',
        issuerName: 'Nifty Gateway',
        issuerLogo: 'https://ui-avatars.com/api/?name=Nifty+Gateway&background=EC4899&color=fff',
        assetPrice: '$5M',
        tokenPriceETH: '1.2 ETH',
        tokenPriceUSD: '$3,600 USD',
        availableTokens: 200000,
        totalTokens: 1000000,
        status: 'open',
        image: '/assets/publicm/NFT.jpeg',
        badge: 'OPEN',
        launchDate: 'Live Now',
        progress: 80,
        investmentStrategy: 'Speculative Upside',
        authentication: ['Authenticated'],
        provenance: 'Blockchain Verified',
        exhibitionHistory: 'Digital Art Fair 2023',
        country: 'USA',
        region: 'North America',
        location: 'Miami',
        priceVal: 360000,
        tokenPercentage: 80
    }
];

MOCK_INVESTMENTS.push(...MOCK_ARTS);

// Sports Mock Data
const MOCK_SPORTS = [
    {
        id: 301,
        title: 'Cristiano Ronaldo Revenue Share',
        tokenSymbol: 'CR7-REV',
        category: 'SPORTS',
        assetType: 'Athlete Revenue Share',
        sportType: 'Football',
        athleteName: 'Cristiano Ronaldo',
        teamAffiliation: 'Al Nassr FC',
        esgScore: 'A',
        roi: '25%',
        cagr: '30.00%',
        issuerName: 'SportX Capital',
        issuerLogo: 'https://ui-avatars.com/api/?name=SportX&background=EF4444&color=fff',
        assetPrice: '$10M',
        tokenPriceETH: '2.0 ETH',
        tokenPriceUSD: '$6,000 USD',
        availableTokens: 150000,
        totalTokens: 500000,
        status: 'open',
        image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop',
        badge: 'OPEN',
        launchDate: 'Live Now',
        progress: 70,
        investmentStrategy: 'Revenue Yield',
        revenueModel: 'Contracted Revenue Share',
        contractValue: '$200M',
        contractDuration: '3 years',
        country: 'Saudi Arabia',
        region: 'Middle East',
        location: 'Riyadh',
        priceVal: 600000,
        tokenPercentage: 70
    },
    {
        id: 302,
        title: 'Manchester United FC Equity',
        tokenSymbol: 'MANU-EQ',
        category: 'SPORTS',
        assetType: 'Club / Franchise Equity',
        sportType: 'Football',
        athleteName: 'N/A',
        teamAffiliation: 'Manchester United',
        esgScore: 'A',
        roi: '18%',
        cagr: '22.00%',
        issuerName: 'Premier League Investments',
        issuerLogo: 'https://ui-avatars.com/api/?name=PL&background=3B0764&color=fff',
        assetPrice: '$50M',
        tokenPriceETH: '5.0 ETH',
        tokenPriceUSD: '$15,000 USD',
        availableTokens: 80000,
        totalTokens: 200000,
        status: 'open',
        image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&h=600&fit=crop',
        badge: 'OPEN',
        launchDate: 'Live Now',
        progress: 60,
        investmentStrategy: 'Franchise Stability',
        revenueModel: 'Media Rights Distribution',
        contractValue: 'N/A',
        contractDuration: 'Perpetual',
        country: 'UK',
        region: 'Europe',
        location: 'Manchester',
        priceVal: 1500000,
        tokenPercentage: 60
    },
    {
        id: 303,
        title: 'NBA Media Rights Pool',
        tokenSymbol: 'NBA-Media',
        category: 'SPORTS',
        assetType: 'Media Rights Revenue',
        sportType: 'Basketball',
        athleteName: 'N/A',
        teamAffiliation: 'NBA League',
        esgScore: 'A+',
        roi: '20%',
        cagr: '25.00%',
        issuerName: 'NBA Digital Ventures',
        issuerLogo: 'https://ui-avatars.com/api/?name=NBA&background=1D428A&color=fff',
        assetPrice: '$25M',
        tokenPriceETH: '3.5 ETH',
        tokenPriceUSD: '$10,500 USD',
        availableTokens: 0,
        totalTokens: 300000,
        status: 'sold-out',
        image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800&h=600&fit=crop',
        badge: 'SOLD OUT',
        launchDate: 'Sold Out',
        progress: 100,
        investmentStrategy: 'Revenue Yield',
        revenueModel: 'Media Rights Distribution',
        contractValue: '$24B',
        contractDuration: '9 years',
        country: 'USA',
        region: 'North America',
        location: 'New York',
        priceVal: 1050000,
        tokenPercentage: 100
    }
];

MOCK_INVESTMENTS.push(...MOCK_SPORTS);

// Carbon Credits Mock Data
const MOCK_CARBON_CREDITS = [
    {
        id: 401,
        title: 'Amazon Rainforest Conservation',
        tokenSymbol: 'AMZN-CRN',
        category: 'CARBON_CREDITS',
        projectType: 'Forestry',
        standard: 'Gold Standard',
        creditType: 'Nature-Based',
        esgScore: 'A+',
        roi: '15%',
        cagr: '18.00%',
        issuerName: 'Rainforest Trust',
        issuerLogo: 'https://ui-avatars.com/api/?name=Rainforest+Trust&background=059669&color=fff',
        assetPrice: '$5M',
        tokenPriceETH: '0.8 ETH',
        tokenPriceUSD: '$2,400 USD',
        availableTokens: 100000,
        totalTokens: 250000,
        status: 'open',
        image: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800&h=600&fit=crop',
        badge: 'OPEN',
        launchDate: 'Live Now',
        progress: 60,
        investmentStrategy: 'Long-Term Impact',
        co2Volume: '50,000 tonnes/year',
        sdgAlignment: 'SDG 13, 15',
        projectLocation: 'Brazil',
        permanencePeriod: '100 years',
        country: 'Brazil',
        region: 'South America',
        location: 'Amazon Basin',
        priceVal: 240000,
        tokenPercentage: 60
    },
    {
        id: 402,
        title: 'Solar Farm Carbon Offset',
        tokenSymbol: 'SOLAR-CO2',
        category: 'CARBON_CREDITS',
        projectType: 'Renewable Energy',
        standard: 'VARA Standards',
        creditType: 'Tech-Based',
        esgScore: 'A',
        roi: '12%',
        cagr: '14.50%',
        issuerName: 'Clean Energy Fund',
        issuerLogo: 'https://ui-avatars.com/api/?name=Clean+Energy&background=F59E0B&color=fff',
        assetPrice: '$3M',
        tokenPriceETH: '0.5 ETH',
        tokenPriceUSD: '$1,500 USD',
        availableTokens: 80000,
        totalTokens: 200000,
        status: 'open',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop',
        badge: 'OPEN',
        launchDate: 'Live Now',
        progress: 60,
        investmentStrategy: 'Yield via Offtake',
        co2Volume: '30,000 tonnes/year',
        sdgAlignment: 'SDG 7, 13',
        projectLocation: 'India',
        permanencePeriod: '25 years',
        country: 'India',
        region: 'Asia Pacific',
        location: 'Rajasthan',
        priceVal: 150000,
        tokenPercentage: 60
    },
    {
        id: 403,
        title: 'Methane Capture Landfill',
        tokenSymbol: 'METH-CAP',
        category: 'CARBON_CREDITS',
        projectType: 'Methane Capture',
        standard: 'Gold Standard',
        creditType: 'Avoidance',
        esgScore: 'A',
        roi: '18%',
        cagr: '22.00%',
        issuerName: 'Waste Management Corp',
        issuerLogo: 'https://ui-avatars.com/api/?name=Waste+Management&background=1E40AF&color=fff',
        assetPrice: '$8M',
        tokenPriceETH: '1.5 ETH',
        tokenPriceUSD: '$4,500 USD',
        availableTokens: 0,
        totalTokens: 300000,
        status: 'sold-out',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c351a81f80?w=800&h=600&fit=crop',
        badge: 'SOLD OUT',
        launchDate: 'Sold Out',
        progress: 100,
        investmentStrategy: 'Capital Appreciation',
        co2Volume: '75,000 tonnes/year',
        sdgAlignment: 'SDG 11, 13',
        projectLocation: 'USA',
        permanencePeriod: '30 years',
        country: 'USA',
        region: 'North America',
        location: 'California',
        priceVal: 450000,
        tokenPercentage: 100
    }
];

MOCK_INVESTMENTS.push(...MOCK_CARBON_CREDITS);

// Luxury Goods Mock Data
const MOCK_LUXURY_GOODS = [
    {
        id: 501,
        title: 'Rare Diamond Collection',
        tokenSymbol: 'DIAM-LUX',
        category: 'LUXURY_GOODS',
        assetType: 'Jewelry',
        luxuryCategory: 'Fine Jewelry',
        luxuryType: 'Diamonds',
        esgScore: 'A',
        roi: '16%',
        cagr: '20.00%',
        issuerName: 'De Beers Vault',
        issuerLogo: 'https://ui-avatars.com/api/?name=De+Beers&background=10B981&color=fff',
        assetPrice: '$8M',
        tokenPriceETH: '1.0 ETH',
        tokenPriceUSD: '$3,000 USD',
        availableTokens: 120000,
        totalTokens: 400000,
        status: 'open',
        image: 'https://images.unsplash.com/photo-1601121141461-6d6bacc8f59d?w=800&h=600&fit=crop',
        badge: 'OPEN',
        launchDate: 'Live Now',
        progress: 70,
        investmentStrategy: 'Capital Appreciation',
        usageModel: 'Storage Only',
        verification: ['Manufacturer Certified', 'Independently Valued'],
        brand: 'De Beers',
        rarity: 'Flawless',
        certification: 'GIA Certified',
        country: 'South Africa',
        region: 'Africa',
        location: 'Johannesburg',
        priceVal: 300000,
        tokenPercentage: 70
    },
    {
        id: 502,
        title: 'Vintage Wine Portfolio',
        tokenSymbol: 'WINE-VTG',
        category: 'LUXURY_GOODS',
        assetType: 'Wine',
        luxuryCategory: 'Fine Wine & Spirits',
        luxuryType: 'Wine',
        esgScore: 'A',
        roi: '14%',
        cagr: '17.50%',
        issuerName: 'Bordeaux Estates',
        issuerLogo: 'https://ui-avatars.com/api/?name=Bordeaux&background=7C3AED&color=fff',
        assetPrice: '$4.5M',
        tokenPriceETH: '0.6 ETH',
        tokenPriceUSD: '$1,800 USD',
        availableTokens: 80000,
        totalTokens: 300000,
        status: 'open',
        image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&h=600&fit=crop',
        badge: 'OPEN',
        launchDate: 'Live Now',
        progress: 73,
        investmentStrategy: 'Yield via Appreciation',
        usageModel: 'Storage Only',
        verification: ['Independently Valued', 'Insurance Covered'],
        brand: 'Château Margaux',
        rarity: 'Limited Edition',
        certification: 'Wine Spectator Verified',
        vintage: '1982',
        country: 'France',
        region: 'Europe',
        location: 'Bordeaux',
        priceVal: 180000,
        tokenPercentage: 73
    },
    {
        id: 503,
        title: 'Luxury Watch Collection',
        tokenSymbol: 'WATCH-LUX',
        category: 'LUXURY_GOODS',
        assetType: 'Watches',
        luxuryCategory: 'Luxury Watches',
        luxuryType: 'Swiss Watches',
        esgScore: 'A',
        roi: '18%',
        cagr: '22.00%',
        issuerName: 'Swiss Timepiece Fund',
        issuerLogo: 'https://ui-avatars.com/api/?name=Swiss+Timepiece&background=F59E0B&color=fff',
        assetPrice: '$6M',
        tokenPriceETH: '0.8 ETH',
        tokenPriceUSD: '$2,400 USD',
        availableTokens: 0,
        totalTokens: 350000,
        status: 'sold-out',
        image: '/assets/publicm/Rolex.jpeg',
        badge: 'SOLD OUT',
        launchDate: 'Sold Out',
        progress: 100,
        investmentStrategy: 'Blue-Chip Stability',
        usageModel: 'Storage Only',
        verification: ['Manufacturer Certified', 'Service History Verified'],
        brand: 'Patek Philippe',
        rarity: 'Rare',
        certification: 'Swiss Certified',
        country: 'Switzerland',
        region: 'Europe',
        location: 'Geneva',
        priceVal: 240000,
        tokenPercentage: 100
    },
    {
        id: 504,
        title: 'Designer Handbag Vault',
        tokenSymbol: 'BAG-LUX',
        category: 'LUXURY_GOODS',
        assetType: 'Designer Handbags',
        luxuryCategory: 'Designer Fashion',
        luxuryType: 'Handbags',
        esgScore: 'B',
        roi: '20%',
        cagr: '25.00%',
        issuerName: 'Luxury Fashion Capital',
        issuerLogo: 'https://ui-avatars.com/api/?name=Luxury+Fashion&background=EC4899&color=fff',
        assetPrice: '$3.5M',
        tokenPriceETH: '0.5 ETH',
        tokenPriceUSD: '$1,500 USD',
        availableTokens: 100000,
        totalTokens: 280000,
        status: 'open',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=600&fit=crop',
        badge: 'OPEN',
        launchDate: 'Live Now',
        progress: 64,
        investmentStrategy: 'Speculative Upside',
        usageModel: 'Storage Only',
        verification: ['Manufacturer Certified', 'Independently Valued'],
        brand: 'Hermès',
        rarity: 'Limited Edition',
        certification: 'Authenticity Verified',
        country: 'France',
        region: 'Europe',
        location: 'Paris',
        priceVal: 150000,
        tokenPercentage: 64
    },
    {
        id: 505,
        title: 'Classic Car Collection',
        tokenSymbol: 'CAR-CLS',
        category: 'LUXURY_GOODS',
        assetType: 'Cars',
        luxuryCategory: 'Classic Cars',
        luxuryType: 'Vintage Automobiles',
        esgScore: 'B',
        roi: '22%',
        cagr: '28.00%',
        issuerName: 'Classic Auto Investments',
        issuerLogo: 'https://ui-avatars.com/api/?name=Classic+Auto&background=DC2626&color=fff',
        assetPrice: '$12M',
        tokenPriceETH: '2.0 ETH',
        tokenPriceUSD: '$6,000 USD',
        availableTokens: 60000,
        totalTokens: 500000,
        status: 'open',
        image: 'https://images.unsplash.com/photo-1552519507-cf0d5a6e5d0d?w=800&h=600&fit=crop',
        badge: 'OPEN',
        launchDate: 'Live Now',
        progress: 88,
        investmentStrategy: 'Capital Appreciation',
        usageModel: 'Rental Revenue Share',
        verification: ['Service History Verified', 'Insurance Covered', 'Independently Valued'],
        brand: 'Ferrari',
        rarity: 'Ultra Rare',
        certification: 'Classic Car Registry',
        year: '1967',
        country: 'Italy',
        region: 'Europe',
        location: 'Maranello',
        priceVal: 600000,
        tokenPercentage: 88
    },
    {
        id: 506,
        title: 'Super Yacht Charter Fund',
        tokenSymbol: 'YACHT-LUX',
        category: 'LUXURY_GOODS',
        assetType: 'Yachts',
        luxuryCategory: 'Marine Luxury',
        luxuryType: 'Super Yachts',
        esgScore: 'B',
        roi: '24%',
        cagr: '30.00%',
        issuerName: 'Monaco Yacht Partners',
        issuerLogo: 'https://ui-avatars.com/api/?name=Monaco+Yacht&background=0EA5E9&color=fff',
        assetPrice: '$25M',
        tokenPriceETH: '3.5 ETH',
        tokenPriceUSD: '$10,500 USD',
        availableTokens: 80000,
        totalTokens: 600000,
        status: 'open',
        image: '/assets/publicm/yatch.jpeg',
        badge: 'OPEN',
        launchDate: 'Live Now',
        progress: 55,
        investmentStrategy: 'Rental / Charter Yield',
        usageModel: 'Charter Income',
        verification: ['Manufacturer Certified', 'Insurance Covered'],
        brand: 'Lürssen',
        rarity: 'Exclusive',
        certification: 'Lloyd\'s Registered',
        length: '85m',
        country: 'Monaco',
        region: 'Europe',
        location: 'Monaco',
        priceVal: 1050000,
        tokenPercentage: 55
    },
    {
        id: 507,
        title: 'Private Jet Fractional Fund',
        tokenSymbol: 'JET-LUX',
        category: 'LUXURY_GOODS',
        assetType: 'Private Jets',
        luxuryCategory: 'Aviation',
        luxuryType: 'Business Jets',
        esgScore: 'C',
        roi: '20%',
        cagr: '26.00%',
        issuerName: 'Gulfstream Capital',
        issuerLogo: 'https://ui-avatars.com/api/?name=Gulfstream&background=64748B&color=fff',
        assetPrice: '$18M',
        tokenPriceETH: '2.5 ETH',
        tokenPriceUSD: '$7,500 USD',
        availableTokens: 100000,
        totalTokens: 450000,
        status: 'open',
        image: '/assets/publicm/private jet.jpeg',
        badge: 'OPEN',
        launchDate: 'Live Now',
        progress: 78,
        investmentStrategy: 'Long-Term Collectible',
        usageModel: 'Fractional Usage',
        verification: ['Manufacturer Certified', 'Service History Verified', 'Insurance Covered'],
        brand: 'Gulfstream',
        rarity: 'Limited Edition',
        certification: 'FAA Certified',
        model: 'G650ER',
        country: 'USA',
        region: 'North America',
        location: 'Miami',
        priceVal: 750000,
        tokenPercentage: 78
    }
];

MOCK_INVESTMENTS.push(...MOCK_LUXURY_GOODS);

const FILTER_TABS = ['All', 'Real Estate', 'Commodities', 'Arts', 'Sports', 'Carbon Credits', 'Luxury Goods'];

const PROPERTY_TYPES = ['All', 'Residential', 'Commercial', 'Land', 'Multi-Units'];
const INVESTMENT_STRATEGIES = ['Capital Growth', 'High-Yield', 'Prime', 'Fix & Flip'];
const COMPLETION_STATUSES = ['All', 'Ready', 'Under Construction', 'Off-Plan'];

const BED_OPTIONS = ['1', '2', '3', '4', '5', '6'];

// Commodities Type Options
const PRECIOUS_METALS_TYPES = ['All', 'Gold', 'Silver', 'Platinum', 'Palladium'];
const ENERGY_COMMODITIES_TYPES = [
    'All',
    'Solar farm revenue share',
    'Wind farm SPV',
    'Diesel inventory trade finance',
    'Crude oil storage-backed contract',
    'LNG contract-backed exposure',
    'Long-term strategic energy exposure'
];
const AGRICULTURAL_COMMODITIES_TYPES = [
    'All',
    'Wheat',
    'Corn',
    'Rice',
    'Coffee',
    'Cocoa',
    'Cotton',
    'Soybeans',
    'Palm oil',
    'Saffron',
    'Black pepper'
];
const INDUSTRIAL_STRATEGIC_METALS_TYPES = [
    'All',
    'Copper (warehouse-backed)',
    'Lithium carbonate (inventory-backed)',
    'Nickel (refined stock)',
    'Mining revenue SPV (structured exposure)'
];

const COMMODITIES_CATEGORIES = ['Precious Metals', 'Energy Commodities', 'Agricultural Commodities', 'Industrial / Strategic Metals'];

// Arts Type Options
const ARTS_TYPES = ['All', 'Paintings', 'Sculptures', 'Photography', 'Digital / Mixed Media'];

// Artist Tier Options
const ARTIST_TIERS = ['Emerging', 'Mid-Career', 'Established', 'Blue-Chip'];

// Arts Investment Strategies
const ARTS_INVESTMENT_STRATEGIES = ['Capital Growth', 'Blue-Chip Stability', 'Speculative Upside', 'Curated Portfolio'];

// Authentication Options
const AUTHENTICATION_OPTIONS = ['Authenticated', 'Museum Exhibited', 'Auction Proven', 'Private Collection Verified'];

// Sports Asset Type Options
const SPORTS_ASSET_TYPES = [
    'All',
    'Athlete Revenue Share',
    'Sports Academy Investment',
    'Club / Franchise Equity',
    'Media Rights Revenue',
    'Tournament Revenue Pool'
];

// Sports Type Options
const SPORTS_TYPES = ['All', 'Football', 'Cricket', 'Basketball', 'Tennis', 'Motorsports', 'Others'];

// Sports Investment Strategies
const SPORTS_INVESTMENT_STRATEGIES = ['Revenue Yield', 'Growth Potential', 'Performance-Linked', 'Franchise Stability'];

// Sports Revenue Models
const SPORTS_REVENUE_MODELS = [
    'Contracted Revenue Share',
    'Sponsorship Income',
    'Media Rights Distribution',
    'Prize Pool Distribution',
    'Equity Appreciation'
];

// Carbon Credits Project Types
const CARBON_PROJECT_TYPES = ['All', 'Forestry', 'Renewable Energy', 'Methane Capture', 'Industrial Reduction', 'Blue Carbon'];

// Carbon Credits Standards
const CARBON_STANDARDS = ['All', 'VARA Standards', 'Gold Standard'];

// Carbon Credits Investment Strategies
const CARBON_INVESTMENT_STRATEGIES = ['Capital Appreciation', 'Yield via Offtake', 'Long-Term Impact', 'ESG Allocation'];

// Carbon Credits Credit Types
const CARBON_CREDIT_TYPES = ['All', 'Avoidance', 'Removal', 'Nature-Based', 'Tech-Based'];

// Carbon Credits Impact Metrics Options
const CARBON_IMPACT_METRICS = ['CO₂ Volume', 'SDG Alignment', 'Project Location', 'Permanence Period'];

// Luxury Goods Categories
const LUXURY_CATEGORIES = ['Fine Jewelry', 'Fine Wine & Spirits', 'Luxury Watches', 'Designer Fashion', 'Classic Cars', 'Collectibles'];

// Luxury Goods Types
const LUXURY_TYPES = ['All', 'Diamonds', 'Gemstones', 'Wine', 'Whisky', 'Swiss Watches', 'Handbags', 'Shoes', 'Vintage Automobiles', 'Art Cars'];

// Luxury Brands
const LUXURY_BRANDS = ['All', 'De Beers', 'Cartier', 'Tiffany', 'Château Margaux', 'Dom Pérignon', 'Patek Philippe', 'Rolex', 'Audemars Piguet', 'Hermès', 'Chanel', 'Louis Vuitton', 'Ferrari', 'Porsche', 'McLaren'];

// Luxury Asset Types
const LUXURY_ASSET_TYPES = ['All', 'Cars', 'Watches', 'Yachts', 'Private Jets', 'Designer Handbags', 'Jewelry'];

// Luxury Investment Strategies
const LUXURY_INVESTMENT_STRATEGIES = ['Capital Appreciation', 'Blue-Chip Stability', 'Speculative Upside', 'Yield via Appreciation', 'Rare Asset Collection', 'Limited Edition Scarcity', 'Rental / Charter Yield', 'Long-Term Collectible'];

// Luxury Usage Models
const LUXURY_USAGE_MODELS = ['Storage Only', 'Rental Revenue Share', 'Charter Income', 'Fractional Usage'];

// Luxury Verification Options
const LUXURY_VERIFICATION = ['Manufacturer Certified', 'Service History Verified', 'Insurance Covered', 'Independently Valued'];

// Luxury Rarity Levels
const LUXURY_RARITY_LEVELS = ['All', 'Flawless', 'Ultra Rare', 'Rare', 'Limited Edition', 'Exclusive'];

const SORT_OPTIONS = [
    { label: 'Listing Price > Highest to low', value: 'price_desc' },
    { label: 'Listing Price > Lowest to high', value: 'price_asc' },
    { label: 'Percentage Tokens > Lowest first', value: 'tokens_asc' },
    { label: 'Percentage Tokens > Highest first', value: 'tokens_desc' },
];

const FilterPanel = ({ isOpen, onClose, activeTab, filters, setFilters, onApply }) => {
    const [localFilters, setLocalFilters] = useState(filters);
    const [isBedsDropdownOpen, setIsBedsDropdownOpen] = useState(false);

    // Sync local state with props when panel opens
    React.useEffect(() => {
        setLocalFilters(filters);
    }, [filters, isOpen]);

    const updateFilter = (key, value) => {
        setLocalFilters(prev => ({ ...prev, [key]: value }));
    };

    const toggleInvestmentStrategy = (strategy) => {
        const current = localFilters.selectedInvestmentStrategies || [];
        const updated = current.includes(strategy)
            ? current.filter(s => s !== strategy)
            : [...current, strategy];
        updateFilter('selectedInvestmentStrategies', updated);
    };

    if (!isOpen || activeTab !== 'Real Estate') return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-4 md:p-5 mb-8 overflow-visible z-20 relative"
        >
            <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        Real Estate <ChevronDown size={20} />
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4">
                        {/* Property Types */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Property Type</label>
                            <div className="flex flex-wrap gap-2">
                                {PROPERTY_TYPES.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => {
                                            updateFilter('selectedPropertyType', type === localFilters.selectedPropertyType ? '' : type);
                                            if (type !== localFilters.selectedPropertyType) updateFilter('selectedInvestmentStrategies', []);
                                        }}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${localFilters.selectedPropertyType === type
                                            ? 'bg-[#0F172A] text-white border-[#0F172A]'
                                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Investment Strategies - Shows for ALL property types */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">
                                Investment Strategy
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {INVESTMENT_STRATEGIES.map(strategy => (
                                    <button
                                        key={strategy}
                                        onClick={() => toggleInvestmentStrategy(strategy)}
                                        className={`px-3 py-2 rounded-lg text-sm text-left transition-colors flex items-center justify-between group ${(localFilters.selectedInvestmentStrategies || []).includes(strategy)
                                            ? 'bg-blue-50 text-blue-700 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="truncate mr-1">{strategy}</span>
                                        {(localFilters.selectedInvestmentStrategies || []).includes(strategy) && <Check size={14} className="flex-shrink-0" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-4">
                        {/* Completion Status - Shows for Residential, Commercial, Multi-Units (NOT Land) */}
                        <AnimatePresence>
                            {(localFilters.selectedPropertyType === 'Residential' || localFilters.selectedPropertyType === 'Commercial' || localFilters.selectedPropertyType === 'Multi-Units') && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Completion Status</label>
                                    <div className="flex flex-wrap gap-2">
                                        {COMPLETION_STATUSES.map(status => (
                                            <button
                                                key={status}
                                                onClick={() => updateFilter('completionStatus', status)}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${localFilters.completionStatus === status
                                                    ? 'bg-[#0F172A] text-white border-[#0F172A]'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Location Filters - Shows for ALL property types */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Location</label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                {/* Country */}
                                <div className="relative flex-1">
                                    <select
                                        className="w-full appearance-none bg-white border border-gray-200 text-gray-900 py-2.5 px-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={localFilters.country || ''}
                                        onChange={(e) => {
                                            updateFilter('country', e.target.value);
                                            updateFilter('city', '');
                                        }}
                                    >
                                        <option value="">Country</option>
                                        <option value="UK">UK</option>
                                        <option value="UAE">UAE</option>
                                        <option value="USA">USA</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>

                                {/* City - Dependent on Country */}
                                <div className="relative flex-1">
                                    <select
                                        className="w-full appearance-none bg-white border border-gray-200 text-gray-900 py-2.5 px-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                        value={localFilters.city || ''}
                                        onChange={(e) => updateFilter('city', e.target.value)}
                                        disabled={!localFilters.country}
                                    >
                                        <option value="">City</option>
                                        {localFilters.country === 'UK' && (
                                            <>
                                                <option value="London">London</option>
                                                <option value="Manchester">Manchester</option>
                                            </>
                                        )}
                                        {localFilters.country === 'UAE' && (
                                            <>
                                                <option value="Dubai">Dubai</option>
                                                <option value="Abu Dhabi">Abu Dhabi</option>
                                            </>
                                        )}
                                        {localFilters.country === 'USA' && (
                                            <>
                                                <option value="New York">New York</option>
                                                <option value="Los Angeles">Los Angeles</option>
                                                <option value="Miami">Miami</option>
                                            </>
                                        )}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>

                                {/* Search within selected location */}
                                <div className="relative flex-[1.5]">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search size={14} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder={localFilters.country ? `Search in ${localFilters.country}...` : 'Search location...'}
                                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                                        value={localFilters.location || ''}
                                        onChange={(e) => updateFilter('location', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bedrooms - Only for Residential */}
                        {localFilters.selectedPropertyType === 'Residential' && (
                            <div className="relative">
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Bedrooms</label>
                                <button
                                    onClick={() => setIsBedsDropdownOpen(!isBedsDropdownOpen)}
                                    className="w-full flex items-center justify-between bg-white border border-gray-200 text-gray-700 text-sm font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <span className="truncate mr-2">
                                        {localFilters.minBeds === 'Any' && localFilters.maxBeds === 'Any'
                                            ? 'Any'
                                            : `${localFilters.minBeds} - ${localFilters.maxBeds}`}
                                    </span>
                                    <ChevronDown size={16} className="flex-shrink-0" />
                                </button>
                                <AnimatePresence>
                                    {isBedsDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute top-full left-0 mt-2 w-full sm:w-[480px] bg-white rounded-xl shadow-2xl border border-gray-100 p-5 z-50 flex flex-col sm:flex-row gap-4"
                                        >
                                            <div className="flex-1">
                                                <label className="block text-xs font-bold text-gray-500 mb-1.5">Min Bedrooms</label>
                                                <div className="relative">
                                                    <select
                                                        className="w-full appearance-none bg-white border border-gray-200 text-gray-900 py-2.5 px-3 pr-8 rounded-lg text-sm focus:outline-none focus:border-gray-400"
                                                        value={localFilters.minBeds}
                                                        onChange={(e) => updateFilter('minBeds', e.target.value)}
                                                    >
                                                        <option value="Any">Any</option>
                                                        {BED_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                    </select>
                                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                </div>
                                            </div>
                                            <div className="hidden sm:flex items-center pt-5 text-gray-400">-</div>
                                            <div className="flex-1">
                                                <label className="block text-xs font-bold text-gray-500 mb-1.5">Max Bedrooms</label>
                                                <div className="relative">
                                                    <select
                                                        className="w-full appearance-none bg-white border border-gray-200 text-gray-900 py-2.5 px-3 pr-8 rounded-lg text-sm focus:outline-none focus:border-gray-400"
                                                        value={localFilters.maxBeds}
                                                        onChange={(e) => updateFilter('maxBeds', e.target.value)}
                                                    >
                                                        <option value="Any">Any</option>
                                                        {BED_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                    </select>
                                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end pt-4 border-t border-gray-50 mt-4">
                    <button
                        onClick={() => {
                            setFilters(localFilters);
                            onApply(localFilters);
                            onClose();
                        }}
                        className="px-8 py-3 bg-[#10B981] hover:bg-[#059669] text-white font-bold rounded-lg transition-colors shadow-lg shadow-green-100"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const CommoditiesFilterPanel = ({ isOpen, onClose, activeTab, filters, setFilters, onApply }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    // Sync local state with props when panel opens
    React.useEffect(() => {
        setLocalFilters(filters);
    }, [filters, isOpen]);

    const updateFilter = (key, value) => {
        setLocalFilters(prev => ({ ...prev, [key]: value }));
    };

    const toggleInvestmentStrategy = (strategy) => {
        const current = localFilters.selectedInvestmentStrategies || [];
        const updated = current.includes(strategy)
            ? current.filter(s => s !== strategy)
            : [...current, strategy];
        updateFilter('selectedInvestmentStrategies', updated);
    };

    const getCommodityTypes = (category) => {
        switch (category) {
            case 'Precious Metals':
                return PRECIOUS_METALS_TYPES;
            case 'Energy Commodities':
                return ENERGY_COMMODITIES_TYPES;
            case 'Agricultural Commodities':
                return AGRICULTURAL_COMMODITIES_TYPES;
            case 'Industrial / Strategic Metals':
                return INDUSTRIAL_STRATEGIC_METALS_TYPES;
            default:
                return ['All'];
        }
    };

    if (!isOpen || activeTab !== 'Commodities') return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-4 md:p-5 mb-8 overflow-visible z-20 relative"
        >
            <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        Commodities <ChevronDown size={20} />
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {/* Left Column - Category & Type */}
                    <div className="flex flex-col gap-4">
                        {/* Commodities Categories */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Category</label>
                            <div className="flex flex-wrap gap-2">
                                {COMMODITIES_CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            updateFilter('selectedCategory', cat === localFilters.selectedCategory ? '' : cat);
                                            if (cat !== localFilters.selectedCategory) updateFilter('selectedCommodityType', 'All');
                                        }}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${localFilters.selectedCategory === cat
                                            ? 'bg-[#0F172A] text-white border-[#0F172A]'
                                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Commodity Type - Dynamic based on category */}
                        {localFilters.selectedCategory && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <label className="block text-sm font-bold text-gray-700 mb-3">
                                    Type
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {getCommodityTypes(localFilters.selectedCategory).map(type => (
                                        <button
                                            key={type}
                                            onClick={() => updateFilter('selectedCommodityType', type)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${localFilters.selectedCommodityType === type
                                                ? 'bg-[#0F172A] text-white border-[#0F172A]'
                                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Investment Strategies */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">
                                Investment Strategy
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {INVESTMENT_STRATEGIES.map(strategy => (
                                    <button
                                        key={strategy}
                                        onClick={() => toggleInvestmentStrategy(strategy)}
                                        className={`px-3 py-2 rounded-lg text-sm text-left transition-colors flex items-center justify-between group ${(localFilters.selectedInvestmentStrategies || []).includes(strategy)
                                            ? 'bg-blue-50 text-blue-700 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="truncate mr-1">{strategy}</span>
                                        {(localFilters.selectedInvestmentStrategies || []).includes(strategy) && <Check size={14} className="flex-shrink-0" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Location Filters */}
                    <div className="flex flex-col gap-4">
                        {/* Location Filters */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Origin</label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                {/* Country */}
                                <div className="relative flex-1">
                                    <select
                                        className="w-full appearance-none bg-white border border-gray-200 text-gray-900 py-2.5 px-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={localFilters.country || ''}
                                        onChange={(e) => {
                                            updateFilter('country', e.target.value);
                                            updateFilter('city', '');
                                        }}
                                    >
                                        <option value="">Country</option>
                                        <option value="USA">USA</option>
                                        <option value="UK">UK</option>
                                        <option value="UAE">UAE</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Brazil">Brazil</option>
                                        <option value="China">China</option>
                                        <option value="India">India</option>
                                        <option value="South Africa">South Africa</option>
                                        <option value="Russia">Russia</option>
                                        <option value="Indonesia">Indonesia</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>

                                {/* City - Dependent on Country */}
                                <div className="relative flex-1">
                                    <select
                                        className="w-full appearance-none bg-white border border-gray-200 text-gray-900 py-2.5 px-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                        value={localFilters.city || ''}
                                        onChange={(e) => updateFilter('city', e.target.value)}
                                        disabled={!localFilters.country}
                                    >
                                        <option value="">City</option>
                                        {localFilters.country === 'USA' && (
                                            <>
                                                <option value="New York">New York</option>
                                                <option value="Los Angeles">Los Angeles</option>
                                                <option value="Chicago">Chicago</option>
                                            </>
                                        )}
                                        {localFilters.country === 'UK' && (
                                            <>
                                                <option value="London">London</option>
                                                <option value="Manchester">Manchester</option>
                                            </>
                                        )}
                                        {localFilters.country === 'UAE' && (
                                            <>
                                                <option value="Dubai">Dubai</option>
                                                <option value="Abu Dhabi">Abu Dhabi</option>
                                            </>
                                        )}
                                        {localFilters.country === 'Australia' && (
                                            <>
                                                <option value="Sydney">Sydney</option>
                                                <option value="Melbourne">Melbourne</option>
                                            </>
                                        )}
                                        {localFilters.country === 'Brazil' && (
                                            <>
                                                <option value="Sao Paulo">Sao Paulo</option>
                                                <option value="Rio de Janeiro">Rio de Janeiro</option>
                                            </>
                                        )}
                                        {localFilters.country === 'China' && (
                                            <>
                                                <option value="Shanghai">Shanghai</option>
                                                <option value="Beijing">Beijing</option>
                                            </>
                                        )}
                                        {localFilters.country === 'India' && (
                                            <>
                                                <option value="Mumbai">Mumbai</option>
                                                <option value="Delhi">Delhi</option>
                                            </>
                                        )}
                                        {localFilters.country === 'South Africa' && (
                                            <>
                                                <option value="Johannesburg">Johannesburg</option>
                                                <option value="Cape Town">Cape Town</option>
                                            </>
                                        )}
                                        {localFilters.country === 'Russia' && (
                                            <>
                                                <option value="Moscow">Moscow</option>
                                                <option value="St Petersburg">St Petersburg</option>
                                            </>
                                        )}
                                        {localFilters.country === 'Indonesia' && (
                                            <>
                                                <option value="Jakarta">Jakarta</option>
                                                <option value="Bali">Bali</option>
                                            </>
                                        )}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>

                                {/* Search within selected location */}
                                <div className="relative flex-[1.5]">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search size={14} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder={localFilters.country ? `Search in ${localFilters.country}...` : 'Search location...'}
                                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                                        value={localFilters.location || ''}
                                        onChange={(e) => updateFilter('location', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end pt-4 border-t border-gray-50 mt-4">
                    <button
                        onClick={() => {
                            setFilters(localFilters);
                            onApply(localFilters);
                            onClose();
                        }}
                        className="px-8 py-3 bg-[#10B981] hover:bg-[#059669] text-white font-bold rounded-lg transition-colors shadow-lg shadow-green-100"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const ArtsFilterPanel = ({ isOpen, onClose, activeTab, filters, setFilters, onApply }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    // Sync local state with props when panel opens
    React.useEffect(() => {
        setLocalFilters(filters);
    }, [filters, isOpen]);

    const updateFilter = (key, value) => {
        setLocalFilters(prev => ({ ...prev, [key]: value }));
    };

    const toggleInvestmentStrategy = (strategy) => {
        const current = localFilters.selectedInvestmentStrategies || [];
        const updated = current.includes(strategy)
            ? current.filter(s => s !== strategy)
            : [...current, strategy];
        updateFilter('selectedInvestmentStrategies', updated);
    };

    const toggleAuthentication = (auth) => {
        const current = localFilters.selectedAuthentications || [];
        const updated = current.includes(auth)
            ? current.filter(a => a !== auth)
            : [...current, auth];
        updateFilter('selectedAuthentications', updated);
    };

    if (!isOpen || activeTab !== 'Arts') return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-4 md:p-5 mb-8 overflow-visible z-20 relative"
        >
            <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        Arts <ChevronDown size={20} />
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {/* Left Column - Type, Artist Tier, Investment Strategy */}
                    <div className="flex flex-col gap-4">
                        {/* Arts Types */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Type</label>
                            <div className="flex flex-wrap gap-2">
                                {ARTS_TYPES.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => updateFilter('selectedType', type)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${localFilters.selectedType === type
                                            ? 'bg-[#0F172A] text-white border-[#0F172A]'
                                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Artist Tier */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Artist Tier</label>
                            <div className="grid grid-cols-2 gap-2">
                                {ARTIST_TIERS.map(tier => (
                                    <button
                                        key={tier}
                                        onClick={() => updateFilter('artistTier', tier)}
                                        className={`px-3 py-2 rounded-lg text-sm text-left transition-colors flex items-center justify-between group ${localFilters.artistTier === tier
                                            ? 'bg-purple-50 text-purple-700 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="truncate mr-1">{tier}</span>
                                        {localFilters.artistTier === tier && <Check size={14} className="flex-shrink-0" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Investment Strategies */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">
                                Investment Strategy
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {ARTS_INVESTMENT_STRATEGIES.map(strategy => (
                                    <button
                                        key={strategy}
                                        onClick={() => toggleInvestmentStrategy(strategy)}
                                        className={`px-3 py-2 rounded-lg text-sm text-left transition-colors flex items-center justify-between group ${(localFilters.selectedInvestmentStrategies || []).includes(strategy)
                                            ? 'bg-blue-50 text-blue-700 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="truncate mr-1">{strategy}</span>
                                        {(localFilters.selectedInvestmentStrategies || []).includes(strategy) && <Check size={14} className="flex-shrink-0" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Authentication & Location */}
                    <div className="flex flex-col gap-4">
                        {/* Authentication */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Authentication</label>
                            <div className="grid grid-cols-1 gap-2">
                                {AUTHENTICATION_OPTIONS.map(auth => (
                                    <button
                                        key={auth}
                                        onClick={() => toggleAuthentication(auth)}
                                        className={`px-4 py-3 rounded-lg text-sm text-left transition-colors flex items-center justify-between group ${(localFilters.selectedAuthentications || []).includes(auth)
                                            ? 'bg-green-50 text-green-700 font-semibold border-2 border-green-200'
                                            : 'text-gray-600 hover:bg-gray-50 border-2 border-transparent'
                                            }`}
                                    >
                                        <span className="truncate mr-2">{auth}</span>
                                        {(localFilters.selectedAuthentications || []).includes(auth) && <Check size={16} className="flex-shrink-0" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Location Filters */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Location</label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                {/* Country */}
                                <div className="relative flex-1">
                                    <select
                                        className="w-full appearance-none bg-white border border-gray-200 text-gray-900 py-2.5 px-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={localFilters.country || ''}
                                        onChange={(e) => {
                                            updateFilter('country', e.target.value);
                                            updateFilter('city', '');
                                        }}
                                    >
                                        <option value="">Country</option>
                                        <option value="USA">USA</option>
                                        <option value="UK">UK</option>
                                        <option value="France">France</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>

                                {/* City - Dependent on Country */}
                                <div className="relative flex-1">
                                    <select
                                        className="w-full appearance-none bg-white border border-gray-200 text-gray-900 py-2.5 px-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                        value={localFilters.city || ''}
                                        onChange={(e) => updateFilter('city', e.target.value)}
                                        disabled={!localFilters.country}
                                    >
                                        <option value="">City</option>
                                        {localFilters.country === 'USA' && (
                                            <>
                                                <option value="New York">New York</option>
                                                <option value="Los Angeles">Los Angeles</option>
                                                <option value="Miami">Miami</option>
                                            </>
                                        )}
                                        {localFilters.country === 'UK' && (
                                            <>
                                                <option value="London">London</option>
                                                <option value="Manchester">Manchester</option>
                                            </>
                                        )}
                                        {localFilters.country === 'France' && (
                                            <>
                                                <option value="Paris">Paris</option>
                                                <option value="Lyon">Lyon</option>
                                            </>
                                        )}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>

                                {/* Search within selected location */}
                                <div className="relative flex-[1.5]">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search size={14} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder={localFilters.country ? `Search in ${localFilters.country}...` : 'Search location...'}
                                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                                        value={localFilters.location || ''}
                                        onChange={(e) => updateFilter('location', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end pt-4 border-t border-gray-50 mt-4">
                    <button
                        onClick={() => {
                            setFilters(localFilters);
                            onApply(localFilters);
                            onClose();
                        }}
                        className="px-8 py-3 bg-[#10B981] hover:bg-[#059669] text-white font-bold rounded-lg transition-colors shadow-lg shadow-green-100"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const SportsFilterPanel = ({ isOpen, onClose, activeTab, filters, setFilters, onApply }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    // Sync local state with props when panel opens
    React.useEffect(() => {
        setLocalFilters(filters);
    }, [filters, isOpen]);

    const updateFilter = (key, value) => {
        setLocalFilters(prev => ({ ...prev, [key]: value }));
    };

    const toggleInvestmentStrategy = (strategy) => {
        const current = localFilters.selectedInvestmentStrategies || [];
        const updated = current.includes(strategy)
            ? current.filter(s => s !== strategy)
            : [...current, strategy];
        updateFilter('selectedInvestmentStrategies', updated);
    };

    const toggleRevenueModel = (model) => {
        const current = localFilters.selectedRevenueModels || [];
        const updated = current.includes(model)
            ? current.filter(m => m !== model)
            : [...current, model];
        updateFilter('selectedRevenueModels', updated);
    };

    if (!isOpen || activeTab !== 'Sports') return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-4 md:p-5 mb-8 overflow-visible z-20 relative"
        >
            <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        Sports <ChevronDown size={20} />
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {/* Left Column - Asset Type, Sport Type, Investment Strategy */}
                    <div className="flex flex-col gap-4">
                        {/* Sports Asset Types */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Asset Type</label>
                            <div className="flex flex-wrap gap-2">
                                {SPORTS_ASSET_TYPES.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => updateFilter('selectedAssetType', type)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${localFilters.selectedAssetType === type
                                            ? 'bg-[#0F172A] text-white border-[#0F172A]'
                                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sport Type */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Sport Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                {SPORTS_TYPES.map(sport => (
                                    <button
                                        key={sport}
                                        onClick={() => updateFilter('sportType', sport)}
                                        className={`px-3 py-2 rounded-lg text-sm text-left transition-colors flex items-center justify-between group ${localFilters.sportType === sport
                                            ? 'bg-orange-50 text-orange-700 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="truncate mr-1">{sport}</span>
                                        {localFilters.sportType === sport && <Check size={14} className="flex-shrink-0" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Investment Strategies */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">
                                Investment Strategy
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {SPORTS_INVESTMENT_STRATEGIES.map(strategy => (
                                    <button
                                        key={strategy}
                                        onClick={() => toggleInvestmentStrategy(strategy)}
                                        className={`px-3 py-2 rounded-lg text-sm text-left transition-colors flex items-center justify-between group ${(localFilters.selectedInvestmentStrategies || []).includes(strategy)
                                            ? 'bg-blue-50 text-blue-700 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="truncate mr-1">{strategy}</span>
                                        {(localFilters.selectedInvestmentStrategies || []).includes(strategy) && <Check size={14} className="flex-shrink-0" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Revenue Model & Location */}
                    <div className="flex flex-col gap-4">
                        {/* Revenue Model */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Revenue Model</label>
                            <div className="grid grid-cols-1 gap-2">
                                {SPORTS_REVENUE_MODELS.map(model => (
                                    <button
                                        key={model}
                                        onClick={() => toggleRevenueModel(model)}
                                        className={`px-4 py-3 rounded-lg text-sm text-left transition-colors flex items-center justify-between group ${(localFilters.selectedRevenueModels || []).includes(model)
                                            ? 'bg-orange-50 text-orange-700 font-semibold border-2 border-orange-200'
                                            : 'text-gray-600 hover:bg-gray-50 border-2 border-transparent'
                                            }`}
                                    >
                                        <span className="truncate mr-2">{model}</span>
                                        {(localFilters.selectedRevenueModels || []).includes(model) && <Check size={16} className="flex-shrink-0" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Location Filters */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Location</label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                {/* Country */}
                                <div className="relative flex-1">
                                    <select
                                        className="w-full appearance-none bg-white border border-gray-200 text-gray-900 py-2.5 px-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={localFilters.country || ''}
                                        onChange={(e) => {
                                            updateFilter('country', e.target.value);
                                            updateFilter('city', '');
                                        }}
                                    >
                                        <option value="">Country</option>
                                        <option value="USA">USA</option>
                                        <option value="UK">UK</option>
                                        <option value="Saudi Arabia">Saudi Arabia</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>

                                {/* City - Dependent on Country */}
                                <div className="relative flex-1">
                                    <select
                                        className="w-full appearance-none bg-white border border-gray-200 text-gray-900 py-2.5 px-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                        value={localFilters.city || ''}
                                        onChange={(e) => updateFilter('city', e.target.value)}
                                        disabled={!localFilters.country}
                                    >
                                        <option value="">City</option>
                                        {localFilters.country === 'USA' && (
                                            <>
                                                <option value="New York">New York</option>
                                                <option value="Los Angeles">Los Angeles</option>
                                                <option value="Miami">Miami</option>
                                            </>
                                        )}
                                        {localFilters.country === 'UK' && (
                                            <>
                                                <option value="London">London</option>
                                                <option value="Manchester">Manchester</option>
                                            </>
                                        )}
                                        {localFilters.country === 'Saudi Arabia' && (
                                            <>
                                                <option value="Riyadh">Riyadh</option>
                                                <option value="Jeddah">Jeddah</option>
                                            </>
                                        )}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>

                                {/* Search within selected location */}
                                <div className="relative flex-[1.5]">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search size={14} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder={localFilters.country ? `Search in ${localFilters.country}...` : 'Search location...'}
                                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                                        value={localFilters.location || ''}
                                        onChange={(e) => updateFilter('location', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end pt-4 border-t border-gray-50 mt-4">
                    <button
                        onClick={() => {
                            setFilters(localFilters);
                            onApply(localFilters);
                            onClose();
                        }}
                        className="px-8 py-3 bg-[#10B981] hover:bg-[#059669] text-white font-bold rounded-lg transition-colors shadow-lg shadow-green-100"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const CarbonCreditsFilterPanel = ({ isOpen, onClose, activeTab, filters, setFilters, onApply }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    // Sync local state with props when panel opens
    React.useEffect(() => {
        setLocalFilters(filters);
    }, [filters, isOpen]);

    const updateFilter = (key, value) => {
        setLocalFilters(prev => ({ ...prev, [key]: value }));
    };

    const toggleInvestmentStrategy = (strategy) => {
        const current = localFilters.selectedInvestmentStrategies || [];
        const updated = current.includes(strategy)
            ? current.filter(s => s !== strategy)
            : [...current, strategy];
        updateFilter('selectedInvestmentStrategies', updated);
    };

    const toggleCreditType = (type) => {
        const current = localFilters.selectedCreditTypes || [];
        const updated = current.includes(type)
            ? current.filter(t => t !== type)
            : [...current, type];
        updateFilter('selectedCreditTypes', updated);
    };

    if (!isOpen || activeTab !== 'Carbon Credits') return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-4 md:p-5 mb-8 overflow-visible z-20 relative"
        >
            <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        Carbon Credits <ChevronDown size={20} />
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {/* Left Column - Project Type, Standard, Investment Strategy */}
                    <div className="flex flex-col gap-4">
                        {/* Project Type */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Project Type</label>
                            <div className="flex flex-wrap gap-2">
                                {CARBON_PROJECT_TYPES.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => updateFilter('selectedProjectType', type)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${localFilters.selectedProjectType === type
                                            ? 'bg-[#0F172A] text-white border-[#0F172A]'
                                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Standard */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Standard</label>
                            <div className="grid grid-cols-2 gap-2">
                                {CARBON_STANDARDS.map(standard => (
                                    <button
                                        key={standard}
                                        onClick={() => updateFilter('selectedStandard', standard)}
                                        className={`px-3 py-2 rounded-lg text-sm text-left transition-colors flex items-center justify-between group ${localFilters.selectedStandard === standard
                                            ? 'bg-green-50 text-green-700 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="truncate mr-1">{standard}</span>
                                        {localFilters.selectedStandard === standard && <Check size={14} className="flex-shrink-0" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Investment Strategies */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">
                                Investment Strategy
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {CARBON_INVESTMENT_STRATEGIES.map(strategy => (
                                    <button
                                        key={strategy}
                                        onClick={() => toggleInvestmentStrategy(strategy)}
                                        className={`px-3 py-2 rounded-lg text-sm text-left transition-colors flex items-center justify-between group ${(localFilters.selectedInvestmentStrategies || []).includes(strategy)
                                            ? 'bg-blue-50 text-blue-700 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="truncate mr-1">{strategy}</span>
                                        {(localFilters.selectedInvestmentStrategies || []).includes(strategy) && <Check size={14} className="flex-shrink-0" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Credit Type & Location */}
                    <div className="flex flex-col gap-4">
                        {/* Credit Type */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Credit Type</label>
                            <div className="grid grid-cols-1 gap-2">
                                {CARBON_CREDIT_TYPES.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => toggleCreditType(type)}
                                        className={`px-4 py-3 rounded-lg text-sm text-left transition-colors flex items-center justify-between group ${(localFilters.selectedCreditTypes || []).includes(type)
                                            ? 'bg-emerald-50 text-emerald-700 font-semibold border-2 border-emerald-200'
                                            : 'text-gray-600 hover:bg-gray-50 border-2 border-transparent'
                                            }`}
                                    >
                                        <span className="truncate mr-2">{type}</span>
                                        {(localFilters.selectedCreditTypes || []).includes(type) && <Check size={16} className="flex-shrink-0" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Location Filters */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Location</label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                {/* Country */}
                                <div className="relative flex-1">
                                    <select
                                        className="w-full appearance-none bg-white border border-gray-200 text-gray-900 py-2.5 px-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={localFilters.country || ''}
                                        onChange={(e) => {
                                            updateFilter('country', e.target.value);
                                            updateFilter('city', '');
                                        }}
                                    >
                                        <option value="">Country</option>
                                        <option value="Brazil">Brazil</option>
                                        <option value="USA">USA</option>
                                        <option value="India">India</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>

                                {/* City - Dependent on Country */}
                                <div className="relative flex-1">
                                    <select
                                        className="w-full appearance-none bg-white border border-gray-200 text-gray-900 py-2.5 px-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                        value={localFilters.city || ''}
                                        onChange={(e) => updateFilter('city', e.target.value)}
                                        disabled={!localFilters.country}
                                    >
                                        <option value="">City</option>
                                        {localFilters.country === 'Brazil' && (
                                            <>
                                                <option value="Sao Paulo">Sao Paulo</option>
                                                <option value="Rio de Janeiro">Rio de Janeiro</option>
                                                <option value="Brasilia">Brasilia</option>
                                            </>
                                        )}
                                        {localFilters.country === 'USA' && (
                                            <>
                                                <option value="Los Angeles">Los Angeles</option>
                                                <option value="San Francisco">San Francisco</option>
                                                <option value="California">California</option>
                                            </>
                                        )}
                                        {localFilters.country === 'India' && (
                                            <>
                                                <option value="Mumbai">Mumbai</option>
                                                <option value="Delhi">Delhi</option>
                                                <option value="Bangalore">Bangalore</option>
                                            </>
                                        )}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>

                                {/* Search within selected location */}
                                <div className="relative flex-[1.5]">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search size={14} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder={localFilters.country ? `Search in ${localFilters.country}...` : 'Search location...'}
                                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                                        value={localFilters.location || ''}
                                        onChange={(e) => updateFilter('location', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end pt-4 border-t border-gray-50 mt-4">
                    <button
                        onClick={() => {
                            setFilters(localFilters);
                            onApply(localFilters);
                            onClose();
                        }}
                        className="px-8 py-3 bg-[#10B981] hover:bg-[#059669] text-white font-bold rounded-lg transition-colors shadow-lg shadow-green-100"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const LuxuryGoodsFilterPanel = ({ isOpen, onClose, activeTab, filters, setFilters, onApply }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    // Sync local state with props when panel opens
    React.useEffect(() => {
        setLocalFilters(filters);
    }, [filters, isOpen]);

    const updateFilter = (key, value) => {
        setLocalFilters(prev => ({ ...prev, [key]: value }));
    };

    const toggleInvestmentStrategy = (strategy) => {
        const current = localFilters.selectedInvestmentStrategies || [];
        const updated = current.includes(strategy)
            ? current.filter(s => s !== strategy)
            : [...current, strategy];
        updateFilter('selectedInvestmentStrategies', updated);
    };

    const toggleVerification = (verification) => {
        const current = localFilters.selectedVerification || [];
        const updated = current.includes(verification)
            ? current.filter(v => v !== verification)
            : [...current, verification];
        updateFilter('selectedVerification', updated);
    };

    if (!isOpen || activeTab !== 'Luxury Goods') return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-4 md:p-5 mb-8 overflow-visible z-20 relative"
        >
            <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        Luxury Goods <ChevronDown size={20} />
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4">
                        {/* Asset Type */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Asset Type</label>
                            <div className="flex flex-wrap gap-2">
                                {LUXURY_ASSET_TYPES.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => updateFilter('selectedAssetType', type)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${localFilters.selectedAssetType === type
                                            ? 'bg-[#0F172A] text-white border-[#0F172A]'
                                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Investment Strategy */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">
                                Investment Strategy
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {LUXURY_INVESTMENT_STRATEGIES.map(strategy => (
                                    <button
                                        key={strategy}
                                        onClick={() => toggleInvestmentStrategy(strategy)}
                                        className={`px-3 py-2 rounded-lg text-sm text-left transition-colors flex items-center justify-between group ${(localFilters.selectedInvestmentStrategies || []).includes(strategy)
                                            ? 'bg-purple-50 text-purple-700 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="truncate mr-1">{strategy}</span>
                                        {(localFilters.selectedInvestmentStrategies || []).includes(strategy) && <Check size={14} className="flex-shrink-0" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-4">
                        {/* Usage Model */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Usage Model</label>
                            <div className="grid grid-cols-2 gap-2">
                                {LUXURY_USAGE_MODELS.map(model => (
                                    <button
                                        key={model}
                                        onClick={() => updateFilter('selectedUsageModel', model === localFilters.selectedUsageModel ? '' : model)}
                                        className={`px-3 py-2 rounded-lg text-sm text-left transition-colors flex items-center justify-between group ${localFilters.selectedUsageModel === model
                                            ? 'bg-purple-50 text-purple-700 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="truncate mr-1">{model}</span>
                                        {localFilters.selectedUsageModel === model && <Check size={14} className="flex-shrink-0" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Verification */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Verification</label>
                            <div className="grid grid-cols-2 gap-2">
                                {LUXURY_VERIFICATION.map(verify => (
                                    <button
                                        key={verify}
                                        onClick={() => toggleVerification(verify)}
                                        className={`px-3 py-2 rounded-lg text-sm text-left transition-colors flex items-center justify-between group ${(localFilters.selectedVerification || []).includes(verify)
                                            ? 'bg-purple-50 text-purple-700 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="truncate mr-1">{verify}</span>
                                        {(localFilters.selectedVerification || []).includes(verify) && <Check size={14} className="flex-shrink-0" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Rarity Levels */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Rarity</label>
                            <div className="grid grid-cols-2 gap-2">
                                {LUXURY_RARITY_LEVELS.map(rarity => (
                                    <button
                                        key={rarity}
                                        onClick={() => updateFilter('selectedRarity', rarity)}
                                        className={`px-3 py-2 rounded-lg text-sm text-left transition-colors flex items-center justify-between group ${localFilters.selectedRarity === rarity
                                            ? 'bg-purple-50 text-purple-700 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="truncate mr-1">{rarity}</span>
                                        {localFilters.selectedRarity === rarity && <Check size={14} className="flex-shrink-0" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Location Filters */}
                        <div className="grid grid-cols-2 gap-2">
                            {/* Country */}
                            <div className="relative">
                                <select
                                    className="w-full appearance-none bg-white border border-gray-200 text-gray-900 py-2.5 px-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={localFilters.country || ''}
                                    onChange={(e) => {
                                        updateFilter('country', e.target.value);
                                        updateFilter('city', '');
                                    }}
                                >
                                    <option value="">Country</option>
                                    <option value="France">France</option>
                                    <option value="Switzerland">Switzerland</option>
                                    <option value="Italy">Italy</option>
                                    <option value="South Africa">South Africa</option>
                                    <option value="UAE">UAE</option>
                                    <option value="USA">USA</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>

                            {/* City - Dependent on Country */}
                            <div className="relative">
                                <select
                                    className="w-full appearance-none bg-white border border-gray-200 text-gray-900 py-2.5 px-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                                    value={localFilters.city || ''}
                                    onChange={(e) => updateFilter('city', e.target.value)}
                                    disabled={!localFilters.country}
                                >
                                    <option value="">City</option>
                                    {localFilters.country === 'France' && (
                                        <>
                                            <option value="Paris">Paris</option>
                                            <option value="Bordeaux">Bordeaux</option>
                                        </>
                                    )}
                                    {localFilters.country === 'Switzerland' && (
                                        <>
                                            <option value="Geneva">Geneva</option>
                                            <option value="Zurich">Zurich</option>
                                        </>
                                    )}
                                    {localFilters.country === 'Italy' && (
                                        <>
                                            <option value="Milan">Milan</option>
                                            <option value="Maranello">Maranello</option>
                                        </>
                                    )}
                                    {localFilters.country === 'South Africa' && (
                                        <>
                                            <option value="Johannesburg">Johannesburg</option>
                                            <option value="Cape Town">Cape Town</option>
                                        </>
                                    )}
                                    {localFilters.country === 'UAE' && (
                                        <>
                                            <option value="Dubai">Dubai</option>
                                            <option value="Abu Dhabi">Abu Dhabi</option>
                                        </>
                                    )}
                                    {localFilters.country === 'USA' && (
                                        <>
                                            <option value="New York">New York</option>
                                            <option value="Los Angeles">Los Angeles</option>
                                            <option value="Miami">Miami</option>
                                        </>
                                    )}
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-4 border-t border-gray-50 mt-4">
                <button
                    onClick={() => {
                        setFilters(localFilters);
                        onApply(localFilters);
                        onClose();
                    }}
                    className="px-8 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-lg transition-colors shadow-lg shadow-purple-100"
                >
                    Apply
                </button>
            </div>
        </motion.div>
    );
};

export default function Publicmarketplace() {
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isBedsDropdownOpen, setIsBedsDropdownOpen] = useState(false);
    const [sortBy, setSortBy] = useState('price_desc'); // Default sort

    // Filter State - Real Estate
    const [filters, setFilters] = useState({
        minBeds: 'Any',
        maxBeds: 'Any',
        propertyValueRange: [0, 4000000],
        selectedPropertyType: '',
        selectedInvestmentStrategies: [],
        country: '',
        city: '',
        location: '',
        completionStatus: 'All'
    });

    // Filter State - Commodities
    const [commoditiesFilters, setCommoditiesFilters] = useState({
        selectedCategory: '',
        selectedCommodityType: 'All',
        selectedInvestmentStrategies: [],
        country: '',
        city: '',
        location: ''
    });

    // Filter State - Arts
    const [artsFilters, setArtsFilters] = useState({
        selectedType: 'All',
        artistTier: '',
        selectedInvestmentStrategies: [],
        selectedAuthentications: [],
        country: '',
        city: '',
        location: ''
    });

    // Filter State - Sports
    const [sportsFilters, setSportsFilters] = useState({
        selectedAssetType: 'All',
        sportType: 'All',
        selectedInvestmentStrategies: [],
        selectedRevenueModels: [],
        country: '',
        city: '',
        location: ''
    });

    // Filter State - Carbon Credits
    const [carbonCreditsFilters, setCarbonCreditsFilters] = useState({
        selectedProjectType: 'All',
        selectedStandard: 'All',
        selectedInvestmentStrategies: [],
        selectedCreditTypes: [],
        country: '',
        city: '',
        location: ''
    });

    // Filter State - Luxury Goods
    const [luxuryGoodsFilters, setLuxuryGoodsFilters] = useState({
        selectedAssetType: 'All',
        selectedInvestmentStrategies: [],
        selectedUsageModel: '',
        selectedVerification: [],
        selectedRarity: 'All',
        country: '',
        city: '',
        location: ''
    });

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    const handleApplyCommoditiesFilters = (newFilters) => {
        setCommoditiesFilters(newFilters);
    };

    const handleApplyArtsFilters = (newFilters) => {
        setArtsFilters(newFilters);
    };

    const handleApplySportsFilters = (newFilters) => {
        setSportsFilters(newFilters);
    };

    const handleApplyCarbonCreditsFilters = (newFilters) => {
        setCarbonCreditsFilters(newFilters);
    };

    const handleApplyLuxuryGoodsFilters = (newFilters) => {
        setLuxuryGoodsFilters(newFilters);
    };

    // Filter logic
    const filteredInvestments = MOCK_INVESTMENTS.filter((item) => {
        // Tab Filter
        const matchesTab = activeTab === 'All' ||
            (activeTab === 'Real Estate' && item.category === 'REAL ESTATE') ||
            (activeTab === 'Commodities' && item.category === 'COMMODITIES') ||
            (activeTab === 'Arts' && item.category === 'ARTS') ||
            (activeTab === 'Sports' && item.category === 'SPORTS') ||
            (activeTab === 'Carbon Credits' && item.category === 'CARBON_CREDITS') ||
            (activeTab === 'Luxury Goods' && item.category === 'LUXURY_GOODS');

        // Search Query
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());

        // Advanced Filters - Real Estate
        let matchesAdvanced = true;
        if (activeTab === 'Real Estate') {
            // Property Type
            if (filters.selectedPropertyType && filters.selectedPropertyType !== 'All' && item.propertyType !== filters.selectedPropertyType) {
                matchesAdvanced = false;
            }
            // Investment Strategy
            if (matchesAdvanced && filters.selectedInvestmentStrategies.length > 0 && !filters.selectedInvestmentStrategies.includes(item.investmentStrategy)) {
                matchesAdvanced = false;
            }
            // Country
            if (matchesAdvanced && filters.country && item.country !== filters.country) {
                matchesAdvanced = false;
            }
            // City
            if (matchesAdvanced && filters.city && item.city !== filters.city) {
                matchesAdvanced = false;
            }
            // Location
            if (matchesAdvanced && filters.location && !item.location.toLowerCase().includes(filters.location.toLowerCase())) {
                matchesAdvanced = false;
            }
            // Completion Status
            if (matchesAdvanced && filters.completionStatus !== 'All' && item.completionStatus !== filters.completionStatus) {
                matchesAdvanced = false;
            }
            // Beds
            if (matchesAdvanced && (filters.minBeds !== 'Any' || filters.maxBeds !== 'Any')) {
                const itemBeds = item.beds || 0;
                let min = 0;
                let max = 100;

                if (filters.minBeds !== 'Any') {
                    min = parseInt(filters.minBeds);
                }

                if (filters.maxBeds !== 'Any') {
                    max = parseInt(filters.maxBeds);
                }

                if (itemBeds < min || itemBeds > max) {
                    matchesAdvanced = false;
                }
            }
        }

        // Advanced Filters - Commodities
        if (activeTab === 'Commodities') {
            // Category
            if (commoditiesFilters.selectedCategory && commoditiesFilters.selectedCategory !== 'All' && item.commodityCategory !== commoditiesFilters.selectedCategory) {
                matchesAdvanced = false;
            }
            // Commodity Type
            if (matchesAdvanced && commoditiesFilters.selectedCommodityType && commoditiesFilters.selectedCommodityType !== 'All' && item.commodityType !== commoditiesFilters.selectedCommodityType) {
                matchesAdvanced = false;
            }
            // Investment Strategy
            if (matchesAdvanced && commoditiesFilters.selectedInvestmentStrategies.length > 0 && !commoditiesFilters.selectedInvestmentStrategies.includes(item.investmentStrategy)) {
                matchesAdvanced = false;
            }
            // Country
            if (matchesAdvanced && commoditiesFilters.country && item.country !== commoditiesFilters.country) {
                matchesAdvanced = false;
            }
            // City
            if (matchesAdvanced && commoditiesFilters.city && item.city !== commoditiesFilters.city) {
                matchesAdvanced = false;
            }
            // Location
            if (matchesAdvanced && commoditiesFilters.location && !item.location.toLowerCase().includes(commoditiesFilters.location.toLowerCase())) {
                matchesAdvanced = false;
            }
        }

        // Advanced Filters - Arts
        if (activeTab === 'Arts') {
            // Art Type
            if (artsFilters.selectedType && artsFilters.selectedType !== 'All' && item.artType !== artsFilters.selectedType) {
                matchesAdvanced = false;
            }
            // Artist Tier
            if (matchesAdvanced && artsFilters.artistTier && item.artistTier !== artsFilters.artistTier) {
                matchesAdvanced = false;
            }
            // Investment Strategy
            if (matchesAdvanced && artsFilters.selectedInvestmentStrategies.length > 0 && !artsFilters.selectedInvestmentStrategies.includes(item.investmentStrategy)) {
                matchesAdvanced = false;
            }
            // Authentication
            if (matchesAdvanced && artsFilters.selectedAuthentications.length > 0) {
                const itemAuths = item.authentication || [];
                const hasMatchingAuth = artsFilters.selectedAuthentications.some(auth => itemAuths.includes(auth));
                if (!hasMatchingAuth) {
                    matchesAdvanced = false;
                }
            }
            // Country
            if (matchesAdvanced && artsFilters.country && item.country !== artsFilters.country) {
                matchesAdvanced = false;
            }
            // City
            if (matchesAdvanced && artsFilters.city && item.city !== artsFilters.city) {
                matchesAdvanced = false;
            }
            // Location
            if (matchesAdvanced && artsFilters.location && !item.location.toLowerCase().includes(artsFilters.location.toLowerCase())) {
                matchesAdvanced = false;
            }
        }

        // Advanced Filters - Sports
        if (activeTab === 'Sports') {
            // Asset Type
            if (sportsFilters.selectedAssetType && sportsFilters.selectedAssetType !== 'All' && item.assetType !== sportsFilters.selectedAssetType) {
                matchesAdvanced = false;
            }
            // Sport Type
            if (matchesAdvanced && sportsFilters.sportType && sportsFilters.sportType !== 'All' && item.sportType !== sportsFilters.sportType) {
                matchesAdvanced = false;
            }
            // Investment Strategy
            if (matchesAdvanced && sportsFilters.selectedInvestmentStrategies.length > 0 && !sportsFilters.selectedInvestmentStrategies.includes(item.investmentStrategy)) {
                matchesAdvanced = false;
            }
            // Revenue Model
            if (matchesAdvanced && sportsFilters.selectedRevenueModels.length > 0) {
                const itemModels = item.revenueModel ? [item.revenueModel] : [];
                const hasMatchingModel = sportsFilters.selectedRevenueModels.some(model => itemModels.includes(model));
                if (!hasMatchingModel) {
                    matchesAdvanced = false;
                }
            }
            // Country
            if (matchesAdvanced && sportsFilters.country && item.country !== sportsFilters.country) {
                matchesAdvanced = false;
            }
            // City
            if (matchesAdvanced && sportsFilters.city && item.city !== sportsFilters.city) {
                matchesAdvanced = false;
            }
            // Location
            if (matchesAdvanced && sportsFilters.location && !item.location.toLowerCase().includes(sportsFilters.location.toLowerCase())) {
                matchesAdvanced = false;
            }
        }

        // Advanced Filters - Luxury Goods
        if (activeTab === 'Luxury Goods') {
            // Asset Type
            if (luxuryGoodsFilters.selectedAssetType && luxuryGoodsFilters.selectedAssetType !== 'All' && item.assetType !== luxuryGoodsFilters.selectedAssetType) {
                matchesAdvanced = false;
            }
            // Investment Strategy
            if (matchesAdvanced && luxuryGoodsFilters.selectedInvestmentStrategies.length > 0 && !luxuryGoodsFilters.selectedInvestmentStrategies.includes(item.investmentStrategy)) {
                matchesAdvanced = false;
            }
            // Usage Model
            if (matchesAdvanced && luxuryGoodsFilters.selectedUsageModel && item.usageModel !== luxuryGoodsFilters.selectedUsageModel) {
                matchesAdvanced = false;
            }
            // Verification
            if (matchesAdvanced && luxuryGoodsFilters.selectedVerification.length > 0) {
                const itemVerification = item.verification || [];
                const hasMatchingVerification = luxuryGoodsFilters.selectedVerification.some(verify => itemVerification.includes(verify));
                if (!hasMatchingVerification) {
                    matchesAdvanced = false;
                }
            }
            // Rarity
            if (matchesAdvanced && luxuryGoodsFilters.selectedRarity && luxuryGoodsFilters.selectedRarity !== 'All' && item.rarity !== luxuryGoodsFilters.selectedRarity) {
                matchesAdvanced = false;
            }
            // Country
            if (matchesAdvanced && luxuryGoodsFilters.country && item.country !== luxuryGoodsFilters.country) {
                matchesAdvanced = false;
            }
            // City
            if (matchesAdvanced && luxuryGoodsFilters.city && item.city !== luxuryGoodsFilters.city) {
                matchesAdvanced = false;
            }
            // Location
            if (matchesAdvanced && luxuryGoodsFilters.location && !item.location.toLowerCase().includes(luxuryGoodsFilters.location.toLowerCase())) {
                matchesAdvanced = false;
            }
        }

        return matchesTab && matchesSearch && matchesAdvanced;
    }).sort((a, b) => {
        switch (sortBy) {
            case 'price_desc':
                return (b.priceVal || 0) - (a.priceVal || 0);
            case 'price_asc':
                return (a.priceVal || 0) - (b.priceVal || 0);
            case 'tokens_desc':
                return (b.tokenPercentage || 0) - (a.tokenPercentage || 0);
            case 'tokens_asc':
                return (a.tokenPercentage || 0) - (b.tokenPercentage || 0);
            default:
                return 0;
        }
    });

    return (
        <section className="w-full py-12 md:py-20 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Controls Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">

                    {/* Left: Filters */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        {FILTER_TABS.map((tab) => {
                            const isClickable = tab === 'All' || tab === 'Real Estate' || tab === 'Commodities' || tab === 'Arts' || tab === 'Sports' || tab === 'Carbon Credits' || tab === 'Luxury Goods';
                            return (
                                <button
                                    key={tab}
                                    disabled={!isClickable}
                                    onClick={() => {
                                        if (isClickable) {
                                            // Just switch tab and close filters - filters only open via Filters button
                                            setActiveTab(tab);
                                            setShowFilters(false);
                                        }
                                    }}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === tab
                                        ? 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                                        : isClickable
                                            ? 'bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                            : 'bg-transparent text-gray-900 cursor-not-allowed'
                                        }`}
                                >
                                    {tab}
                                </button>
                            );
                        })}
                        {(activeTab === 'Real Estate' || activeTab === 'Commodities' || activeTab === 'Arts' || activeTab === 'Sports' || activeTab === 'Carbon Credits' || activeTab === 'Luxury Goods') && (
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`ml-2 flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-lg shadow-gray-200 ${showFilters ? 'bg-[#0F172A] text-white' : 'bg-white text-gray-700 border border-gray-200'
                                    }`}
                            >
                                <SlidersHorizontal size={16} />
                                Filters
                            </button>
                        )}
                    </div>

                    {/* Right: Search & Sort */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full sm:w-64 pl-11 pr-4 py-2.5 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-sm text-gray-900 placeholder-gray-400 transition-all"
                            />
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="w-full sm:w-auto flex items-center justify-between gap-3 px-5 py-2.5 rounded-full bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                <span>Sort by</span>
                                <ChevronDown size={16} />
                            </button>

                            {/* Sort Dropdown */}
                            <AnimatePresence>
                                {isSortOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 top-full mt-2 w-64 bg-slate-50 rounded-xl shadow-xl border border-gray-100 py-2 z-30"
                                    >
                                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Sort by
                                        </div>
                                        {SORT_OPTIONS.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => {
                                                    setSortBy(option.value);
                                                    setIsSortOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${sortBy === option.value ? 'font-bold text-blue-600' : 'text-gray-700'
                                                    }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Filter Panel */}
                <AnimatePresence>
                    {showFilters && activeTab === 'Real Estate' && (
                        <FilterPanel
                            isOpen={showFilters}
                            onClose={() => setShowFilters(false)}
                            activeTab="Real Estate"
                            filters={filters}
                            setFilters={setFilters}
                            onApply={handleApplyFilters}
                        />
                    )}
                    {showFilters && activeTab === 'Commodities' && (
                        <CommoditiesFilterPanel
                            isOpen={showFilters}
                            onClose={() => setShowFilters(false)}
                            activeTab="Commodities"
                            filters={commoditiesFilters}
                            setFilters={setCommoditiesFilters}
                            onApply={handleApplyCommoditiesFilters}
                        />
                    )}
                    {showFilters && activeTab === 'Arts' && (
                        <ArtsFilterPanel
                            isOpen={showFilters}
                            onClose={() => setShowFilters(false)}
                            activeTab="Arts"
                            filters={artsFilters}
                            setFilters={setArtsFilters}
                            onApply={handleApplyArtsFilters}
                        />
                    )}
                    {showFilters && activeTab === 'Sports' && (
                        <SportsFilterPanel
                            isOpen={showFilters}
                            onClose={() => setShowFilters(false)}
                            activeTab="Sports"
                            filters={sportsFilters}
                            setFilters={setSportsFilters}
                            onApply={handleApplySportsFilters}
                        />
                    )}
                    {showFilters && activeTab === 'Carbon Credits' && (
                        <CarbonCreditsFilterPanel
                            isOpen={showFilters}
                            onClose={() => setShowFilters(false)}
                            activeTab="Carbon Credits"
                            filters={carbonCreditsFilters}
                            setFilters={setCarbonCreditsFilters}
                            onApply={handleApplyCarbonCreditsFilters}
                        />
                    )}
                    {showFilters && activeTab === 'Luxury Goods' && (
                        <LuxuryGoodsFilterPanel
                            isOpen={showFilters}
                            onClose={() => setShowFilters(false)}
                            activeTab="Luxury Goods"
                            filters={luxuryGoodsFilters}
                            setFilters={setLuxuryGoodsFilters}
                            onApply={handleApplyLuxuryGoodsFilters}
                        />
                    )}
                </AnimatePresence>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredInvestments.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 h-[320px] border border-gray-100"
                        >
                            {/* Sliding Container */}
                            <div className="absolute inset-0 flex w-[200%] transition-transform duration-500 ease-in-out -translate-x-0 group-hover:-translate-x-1/2">

                                {/* 1. Initial State (Full Image View) */}
                                <div className="w-1/2 h-full relative">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Gradient Overlay for text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                    {/* Top Badges */}
                                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                                        <div className="bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-widest text-[#0F172A] shadow-lg">
                                            {item.category}
                                        </div>
                                        <img src="/assets/publicm/veri.png" alt="Verified" className="h-[36px] w-auto object-contain drop-shadow-lg" />
                                    </div>

                                    <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                                        <div className="bg-[#0F172A] px-2 py-0.5 rounded-md text-white shadow-lg border border-gray-700/50 flex items-center gap-1">
                                            <span className="text-[10px] font-bold text-white">{item.roi}</span>
                                            <span className="text-[8px] font-bold text-gray-400 tracking-wider uppercase">PROJECTED ROI</span>
                                        </div>
                                        <div className="bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[9px] font-bold text-[#0F172A] shadow-lg border border-white/20">
                                            {item.cagr} CAGR
                                        </div>
                                    </div>

                                    {/* Bottom Info on Cover */}
                                    <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <img src={item.issuerLogo} alt={item.issuerName} className="w-5 h-5 rounded-full border border-white/30" />
                                            <span className="text-[10px] font-medium text-gray-200">{item.issuerName}</span>
                                        </div>
                                        <h3 className="text-lg font-bold leading-tight mb-0.5 font-palanquin">{item.title}</h3>
                                        <p className="text-xs text-gray-300 font-medium mb-3">{item.tokenSymbol}</p>

                                        <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-gray-400">
                                            <span>DETAILS</span>
                                            <svg className="w-3 h-3 animate-bounce-x" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Hover State (Split View) - Occupies right half of the 200% width container */}
                                <div className="w-1/2 h-full flex">
                                    {/* Left side of the split (Retained Image Strip) */}
                                    <div className="w-[35%] h-full relative overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover scale-150"
                                        />
                                        <div className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-[2px]"></div>
                                    </div>

                                    {/* Right side of the split (Details Panel) */}
                                    <div className="w-[65%] h-full bg-white p-4 flex flex-col justify-between">
                                        <div>
                                            <h4 className="text-sm font-bold text-[#0F172A] leading-tight mb-2 line-clamp-2">{item.title}</h4>
                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[9px] font-bold text-gray-600">{item.investmentStrategy}</span>
                                                <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[9px] font-bold text-gray-600 animate-pulse">{item.status === 'coming-soon' ? 'Coming Soon' : item.status === 'sold-out' ? 'Sold Out' : 'Open'}</span>
                                            </div>

                                            {/* Arts-Specific Details */}
                                            {item.category === 'ARTS' && (
                                                <div className="space-y-2 mb-3">
                                                    <div className="flex justify-between items-center border-b border-gray-50 pb-1.5">
                                                        <span className="text-[9px] text-gray-400 font-semibold uppercase">Artist</span>
                                                        <span className="text-xs font-bold text-[#0F172A] text-right">{item.artistName}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center border-b border-gray-50 pb-1.5">
                                                        <span className="text-[9px] text-gray-400 font-semibold uppercase">Artist Tier</span>
                                                        <span className={`text-xs font-bold text-right ${item.artistTier === 'Blue-Chip' ? 'text-purple-600' : item.artistTier === 'Established' ? 'text-blue-600' : item.artistTier === 'Mid-Career' ? 'text-green-600' : 'text-gray-600'}`}>{item.artistTier}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center border-b border-gray-50 pb-1.5">
                                                        <span className="text-[9px] text-gray-400 font-semibold uppercase">Type</span>
                                                        <span className="text-xs font-bold text-[#0F172A]">{item.artType}</span>
                                                    </div>
                                                    {item.authentication && item.authentication.length > 0 && (
                                                        <div className="pt-1">
                                                            <div className="flex items-center gap-1 mb-1">
                                                                <BadgeCheck size={12} className="text-green-600" />
                                                                <span className="text-[9px] text-gray-400 font-semibold uppercase">Authentication</span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1">
                                                                {item.authentication.slice(0, 2).map((auth, idx) => (
                                                                    <span key={idx} className="px-1.5 py-0.5 bg-green-50 rounded text-[8px] font-bold text-green-700">{auth}</span>
                                                                ))}
                                                                {item.authentication.length > 2 && (
                                                                    <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[8px] font-medium text-gray-500">+{item.authentication.length - 2}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Sports-Specific Details */}
                                            {item.category === 'SPORTS' && (
                                                <div className="space-y-2 mb-3">
                                                    <div className="flex justify-between items-center border-b border-gray-50 pb-1.5">
                                                        <span className="text-[9px] text-gray-400 font-semibold uppercase">Sport</span>
                                                        <span className="text-xs font-bold text-[#0F172A] text-right">{item.sportType}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center border-b border-gray-50 pb-1.5">
                                                        <span className="text-[9px] text-gray-400 font-semibold uppercase">Asset Type</span>
                                                        <span className="text-xs font-bold text-[#0F172A] text-right">{item.assetType}</span>
                                                    </div>
                                                    {item.athleteName && item.athleteName !== 'N/A' && (
                                                        <div className="flex justify-between items-center border-b border-gray-50 pb-1.5">
                                                            <span className="text-[9px] text-gray-400 font-semibold uppercase">Athlete</span>
                                                            <span className="text-xs font-bold text-orange-600 text-right">{item.athleteName}</span>
                                                        </div>
                                                    )}
                                                    {item.teamAffiliation && (
                                                        <div className="flex justify-between items-center border-b border-gray-50 pb-1.5">
                                                            <span className="text-[9px] text-gray-400 font-semibold uppercase">Team/League</span>
                                                            <span className="text-xs font-bold text-[#0F172A] text-right">{item.teamAffiliation}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex justify-between items-center border-b border-gray-50 pb-1.5">
                                                        <span className="text-[9px] text-gray-400 font-semibold uppercase">Revenue Model</span>
                                                        <span className="text-xs font-bold text-orange-600">{item.revenueModel}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Carbon Credits-Specific Details */}
                                            {item.category === 'CARBON_CREDITS' && (
                                                <div className="space-y-2 mb-3">
                                                    <div className="flex justify-between items-center border-b border-gray-50 pb-1.5">
                                                        <span className="text-[9px] text-gray-400 font-semibold uppercase">Project Type</span>
                                                        <span className="text-xs font-bold text-emerald-600 text-right">{item.projectType}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center border-b border-gray-50 pb-1.5">
                                                        <span className="text-[9px] text-gray-400 font-semibold uppercase">Standard</span>
                                                        <span className="text-xs font-bold text-[#0F172A] text-right">{item.standard}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center border-b border-gray-50 pb-1.5">
                                                        <span className="text-[9px] text-gray-400 font-semibold uppercase">Credit Type</span>
                                                        <span className="text-xs font-bold text-emerald-600">{item.creditType}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center border-b border-gray-50 pb-1.5">
                                                        <span className="text-[9px] text-gray-400 font-semibold uppercase">CO₂ Volume</span>
                                                        <span className="text-xs font-bold text-[#0F172A]">{item.co2Volume}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center border-b border-gray-50 pb-1.5">
                                                        <span className="text-[9px] text-gray-400 font-semibold uppercase">SDG</span>
                                                        <span className="text-xs font-bold text-emerald-600">{item.sdgAlignment}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center border-b border-gray-50 pb-1.5">
                                                        <span className="text-[9px] text-gray-400 font-semibold uppercase">Location</span>
                                                        <span className="text-xs font-bold text-[#0F172A]">{item.projectLocation}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Real Estate & Commodities Details */}
                                            {item.category !== 'ARTS' && item.category !== 'SPORTS' && item.category !== 'CARBON_CREDITS' && (
                                                <div className="space-y-2.5">
                                                    <div className="flex justify-between items-center border-b border-gray-50 pb-1.5">
                                                        <span className="text-[9px] text-gray-400 font-semibold uppercase">Asset Price</span>
                                                        <span className="text-xs font-bold text-[#0F172A]">{item.assetPrice}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center border-b border-gray-50 pb-1.5">
                                                        <span className="text-[9px] text-gray-400 font-semibold uppercase">Token Price</span>
                                                        <div className="text-right">
                                                            <span className="text-xs font-bold text-[#0F172A] block">{item.tokenPriceETH}</span>
                                                            <span className="text-[9px] text-gray-400">{item.tokenPriceUSD}</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="text-[9px] text-gray-400 font-semibold uppercase">Available Tokens</span>
                                                            <span className="text-[9px] font-bold text-[#0F172A]">{item.availableTokens.toLocaleString()}</span>
                                                        </div>
                                                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full ${item.availableTokens === 0 ? 'bg-gray-400' : 'bg-[#0F172A]'}`}
                                                                style={{ width: `${(item.availableTokens / item.totalTokens) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <button className="w-full py-2.5 rounded-lg bg-[#0F172A] hover:bg-blue-600 text-white text-[10px] font-bold tracking-widest uppercase transition-colors shadow-lg shadow-gray-200 mt-2">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
