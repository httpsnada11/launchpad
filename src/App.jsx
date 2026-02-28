import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Lenis from 'lenis';
import Publicmarketplace from './sections/Publicmarketplace';
import Footer from './sections/Footer';
import TermsOfService from './sections/TermsOfService';
import Navbar from './sections/Navbar';
import PropertyDetailPage from './pages/PropertyDetailPage/PropertyDetailPage';

const AboutPage = () => (
  <div className="min-h-screen bg-white">
    <h1 className="text-4xl font-bold text-center pt-20">About Page - Coming Soon</h1>
  </div>
);

const HowItWorksPage = () => (
  <div className="min-h-screen bg-white">
    <h1 className="text-4xl font-bold text-center pt-20">How it Works - Coming Soon</h1>
  </div>
);

const PrivacyPage = () => (
  <div className="min-h-screen bg-white">
    <h1 className="text-4xl font-bold text-center pt-20">Privacy Policy - Coming Soon</h1>
  </div>
);

let lenisInstance = null;
export const getLenis = () => lenisInstance;

export default function App() {
  useEffect(() => {
    lenisInstance = new Lenis();

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
      lenisInstance = null;
    };
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="pt-16 lg:pt-20">
        <Routes>
          <Route path="/" element={<><Publicmarketplace /><Footer /></>} />
          <Route path="/marketplace" element={<><Publicmarketplace /><Footer /></>} />
          <Route path="/property/:id" element={<><PropertyDetailPage /><Footer /></>} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/about" element={<><AboutPage /><Footer /></>} />
          <Route path="/how-it-works" element={<><HowItWorksPage /><Footer /></>} />
          <Route path="/privacy" element={<><PrivacyPage /><Footer /></>} />
        </Routes>
      </div>
    </Router>
  );
}
