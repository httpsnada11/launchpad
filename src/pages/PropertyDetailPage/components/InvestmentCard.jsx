import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, TrendingUp, ShoppingCart, Check, MapPin } from 'lucide-react';
import Button from '../../../components/Button';


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
        <div className="bg-white border border-slate-200 rounded-[2.25rem] shadow-2xl shadow-slate-200/40 overflow-hidden sticky top-24 transition-all duration-500 hover:shadow-emerald-100/30">
            {/* 1. Elite Header */}
            <div className="bg-[#0F172A] p-5 pb-6 text-white relative overflow-hidden">
                <div className="relative z-10 flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold tracking-tight leading-none mb-1.5 truncate">
                            {property.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-semibold uppercase tracking-wider truncate">
                            <MapPin size={10} className="text-emerald-500" />
                            {property.location}
                        </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-bold rounded-full border border-emerald-500/20 tracking-widest backdrop-blur-md shrink-0">
                        {property.investmentStrategy.toUpperCase()}
                    </span>
                </div>
            </div>

            {/* 2. Precision Preview */}
            <div className="relative h-20 mx-6 -mt-4 rounded-2xl overflow-hidden shadow-xl border-4 border-white group">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-white/95 text-[#0F172A] text-[9px] font-bold rounded-full backdrop-blur-sm shadow-sm border border-slate-100 uppercase tracking-tighter">
                    {property.badge}
                </div>
            </div>

            {/* 3. Financial Metrics */}
            <div className="px-7 pt-5">
                <div className="flex justify-between items-end mb-4">
                    <div className="space-y-0.5">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">Asset Valuation</p>
                        <p className="text-2xl font-bold text-slate-900 tracking-tighter leading-none">{property.assetPrice}</p>
                    </div>
                    <div className="text-right space-y-0.5">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">Equity Issued</p>
                        <p className="text-base font-bold text-slate-900 leading-none">{fundedPercentage}%</p>
                    </div>
                </div>

                <div className="relative h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-5">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${fundedPercentage}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                    />
                </div>
            </div>

            {/* 4. Projections Grid - Clean & Balanced */}
            <div className="px-7 mb-5">
                <div className="bg-slate-50/50 rounded-2xl p-3 border border-slate-100">
                    <div className="flex items-center gap-2 mb-3 border-b border-slate-200/50 pb-2">
                        <TrendingUp size={12} className="text-emerald-500" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em]">Target Projections</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="text-center">
                            <p className="text-[8px] text-slate-400 font-semibold uppercase mb-1">5Y Return</p>
                            <p className="text-xs font-bold text-slate-900">{fiveYearReturn}%</p>
                        </div>
                        <div className="text-center border-x border-slate-200/50">
                            <p className="text-[8px] text-slate-400 font-semibold uppercase mb-1">Annual</p>
                            <p className="text-xs font-bold text-slate-900">{yearlyReturn}%</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[8px] text-slate-400 font-semibold uppercase mb-1">Rental</p>
                            <p className="text-xs font-bold text-emerald-600">{projectedRentalYield}%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. Execution Area - Elite Finance Aesthetic */}
            <div className="px-7 pb-7">
                <div className="flex items-center justify-between mb-2 px-0.5">
                    <h4 className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.15em]">Investment Principal</h4>
                    <span className="text-[8px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Min 1,800 AED</span>
                </div>

                <div className="group relative mb-4">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <span className="text-slate-400 font-bold text-sm group-focus-within:text-emerald-500 transition-colors uppercase">AED</span>
                    </div>
                    <input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full pl-14 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-lg font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition-all shadow-sm"
                        placeholder="0"
                    />
                </div>

                <div className="flex gap-2 mb-5">
                    {quickAmounts.map((amount) => (
                        <button
                            key={amount}
                            onClick={() => setInvestmentAmount(amount)}
                            className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold transition-all border ${investmentAmount === amount
                                ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-lg'
                                : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-200 hover:text-emerald-600'
                                }`}
                        >
                            +{amount.toLocaleString()} AED
                        </button>
                    ))}
                </div>

                <Button
                    text={isAdded ? "SECURED" : "INVEST NOW"}
                    icon={isAdded ? Check : ShoppingCart}
                    onClick={handleAddToCart}
                    disabled={isAdded || investmentAmount <= 0}
                    className="w-full h-14"
                />
            </div>

            {/* 6. Social Layer */}
            <div className="px-7 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-5 h-5 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                                <img src={`https://ui-avatars.com/api/?name=User+${i}&background=random&size=32`} alt="Active" />
                            </div>
                        ))}
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500">Live Activity</span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    <Eye size={12} className="text-emerald-500" />
                    <span>{viewCount.toLocaleString()} Browsing</span>
                </div>
            </div>
        </div>
    );
}
