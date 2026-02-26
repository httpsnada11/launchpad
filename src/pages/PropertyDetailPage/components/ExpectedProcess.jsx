import React from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, CreditCard, Ticket, ChevronRight } from 'lucide-react';

const Step = ({ step, icon: Icon, title, description, isLast }) => (
    <div className="relative flex flex-col items-center flex-1 group">
        {/* Connection Line */}
        {!isLast && (
            <div className="absolute top-7 left-[calc(50%+1.5rem)] w-[calc(100%-3rem)] h-[2px] bg-slate-100 hidden md:block">
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    className="h-full bg-emerald-500 origin-left"
                    transition={{ duration: 1, delay: step * 0.2 }}
                />
            </div>
        )}

        {/* Step Icon */}
        <div className="relative z-10 w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-6 group-hover:border-emerald-200 transition-colors">
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0F172A] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                {step}
            </div>
            <Icon size={24} className="text-slate-600 group-hover:text-emerald-600 transition-colors" />
        </div>

        {/* Text Content */}
        <div className="text-center px-4">
            <h4 className="text-sm font-semibold text-slate-900 mb-2 uppercase tracking-tight">{title}</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[160px] mx-auto">
                {description}
            </p>
        </div>
    </div>
);

export default function ExpectedProcess() {
    const steps = [
        {
            step: 1,
            icon: Search,
            title: "Select Asset",
            description: "Browse curated premium assets and choose your investment."
        },
        {
            step: 2,
            icon: ShieldCheck,
            title: "Enrollment",
            description: "Complete your identity verification in minutes."
        },
        {
            step: 3,
            icon: CreditCard,
            title: "Secure",
            description: "Select your amount and finalize your transaction."
        },
        {
            step: 4,
            icon: Ticket,
            title: "Tokens Issued",
            description: "Asset tokens are minted and sent to your secure wallet."
        }
    ];

    return (
        <div className="py-12 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
            {/* Soft decorative blur */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 blur-[60px] rounded-full" />

            <div className="relative z-10">
                <div className="text-center mb-12">
                    <h3 className="text-xl font-bold text-[#0F172A] uppercase tracking-widest mb-2">Expected Process</h3>
                    <p className="text-xs text-slate-500 font-semibold tracking-widest uppercase">Your journey to digital asset ownership</p>
                </div>

                <div className="flex flex-col md:flex-row gap-y-12 md:gap-y-0 relative">
                    {steps.map((step, idx) => (
                        <Step
                            key={idx}
                            {...step}
                            isLast={idx === steps.length - 1}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
