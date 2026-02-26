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
        <div className="bg-white border border-slate-200 rounded-[2rem] shadow-xl shadow-slate-200/40 overflow-hidden transition-all duration-500 hover:shadow-emerald-100/30">
            <div className="flex flex-col lg:flex-row h-full">
                {/* 1. Preview Image - Left Side */}
                <div className="lg:w-1/3 relative h-48 lg:h-auto min-h-[200px] group overflow-hidden">
                    <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 text-[#0F172A] text-[10px] font-bold rounded-full backdrop-blur-sm shadow-sm border border-slate-100 uppercase tracking-tighter">
                        {property.badge}
                    </div>
                </div>

                {/* 2. Content Area - Right Side */}
                <div className="lg:w-2/3 flex flex-col">
                    <div className="flex flex-col md:flex-row flex-1">
                        {/* Middle: Metrics & Projections */}
                        <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-slate-100">
                            <div className="flex justify-between items-end mb-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Asset Valuation</p>
                                    <p className="text-2xl font-bold text-slate-900 tracking-tighter leading-none">{property.assetPrice}</p>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Equity Issued</p>
                                    <p className="text-lg font-bold text-slate-900 leading-none">{fundedPercentage}%</p>
                                </div>
                            </div>

                            <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-6">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${fundedPercentage}%` }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                                />
                            </div>

                            <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
                                <div className="flex items-center gap-2 mb-3">
                                    <TrendingUp size={14} className="text-emerald-500" />
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.1em]">Target Projections</span>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <p className="text-[9px] text-slate-400 font-semibold uppercase mb-1">5Y Return</p>
                                        <p className="text-sm font-bold text-slate-900">{fiveYearReturn}%</p>
                                    </div>
                                    <div className="text-center border-x border-slate-200/50">
                                        <p className="text-[9px] text-slate-400 font-semibold uppercase mb-1">Annual</p>
                                        <p className="text-sm font-bold text-slate-900">{yearlyReturn}%</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[9px] text-slate-400 font-semibold uppercase mb-1">Rental</p>
                                        <p className="text-sm font-bold text-emerald-600">{projectedRentalYield}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Investment Area */}
                        <div className="flex-1 p-6 flex flex-col justify-center">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em]">Investment Principal</h4>
                                <span className="text-[9px] font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">Min 1,800 AED</span>
                            </div>

                            <div className="group relative mb-4">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <span className="text-slate-400 font-bold text-base group-focus-within:text-emerald-500 transition-colors uppercase">AED</span>
                                </div>
                                <input
                                    type="number"
                                    value={investmentAmount}
                                    onChange={(e) => setInvestmentAmount(Math.max(0, parseInt(e.target.value) || 0))}
                                    className="w-full pl-16 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xl font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all shadow-sm"
                                    placeholder="0"
                                />
                            </div>

                            <div className="flex gap-2 mb-5">
                                {quickAmounts.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => setInvestmentAmount(amount)}
                                        className={`flex-1 py-2 rounded-xl text-[10px] font-bold transition-all border ${investmentAmount === amount
                                            ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-lg'
                                            : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-200 hover:text-emerald-600'
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
                                className="w-full h-12"
                            />
                        </div>
                    </div>

                    {/* Bottom: Social Layer */}
                    <div className="px-6 py-3 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                                        <img src={`https://ui-avatars.com/api/?name=User+${i}&background=random&size=32`} alt="Active" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-[11px] font-semibold text-slate-500">Live Activity</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <Eye size={14} className="text-emerald-500" />
                            <span>{viewCount.toLocaleString()} Browsing</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
