import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { formatNaira } from '../utils/shopUtils';
import { getStylistWhatsAppUrl } from '../utils/whatsapp';
import {
  Sparkles,
  X,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';

export const AIStylistWidget: React.FC = () => {
  const { isStylistOpen, setIsStylistOpen, addToCart, setSelectedProduct } = useShop();

  const [occasion, setOccasion] = useState('Sunday Brunch & Daytime');
  const [budget, setBudget] = useState('₦30,000 - ₦60,000');
  const [style, setStyle] = useState('Effortless Linen & Minimalist');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<{
    outfitTitle: string;
    stylingNote: string;
    recommendedProducts: Product[];
    totalEst: number;
  } | null>(null);

  if (!isStylistOpen) return null;

  const occasions = [
    'Sunday Brunch & Daytime',
    'Dinner Date & Evening Cocktails',
    'Creative Work & Corporate Chic',
    'Wedding Guest & Celebrations',
    'Lagos Beach Club & Resort',
    'Casual Weekend Hangout',
  ];

  const budgets = [
    'Under ₦35,000',
    '₦35,000 - ₦65,000',
    '₦65,000 - ₦100,000',
    'Curate Best Pieces (Any)',
  ];

  const styles = [
    'Effortless Linen & Minimalist',
    'Warm Earth Tones & Terracotta',
    'Modest & Elevated Elegance',
    'Sophisticated Evening Silhouette',
  ];

  const handleGetStyling = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ occasion, budget, style, notes }),
      });

      const data = await response.json();
      const productIds: string[] = data.recommendedProductIds || ['lh-101', 'lh-106', 'lh-104'];
      const matched = productIds
        .map((id) => PRODUCTS.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p));

      // Fallback if less than 2 matched
      const finalProducts = matched.length >= 2 ? matched : [PRODUCTS[0], PRODUCTS[5], PRODUCTS[3]];
      const totalEst = finalProducts.reduce((sum, p) => sum + p.price, 0);

      setRecommendation({
        outfitTitle: data.outfitTitle || `The Curated ${occasion} Ensemble`,
        stylingNote:
          data.stylingNote ||
          `Pairing our breathable linen with warm artisanal accessories gives an effortless silhouette tailored for the Nigerian climate.`,
        recommendedProducts: finalProducts,
        totalEst,
      });
    } catch {
      // Local fallback
      const fallbackProducts = [PRODUCTS[0], PRODUCTS[5], PRODUCTS[3]];
      setRecommendation({
        outfitTitle: `The ${occasion} Signature Look`,
        stylingNote: `An effortless pairing of our classic linen wrap blouse with tailored wide-leg trousers and handcrafted brass earrings. Flattering, lightweight, and versatile.`,
        recommendedProducts: fallbackProducts,
        totalEst: fallbackProducts.reduce((sum, p) => sum + p.price, 0),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddAllToBag = () => {
    if (!recommendation) return;
    recommendation.recommendedProducts.forEach((prod) => {
      addToCart(prod, prod.sizes[0] || 'Standard', prod.colors[0]?.name || 'Standard', 1);
    });
  };

  const handleOrderLookWhatsApp = () => {
    if (!recommendation) return;
    const url = getStylistWhatsAppUrl({
      occasion,
      budget,
      productNames: recommendation.recommendedProducts.map((p) => p.name),
      totalEst: recommendation.totalEst,
    });
    window.open(url, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-stylist-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        className="fixed inset-0 cursor-pointer"
        onClick={() => setIsStylistOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#EBE3D5] overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#EBE3D5] bg-[#F5EFE6] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#C86242] text-white rounded-lg shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 id="ai-stylist-title" className="font-editorial text-2xl font-semibold text-[#1A1715]">
                L&H AI Outfit Stylist
              </h2>
              <p className="text-xs text-[#8C827A]">
                Tell us your plans and get an effortless outfit from our Lagos boutique
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsStylistOpen(false)}
            className="p-2 text-[#4A4540] hover:text-[#1A1715] hover:bg-[#EBE3D5] rounded-full transition-colors cursor-pointer"
            aria-label="Close stylist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!recommendation ? (
            <form onSubmit={handleGetStyling} className="space-y-5">
              {/* Occasion */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1715]">
                  1. What's the occasion?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {occasions.map((occ) => (
                    <button
                      type="button"
                      key={occ}
                      onClick={() => setOccasion(occ)}
                      className={`p-2.5 text-xs text-left rounded-xl border transition-all cursor-pointer ${
                        occasion === occ
                          ? 'border-[#C86242] bg-[#F7EBE5] text-[#8C4328] font-semibold'
                          : 'border-[#E0D5C3] bg-white text-[#4A4540] hover:border-[#1A1715]'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Preference */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1715]">
                  2. Preferred aesthetic vibe
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {styles.map((sty) => (
                    <button
                      type="button"
                      key={sty}
                      onClick={() => setStyle(sty)}
                      className={`p-2.5 text-xs text-left rounded-xl border transition-all cursor-pointer ${
                        style === sty
                          ? 'border-[#C86242] bg-[#F7EBE5] text-[#8C4328] font-semibold'
                          : 'border-[#E0D5C3] bg-white text-[#4A4540] hover:border-[#1A1715]'
                      }`}
                    >
                      {sty}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1715]">
                  3. Target Budget (Naira)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {budgets.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`p-2.5 text-xs text-left rounded-xl border transition-all cursor-pointer ${
                        budget === b
                          ? 'border-[#C86242] bg-[#F7EBE5] text-[#8C4328] font-semibold'
                          : 'border-[#E0D5C3] bg-white text-[#4A4540] hover:border-[#1A1715]'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Notes */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1715]">
                  Any special preferences? (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Prefers loose fit, needs accessories to match, warm Lagos afternoon..."
                  className="w-full text-xs p-3 bg-white border border-[#D5C7B4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C86242]"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 bg-[#1A1715] hover:bg-[#2C2724] text-white font-semibold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#E0A96D]" />
                    <span>Hannah & Lydia's AI Stylist is curating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#E0A96D]" />
                    <span>Generate My Tailored Outfit</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Results View */
            <div className="space-y-6">
              <div className="bg-[#F5EFE6] p-5 rounded-2xl border border-[#EBE3D5] space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C86242]">
                  Curated For Your {occasion}
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#1A1715]">
                  {recommendation.outfitTitle}
                </h3>
                <p className="text-xs text-[#5C554D] leading-relaxed">
                  "{recommendation.stylingNote}"
                </p>
              </div>

              {/* Products Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1715]">
                  Outfit Pieces ({recommendation.recommendedProducts.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {recommendation.recommendedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        setIsStylistOpen(false);
                        setSelectedProduct(prod);
                      }}
                      className="p-3 bg-white border border-[#EBE3D5] rounded-xl hover:border-[#C86242] transition-colors cursor-pointer group"
                    >
                      <div className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-[#EBE3D5] mb-2">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h5 className="font-medium text-xs text-[#1A1715] line-clamp-1 group-hover:text-[#C86242]">
                        {prod.name}
                      </h5>
                      <p className="text-xs font-bold text-[#1A1715] mt-1 tabular-nums">
                        {formatNaira(prod.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estimated Total & Actions */}
              <div className="pt-4 border-t border-[#EBE3D5] space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B635B]">Estimated Outfit Total:</span>
                  <span className="text-xl font-bold text-[#1A1715] tabular-nums">
                    {formatNaira(recommendation.totalEst)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={handleAddAllToBag}
                    className="py-3 px-4 bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#1A1715] font-semibold text-xs rounded-xl border border-[#D5C7B4] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#8C827A]" />
                    <span>Add Entire Look to Bag</span>
                  </button>

                  <button
                    onClick={handleOrderLookWhatsApp}
                    className="py-3 px-4 bg-[#25D366] hover:bg-[#20BE5A] text-white font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order Look on WhatsApp</span>
                  </button>
                </div>

                <button
                  onClick={() => setRecommendation(null)}
                  className="w-full text-center text-xs text-[#8C827A] hover:text-[#1A1715] pt-2 cursor-pointer flex items-center justify-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Curate another outfit</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
