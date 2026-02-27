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
                            fontWeight="700"
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
                            fontWeight="500"
                        >
                            {new Date().getFullYear() + d.year}
                        </text>
                    </g>
                );
            })}

        </svg>
    );
};

// Custom Vertical Slider Component
const VerticalSlider = ({ label, value, min, max, step, onChange, formatValue, unit = '' }) => {
    const percentage = ((value - min) / (max - min)) * 100;
    const trackRef = React.useRef(null);

    const handleDrag = (event, info) => {
        if (!trackRef.current) return;

        const trackBounds = trackRef.current.getBoundingClientRect();
        // Calculate position relative to track bottom (where value is min)
        const relativeY = info.point.y - trackBounds.top;
        const clampedY = Math.max(0, Math.min(relativeY, trackBounds.height));

        // Inverse: bottom is 0%, top is 100%
        const inversePercentage = 1 - (clampedY / trackBounds.height);
        let newValue = min + (inversePercentage * (max - min));

        // Snap to step
        newValue = Math.round(newValue / step) * step;
        newValue = Math.max(min, Math.min(max, newValue));

        if (newValue !== value) {
            onChange(newValue);
        }
    };

    const handleTrackClick = (e) => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const inversePercentage = 1 - (y / rect.height);
        let newValue = min + (inversePercentage * (max - min));
        newValue = Math.round(newValue / step) * step;
        newValue = Math.max(min, Math.min(max, newValue));
        onChange(newValue);
    };

    return (
        <div className="flex flex-col items-center h-full group relative">
            <div className="relative h-48 w-12 flex justify-center py-4">
                {/* Max label (Top) */}
                <div className="absolute top-0 text-[9px] font-bold text-gray-400 uppercase tracking-tighter w-max">
                    {max >= 1000 ? `${(max / 1000).toFixed(0)}K` : max} {unit}
                </div>

                {/* Vertical Track Area (wider for better hit surface) */}
                <div
                    ref={trackRef}
                    className="h-full w-8 flex justify-center cursor-pointer relative"
                    onClick={handleTrackClick}
                >
                    {/* Actual Track Line - Centered within w-8 */}
                    <div className="h-full w-[2px] bg-gray-100 rounded-full relative">
                        {/* Active Track */}
                        <motion.div
                            initial={false}
                            animate={{ height: `${percentage}%` }}
                            className="absolute bottom-0 left-0 right-0 bg-emerald-500 rounded-full"
                        />
                    </div>

                    {/* Draggable Thumb - Sibling of track line, centered in w-8 */}
                    <motion.div
                        drag="y"
                        dragConstraints={trackRef}
                        dragElastic={0}
                        dragMomentum={false}
                        onDrag={handleDrag}
                        animate={{ bottom: `${percentage}%` }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9, cursor: 'grabbing' }}
                        className="absolute w-4 h-4 bg-emerald-600 rounded-full border-2 border-white shadow-lg cursor-grab z-30"
                        style={{
                            left: '50%',
                            x: '-50%',
                            marginBottom: '-8px' // Offset the bottom-aligned anchor to center circle on the point
                        }}
                    />
                </div>

                {/* Min label (Bottom) */}
                <div className="absolute bottom-0 text-[9px] font-bold text-gray-400 uppercase tracking-tighter w-max">
                    {min >= 1000 ? `${(min / 1000).toFixed(0)}K` : min} {unit}
                </div>
            </div>

            {/* Value Display */}
            <div className="mt-6 text-emerald-700 font-bold text-xs whitespace-nowrap">
                {formatValue ? formatValue(value) : `${value}${unit}`}
            </div>

            {/* Label (Bottom) */}
            <div className="mt-2 text-[9.5px] font-bold text-gray-500 uppercase tracking-widest text-center h-10 w-28 leading-tight">
                {label}
            </div>
        </div>
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
                    <h2 className="text-xl font-semibold text-gray-900 tracking-wider">Investment calculator</h2>
                    <p className="text-sm text-gray-500">Project your returns over time</p>
                </div>
                <button
                    onClick={onShowHowItWorks}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors group"
                >
                    <div className="w-8 h-8 rounded-sm bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
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
                            <div className="w-2.5 h-2.5 rounded-sm bg-[#64748B] flex-shrink-0 mt-1" />
                            <div>
                                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">Investment</p>
                                <p className="text-lg font-bold text-gray-900 leading-tight">AED {investmentAmount.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Rental Income */}
                        <div className="flex items-start gap-3">
                            <div className="w-2.5 h-2.5 rounded-sm bg-[#10B981] flex-shrink-0 mt-1" />
                            <div>
                                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">Total rental income</p>
                                <p className="text-lg font-bold text-gray-900 leading-tight">Ð {finalProjection.rentalIncome.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Capital Appreciation */}
                        <div className="flex items-start gap-3">
                            <div className="w-2.5 h-2.5 rounded-sm bg-[#1E293B] flex-shrink-0 mt-1" />
                            <div>
                                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">Value appreciation</p>
                                <p className="text-lg font-bold text-gray-900 leading-tight">Ð {capitalGains.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* EQUALIZER INPUTS SECTION - Hybrid Style */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm mt-8">
                <div className="flex flex-wrap items-end justify-center gap-x-1 gap-y-12">

                    {/* Left Presets (Investment) */}
                    <div className="flex flex-col gap-3 pb-20">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-center mb-1">Picks</span>
                        {[50000, 25000, 10000, 5000].map(amount => (
                            <button
                                key={amount}
                                onClick={() => setInvestmentAmount(amount)}
                                className={`w-24 py-2 rounded-sm text-[10px] font-bold transition-all ${investmentAmount === amount
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-300'
                                    }`}
                            >
                                {amount.toLocaleString()}
                            </button>
                        ))}
                    </div>

                    {/* Sliders Grid */}
                    <div className="flex flex-1 max-w-md justify-between items-end gap-x-0">
                        <VerticalSlider
                            label="Initial Investment"
                            value={investmentAmount}
                            min={1000}
                            max={100000}
                            step={1000}
                            unit="AED"
                            onChange={setInvestmentAmount}
                            formatValue={(v) => `AED ${v.toLocaleString()}`}
                        />

                        <VerticalSlider
                            label="Rental Yield"
                            value={rentalYield}
                            min={1}
                            max={20}
                            step={0.1}
                            unit="%"
                            onChange={setRentalYield}
                        />

                        <VerticalSlider
                            label="Annual Appreciation"
                            value={appreciation}
                            min={1}
                            max={25}
                            step={0.1}
                            unit="%"
                            onChange={setAppreciation}
                        />

                        <VerticalSlider
                            label="Holding Period"
                            value={holdingPeriod}
                            min={1}
                            max={10}
                            step={1}
                            unit="Years"
                            onChange={setHoldingPeriod}
                        />
                    </div>

                    {/* Right Presets (Years) */}
                    <div className="flex flex-col gap-3 pb-20">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-center mb-1">Years</span>
                        {[10, 7, 5, 3].map(years => (
                            <button
                                key={years}
                                onClick={() => setHoldingPeriod(years)}
                                className={`w-24 py-2 rounded-sm text-[10px] font-bold transition-all ${holdingPeriod === years
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-300'
                                    }`}
                            >
                                {years} Years
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
