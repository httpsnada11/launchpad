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
                className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-3xl p-8 md:p-12 shadow-2xl border border-white/5"
            >
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full -ml-20 -mb-20" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Expert Portrait */}
                    <div className="relative group flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-tr from-green-400 to-blue-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop"
                                alt="Real Estate Expert"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-green-500 p-2 rounded-lg shadow-lg">
                            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                            Have more questions <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                                about this property?
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400 mb-8 max-w-xl">
                            Our real estate experts are available around the clock to help you understand the nuances of this investment opportunity.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 bg-white text-[#0F172A] font-bold rounded-xl flex items-center justify-center gap-3 shadow-lg hover:bg-gray-100 transition-colors"
                            >
                                <MessageCircle size={22} className="text-green-600" />
                                Message us
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-3 backdrop-blur-sm transition-all"
                            >
                                <Calendar size={22} className="text-blue-400" />
                                Schedule a Call
                                <ArrowRight size={18} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Counter */}
                <div className="absolute top-6 right-8 hidden lg:block">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-xs font-bold text-gray-300 uppercase tracking-widest leading-none">Live Help Available</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
