import React from 'react';
import { Navigation } from 'lucide-react';

const PropertyMap = ({ address, coordinates, city }) => {
    // Generate a Google Maps Embed URL based on address or coordinates
    // We prioritize the address for better marker accuracy in the embed
    const query = encodeURIComponent(address || `${coordinates?.lat},${coordinates?.lng}`);
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=REPLACE_WITH_ACTUAL_API_KEY&q=${query}`;

    // For demonstration purposes without an API key, we use the standard search URL
    // In a real production app, you'd use the Embed API with a key
    const fallBackUrl = `https://maps.google.com/maps?q=${query}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    return (
        <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="relative h-[300px] w-full bg-gray-100">
                <iframe
                    title="Property Location"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={fallBackUrl}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Overlay label for context */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-sm shadow-lg border border-gray-100 flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-sm">
                        <Navigation size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Exact Location</p>
                        <p className="text-sm font-bold text-[#0F172A] truncate">{address || city}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyMap;
