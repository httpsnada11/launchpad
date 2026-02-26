import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp, Percent, Calendar,
    Info, Calculator, Zap, ArrowUpRight, HelpCircle
} from 'lucide-react';

// Custom SVG Stacked Bar Chart Component - Stake-style
const StackedBarChart = ({ data }) => {
    const height = 320;
    const width = 650;
    const padding = { top: 50, right: 20, bottom: 60, left: 45 };
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
                            {value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value.toFixed(0)} AED
                        </text>
                    </g>
                );
            })}

            {/* Stacked Bars */}
            {data.map((d, i) => {
                const x = padding.left + i * (barWidth + gap) + gap / 2;

                // Calculate heights based on absolute values
                // Values are: investment, gains (propertyValue - investment), rental (totalValue - propertyValue)
                const invScale = (d.investment / maxValue) * chartHeight;
                const gainsScale = ((d.propertyValue - d.investment) / maxValue) * chartHeight;
                const rentalScale = ((d.totalValue - d.propertyValue) / maxValue) * chartHeight;

                const r = 4; // Corner radius

                return (
                    <g key={i}>
                        {/* Bottom Segment - Initial Investment (Round bottom only) */}
                        <motion.path
                            initial={false}
                            animate={{
                                d: `M ${x},${padding.top + chartHeight - invScale} 
                                   L ${x + barWidth},${padding.top + chartHeight - invScale} 
                                   L ${x + barWidth},${padding.top + chartHeight - r} 
                                   Q ${x + barWidth},${padding.top + chartHeight} ${x + barWidth - r},${padding.top + chartHeight} 
                                   L ${x + r},${padding.top + chartHeight} 
                                   Q ${x},${padding.top + chartHeight} ${x},${padding.top + chartHeight - r} Z`
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            fill="#64748B"
                            className="transition-opacity duration-300 hover:opacity-80"
                        />

                        {/* Middle Segment - Capital Gains (No rounding) */}
                        <motion.rect
                            initial={false}
                            animate={{
                                y: padding.top + chartHeight - invScale - gainsScale,
                                height: gainsScale
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            x={x}
                            width={barWidth}
                            fill="#1E293B"
                            className="transition-opacity duration-300 hover:opacity-80"
                        />

                        {/* Top Segment - Rental Income (Round top only) */}
                        <motion.path
                            initial={false}
                            animate={{
                                d: `M ${x},${padding.top + chartHeight - invScale - gainsScale} 
                                   L ${x + barWidth},${padding.top + chartHeight - invScale - gainsScale} 
                                   L ${x + barWidth},${padding.top + chartHeight - invScale - gainsScale - rentalScale + r} 
                                   Q ${x + barWidth},${padding.top + chartHeight - invScale - gainsScale - rentalScale} ${x + barWidth - r},${padding.top + chartHeight - invScale - gainsScale - rentalScale} 
                                   L ${x + r},${padding.top + chartHeight - invScale - gainsScale - rentalScale} 
                                   Q ${x},${padding.top + chartHeight - invScale - gainsScale - rentalScale} ${x},${padding.top + chartHeight - invScale - gainsScale - rentalScale + r} Z`
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            fill="#10B981"
                            className="transition-opacity duration-300 hover:opacity-80"
                        />

                        {/* Total Value Label on top of bar */}
                        <motion.text
                            initial={false}
                            animate={{
                                y: padding.top + chartHeight - invScale - gainsScale - rentalScale - 10
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            x={x + barWidth / 2}
                            textAnchor="middle"
                            fontSize="11"
                            fill="#10B981"
                            fontWeight="800"
                        >
                            {d.totalValue >= 1000 ? `${(d.totalValue / 1000).toFixed(1)}K` : d.totalValue.toFixed(0)}
                        </motion.text>

                        {/* Year Label */}
                        <text
                            x={x + barWidth / 2}
                            y={height - padding.bottom + 25}
                            textAnchor="middle"
                            fontSize="11"
                            fill="#9CA3AF"
                            fontWeight="600"
                        >
                            {new Date().getFullYear() + d.year}
                        </text>
                    </g>
                );
            })}

        </svg>
    );
};

// Investment Calculator Component
export default function InvestmentCalculator({ property, onShowHowItWorks }) {
    const [investmentAmount, setInvestmentAmount] = useState(10000);
    const [holdingPeriod, setHoldingPeriod] = useState(5);
    const [rentalYield, setRentalYield] = useState(parseFloat(property.financials?.projectedRentalYield) || 4.5);
    const [appreciation, setAppreciation] = useState(parseFloat(property.financials?.annualAppreciation) || 6.2);

    // Parse property financial data
    const tokenPrice = parseFloat(property.tokenPriceAED?.replace(/[, AED]/g, '')) || 165;

    // Calculate tokens purchased
    const tokensPurchased = investmentAmount / tokenPrice;

    // Calculate projections
    const projections = useMemo(() => {
        const data = [];
        let currentPropertyValue = investmentAmount;
        let accumulatedRentalIncome = 0;

        // Year 0: Baseline (Initial Investment)
        data.push({
            year: 0,
            propertyValue: Math.round(currentPropertyValue),
            rentalIncome: 0,
            totalValue: Math.round(currentPropertyValue)
        });

        // Year 1 to N
        for (let year = 1; year <= holdingPeriod; year++) {
            // Rent is calculated based on VALUE at start of the year
            const yearlyRental = currentPropertyValue * (rentalYield / 100);
            accumulatedRentalIncome += yearlyRental;

            // Property appreciates at end of year
            currentPropertyValue *= (1 + appreciation / 100);

            data.push({
                year,
                propertyValue: Math.round(currentPropertyValue),
                rentalIncome: Math.round(accumulatedRentalIncome),
                totalValue: Math.round(currentPropertyValue + accumulatedRentalIncome)
            });
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
        return new Intl.NumberFormat('en-AE', {
            style: 'currency',
            currency: 'AED',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value).replace('DH', 'AED');
    };

    return (
        <div className="pt-6 pb-6 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wider">INVESTMENT CALCULATOR</h2>
                    <p className="text-sm text-gray-500">Project your returns over time</p>
                </div>
                <button
                    onClick={onShowHowItWorks}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-sm transition-colors group"
                >
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <HelpCircle size={16} />
                    </div>
                    <span>How it works?</span>
                </button>
            </div>

            {/* Graph and Metrics Row */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 border-0"
            >
                <div className="flex flex-col lg:flex-row gap-x-12 gap-y-10 items-start">
                    {/* Chart - Left Side (Main) */}
                    <div className="flex-1 w-full order-1">
                        <div className="h-64 sm:h-80 w-full">
                            <StackedBarChart data={chartData} />
                        </div>
                    </div>

                    {/* Metrics Sidebar - Right Side on Desktop */}
                    <div className="lg:w-64 flex flex-col sm:flex-row lg:flex-col flex-wrap gap-x-12 gap-y-8 lg:gap-y-10 pt-4 lg:pt-14 order-2">
                        {/* Investment */}
                        <div className="flex items-start gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#64748B] flex-shrink-0 mt-1" />
                            <div>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Investment</p>
                                <p className="text-lg font-black text-gray-900 leading-tight">AED {investmentAmount.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Rental Income */}
                        <div className="flex items-start gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] flex-shrink-0 mt-1" />
                            <div>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Total rental income</p>
                                <p className="text-lg font-black text-gray-900 leading-tight">Ð {finalProjection.rentalIncome.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Capital Appreciation */}
                        <div className="flex items-start gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#1E293B] flex-shrink-0 mt-1" />
                            <div>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Value appreciation</p>
                                <p className="text-lg font-black text-gray-900 leading-tight">Ð {capitalGains.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Key Metrics Cards
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-green-50 to-emerald-100 p-5 rounded-2xl border border-green-200"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp size={18} className="text-green-600" />
                            <span className="text-xs font-bold text-green-700">TOTAL RETURNS</span>
                        </div>
                        <p className="text-3xl font-bold text-green-900">{totalROI}%</p>
                        <p className="text-xs text-green-600 mt-1">{formatCurrency(totalReturns)} total profit</p>
                    </div>
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
            */}

            {/* Input Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 py-8 border-t border-gray-100">
                {/* Investment Amount Slider */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            Initial Investment (AED)
                        </label>
                        <div className="text-emerald-700 px-0 py-2 font-bold text-sm">
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
                        className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-emerald-600"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                        <span>1,000 AED</span>
                        <span>100,000 AED</span>
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="flex gap-2 flex-wrap">
                        {[5000, 10000, 25000, 50000].map(amount => (
                            <button
                                key={amount}
                                onClick={() => setInvestmentAmount(amount)}
                                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${investmentAmount === amount
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {amount.toLocaleString()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Holding Period Slider */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-gray-700">
                            Holding Period
                        </label>
                        <div className="text-emerald-700 px-0 py-2 font-bold text-sm">
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
                        className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-emerald-600"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                        <span>1 Year</span>
                        <span>10 Years</span>
                    </div>

                    {/* Quick Period Buttons */}
                    <div className="flex gap-2 flex-wrap">
                        {[3, 5, 7, 10].map(years => (
                            <button
                                key={years}
                                onClick={() => setHoldingPeriod(years)}
                                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${holdingPeriod === years
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {years} Years
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rental Yield Slider */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-gray-700">
                            Rental Yield (ROI)
                        </label>
                        <div className="text-emerald-700 px-0 py-2 font-bold text-sm">
                            {rentalYield}%
                        </div>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="20"
                        step="0.1"
                        value={rentalYield}
                        onChange={(e) => setRentalYield(Number(e.target.value))}
                        className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-emerald-600"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                        <span>1%</span>
                        <span>20%</span>
                    </div>
                </div>

                {/* Appreciation Slider (CAGR) */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-gray-700">
                            Annual Appreciation (CAGR)
                        </label>
                        <div className="text-emerald-700 px-0 py-2 font-bold text-sm">
                            {appreciation}%
                        </div>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="25"
                        step="0.1"
                        value={appreciation}
                        onChange={(e) => setAppreciation(Number(e.target.value))}
                        className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-emerald-600"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                        <span>1%</span>
                        <span>25%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
