import React from 'react';
import { motion } from 'framer-motion';

const InvestmentTimeline = ({ timeline = [], action }) => {
    if (!timeline || timeline.length === 0) return null;

    return (
        <div className="pt-6 pb-6">
            <h3 className="text-xl font-bold text-gray-900 tracking-wider mb-8">
                Investment timeline
            </h3>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative pl-2 flex-1 max-w-xl">
                    {timeline.map((item, index) => {
                        const isLast = index === timeline.length - 1;
                        const isCompleted = item.status === 'completed';
                        const isCurrent = item.status === 'current';

                        return (
                            <div key={index} className="relative flex gap-6 pb-8 last:pb-0">
                                {/* Connecting Line */}
                                {!isLast && (
                                    <div
                                        className={`absolute left-[6px] top-[22px] w-[2px] h-[calc(100%-12px)] transition-all duration-500 ${isCompleted
                                            ? 'bg-gradient-to-b from-[#10B981] to-[#10B981]/30'
                                            : 'bg-gradient-to-b from-gray-200 to-gray-50'
                                            }`}
                                    />
                                )}

                                {/* Status Dot */}
                                <div className="relative z-10 flex-shrink-0 mt-[9px]">
                                    {/* ... dot logic stays the same ... */}
                                    {isCompleted ? (
                                        <div className="relative group">
                                            <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#10B981] via-[#34D399] to-[#059669] flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.3)] border border-white/20">
                                                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                                            </div>
                                            <div className="absolute inset-0 rounded-full bg-[#10B981]/10 blur-sm -z-10" />
                                        </div>
                                    ) : isCurrent ? (
                                        <div className="relative">
                                            <div className="absolute -inset-1 rounded-full bg-blue-400/10 blur-xl animate-pulse" />
                                            <div className="relative w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#3B82F6] via-[#60A5FA] to-[#2563EB] flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-white/30">
                                                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
                                            </div>
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0.6 }}
                                                animate={{ scale: 3.5, opacity: 0 }}
                                                transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
                                                className="absolute inset-0 rounded-full border border-blue-400/30"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-3.5 h-3.5 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center shadow-inner">
                                            <div className="w-1 h-1 rounded-full bg-gray-200" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex flex-col">
                                    <h4 className={`text-lg font-bold leading-tight tracking-wide ${isCompleted || isCurrent ? 'text-[#0F172A]' : 'text-gray-400'
                                        }`}>
                                        {item.event}
                                    </h4>
                                    <p className="text-sm font-medium text-gray-500 mt-1">
                                        {item.date}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {action && (
                    <div className="flex-shrink-0 md:pt-0 pt-6">
                        {action}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InvestmentTimeline;
