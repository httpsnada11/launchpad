import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const ProcessStep = ({ step, title, description, isLast }) => (
    <div className="flex gap-4 relative">
        {/* Step Indicator - Icon instead of Box */}
        <div className="flex flex-col items-center pt-1">
            <div className="text-emerald-500 z-10">
                <ChevronRight size={24} strokeWidth={3} />
            </div>
        </div>

        {/* Content */}
        <div className={`pb-12 ${isLast ? 'pb-0' : ''}`}>
            <h3 className="text-white text-xl font-bold tracking-tight mb-3 whitespace-nowrap">
                {title}
            </h3>
            {description && (
                <p className="text-gray-300 text-base leading-relaxed font-bold max-w-2xl">
                    {description}
                </p>
            )}
        </div>
    </div>
);

export default function ExpectedProcess() {
    const steps = [
        {
            step: 1,
            title: "You purchase your share of tokens",
            description: ""
        },
        {
            step: 2,
            title: "Ownership documents delivered",
            description: "We'll send you your localized token ownership certificate once your transaction is fully processed and minted on the blockchain."
        },
        {
            step: 3,
            title: "Monthly rental payments sent",
            description: "Every first working day of the month, you will receive your share of the property rent directly into your Copym wallet."
        }
    ];

    return (
        <div className="bg-black rounded-xl overflow-hidden relative border border-white/10 my-8 shadow-2xl">
            {/* 3D Graphic Background - Full Length */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <img
                    src="/process_section_graphic.png"
                    alt="Process Visualization"
                    className="absolute inset-x-0 inset-y-0 w-full h-full object-cover object-center translate-x-1/4 scale-110 opacity-70"
                />
                {/* Artistic gradient overlays for readable text on the left */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black via-black/80 to-transparent" />
                <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/60 via-transparent to-black/60" />
            </div>

            <div className="relative z-10 p-8 md:p-14">
                {/* Text Content */}
                <div className="max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-12">
                        What's the process?
                    </h2>

                    <div className="pl-2">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <ProcessStep
                                    {...step}
                                    isLast={idx === steps.length - 1}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background subtle glow */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 blur-[120px] -ml-32 -mb-32 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/5 blur-[100px] -mr-32 -mt-32 pointer-events-none" />
        </div>
    );
}
