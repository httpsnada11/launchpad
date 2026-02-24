import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Calendar, ArrowRight } from 'lucide-react';

export default function ContactExpert() {
    return (
        <section className="mt-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100"
            >
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Expert Portrait */}
                    <div className="relative flex-shrink-0">
                        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop"
                                alt="Real Estate Expert"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white shadow-sm" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-3 tracking-tight">
                            Have more questions about this property?
                        </h2>
                        <p className="text-gray-500 mb-8 max-w-xl text-sm md:text-base leading-relaxed">
                            Our real estate experts are available to help you understand the nuances of this investment opportunity.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                            <button
                                className="px-6 py-3 bg-[#0F172A] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#1E293B] transition-all text-sm md:text-base"
                            >
                                <MessageCircle size={18} />
                                Message us
                            </button>

                            <button
                                className="px-6 py-3 bg-white border border-gray-200 text-[#0F172A] font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all text-sm md:text-base"
                            >
                                <Calendar size={18} />
                                Schedule a Call
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
