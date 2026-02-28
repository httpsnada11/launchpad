import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check, ChevronUp, ChevronDown } from 'lucide-react';

export default function MobileInvestmentBar({ property }) {
    const initialAmount = parseInt(property.minInvestment?.replace(/[^0-9]/g, '')) || 1000;
    const [amount, setAmount] = useState(initialAmount);
    const [isAdded, setIsAdded] = useState(false);

    const tokenPrice = parseInt(property.tokenPriceAED?.replace(/[^0-9]/g, '')) || 1;
    const tokens = (amount / tokenPrice).toFixed(2);

    const handleAddToCart = () => {
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] px-4 pb-6 pt-2 pointer-events-none">
            {/* Background Overlay for better contrast on any page content */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />

            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="relative bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 flex items-center gap-4 pointer-events-auto overflow-hidden active:scale-[0.98] transition-all"
            >
                {/* Glow Effect */}
                <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

                {/* Amount Input Section */}
                <div className="flex-1 relative flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Amount</span>
                        <div className="h-[2px] w-4 bg-emerald-500/30 rounded-full" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">≈ {tokens} Tokens</span>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                            <span className="text-gray-400 font-black text-xs uppercase tracking-tighter">AED</span>
                        </div>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Math.max(0, parseInt(e.target.value) || 0))}
                            className="bg-transparent border-none text-white font-black text-2xl p-0 pl-10 focus:ring-0 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />

                        {/* Custom Spin Buttons */}
                        <div className="absolute inset-y-0 right-0 flex flex-col justify-center gap-0.5">
                            <button onClick={() => setAmount(prev => prev + 100)} className="text-white/30 hover:text-white">
                                <ChevronUp size={14} strokeWidth={3} />
                            </button>
                            <button onClick={() => setAmount(prev => Math.max(0, prev - 100))} className="text-white/30 hover:text-white">
                                <ChevronDown size={14} strokeWidth={3} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    disabled={isAdded || amount <= 0}
                    className="relative group overflow-hidden h-14 min-w-[140px] rounded-xl bg-white text-black font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,255,255,0.1)] active:scale-95 transition-all disabled:opacity-50"
                >
                    <AnimatePresence mode="wait">
                        {isAdded ? (
                            <motion.div
                                key="added"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="flex items-center gap-2"
                            >
                                <Check size={16} strokeWidth={4} className="text-emerald-600" />
                                <span>Added</span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="add"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="flex items-center gap-2"
                            >
                                <span>Add to Cart</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Button Glow on Hover/Active */}
                    <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-colors" />
                </button>

                {/* Background Texture/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
            </motion.div>
        </div>
    );
}
