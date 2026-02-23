import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp, DollarSign, Percent, Calendar, PieChart,
    ArrowUpRight, ArrowDownRight, Info, Calculator,
    BarChart3, LineChart as LineChartIcon, Target, Zap
} from 'lucide-react';

// Custom SVG Line Chart Component
const LineChart = ({ data, color = '#0F172A', gradient = true }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue || 1;
    const height = 200;
    const width = 500;
    const padding = 40;

    const points = data.map((d, i) => {
        const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
        const y = height - padding - ((d.value - minValue) / range) * (height - 2 * padding);
        return `${x},${y}`;
    }).join(' ');

    const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            <defs>
                <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map(i => (
                <line
                    key={i}
                    x1={padding}
                    y1={padding + (i * (height - 2 * padding)) / 4}
                    x2={width - padding}
                    y2={padding + (i * (height - 2 * padding)) / 4}
                    stroke="#E5E7EB"
                    strokeWidth="1"
                />
            ))}

            {/* Area fill */}
            {gradient && (
                <polygon
                    points={areaPoints}
                    fill={`url(#gradient-${color})`}
                />
            )}

            {/* Line */}
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Data points */}
            {data.map((d, i) => {
                const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
                const y = height - padding - ((d.value - minValue) / range) * (height - 2 * padding);
                return (
                    <g key={i}>
                        <circle cx={x} cy={y} r="6" fill="white" stroke={color} strokeWidth="3" />
                        <text x={x} y={height - 15} textAnchor="middle" fontSize="12" fill="#6B7280" fontWeight="500">
                            {d.label}
                        </text>
                    </g>
                );
            })}

            {/* Y-axis labels */}
            {[0, 1, 2, 3, 4].map(i => {
                const value = maxValue - (i * (range)) / 4;
                return (
                    <text
                        key={i}
                        x={padding - 10}
                        y={padding + (i * (height - 2 * padding)) / 4 + 4}
                        textAnchor="end"
                        fontSize="11"
                        fill="#9CA3AF"
                    >
                        ${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </text>
                );
            })}
        </svg>
    );
};

