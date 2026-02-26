import React from 'react';
import { Building2 } from 'lucide-react';

const HighlightItem = ({ title, description }) => (
    <div className="space-y-3">
        <h3 className="text-white text-xl font-bold tracking-tight">{title}</h3>
        <p className="text-gray-400 text-base leading-relaxed font-medium">{description}</p>
    </div>
);

const WhyInvest = ({ highlights }) => {
    if (!highlights || highlights.length === 0) return null;

    return (
        <div className="bg-black rounded-3xl overflow-hidden relative border border-white/10 my-8 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center">
                {/* Text Content */}
                <div className="flex-1 p-8 md:p-14 z-10">
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

                {/* 3D Graphic Content */}
                <div className="flex-1 relative w-full h-[300px] md:h-[600px] overflow-hidden">
                    <img
                        src="/why_invest_graphic.png"
                        alt="Investment Highlights"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                    {/* Artistic gradient overlays for seamless integration */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black via-black/20 to-transparent hidden md:block" />
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black opacity-60 hidden md:block" />
                </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 blur-[100px] -mr-32 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/5 blur-[120px] -ml-32 -mb-32 pointer-events-none" />
        </div>
    );
};

export default WhyInvest;
