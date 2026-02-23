import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, TrendingUp, ShoppingCart, Check } from 'lucide-react';

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
        <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden sticky top-24">
            {/* Property Title - Compact */}
            <div className="bg-gradient-to-r from-[#0F172A] to-slate-800 p-4">
                <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
                    {property.title}
                </h3>
                <p className="text-xs text-gray-300 mb-2">{property.location}, {property.city}</p>
                <div className="flex gap-1.5">
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-bold rounded-full border border-green-500/30">
                        {property.investmentStrategy}
                    </span>
                </div>
            </div>

            {/* Property Image - Reduced Height */}
            <div className="relative h-32 overflow-hidden">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Price & Funding - Compact */}
            <div className="p-4 border-b border-gray-100">
                <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-0.5">Total Asset Value</p>
                    <p className="text-2xl font-bold text-gray-900">{property.assetPrice}</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-semibold text-gray-700">{fundedPercentage}% Funded</span>
                        <span className="text-xs text-gray-500">{availableTokens.toLocaleString()} available</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${fundedPercentage}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                        />
                    </div>
                </div>

                {/* Investors */}
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Users size={12} />
                    <span className="font-semibold">{investorCount} Investors</span>
                </div>
            </div>

            {/* Returns Section - Compact Grid */}
            <div className="p-4 bg-gradient-to-br from-slate-50 to-white border-y border-gray-100">
                <h4 className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1">
                    <TrendingUp size={14} className="text-green-600" />
                    Projected Returns
                </h4>
                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white rounded-lg p-2 border border-gray-100 text-center">
                        <p className="text-[10px] text-gray-500 mb-0.5">5 Year</p>
                        <p className="text-base font-bold text-gray-900">{fiveYearReturn}%</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-gray-100 text-center">
                        <p className="text-[10px] text-gray-500 mb-0.5">Yearly</p>
                        <p className="text-base font-bold text-gray-900">{yearlyReturn}%</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-gray-100 text-center">
                        <p className="text-[10px] text-gray-500 mb-0.5">Net Yield</p>
                        <p className="text-base font-bold text-gray-900">{projectedRentalYield}%</p>
                    </div>
                </div>
            </div>

            {/* Investment Box - Compact */}
            <div className="p-4">
                <h4 className="text-xs font-bold text-gray-700 mb-2">Investment Amount</h4>
                
                {/* Input Field */}
                <div className="relative mb-2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-sm">$</span>
                    <input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full pl-7 pr-3 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-base font-bold text-gray-900 focus:outline-none focus:border-green-500 transition-all"
                        placeholder="Amount"
                    />
                </div>

                {/* Quick Amount Buttons */}
                <div className="flex gap-1.5 mb-3">
                    {quickAmounts.map((amount) => (
                        <button
                            key={amount}
                            onClick={() => setInvestmentAmount(amount)}
                            className={`flex-1 py-1.5 rounded text-[10px] font-bold transition-all ${
                                investmentAmount === amount
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            +${amount/1000}K
                        </button>
                    ))}
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    disabled={isAdded || investmentAmount <= 0}
                    className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                        isAdded
                            ? 'bg-green-500 text-white'
                            : 'bg-[#0F172A] hover:bg-[#1E293B] text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {isAdded ? (
                        <>
                            <Check size={16} />
                            Added
                        </>
                    ) : (
                        <>
                            <ShoppingCart size={16} />
                            Add to Cart
                        </>
                    )}
                </button>
            </div>

            {/* Views Counter - Ultra Compact */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-600">
                    <Eye size={12} className="text-gray-400" />
                    <span className="font-semibold">{viewCount.toLocaleString()}</span>
                    <span>viewed</span>
                </div>
            </div>
        </div>
    );
}
