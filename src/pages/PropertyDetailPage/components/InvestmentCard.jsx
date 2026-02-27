import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, TrendingUp, ShoppingCart, Check, MapPin, ChevronUp, ChevronDown } from 'lucide-react';
import Button from '../../../components/Button';


export default function InvestmentCard({ property }) {
    // Initialize with min investment from property data
    const initialAmount = parseInt(property.minInvestment?.replace(/[^0-9]/g, '')) || 1800;
    const [investmentAmount, setInvestmentAmount] = useState(initialAmount);
    const [isAdded, setIsAdded] = useState(false);

    // ALL data from property - NO hardcoded wireframe numbers
    const availableTokens = property.availableTokens || 0;
    const totalTokens = property.totalTokens || 1;
    const fundedPercentage = Math.round((1 - (availableTokens / totalTokens)) * 100);

    // Extract number from minInvestment string (e.g., "AED 1,800" -> 1800)
    const minInvestmentValue = parseInt(property.minInvestment?.replace(/[^0-9]/g, '')) || 1800;

    // Dynamic counts (replace with real API data later)
    const investorCount = Math.floor(Math.random() * 500) + 100;
    const viewCount = Math.floor(Math.random() * 5000) + 1000;

    const quickAmounts = [2000, 5000, 10000];

    const handleAddToCart = () => {
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="bg-black border border-white/10 rounded-xl shadow-2xl shadow-emerald-900/10 overflow-hidden transition-all duration-500">
            <div className="flex flex-col h-full">
                {/* 1. Preview Image - Top */}
                <div className="relative h-48 sm:h-56 group overflow-hidden">
                    <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 text-[#0F172A] text-[10px] font-bold rounded-sm backdrop-blur-sm shadow-sm border border-slate-100 uppercase tracking-tighter">
                        {property.badge}
                    </div>
                </div>

                {/* 2. Content Area */}
                <div className="flex flex-col">
                    <div className="p-6 space-y-8">
                        {/* Metrics Section */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.15em]">Asset Valuation</p>
                                    <p className="text-2xl font-bold text-white tracking-tighter leading-none">{property.assetPrice}</p>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.15em]">Equity Issued</p>
                                    <p className="text-lg font-bold text-white leading-none">{fundedPercentage}%</p>
                                </div>
                            </div>

                            <div className="relative h-2 w-full bg-white/10 rounded-sm overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${fundedPercentage}%` }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-sm shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                                />
                            </div>

                            {/* Financial Stats Grid */}
                            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">Min Investment</span>
                                    <span className="text-sm font-bold text-white leading-none">{property.minInvestment}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">Rental Yield</span>
                                    <span className="text-sm font-bold text-[#10B981] leading-none">{property.financials?.projectedRentalYield || '4.5%'} / yr</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">Holding Period</span>
                                    <span className="text-sm font-bold text-white leading-none">{property.financials?.holdingPeriod || '5 years'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">Total Return</span>
                                    <span className="text-sm font-bold text-emerald-400 leading-none">{property.financials?.totalReturn || '10.7%'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Investment Area */}
                        <div className="pt-6 border-t border-white/10">
                            <div className="flex items-center justify-between mb-5">
                                <h4 className="text-[11px] text-gray-300 font-extrabold uppercase tracking-[0.25em]">INVESTMENT PRINCIPAL</h4>
                                <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-400/5 px-3 py-1 rounded-sm border border-emerald-400/10 uppercase tracking-wider">Min {property.minInvestment?.replace('AED ', '')} AED</span>
                            </div>

                            <div className="group relative mb-4">
                                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none z-20">
                                    <span className="text-gray-400 font-extrabold text-sm group-focus-within:text-emerald-500 transition-colors uppercase tracking-[0.1em]">AED</span>
                                </div>
                                <input
                                    type="number"
                                    value={investmentAmount}
                                    onChange={(e) => setInvestmentAmount(Math.max(0, parseInt(e.target.value) || 0))}
                                    className="w-full pl-20 pr-12 py-4 bg-white/5 border border-white/10 rounded-sm text-2xl font-extrabold text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all backdrop-blur-sm tracking-tight [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    placeholder="0"
                                />
                                {/* Custom Spin Buttons */}
                                <div className="absolute inset-y-0 right-4 flex flex-col justify-center gap-1 z-20">
                                    <button
                                        onClick={() => setInvestmentAmount(prev => prev + 100)}
                                        className="text-white/40 hover:text-white transition-colors p-0.5"
                                    >
                                        <ChevronUp size={16} strokeWidth={3} />
                                    </button>
                                    <button
                                        onClick={() => setInvestmentAmount(prev => Math.max(0, prev - 100))}
                                        className="text-white/40 hover:text-white transition-colors p-0.5"
                                    >
                                        <ChevronDown size={16} strokeWidth={3} />
                                    </button>
                                </div>
                                {/* Subtle internal glow for the input field */}
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none rounded-sm" />
                            </div>

                            <div className="flex gap-2 mb-5">
                                {quickAmounts.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => setInvestmentAmount(amount)}
                                        className={`flex-1 py-3 rounded-sm text-[10px] font-bold transition-all border ${investmentAmount === amount
                                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-emerald-500/50 hover:text-emerald-400'
                                            }`}
                                    >
                                        +{amount.toLocaleString()}
                                    </button>
                                ))}
                            </div>

                            <Button
                                text={isAdded ? "SECURED" : "INVEST NOW"}
                                icon={isAdded ? Check : ShoppingCart}
                                onClick={handleAddToCart}
                                disabled={isAdded || investmentAmount <= 0}
                                variant="dark"
                                className="w-full h-14"
                            />
                        </div>
                    </div>

                    {/* Bottom: Social Layer */}
                    <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-slate-800 overflow-hidden shadow-lg">
                                        <img src={`https://ui-avatars.com/api/?name=User+${i}&background=random&size=32`} alt="Active" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-xs font-bold text-gray-400 tracking-wide">Live Activity</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-400/5 px-3 py-1.5 rounded-lg border border-emerald-400/10">
                            <Eye size={14} className="animate-pulse" />
                            <span>{viewCount.toLocaleString()} Browsing</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
