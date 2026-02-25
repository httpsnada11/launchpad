import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const InvestmentTimeline = ({ timeline = [] }) => {
    if (!timeline || timeline.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-[#0F172A] mb-8 flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <Calendar size={22} />
                </div>
                Investment Timeline
            </h3>

            <div className="relative pl-2">
                {timeline.map((item, index) => {
                    const isLast = index === timeline.length - 1;
                    const isCompleted = item.status === 'completed';
                    const isCurrent = item.status === 'current';

                    return (
                        <div key={index} className="relative flex gap-6 pb-8 last:pb-0">
                            {/* Connecting Line */}
                            {!isLast && (
                                <div
                                    className={`absolute left-[11px] top-[24px] w-[2px] h-[calc(100%-16px)] ${isCompleted ? 'bg-[#10B981]' : 'bg-gray-100'
                                        }`}
                                />
                            )}

                            {/* Status Dot */}
                            <div className="relative z-10 flex-shrink-0 mt-1.5">
                                {isCompleted ? (
                                    <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                                    </div>
                                ) : isCurrent ? (
                                    <div className="relative">
                                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                        </div>
                                        {/* Animated Halo/Pulse */}
                                        <motion.div
                                            initial={{ scale: 1, opacity: 0.5 }}
                                            animate={{ scale: 1.5, opacity: 0 }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="absolute inset-0 rounded-full bg-blue-400"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-6 h-6 rounded-full bg-gray-200" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex flex-col">
                                <h4 className={`text-lg font-bold leading-tight ${isCompleted || isCurrent ? 'text-[#0F172A]' : 'text-gray-400'
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
        </div>
    );
};

export default InvestmentTimeline;
