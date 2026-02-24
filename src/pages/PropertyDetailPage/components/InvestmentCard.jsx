import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, TrendingUp, ShoppingCart, Check, MapPin } from 'lucide-react';

export default function InvestmentCard({ property }) {
    const [investmentAmount, setInvestmentAmount] = useState(2000);
    const [isAdded, setIsAdded] = useState(false);

    // ALL data from property - NO hardcoded wireframe numbers
    const availableTokens = property.availableTokens || 100000;
    const fundedPercentage = property.tokenPercentage || 0;
    const projectedRentalYield = parseFloat(property.financials?.projectedRentalYield) || 0;
    const annualAppreciation = parseFloat(property.financials?.annualAppreciation) || 0;

    // Calculate returns from property data
    const fiveYearReturn = ((Math.pow(1 + (projectedRentalYield + annualAppreciation) / 100, 5) - 1) * 100).toFixed(2);
    const yearlyReturn = (projectedRentalYield + annualAppreciation).toFixed(2);

    // Dynamic counts (replace with real API data later)
    const investorCount = Math.floor(Math.random() * 500) + 100;
    const viewCount = Math.floor(Math.random() * 5000) + 1000;

    const quickAmounts = [2000, 5000, 10000];

    const handleAddToCart = () => {
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl shadow-slate-200/40 overflow-hidden sticky top-24 transition-all duration-500 hover:shadow-emerald-100/30">
            {/* 1. Brand Header & Quick Status */}
            <div className="bg-[#0F172A] p-3 pb-5 text-white relative overflow-hidden">
                <div className="relative z-10 flex justify-between items-start gap-4 mb-2">
                    <div className="flex-1">
                        <h3 className="text-base font-black tracking-tight leading-none mb-1">
                            {property.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-slate-400 text-[9px] font-bold uppercase tracking-wider">
                            <MapPin size={10} className="text-emerald-500" />
                            {property.location}
                        </div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[8px] font-black rounded-full border border-emerald-500/20 tracking-widest backdrop-blur-md">
                        {property.investmentStrategy.toUpperCase()}
                    </span>
                </div>

                {/* Ambient Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
            </div>

            {/* 2. Cinematic Preview */}
            <div className="relative h-16 mx-5 -mt-3 rounded-2xl overflow-hidden shadow-xl border-4 border-white group">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-white/95 text-[#0F172A] text-[8px] font-black rounded-full backdrop-blur-sm shadow-sm border border-slate-100">
                    {property.badge.toUpperCase()}
                </div>
            </div>

            {/* 3. Primary Data Points */}
            <div className="px-5 pt-3 pb-0">
                <div className="flex justify-between items-end mb-3">
                    <div>
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mb-0.5">Asset Price</p>
                        <p className="text-xl font-black text-slate-900 tracking-tighter leading-none">{property.assetPrice}</p>
                    </div>
                </div>

                {/* Progress Visualizer */}
                <div className="space-y-1.5 mb-3">
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                            <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Funded</span>
                            <span className="text-xs font-black text-slate-900 leading-none">{fundedPercentage}%</span>
                        </div>
                        <div className="text-right flex flex-col items-end">
                            <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Remaining Tokens</span>
                            <span className="text-[9px] font-black text-slate-700 leading-none">{availableTokens.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="relative h-1 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50 shadow-inner">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${fundedPercentage}%` }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                        />
                    </div>
                </div>
            </div>

            {/* 4. Projections Grid - Premium Micro Cards */}
            <div className="px-5 mb-3">
                <div className="bg-slate-50/80 rounded-[1.25rem] p-2 border border-slate-100/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2 border-b border-slate-200/50 pb-1.5">
                        <TrendingUp size={10} className="text-emerald-500" />
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Growth</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                        <div className="p-1.5 rounded-lg bg-white border border-slate-100 shadow-sm transition-transform hover:-translate-y-0.5">
                            <p className="text-[7px] text-slate-400 font-black uppercase mb-0.5">5Y ROI</p>
                            <p className="text-[9px] font-black text-slate-900 tracking-tight">{fiveYearReturn}%</p>
                        </div>
                        <div className="p-1.5 rounded-lg bg-white border border-slate-100 shadow-sm transition-transform hover:-translate-y-0.5">
                            <p className="text-[7px] text-slate-400 font-black uppercase mb-0.5">YEARLY</p>
                            <p className="text-[9px] font-black text-slate-900 tracking-tight">{yearlyReturn}%</p>
                        </div>
                        <div className="p-1.5 rounded-lg bg-white border border-slate-100 shadow-sm transition-transform hover:-translate-y-0.5">
                            <p className="text-[7px] text-slate-400 font-black uppercase mb-0.5">YIELD</p>
                            <p className="text-[9px] font-black text-emerald-600 tracking-tight">{projectedRentalYield}%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. Execution Area */}
            <div className="px-5 pb-5">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[8px] text-slate-400 font-black uppercase tracking-[0.2em]">Amount</h4>
                    <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[7px] font-black rounded-full lowercase tracking-tight">min $500</span>
                </div>

                {/* Refined Pill Input */}
                <div className="group relative mb-3">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-[8px] rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 font-black text-sm group-focus-within:text-emerald-500 transition-colors">$</span>
                        <input
                            type="number"
                            value={investmentAmount}
                            onChange={(e) => setInvestmentAmount(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-full pl-7 pr-3 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-base font-black text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-300 focus:bg-white transition-all shadow-inner"
                            placeholder="0"
                        />
                    </div>
                </div>

                {/* Smart Presets */}
                <div className="flex gap-1 mb-4">
                    {quickAmounts.map((amount) => (
                        <button
                            key={amount}
                            onClick={() => setInvestmentAmount(amount)}
                            className={`flex-1 py-1.5 rounded-lg text-[8px] font-black transition-all border ${investmentAmount === amount
                                ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-md scale-105 z-10'
                                : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-200 hover:text-emerald-600'
                                }`}
                        >
                            +${amount / 1000}K
                        </button>
                    ))}
                </div>

                {/* CTA - The Signature Button */}
                <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handleAddToCart}
                    disabled={isAdded || investmentAmount <= 0}
                    className={`w-full py-2.5 rounded-[1.25rem] font-black text-[9px] tracking-widest transition-all duration-500 flex items-center justify-center gap-2 shadow-xl relative overflow-hidden group ${isAdded
                        ? 'bg-emerald-500 text-white shadow-emerald-200'
                        : 'bg-[#0F172A] hover:bg-slate-800 text-white shadow-slate-300'
                        } disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed`}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    {isAdded ? (
                        <>
                            <Check size={14} strokeWidth={4} />
                            SECURED
                        </>
                    ) : (
                        <>
                            <ShoppingCart size={14} strokeWidth={4} />
                            ADD TO CART
                        </>
                    )}
                </motion.button>
            </div>

            {/* 6. Social Layer / Marketplace Activity */}
            <div className="px-5 py-1.5 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-3.5 h-3.5 rounded-full border border-white bg-slate-200 overflow-hidden shadow-sm">
                                <img src={`https://ui-avatars.com/api/?name=User+${i}&background=random&size=16`} alt="Active User" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-1.5 text-[7px] font-black text-slate-400 uppercase tracking-widest">
                    <Eye size={8} className="text-emerald-500" />
                    <span>{viewCount.toLocaleString()} investors browsing</span>
                </div>
            </div>
        </div>
        </div >
    );
}
