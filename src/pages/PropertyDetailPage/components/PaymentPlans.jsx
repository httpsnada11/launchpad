import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Wallet, Building2, CheckCircle } from 'lucide-react';

const PlanCard = ({ step, percentage, label, date, active }) => (
    <div className={`p-6 rounded-sm border-2 transition-all duration-300 ${active
        ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-xl shadow-slate-200'
        : 'bg-white border-slate-100 text-slate-900 hover:border-emerald-200 shadow-sm'
        }`}>
        <div className="flex justify-between items-start mb-4">
            <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${active ? 'text-emerald-400' : 'text-slate-400'}`}>
                Installment {step}
            </span>
            {active && <CheckCircle size={16} className="text-emerald-400" />}
        </div>
        <div className="space-y-1">
            <p className="text-3xl font-bold tracking-tight">{percentage}%</p>
            <p className={`text-sm font-semibold ${active ? 'text-slate-300' : 'text-slate-600'}`}>{label}</p>
        </div>
        <div className={`mt-6 pt-4 border-t ${active ? 'border-slate-800' : 'border-slate-50'} flex items-center gap-2`}>
            <Calendar size={14} className={active ? 'text-emerald-400' : 'text-slate-400'} />
            <span className={`text-xs font-semibold ${active ? 'text-slate-400' : 'text-slate-500'}`}>{date}</span>
        </div>
    </div>
);

export default function PaymentPlans({ property }) {
    const plans = property.financials?.paymentPlan || [
        { step: 1, percentage: 10, label: "Booking Deposit", date: "Immediate", active: true },
        { step: 2, percentage: 40, label: "During Construction", date: "Within 12 Months", active: false },
        { step: 3, percentage: 50, label: "On Completion", date: "Q4 2025", active: false }
    ];

    return (
        <div className="py-8">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-[#0F172A] flex items-center justify-center shadow-sm border border-slate-100">
                    <Wallet size={20} />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 uppercase tracking-wider">Payment Milestone Plan</h3>
                    <p className="text-xs text-gray-500 font-medium">Structured fulfillment schedule for this asset</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {plans.map((plan, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <PlanCard {...plan} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
