import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                        Terms of Service
                    </h1>
                    <p className="text-gray-500 text-sm font-medium" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                        Last updated: January 2026
                    </p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="prose prose-lg max-w-none text-gray-700 space-y-10"
                    style={{ fontFamily: 'Palanquin, sans-serif' }}
                >
                    {/* Section 1 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                        <p className="text-base leading-relaxed mb-4">
                            Welcome to Copym. These Terms of Service ("Terms") govern your use of the Copym platform,
                            including Copym Access and Copym Settlement services (collectively, the "Services"), operated
                            by copym limited LLC  ("we," "us," or "our").
                        </p>
                        <p className="text-base leading-relaxed">
                            By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to
                            these Terms, do not use our Services.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Nature of Services</h2>
                        <p className="text-base leading-relaxed mb-4">
                            Copym operates as a <strong>technology service provider</strong>. We provide non-custodial infrastructure for
                            virtual asset transactions. Important clarifications:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-base">
                            <li>We do not hold, custody, or control user funds at any time</li>
                            <li>We do not provide financial services, banking, or payment services</li>
                            <li>We do not act as a money transmitter, payment processor, or e-money issuer</li>
                            <li>All regulated activities are performed by licensed third-party partners</li>
                            <li>We facilitate technology coordination only</li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Eligibility</h2>
                        <p className="text-base leading-relaxed mb-4">
                            To use our Services, you must:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-base">
                            <li>Be at least 18 years of age</li>
                            <li>Have the legal capacity to enter into binding contracts</li>
                            <li>Not be located in a jurisdiction where use of our Services is prohibited</li>
                            <li>Comply with all applicable laws and regulations in your jurisdiction</li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Responsibilities</h2>
                        <p className="text-base leading-relaxed mb-4">
                            You are responsible for:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-base">
                            <li>Maintaining the security of your own wallets and credentials</li>
                            <li>Ensuring compliance with local laws and regulations</li>
                            <li>Verifying the accuracy of all transaction details before confirmation</li>
                            <li>Understanding the risks associated with virtual assets</li>
                        </ul>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Risks and Disclaimers</h2>
                        <p className="text-base leading-relaxed mb-4">
                            Virtual assets involve significant risks including but not limited to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-base mb-6">
                            <li>Price volatility and potential loss of value</li>
                            <li>Technology and smart contract risks</li>
                            <li>Regulatory uncertainty</li>
                            <li>Irreversibility of blockchain transactions</li>
                        </ul>
                        <p className="text-sm font-bold text-gray-800 uppercase tracking-wide mt-6">
                            THE SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT GUARANTEE THE AVAILABILITY, ACCURACY, OR RELIABILITY OF THE SERVICES.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
                        <p className="text-base leading-relaxed">
                            To the maximum extent permitted by law, Copym and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Services.
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
                        <p className="text-base leading-relaxed">
                            All content, trademarks, and intellectual property associated with Copym are owned by copym limited LLC . You may not use our branding without prior written consent.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Modifications</h2>
                        <p className="text-base leading-relaxed">
                            We reserve the right to modify these Terms at any time. Continued use of the Services after changes constitutes acceptance of the modified Terms.
                        </p>
                    </section>

                    {/* Section 9 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Governing Law</h2>
                        <p className="text-base leading-relaxed">
                            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which copym limited LLC  is incorporated, without regard to conflict of law principles.
                        </p>
                    </section>

                    {/* Section 10 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact</h2>
                        <p className="text-base leading-relaxed">
                            For questions about these Terms, please contact us at: <a href="mailto:Support@copym.xyz" className="text-[#10b981] font-semibold hover:underline">Support@copym.xyz</a>
                        </p>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsOfService;
