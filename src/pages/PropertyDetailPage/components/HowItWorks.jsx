import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, FileText, ChevronRight, ChevronLeft, ShieldCheck, TrendingUp, Building2, Wallet, X, Download, FileCheck, Award, Calendar } from 'lucide-react';

const steps = [
    {
        step: 1,
        title: 'Acquire your share of the property',
        icon: Building2,
        footerIcon: FileText,
        footerText: 'Access ownership records',
        hasArrow: true,
        showDocuments: true
    },
    {
        step: 2,
        title: 'Receive consistent monthly yields',
        icon: Wallet,
        footerIcon: ShieldCheck,
        footerText: 'Hands-off property management'
    },
    {
        step: 3,
        title: 'Grow your capital over time',
        icon: Building2,
        footerIcon: TrendingUp,
        footerText: 'Profit from asset appreciation'
    }
];

// Mock Documents Data
const propertyDocuments = [
    {
        id: 1,
        name: 'Title Deed & Ownership Certificate',
        type: 'PDF',
        size: '2.4 MB',
        date: '2024-01-15',
        icon: FileCheck,
        category: 'Legal'
    },
    {
        id: 2,
        name: 'Property Valuation Report',
        type: 'PDF',
        size: '3.8 MB',
        date: '2024-02-20',
        icon: Award,
        category: 'Valuation'
    },
    {
        id: 3,
        name: 'Investment Memorandum',
        type: 'PDF',
        size: '5.2 MB',
        date: '2024-03-01',
        icon: FileText,
        category: 'Investment'
    },
    {
        id: 4,
        name: 'Property Insurance Certificate',
        type: 'PDF',
        size: '1.1 MB',
        date: '2024-01-10',
        icon: ShieldCheck,
        category: 'Insurance'
    },
    {
        id: 5,
        name: 'Floor Plans & Site Map',
        type: 'PDF',
        size: '4.5 MB',
        date: '2023-12-05',
        icon: FileText,
        category: 'Technical'
    },
    {
        id: 6,
        name: 'Rental Income History',
        type: 'PDF',
        size: '1.8 MB',
        date: '2024-03-15',
        icon: Calendar,
        category: 'Financial'
    }
];

// Document Modal Component
const DocumentsModal = ({ isOpen, onClose }) => {
    const [downloading, setDownloading] = useState(null);

    const handleDownload = (docId) => {
        setDownloading(docId);
        setTimeout(() => {
            setDownloading(null);
            alert('Document download started!');
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden pointer-events-auto">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-[#0F172A] to-slate-800 p-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1">
                                        Ownership Records & Documents
                                    </h3>
                                    <p className="text-gray-300 text-sm">
                                        Access all legal and property documentation
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X size={24} className="text-white" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
                                {/* Info Banner */}
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                                    <div className="flex items-start gap-3">
                                        <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-green-800 mb-1">
                                                Verified & Authenticated
                                            </p>
                                            <p className="text-sm text-green-700">
                                                All documents are verified by our legal team and authenticated by relevant authorities. Download with confidence.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Documents Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {propertyDocuments.map((doc) => (
                                        <motion.div
                                            key={doc.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: doc.id * 0.05 }}
                                            className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-green-200 transition-all duration-300 group"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="bg-red-100 p-2.5 rounded-lg">
                                                    <doc.icon size={20} className="text-red-600" />
                                                </div>
                                                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                    {doc.category}
                                                </span>
                                            </div>

                                            <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">
                                                {doc.name}
                                            </h4>

                                            <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                                                <span className="flex items-center gap-1">
                                                    <FileText size={12} />
                                                    {doc.type}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={12} />
                                                    {doc.size}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() => handleDownload(doc.id)}
                                                disabled={downloading === doc.id}
                                                className="w-full py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group-hover:bg-green-600 group-hover:text-white"
                                            >
                                                {downloading === doc.id ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Downloading...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Download size={16} />
                                                        Download
                                                    </>
                                                )}
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Footer Info */}
                                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <div className="flex items-start gap-3">
                                        <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-blue-800 mb-1">
                                                Need Assistance?
                                            </p>
                                            <p className="text-sm text-blue-700">
                                                If you need help understanding any document, our support team is available 24/7 to assist you.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default function HowItWorks() {
    const [showDocuments, setShowDocuments] = useState(false);

    return (
        <>
            <div className="pt-6 pb-6 md:pt-8 md:pb-8">
                <div className="flex flex-col md:flex-row gap-8 items-stretch pt-4">
                    {/* Vertical Sidebar Title */}
                    <div className="hidden md:flex items-center justify-center px-4">
                        <h2 className="text-3xl font-bold text-black rotate-180 [writing-mode:vertical-lr] whitespace-nowrap uppercase tracking-[0.2em] opacity-80">
                            How it works
                        </h2>
                    </div>

                    {/* Mobile Title */}
                    <div className="md:hidden mb-6">
                        <h2 className="text-2xl font-bold text-black uppercase tracking-widest text-center">
                            How it works
                        </h2>
                    </div>

                    {/* Simplified Steps Grid */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {steps.map((item, index) => (
                            <div
                                key={item.step}
                                onClick={() => item.showDocuments && setShowDocuments(true)}
                                className={`relative ${item.showDocuments ? 'cursor-pointer' : 'cursor-default'} overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300`}
                            >
                                <div className="h-full flex flex-col">
                                    <div className="mb-8">
                                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6">
                                            <item.icon className="w-6 h-6 text-black" />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-black leading-tight mb-4">
                                            {item.title}
                                        </h3>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <item.footerIcon className="w-5 h-5 text-slate-400" />
                                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                                                {item.footerText}
                                            </span>
                                        </div>
                                        {item.hasArrow && (
                                            <ChevronRight className="w-5 h-5 text-slate-400" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Documents Modal */}
            <DocumentsModal isOpen={showDocuments} onClose={() => setShowDocuments(false)} />
        </>
    );
}
