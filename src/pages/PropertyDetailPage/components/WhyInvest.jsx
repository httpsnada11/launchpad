import React from 'react';
import { Building2 } from 'lucide-react';

const HighlightItem = ({ title, description }) => (
    <div className="space-y-3">
        <h3 className="text-white text-xl font-bold tracking-tight">{title}</h3>
        <p className="text-gray-300 text-base leading-relaxed font-bold">{description}</p>
    </div>
);

const WhyInvest = ({ highlights }) => {
    if (!highlights || highlights.length === 0) return null;

    return (
        <div className="bg-black rounded-xl overflow-hidden relative border border-white/10 my-8 shadow-2xl">
            {/* Background Graphic Background - Full Length */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <img
                    src="/why_invest_graphic.png"
                    alt="Investment Highlights"
                    className="absolute inset-x-0 inset-y-0 w-full h-full object-cover object-center translate-x-1/4 scale-110 opacity-80"
                />
                {/* Artistic gradient overlays for readability */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black via-black/80 to-transparent" />
                <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/60 via-transparent to-black/60" />
            </div>

            <div className="relative z-10 p-8 md:p-14">
                {/* Text Content */}
                <div className="max-w-3xl">
                    <div className="flex items-center gap-5 mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            Why invest in this property?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-y-10">
                        {highlights.map((item, idx) => (
                            <HighlightItem
                                key={idx}
                                title={item.title}
                                description={item.description}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 blur-[100px] -mr-32 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/5 blur-[120px] -ml-32 -mb-32 pointer-events-none" />
        </div>
    );
};

export default WhyInvest;
