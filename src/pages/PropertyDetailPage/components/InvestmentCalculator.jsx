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

    // Find max value for scaling - Add 20% headroom for labels
    const rawMax = Math.max(...data.map(d => d.totalValue));
    const maxValue = Math.ceil(rawMax * 1.2 / 1000) * 1000;
    const yScale = (value) => chartHeight - (value / maxValue) * chartHeight;

    // Bar dimensions
    const barWidth = chartWidth / data.length - 12;
    const gap = 12;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">

            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                const value = maxValue * (1 - pct);
                const y = padding.top + (pct * chartHeight);
                return (
                    <g key={i}>
                        <line
                            x1={padding.left}
                            y1={y}
                            x2={width - padding.right}
                            y2={y}
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="1"
                        />
                        <text
                            x={padding.left - 12}
                            y={y + 4}
                            textAnchor="end"
                            fontSize="10"
                            fill="#64748B"
                            fontWeight="600"
                            className="font-mono"
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
                                y: padding.top + chartHeight - invScale - gainsScale - rentalScale - 12
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            x={x + barWidth / 2}
                            textAnchor="middle"
                            fontSize="10"
                            fill="#10B981"
                            fontWeight="800"
                        >
                            {d.totalValue >= 1000 ? `${(d.totalValue / 1000).toFixed(1)}K` : d.totalValue.toFixed(0)}
                        </motion.text>

                        {/* Year Label */}
                        <text
                            x={x + barWidth / 2}
                            y={height - padding.bottom + 30}
                            textAnchor="middle"
                            fontSize="10"
                            fill="#64748B"
                            fontWeight="700"
                            className="uppercase tracking-widest"
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
                <div className="absolute top-0 text-[10px] font-bold text-gray-500 uppercase tracking-widest w-max">
                    {max >= 1000 ? `${(max / 1000).toFixed(0)}K` : max} {unit}
                </div>

                {/* Vertical Track Area (wider for better hit surface) */}
                <div
                    ref={trackRef}
                    className="h-full w-8 flex justify-center cursor-pointer relative"
                    onClick={handleTrackClick}
                >
                    {/* Actual Track Line - Centered within w-8 */}
                    <div className="h-full w-[2px] bg-white/5 rounded-full relative">
                        {/* Active Track */}
                        <motion.div
                            initial={false}
                            animate={{ height: `${percentage}%` }}
                            className="absolute bottom-0 left-0 right-0 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"
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
            <div className="mt-6 text-emerald-400 font-bold text-xs whitespace-nowrap bg-emerald-400/5 px-2 py-1 rounded-sm border border-emerald-400/10">
                {formatValue ? formatValue(value) : `${value}${unit}`}
            </div>

            {/* Label (Bottom) */}
            <div className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center h-10 w-28 leading-tight">
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
                    <h2 className="text-2xl font-bold text-white tracking-tight uppercase">Investment calculator</h2>
                    <p className="text-sm text-gray-400 mt-1">Project your returns with high-precision metrics</p>
                </div>
            </div>

            {/* Graph and Metrics Row */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 border-y border-white/5"
            >
                <div className="flex flex-col lg:flex-row gap-x-12 gap-y-10 items-start">
                    {/* Chart - Left Side (Main) */}
                    <div className="flex-1 w-full order-1">
                        <div className="h-64 sm:h-96 w-full">
                            <StackedBarChart data={chartData} />
                        </div>
                    </div>

                    {/* Metrics Sidebar - Right Side on Desktop */}
                    <div className="lg:w-72 flex flex-col sm:flex-row lg:flex-col flex-wrap gap-x-12 gap-y-8 lg:gap-y-12 pt-4 lg:pt-14 order-2">
                        {/* Investment */}
                        <div className="flex items-start gap-4">
                            <div className="w-3 h-3 rounded-full bg-[#64748B] flex-shrink-0 mt-1 shadow-[0_0_10px_rgba(100,116,139,0.3)]" />
                            <div>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-2">Investment</p>
                                <p className="text-2xl font-black text-white leading-tight tracking-tight">AED {investmentAmount.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Rental Income */}
                        <div className="flex items-start gap-4">
                            <div className="w-3 h-3 rounded-full bg-[#10B981] flex-shrink-0 mt-1 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                            <div>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-2">Total rental income</p>
                                <p className="text-2xl font-black text-white leading-tight tracking-tight">AED {finalProjection.rentalIncome.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Capital Appreciation */}
                        <div className="flex items-start gap-4">
                            <div className="w-3 h-3 rounded-full bg-[#1E293B] flex-shrink-0 mt-1 shadow-[0_0_10px_rgba(30,41,59,0.5)]" />
                            <div>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-2">Value appreciation</p>
                                <p className="text-2xl font-black text-white leading-tight tracking-tight">AED {capitalGains.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* EQUALIZER INPUTS SECTION - Hybrid Style */}
            <div className="bg-[#0a0a0b] rounded-2xl border border-white/5 p-4 md:p-8 shadow-2xl mt-8">
                <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-y-12 md:gap-x-1">

                    {/* Left Presets (Investment) */}
                    <div className="grid grid-cols-2 md:flex md:flex-col gap-3 pb-8 md:pb-20 w-full md:w-auto px-4 md:px-0">
                        <span className="col-span-2 md:col-span-1 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] text-center mb-2">Picks</span>
                        {[50000, 25000, 10000, 5000].map(amount => (
                            <button
                                key={amount}
                                onClick={() => setInvestmentAmount(amount)}
                                className={`py-2 px-6 rounded-sm text-[10px] font-bold transition-all border ${investmentAmount === amount
                                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)] scale-105'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-emerald-500/50'
                                    }`}
                            >
                                {amount.toLocaleString()}
                            </button>
                        ))}
                    </div>

                    {/* Sliders Grid */}
                    <div className="grid grid-cols-2 md:flex md:flex-1 w-full md:max-w-md justify-items-center md:items-end gap-x-4 md:gap-x-0">
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
                    <div className="grid grid-cols-2 md:flex md:flex-col gap-3 pt-8 md:pb-20 w-full md:w-auto px-4 md:px-0">
                        <span className="col-span-2 md:col-span-1 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] text-center mb-2">Years</span>
                        {[10, 7, 5, 3].map(years => (
                            <button
                                key={years}
                                onClick={() => setHoldingPeriod(years)}
                                className={`py-2 px-6 rounded-sm text-[10px] font-bold transition-all border ${holdingPeriod === years
                                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)] scale-105'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-emerald-500/50'
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
