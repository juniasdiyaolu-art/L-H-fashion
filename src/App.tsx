import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OrderBagDrawer } from './components/OrderBagDrawer';
import { WishlistModal } from './components/WishlistModal';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { AIStylistWidget } from './components/AIStylistWidget';

import { HomeView } from './pages/HomeView';
import { ShopView } from './pages/ShopView';
import { CollectionsView } from './pages/CollectionsView';
import { AboutView } from './pages/AboutView';
import { ContactView } from './pages/ContactView';
import { DeliveryView } from './pages/DeliveryView';
import { Sparkles, ArrowLeft } from 'lucide-react';

const PageContent: React.FC = () => {
  const { page, setPage } = useShop();

  switch (page) {
    case 'home':
      return <HomeView />;
    case 'shop':
      return <ShopView />;
    case 'collections':
      return <CollectionsView />;
    case 'about':
      return <AboutView />;
    case 'contact':
      return <ContactView />;
    case 'delivery':
      return <DeliveryView />;
    default:
      return (
        <div className="max-w-md mx-auto py-24 px-4 text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C86242]">
            404 — Page Not Found
          </span>
          <h1 className="font-editorial text-3xl font-semibold text-[#1A1715]">
            Lost in the Wardrobe?
          </h1>
          <p className="text-xs text-[#6B635B] leading-relaxed">
            The page you're looking for doesn't exist or has moved to a new collection.
          </p>
          <button
            onClick={() => setPage('home')}
            className="inline-flex items-center gap-2 py-2.5 px-6 bg-[#1A1715] text-[#FAF7F2] text-xs font-semibold rounded-xl hover:bg-[#2C2724] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Boutique Home</span>
          </button>
        </div>
      );
  }
};

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1A1715]">
        {/* Top Navbar */}
        <Navbar />

        {/* Dynamic Page View */}
        <main className="flex-1">
          <PageContent />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Modals & Overlays */}
        <ProductDetailModal />
        <OrderBagDrawer />
        <WishlistModal />
        <SearchModal />
        <SizeGuideModal />
        <AIStylistWidget />

        {/* Always-on Floating WhatsApp Button */}
        <FloatingWhatsApp />
      </div>
    </ShopProvider>
  );
}
