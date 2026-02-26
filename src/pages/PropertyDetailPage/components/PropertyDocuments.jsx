import React from 'react';
import { FileText, Download } from 'lucide-react';

const DocumentRow = ({ doc }) => (
    <div className="flex items-center justify-between bg-gray-50/50 rounded-2xl p-4 hover:bg-gray-100 transition-all group border border-gray-100/50">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors">
                <FileText size={22} className="text-red-500" />
            </div>
            <div>
                <p className="font-bold text-gray-900 text-sm md:text-base">{doc.name}</p>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{doc.type} • {doc.size}</p>
            </div>
        </div>
        <button className="p-2.5 hover:bg-white bg-white/50 shadow-sm border border-gray-100 rounded-xl transition-all hover:shadow-md active:scale-95">
            <Download size={20} className="text-gray-600" />
        </button>
    </div>
);

const PropertyDocuments = ({ documents }) => {
    if (!documents || documents.length === 0) return null;

    return (
        <div className="pt-10 pb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3 uppercase tracking-wider">
                <FileText size={20} className="text-red-600" />
                OFFICIAL DOCUMENTS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc, idx) => (
                    <DocumentRow key={idx} doc={doc} />
                ))}
            </div>
        </div>
    );
};

export default PropertyDocuments;
