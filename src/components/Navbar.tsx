import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { WHATSAPP_CONFIG, getGeneralWhatsAppUrl } from '../utils/whatsapp';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    page,
    setPage,
    cartCount,
    wishlistCount,
    setIsBagOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsStylistOpen,
    setActiveCategoryFilter,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (targetPage: any, categoryFilter: string = 'all') => {
    setActiveCategoryFilter(categoryFilter);
    setPage(targetPage);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Slim Promotional Announcement Bar */}
      <div className="bg-[#1A1715] text-[#F3EAD8] text-xs py-2 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
        <span className="hidden sm:inline">✨ Free delivery across Nigeria on orders over ₦75,000</span>
        <span className="hidden sm:inline" aria-hidden="true">·</span>
        <span>Lagos Same-Day Delivery</span>
        <span aria-hidden="true">·</span>
        <a
          href={getGeneralWhatsAppUrl('Hi Lydia & Hannah! I saw your announcement bar and would like to ask a quick question.')}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E0A96D] hover:underline inline-flex items-center gap-1 font-semibold"
        >
          WhatsApp Orders Open
        </a>
      </div>

      {/* Main Sticky Header: Follows Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EBE3D5] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNav('home')}
            className="text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C86242]"
            aria-label="Lydia and Hannah Collective Home"
          >
            <span className="font-editorial text-2xl sm:text-3xl font-semibold tracking-tight text-[#1A1715] group-hover:text-[#C86242] transition-colors whitespace-nowrap shrink-0">
              L&H Collective
            </span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-[#8C827A] -mt-1 font-sans">
              Lagos · Nigeria
            </span>
          </button>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A4540]">
            <button
              onClick={() => handleNav('shop', 'all')}
              className={`hover:text-[#1A1715] hover:underline transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                page === 'shop' ? 'text-[#C86242] font-semibold underline' : ''
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => handleNav('collections')}
              className={`hover:text-[#1A1715] hover:underline transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                page === 'collections' ? 'text-[#C86242] font-semibold underline' : ''
              }`}
            >
              Collections
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`hover:text-[#1A1715] hover:underline transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                page === 'about' ? 'text-[#C86242] font-semibold underline' : ''
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNav('delivery')}
              className={`hover:text-[#1A1715] hover:underline transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                page === 'delivery' ? 'text-[#C86242] font-semibold underline' : ''
              }`}
            >
              Delivery & Returns
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`hover:text-[#1A1715] hover:underline transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                page === 'contact' ? 'text-[#C86242] font-semibold underline' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Interactive Affordances & Order Bag */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* AI Stylist Trigger Button */}
            <button
              onClick={() => setIsStylistOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#8C4328] bg-[#F7EBE5] hover:bg-[#F2DCD3] rounded-full transition-colors whitespace-nowrap cursor-pointer"
              title="Open AI Outfit Stylist"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C86242]" />
              <span>AI Stylist</span>
            </button>

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#4A4540] hover:text-[#1A1715] hover:bg-[#EFE9E1] rounded-full transition-colors cursor-pointer"
              aria-label="Search clothing, bags and accessories"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-[#4A4540] hover:text-[#1A1715] hover:bg-[#EFE9E1] rounded-full transition-colors relative cursor-pointer"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C86242] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Order Bag / Bag Drawer Trigger */}
            <button
              onClick={() => setIsBagOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-[#1A1715] text-[#FAF7F2] hover:bg-[#2C2724] rounded-lg transition-colors cursor-pointer relative"
              aria-label={`Shopping order list with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#E6CDB8]" />
              <span className="text-xs font-semibold hidden sm:inline">Order List</span>
              <span className="w-5 h-5 bg-[#C86242] text-white text-[11px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1A1715] hover:bg-[#EFE9E1] rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#EBE3D5] bg-[#FAF7F2] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#EBE3D5]">
              <button
                onClick={() => handleNav('shop', 'clothing')}
                className="text-left px-3 py-2 text-sm font-medium text-[#4A4540] hover:text-[#C86242] hover:bg-[#F2ECE1] rounded-md transition-colors"
              >
                👗 Clothing
              </button>
              <button
                onClick={() => handleNav('shop', 'bags')}
                className="text-left px-3 py-2 text-sm font-medium text-[#4A4540] hover:text-[#C86242] hover:bg-[#F2ECE1] rounded-md transition-colors"
              >
                👜 Bags
              </button>
              <button
                onClick={() => handleNav('shop', 'accessories')}
                className="text-left px-3 py-2 text-sm font-medium text-[#4A4540] hover:text-[#C86242] hover:bg-[#F2ECE1] rounded-md transition-colors"
              >
                ✨ Accessories
              </button>
              <button
                onClick={() => handleNav('shop', 'new-arrivals')}
                className="text-left px-3 py-2 text-sm font-medium text-[#C86242] hover:bg-[#F2ECE1] rounded-md transition-colors font-semibold"
              >
                🌟 New Drops
              </button>
            </div>

            <div className="flex flex-col space-y-3 text-base font-medium text-[#1A1715]">
              <button
                onClick={() => handleNav('shop', 'all')}
                className="text-left py-1 hover:text-[#C86242] transition-colors"
              >
                All Products
              </button>
              <button
                onClick={() => handleNav('collections')}
                className="text-left py-1 hover:text-[#C86242] transition-colors"
              >
                Collections & Lookbook
              </button>
              <button
                onClick={() => handleNav('about')}
                className="text-left py-1 hover:text-[#C86242] transition-colors"
              >
                Our Story (Lydia & Hannah)
              </button>
              <button
                onClick={() => handleNav('delivery')}
                className="text-left py-1 hover:text-[#C86242] transition-colors"
              >
                Delivery Rates & Returns
              </button>
              <button
                onClick={() => handleNav('contact')}
                className="text-left py-1 hover:text-[#C86242] transition-colors"
              >
                Contact & Showroom
              </button>
            </div>

            <div className="pt-3 border-t border-[#EBE3D5] flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsStylistOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#F2DCD3] text-[#8C4328] font-semibold text-sm rounded-lg hover:bg-[#EBC7BA] transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#C86242]" />
                Ask AI Outfit Stylist
              </button>

              <a
                href={getGeneralWhatsAppUrl('Hi Lydia & Hannah! I am browsing on my phone and would like to place an inquiry.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#25D366] text-white font-semibold text-sm rounded-lg hover:bg-[#20BE5A] transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Chat with Us on WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
