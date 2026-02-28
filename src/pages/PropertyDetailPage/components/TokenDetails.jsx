import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Info,
    ArrowUpRight,
    PieChart,
    Wallet
} from 'lucide-react';
import HowItWorksModal from './HowItWorksModal';

const MetricBox = ({ label, value, icon: Icon, trend, isCurrency = true }) => (
    <div className="bg-white/5 border border-white/10 rounded-sm p-3 shadow-sm transition-all hover:bg-white/10 flex flex-col justify-center min-h-[85px]">
        <div className="flex justify-between items-start mb-1.5">
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{label}</span>
            {trend && (
                <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-400">
                    <ArrowUpRight size={10} />
                    {trend}
                </div>
            )}
        </div>
        <div className="space-y-0.5">
            <div className="text-lg font-extrabold text-white tracking-tight leading-none uppercase flex items-baseline">
                {isCurrency && <span className="text-gray-400 mr-1 font-bold text-[10px]">AED</span>}
                {value}
            </div>
        </div>
    </div>
);

export default function TokenDetails({ property }) {
    if (!property) return null;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fin = property.financials;

    // Extract numbers safely
    const tokensSold = fin?.tokensSold || 0;
    const maxTokensSold = fin?.maxTokensToSell || property.totalTokens || 0;
    const soldPercentage = maxTokensSold > 0 ? (tokensSold / maxTokensSold) * 100 : 0;

    const tokenPriceNum = parseFloat(property.tokenPriceAED?.replace(/[^0-9.]/g, '')) || 0;
    const availableTotalValue = (maxTokensSold - tokensSold) * tokenPriceNum;

    return (
        <div className="bg-black border border-white/10 rounded-xl overflow-hidden relative shadow-2xl min-h-[400px] md:min-h-[450px] flex flex-col justify-center">
            {/* Background Graphic Overlay */}
            <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
                <img
                    src="/token_details_graphic.png"
                    alt=""
                    className="w-full h-full object-cover object-left-bottom brightness-110 contrast-125 scale-110"
                />
            </div>

            <div className="relative z-10 p-6 md:p-8 lg:p-10 space-y-8 md:space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">

                    {/* Left Column: Key Metrics Grid */}
                    <div className="grid grid-cols-2 gap-6 lg:gap-6 self-start">
                        <MetricBox
                            label="Listing price"
                            value={property.assetPrice?.replace('AED ', '') || '0'}
                        />
                        <MetricBox
                            label="Market value"
                            value={fin?.marketValue?.replace('AED ', '') || property.assetPrice?.replace('AED ', '') || '0'}
                            trend={property.cagr}
                        />
                        <MetricBox
                            label="Issued Token In Marketplace"
                            value={property.tokenPriceAED?.replace(' AED', '') || '0'}
                            isCurrency={false}
                        />
                        <MetricBox
                            label="Token availability"
                            value={
                                <span className="flex items-baseline gap-1.5 whitespace-nowrap">
                                    <span className="text-white">{(maxTokensSold - tokensSold).toLocaleString()}</span>
                                    <span className="text-emerald-400 text-[9px] font-extrabold uppercase tracking-tight">AVAILABLE</span>
                                    <span className="text-gray-500 text-[9px] font-bold">/ {(maxTokensSold).toLocaleString()}</span>
                                </span>
                            }
                            isCurrency={false}
                        />
                    </div>

                    {/* Right Column: Progress & Available Tokens */}
                    <div className="space-y-5">
                        {/* Tokens Sold Progress bar */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center px-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                        <PieChart size={12} className="text-emerald-400" />
                                    </div>
                                    <span className="text-sm font-bold text-white tracking-tight">
                                        {tokensSold.toLocaleString()} tokens sold
                                    </span>
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                    Out of {maxTokensSold.toLocaleString()}
                                </span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${Math.min(100, soldPercentage)}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                    className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                />
                            </div>
                        </div>

                        {/* Total Tokens Card (Full Width Style) */}
                        <div className="bg-white/10 border border-white/20 rounded-sm p-4 w-full transition-all hover:bg-white/20 group/tokens flex items-center justify-between shadow-lg backdrop-blur-sm">
                            <span className="text-[10px] md:text-[11px] font-extrabold text-gray-300 uppercase tracking-[0.25em]">TOTAL TOKENS</span>
                            <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tighter">
                                {(maxTokensSold - tokensSold).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Full-Width Financial Breakdown */}
                <div className="space-y-4 pt-6 border-t border-white/10">
                    <div className="flex justify-between items-center group/row">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] group-hover/row:text-white transition-colors">Current token market value</span>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">AED</span>
                            <span className="text-xl font-bold text-white tracking-tight">{property.tokenPriceAED?.replace(' AED', '')}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center group/row">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] group-hover/row:text-white transition-colors">Appreciation</span>
                        <div className="flex items-center gap-3 text-emerald-400">
                            <ArrowUpRight size={20} className="group-hover/row:scale-110 transition-transform" />
                            <span className="text-xl font-bold tracking-tight">{property.roi}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center group/row">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] group-hover/row:text-white transition-colors">Original token value</span>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">AED</span>
                            <span className="text-xl font-bold text-white tracking-tight">{fin?.originalTokenValue?.replace(' AED', '') || property.tokenPriceAED?.replace(' AED', '')}</span>
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className="pt-6 border-t border-white/5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors cursor-help group/info">
                            <Info size={14} className="md:size-16 text-gray-600 group-hover/info:text-emerald-500 transition-colors" />
                            <span className="text-[9px] md:text-[10px] font-extrabold uppercase tracking-[0.2em]">HOW IT WORKS</span>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-[9px] md:text-[10px] font-extrabold text-emerald-500 hover:text-emerald-400 uppercase tracking-[0.2em] underline underline-offset-4 decoration-emerald-500/30 whitespace-nowrap"
                        >
                            LEARN MORE
                        </button>
                    </div>
                </div>
            </div>

            <HowItWorksModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