// Custom Bar Chart Component
const BarChart = ({ data, colors }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const height = 180;
    const barWidth = 60;
    const gap = 20;
    const totalWidth = data.length * (barWidth + gap);

    return (
        <svg viewBox={`0 0 ${totalWidth} ${height}`} className="w-full h-full">
            {data.map((d, i) => {
                const barHeight = (d.value / maxValue) * (height - 40);
                const x = i * (barWidth + gap);
                const y = height - barHeight - 30;

                return (
                    <g key={i}>
                        <rect
                            x={x}
                            y={y}
                            width={barWidth}
                            height={barHeight}
                            fill={colors[i % colors.length]}
                            rx="8"
                            className="transition-all duration-500 hover:opacity-80"
                        />
                        <text
                            x={x + barWidth / 2}
                            y={height - 10}
                            textAnchor="middle"
                            fontSize="11"
                            fill="#6B7280"
                            fontWeight="500"
                        >
                            {d.label}
                        </text>
                        <text
                            x={x + barWidth / 2}
                            y={y - 8}
                            textAnchor="middle"
                            fontSize="12"
                            fill="#1F2937"
                            fontWeight="700"
                        >
                            ${d.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

// Donut Chart Component
const DonutChart = ({ data }) => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let currentAngle = 0;
    const radius = 80;
    const circumference = 2 * Math.PI * radius;

    return (
        <div className="relative w-48 h-48 mx-auto">
            <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                {data.map((d, i) => {
                    const percentage = d.value / total;
                    const strokeDasharray = `${percentage * circumference} ${circumference}`;
                    const rotation = currentAngle * 360;
                    currentAngle += percentage;

                    return (
                        <circle
                            key={i}
                            cx="100"
                            cy="100"
                            r={radius}
                            fill="none"
                            stroke={d.color}
                            strokeWidth="24"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset="0"
                            transform={`rotate(${rotation} 100 100)`}
                            className="transition-all duration-500 hover:opacity-80"
                        />
                    );
                })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                    <p className="text-xs text-gray-500">Total Value</p>
                </div>
            </div>
        </div>
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

    // Chart data
    const propertyValueData = projections.map(p => ({
        label: `Y${p.year}`,
        value: p.propertyValue
    }));

    const totalValueData = projections.map(p => ({
        label: `Y${p.year}`,
        value: p.totalValue
    }));

    const breakdownData = [
        { label: 'Initial', value: investmentAmount, color: '#6B7280' },
        { label: 'Capital Gains', value: capitalGains, color: '#0F172A' },
        { label: 'Rental Income', value: finalProjection.rentalIncome, color: '#10B981' }
    ];

    const pieData = [
        { label: 'Initial Investment', value: investmentAmount, color: '#6B7280' },
        { label: 'Property Appreciation', value: capitalGains, color: '#0F172A' },
        { label: 'Rental Yield', value: finalProjection.rentalIncome, color: '#10B981' }
    ];

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

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Property Value Growth Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <LineChartIcon size={20} className="text-blue-600" />
                            <h3 className="font-bold text-gray-900">Property Value Growth</h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-[#0F172A]" />
                                <span className="text-gray-600">Value</span>
                            </span>
                        </div>
                    </div>
                    <div className="h-52">
                        <LineChart data={propertyValueData} color="#0F172A" />
                    </div>
                </motion.div>

                {/* Total Returns Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <BarChart3 size={20} className="text-green-600" />
                            <h3 className="font-bold text-gray-900">Total Returns Breakdown</h3>
                        </div>
                    </div>
                    <div className="h-52">
                        <BarChart
                            data={breakdownData}
                            colors={['#6B7280', '#0F172A', '#10B981']}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Investment Composition */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-gray-100"
                >
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <PieChart size={20} className="text-purple-600" />
                        Investment Composition
                    </h3>
                    <DonutChart data={pieData} />
                    <div className="mt-6 space-y-3">
                        {pieData.map((item, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-sm text-gray-600">{item.label}</span>
                                </div>
                                <span className="font-bold text-gray-900">{formatCurrency(item.value)}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Year-by-Year Breakdown Table */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
                >
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Target size={20} className="text-orange-600" />
                        Year-by-Year Projection
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left py-3 px-2 text-xs font-bold text-gray-500 uppercase">Year</th>
                                    <th className="text-right py-3 px-2 text-xs font-bold text-gray-500 uppercase">Property Value</th>
                                    <th className="text-right py-3 px-2 text-xs font-bold text-gray-500 uppercase">Rental Income</th>
                                    <th className="text-right py-3 px-2 text-xs font-bold text-gray-500 uppercase">Total Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projections.map((p, i) => (
                                    <tr
                                        key={i}
                                        className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i === projections.length - 1 ? 'bg-green-50' : ''}`}
                                    >
                                        <td className="py-3 px-2">
                                            <span className={`text-sm font-bold ${i === projections.length - 1 ? 'text-green-700' : 'text-gray-700'}`}>
                                                Year {p.year}
                                            </span>
                                        </td>
                                        <td className="text-right py-3 px-2">
                                            <span className="text-sm font-semibold text-gray-900">
                                                {formatCurrency(p.propertyValue)}
                                            </span>
                                        </td>
                                        <td className="text-right py-3 px-2">
                                            <span className="text-sm font-semibold text-green-600">
                                                +{formatCurrency(p.rentalIncome)}
                                            </span>
                                        </td>
                                        <td className="text-right py-3 px-2">
                                            <span className={`text-sm font-bold ${i === projections.length - 1 ? 'text-green-700' : 'text-gray-900'}`}>
                                                {formatCurrency(p.totalValue)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>

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

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                    <Info size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold text-yellow-800 mb-1">Important Disclaimer</p>
                        <p className="text-sm text-yellow-700">
                            These projections are based on historical data and market analysis. Actual returns may vary due to market conditions, economic factors, and property performance. Past performance does not guarantee future results. Please consult with a financial advisor before making investment decisions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
