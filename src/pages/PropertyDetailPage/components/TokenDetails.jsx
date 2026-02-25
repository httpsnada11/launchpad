import React from 'react';
import { motion } from 'framer-motion';
import {
    Info,
    ArrowUpRight,
    PieChart,
    Wallet
} from 'lucide-react';

const MetricBox = ({ label, value, icon: Icon, trend, isCurrency = true }) => (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
            {trend && (
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                    <ArrowUpRight size={12} />
                    {trend}
                </div>
            )}
        </div>
        <div className="space-y-0.5">
            <p className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-none uppercase">
                {isCurrency && <span className="text-slate-400 mr-1.5 font-bold">AED</span>}
                {value}
            </p>
        </div>
    </div>
);

export default function TokenDetails({ property }) {
    if (!property) return null;
    const fin = property.financials;

    // Extract numbers safely
    const tokensSold = fin?.tokensSold || 0;
    const maxTokensSold = fin?.maxTokensToSell || property.totalTokens || 0;
    const soldPercentage = maxTokensSold > 0 ? (tokensSold / maxTokensSold) * 100 : 0;

    const tokenPriceNum = parseFloat(property.tokenPriceAED?.replace(/[^0-9.]/g, '')) || 0;
    const availableTotalValue = (maxTokensSold - tokensSold) * tokenPriceNum;

    return (
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="relative z-10 space-y-8">
                {/* Header Metrics */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <MetricBox
                        label="Listing price"
                        value={property.assetPrice?.replace('AED ', '') || '0'}
                    />
                    <MetricBox
                        label="Market value"
                        value={fin?.marketValue?.replace('AED ', '') || property.assetPrice?.replace('AED ', '') || '0'}
                        trend={property.cagr}
                    />
                </div>

                {/* Secondary Metrics */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <MetricBox
                        label="Price per token"
                        value={property.tokenPriceAED?.replace(' AED', '') || '0'}
                    />
                    <MetricBox
                        label="Total tokens"
                        value={property.totalTokens?.toLocaleString() || '0'}
                        isCurrency={false}
                    />
                </div>

                {/* Tokens Sold Progress bar */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-[#0F172A] flex items-center justify-center p-1">
                                <PieChart size={12} className="text-white" />
                            </div>
                            <span className="text-sm font-bold text-slate-900 tracking-tight">
                                {tokensSold.toLocaleString()} tokens sold
                            </span>
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Out of {maxTokensSold.toLocaleString()}
                        </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${Math.min(100, soldPercentage)}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="h-full bg-emerald-500 rounded-full"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    {/* Available Tokens Card */}
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-600 shadow-sm">
                                <Wallet size={20} />
                            </div>
                            <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">Available tokens:</span>
                        </div>
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2">
                                <span className="text-slate-400 text-sm font-bold tracking-widest uppercase">AED</span>
                                <span className="text-sm sm:text-base font-black text-slate-900">{availableTotalValue.toLocaleString()}</span>
                            </div>
                            <div className="w-[1px] h-4 bg-slate-200 hidden sm:block" />
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center p-0.5">
                                    <PieChart size={10} className="text-white" />
                                </div>
                                <span className="text-sm sm:text-base font-black text-slate-900">{(maxTokensSold - tokensSold).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Details List */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center py-1">
                        <span className="text-xs sm:text-sm font-semibold text-slate-500">Current token market value</span>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-xs font-bold tracking-widest uppercase">AED</span>
                            <span className="text-sm sm:text-base font-bold text-slate-900 leading-none">{property.tokenPriceAED?.replace(' AED', '')}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center py-1">
                        <span className="text-xs sm:text-sm font-semibold text-slate-500">Appreciation</span>
                        <div className="flex items-center gap-1.5 text-emerald-500">
                            <ArrowUpRight size={14} />
                            <span className="text-sm sm:text-base font-black leading-none">{property.roi}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-50 pb-4">
                        <span className="text-xs sm:text-sm font-semibold text-slate-500">Original token value</span>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-xs font-bold tracking-widest uppercase">AED</span>
                            <span className="text-sm sm:text-base font-bold text-slate-900 leading-none">{fin?.originalTokenValue?.replace(' AED', '') || property.tokenPriceAED?.replace(' AED', '')}</span>
                        </div>
                    </div>
                </div>

                {/* Footer Link */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Info size={14} />
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">How tokens are calculated</span>
                    </div>
                    <button className="text-[10px] sm:text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors underline decoration-emerald-200 underline-offset-4 uppercase tracking-widest">
                        Learn more
                    </button>
                </div>
            </div>
        </div>
    );
}
