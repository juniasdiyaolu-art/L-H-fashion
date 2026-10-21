import React from 'react';
import { useShop } from '../context/ShopContext';
import { WHATSAPP_CONFIG, getGeneralWhatsAppUrl } from '../utils/whatsapp';
import {
  MessageCircle,
  Instagram,
  Mail,
  MapPin,
  ArrowUp,
  Truck,
  Heart,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setPage, setActiveCategoryFilter } = useShop();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (pageName: any, category: string = 'all') => {
    setActiveCategoryFilter(category);
    setPage(pageName);
  };

  return (
    <footer className="bg-[#141210] text-[#D4C8B8] border-t border-[#2A2622] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#2A2622] text-xs">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#FAF7F2] font-semibold text-sm">
              <Truck className="w-4 h-4 text-[#E0A96D]" />
              <span>Fast Local Delivery</span>
            </div>
            <p className="text-[#8C827A]">
              Same-day in Lagos; 2–3 days nationwide to Abuja, PH, and beyond.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#FAF7F2] font-semibold text-sm">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Ordering</span>
            </div>
            <p className="text-[#8C827A]">
              Zero checkout hassle or failing bank OTPs. Instant friendly service.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#FAF7F2] font-semibold text-sm">
              <ShieldCheck className="w-4 h-4 text-[#E0A96D]" />
              <span>Handcrafted Quality</span>
            </div>
            <p className="text-[#8C827A]">
              Pure European flax linen and Kano full-grain leather. Built to last.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#FAF7F2] font-semibold text-sm">
              <RotateCcw className="w-4 h-4 text-[#E0A96D]" />
              <span>7-Day Size Exchange</span>
            </div>
            <p className="text-[#8C827A]">
              Fit wasn’t quite right? We’ll exchange it quickly with zero stress.
            </p>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12 border-b border-[#2A2622]">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-editorial text-2xl text-[#FAF7F2] font-semibold">
              Lydia & Hannah Collective
            </h3>
            <p className="text-xs text-[#8C827A] leading-relaxed max-w-sm">
              Contemporary, breathable casual wear, artisanal leather bags, and jewelry designed in Lagos for modern women who love effortless style.
            </p>
            <div className="space-y-2 text-xs text-[#B3A697]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E0A96D] shrink-0" />
                <span>{WHATSAPP_CONFIG.studioLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp: {WHATSAPP_CONFIG.displayNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E0A96D] shrink-0" />
                <span>{WHATSAPP_CONFIG.supportEmail}</span>
              </div>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-[#FAF7F2] uppercase tracking-wider text-[11px]">
              Shop Collections
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo('shop', 'clothing')}
                  className="hover:text-[#E0A96D] transition-colors cursor-pointer"
                >
                  Clothing & Dresses
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'bags')}
                  className="hover:text-[#E0A96D] transition-colors cursor-pointer"
                >
                  Handcrafted Bags
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'accessories')}
                  className="hover:text-[#E0A96D] transition-colors cursor-pointer"
                >
                  Jewelry & Accessories
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'new-arrivals')}
                  className="hover:text-[#E0A96D] transition-colors cursor-pointer"
                >
                  New Arrivals Drop
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'sale')}
                  className="hover:text-[#E0A96D] transition-colors cursor-pointer"
                >
                  Seasonal Sale
                </button>
              </li>
            </ul>
          </div>

          {/* Brand & Studio Column */}
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-[#FAF7F2] uppercase tracking-wider text-[11px]">
              About & Care
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-[#E0A96D] transition-colors cursor-pointer"
                >
                  Our Story (Meet the Founders)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('collections')}
                  className="hover:text-[#E0A96D] transition-colors cursor-pointer"
                >
                  Lookbook / Shop The Look
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('delivery')}
                  className="hover:text-[#E0A96D] transition-colors cursor-pointer"
                >
                  Delivery Rates & Locations
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('delivery')}
                  className="hover:text-[#E0A96D] transition-colors cursor-pointer"
                >
                  Returns & Exchanges Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-[#E0A96D] transition-colors cursor-pointer"
                >
                  Lekki Studio Pickup & Hours
                </button>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-[#FAF7F2] uppercase tracking-wider text-[11px]">
              Order & Inquiries
            </h4>
            <p className="text-[#8C827A] leading-relaxed">
              Customer support operates Mon – Sat, 9am – 7pm WAT directly on WhatsApp.
            </p>
            <a
              href={getGeneralWhatsAppUrl('Hi Lydia & Hannah! I want to inquire about styling or product availability.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-2 px-4 bg-[#25D366] hover:bg-[#20BE5A] text-white font-semibold rounded-lg transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B635B]">
          <p>© {new Date().getFullYear()} Lydia & Hannah Collective Ltd. All rights reserved. Lagos, Nigeria.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#B3A697] hover:text-[#FAF7F2] transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
