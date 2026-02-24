import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp, DollarSign, Percent, Calendar,
    Info, Calculator, Zap, ArrowUpRight
} from 'lucide-react';

// Custom SVG Stacked Bar Chart Component - Stake-style
const StackedBarChart = ({ data }) => {
    const height = 320;
    const width = 650;
    const padding = { top: 50, right: 40, bottom: 60, left: 70 };
    const chartHeight = height - padding.top - padding.bottom;
    const chartWidth = width - padding.left - padding.right;

    // Find max value for scaling
    const maxValue = Math.max(...data.map(d => d.totalValue));
    const yScale = (value) => chartHeight - (value / maxValue) * chartHeight;

    // Bar dimensions
    const barWidth = chartWidth / data.length - 20;
    const gap = 20;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            <defs>
                {/* Colors for each segment */}
                <linearGradient id="grad-investment" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6B7280" />
                    <stop offset="100%" stopColor="#4B5563" />
                </linearGradient>
                <linearGradient id="grad-gains" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0F172A" />
                    <stop offset="100%" stopColor="#1E293B" />
                </linearGradient>
                <linearGradient id="grad-rental" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map(i => {
                const y = padding.top + (i * chartHeight) / 4;
                const value = maxValue - (i * maxValue) / 4;
                return (
                    <g key={i}>
                        <line
                            x1={padding.left}
                            y1={y}
                            x2={width - padding.right}
                            y2={y}
                            stroke="#E5E7EB"
                            strokeWidth="1"
                            strokeDasharray="4,4"
                        />
                        <text
                            x={padding.left - 10}
                            y={y + 4}
                            textAnchor="end"
                            fontSize="11"
                            fill="#9CA3AF"
                            fontWeight="500"
                        >
                            ${value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value.toFixed(0)}
                        </text>
                    </g>
                );
            })}

            {/* Stacked Bars */}
            {data.map((d, i) => {
                const x = padding.left + i * (barWidth + gap) + gap / 2;
                
                // Calculate segment heights
                const investmentHeight = yScale(d.investment);
                const gainsHeight = yScale(d.propertyValue) - yScale(d.investment);
                const rentalHeight = yScale(d.totalValue) - yScale(d.propertyValue);

                return (
                    <g key={i}>
                        {/* Bottom Segment - Initial Investment */}
                        <rect
                            x={x}
                            y={padding.top + chartHeight - investmentHeight}
                            width={barWidth}
                            height={investmentHeight}
                            fill="url(#grad-investment)"
                            rx="4"
                            className="transition-all duration-300 hover:opacity-80"
                        />

                        {/* Middle Segment - Capital Gains */}
                        <rect
                            x={x}
                            y={padding.top + chartHeight - investmentHeight - gainsHeight}
                            width={barWidth}
                            height={gainsHeight}
                            fill="url(#grad-gains)"
                            rx="4"
                            className="transition-all duration-300 hover:opacity-80"
                        />

                        {/* Top Segment - Rental Income */}
                        <rect
                            x={x}
                            y={padding.top + chartHeight - investmentHeight - gainsHeight - rentalHeight}
                            width={barWidth}
                            height={rentalHeight}
                            fill="url(#grad-rental)"
                            rx="4"
                            className="transition-all duration-300 hover:opacity-80"
                        />

                        {/* Total Value Label on top of bar */}
                        <text
                            x={x + barWidth / 2}
                            y={padding.top + chartHeight - investmentHeight - gainsHeight - rentalHeight - 8}
                            textAnchor="middle"
                            fontSize="10"
                            fill="#10B981"
                            fontWeight="700"
                        >
                            ${d.totalValue >= 1000 ? `${(d.totalValue / 1000).toFixed(1)}K` : d.totalValue.toFixed(0)}
                        </text>

                        {/* Year Label */}
                        <text
                            x={x + barWidth / 2}
                            y={height - padding.bottom + 20}
                            textAnchor="middle"
                            fontSize="12"
                            fill="#6B7280"
                            fontWeight="600"
                        >
                            Y{d.year}
                        </text>
                    </g>
                );
            })}

            {/* Legend */}
            <g transform={`translate(${padding.left}, ${padding.top - 30})`}>
                <rect x="0" y="0" width="14" height="14" rx="3" fill="url(#grad-rental)" />
                <text x="20" y="11" fontSize="11" fill="#6B7280" fontWeight="500">Rental Income</text>
                
                <rect x="110" y="0" width="14" height="14" rx="3" fill="url(#grad-gains)" />
                <text x="130" y="11" fontSize="11" fill="#6B7280" fontWeight="500">Capital Gains</text>
                
                <rect x="230" y="0" width="14" height="14" rx="3" fill="url(#grad-investment)" />
                <text x="250" y="11" fontSize="11" fill="#6B7280" fontWeight="500">Initial Investment</text>
            </g>
        </svg>
    );
};

