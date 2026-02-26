import React from 'react';
import { motion } from 'framer-motion';

const ProcessStep = ({ step, title, description, isLast }) => (
    <div className="flex gap-8 relative">
        {/* Step Indicator */}
        <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-900 flex items-center justify-center text-white font-bold text-lg z-10 shadow-lg shadow-emerald-900/40">
                {step}
            </div>
        </div>

        {/* Content */}
        <div className={`pb-12 ${isLast ? 'pb-0' : ''}`}>
            <h3 className="text-white text-xl font-bold tracking-tight mb-3">
                {title}
            </h3>
            {description && (
                <p className="text-gray-400 text-base leading-relaxed font-medium max-w-2xl">
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
        <div className="bg-black rounded-3xl overflow-hidden relative border border-white/10 my-8 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center">
                {/* Text Content */}
                <div className="flex-1 p-8 md:p-14 z-10">
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

                {/* 3D Graphic Content */}
                <div className="flex-1 relative w-full h-[300px] md:h-[500px] overflow-hidden">
                    <img
                        src="/process_section_graphic.png"
                        alt="Process Visualization"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                    {/* Artistic gradient overlays for seamless integration */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black via-black/20 to-transparent hidden md:block" />
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black opacity-60 hidden md:block" />
                </div>
            </div>

            {/* Background subtle glow */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 blur-[120px] -ml-32 -mb-32 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/5 blur-[100px] -mr-32 -mt-32 pointer-events-none" />
        </div>
    );
}