// Investment Calculator Component
export default function InvestmentCalculator({ property }) {
    const [investmentAmount, setInvestmentAmount] = useState(10000);
    const [holdingPeriod, setHoldingPeriod] = useState(5);

    // Parse property financial data
    const tokenPrice = parseFloat(property.tokenPriceUSD.replace(/[$,]/g, '')) || 45;
    const rentalYield = parseFloat(property.financials?.projectedRentalYield) || 4.5;
    const appreciation = parseFloat(property.financials?.annualAppreciation) || 6.2;

    // Calculate tokens purchased
    const tokensPurchased = investmentAmount / tokenPrice;

    // Calculate projections
    const projections = useMemo(() => {
        const data = [];
        let propertyValue = investmentAmount;
        let totalRentalIncome = 0;

        for (let year = 0; year <= holdingPeriod; year++) {
            const yearlyRental = propertyValue * (rentalYield / 100);
            totalRentalIncome += yearlyRental;

            data.push({
                year,
                propertyValue: Math.round(propertyValue),
                rentalIncome: Math.round(totalRentalIncome),
                totalValue: Math.round(propertyValue + totalRentalIncome)
            });

            propertyValue *= (1 + appreciation / 100);
        }

        return data;
    }, [investmentAmount, holdingPeriod, rentalYield, appreciation]);

    // Final values
    const finalProjection = projections[projections.length - 1];
    const capitalGains = finalProjection.propertyValue - investmentAmount;
    const totalReturns = capitalGains + finalProjection.rentalIncome;
    const totalROI = ((totalReturns / investmentAmount) * 100).toFixed(2);
    const annualizedROI = (((Math.pow(1 + totalReturns / investmentAmount, 1 / holdingPeriod) - 1) * 100)).toFixed(2);

    // Chart data for single projection chart
    const chartData = projections.map(p => ({
        year: p.year,
        investment: investmentAmount,
        propertyValue: p.propertyValue,
        rentalIncome: p.rentalIncome,
        totalValue: p.totalValue
    }));

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl">
                    <Calculator size={24} className="text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Investment Calculator</h2>
                    <p className="text-sm text-gray-500">Project your returns over time</p>
                </div>
            </div>

            {/* Input Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100">
                {/* Investment Amount Slider */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <DollarSign size={18} className="text-green-600" />
                            Initial Investment
                        </label>
                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold">
                            {formatCurrency(investmentAmount)}
                        </div>
                    </div>
                    <input
                        type="range"
                        min="1000"
                        max="100000"
                        step="1000"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>$1,000</span>
                        <span>$100,000</span>
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="flex gap-2 flex-wrap">
                        {[5000, 10000, 25000, 50000].map(amount => (
                            <button
                                key={amount}
                                onClick={() => setInvestmentAmount(amount)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${investmentAmount === amount
                                    ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                ${amount.toLocaleString()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Holding Period Slider */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Calendar size={18} className="text-blue-600" />
                            Holding Period
                        </label>
                        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold">
                            {holdingPeriod} Years
                        </div>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={holdingPeriod}
                        onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>1 Year</span>
                        <span>10 Years</span>
                    </div>

                    {/* Quick Period Buttons */}
                    <div className="flex gap-2 flex-wrap">
                        {[3, 5, 7, 10].map(years => (
                            <button
                                key={years}
                                onClick={() => setHoldingPeriod(years)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${holdingPeriod === years
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {years} Years
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-green-50 to-emerald-100 p-5 rounded-2xl border border-green-200"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={18} className="text-green-600" />
                        <span className="text-xs font-bold text-green-700">TOTAL RETURNS</span>
                    </div>
                    <p className="text-3xl font-bold text-green-900">{totalROI}%</p>
                    <p className="text-xs text-green-600 mt-1">{formatCurrency(totalReturns)} total profit</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-blue-50 to-indigo-100 p-5 rounded-2xl border border-blue-200"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <Percent size={18} className="text-blue-600" />
                        <span className="text-xs font-bold text-blue-700">ANNUALIZED ROI</span>
                    </div>
                    <p className="text-3xl font-bold text-blue-900">{annualizedROI}%</p>
                    <p className="text-xs text-blue-600 mt-1">Average per year</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-purple-50 to-violet-100 p-5 rounded-2xl border border-purple-200"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <ArrowUpRight size={18} className="text-purple-600" />
                        <span className="text-xs font-bold text-purple-700">CAPITAL GAINS</span>
                    </div>
                    <p className="text-3xl font-bold text-purple-900">{formatCurrency(capitalGains)}</p>
                    <p className="text-xs text-purple-600 mt-1">Property appreciation</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-orange-50 to-amber-100 p-5 rounded-2xl border border-orange-200"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign size={18} className="text-orange-600" />
                        <span className="text-xs font-bold text-orange-700">RENTAL INCOME</span>
                    </div>
                    <p className="text-3xl font-bold text-orange-900">{formatCurrency(finalProjection.rentalIncome)}</p>
                    <p className="text-xs text-orange-600 mt-1">{rentalYield}% annual yield</p>
                </motion.div>
            </div>

            {/* Stacked Bar Chart - Stake Style */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <TrendingUp size={20} className="text-green-600" />
                        <h3 className="font-bold text-gray-900">Investment Projection</h3>
                    </div>
                </div>
                <div className="h-80">
                    <StackedBarChart data={chartData} />
                </div>
            </motion.div>

            {/* Summary Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-[#0F172A] to-slate-800 text-white p-6 rounded-2xl shadow-xl"
            >
                <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                            <Zap size={20} className="text-yellow-400" />
                            Investment Summary
                        </h3>
                        <p className="text-gray-300 text-sm mb-4">
                            Based on an initial investment of <strong className="text-white">{formatCurrency(investmentAmount)}</strong> over <strong className="text-white">{holdingPeriod} years</strong>
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div>
                                <p className="text-xs text-gray-400">Tokens Purchased</p>
                                <p className="text-lg font-bold">{tokensPurchased.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Final Property Value</p>
                                <p className="text-lg font-bold">{formatCurrency(finalProjection.propertyValue)}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Total Rental Income</p>
                                <p className="text-lg font-bold text-green-400">{formatCurrency(finalProjection.rentalIncome)}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Total Returns</p>
                                <p className="text-lg font-bold text-green-400">{formatCurrency(totalReturns)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl">
                            <p className="text-xs text-gray-300 mb-1">Projected Total Value</p>
                            <p className="text-4xl font-bold text-green-400">{formatCurrency(finalProjection.totalValue)}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
