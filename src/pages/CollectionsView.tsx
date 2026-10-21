import React from 'react';
import { useShop } from '../context/ShopContext';
import { LOOKBOOK_SETS, PRODUCTS } from '../data/products';
import { getLookProducts, formatNaira } from '../utils/shopUtils';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { ArrowRight, MessageCircle, ShoppingBag, Sparkles } from 'lucide-react';

export const CollectionsView: React.FC = () => {
  const { setSelectedProduct, addToCart } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#8C4328] bg-[#F7EBE5] px-3 py-1.5 rounded-full">
          <span>Curated Outfits</span>
          <span aria-hidden="true">·</span>
          <span>Resort & City Edits</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#1A1715]">
          The L&H Lookbook
        </h1>
        <p className="text-xs sm:text-sm text-[#5C554D] leading-relaxed">
          Head-to-toe styling designed for effortless Lagos mornings, afternoon terrace brunches, and twilight dinners. Order individual items or the entire styled set directly on WhatsApp.
        </p>
      </div>

      {/* Styled Sets */}
      <div className="space-y-20">
        {LOOKBOOK_SETS.map((look, index) => {
          const pieces = getLookProducts(PRODUCTS, look.productIds);
          const totalSetPrice = pieces.reduce((sum, p) => sum + p.price, 0);

          return (
            <article
              key={look.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Lookbook Hero Image */}
              <div
                className={`lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#E0D5C3] shadow-lg bg-[#EBE3D5] ${
                  index % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <div className="aspect-[3/4] w-full">
                  <img
                    src={look.image}
                    alt={look.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-4 left-4 bg-[#1A1715]/85 backdrop-blur-xs text-[#FAF7F2] text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {look.occasion}
                </div>
              </div>

              {/* Outfit Breakdown Details */}
              <div
                className={`lg:col-span-6 space-y-6 ${
                  index % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider text-[#C86242] font-semibold">
                    {look.vibe}
                  </span>
                  <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#1A1715]">
                    {look.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C554D] leading-relaxed">
                    {look.tagline}
                  </p>
                </div>

                {/* Breakdown of items in this look */}
                <div className="space-y-3 pt-2 border-t border-[#EBE3D5]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1715]">
                    Pieces In This Look ({pieces.length})
                  </h3>
                  <div className="space-y-2.5">
                    {pieces.map((piece) => (
                      <div
                        key={piece.id}
                        onClick={() => setSelectedProduct(piece)}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-[#EBE3D5] hover:border-[#C86242] bg-white transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={piece.images[0]}
                            alt={piece.name}
                            className="w-12 h-14 object-cover rounded-lg bg-[#EBE3D5]"
                          />
                          <div>
                            <h4 className="text-xs font-semibold text-[#1A1715] group-hover:text-[#C86242]">
                              {piece.name}
                            </h4>
                            <span className="text-[11px] text-[#8C827A] capitalize">
                              {piece.category}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-[#1A1715] tabular-nums block">
                            {formatNaira(piece.price)}
                          </span>
                          <span className="text-[10px] text-[#C86242] group-hover:underline">
                            View details →
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Look CTAs */}
                <div className="pt-4 border-t border-[#EBE3D5] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-[#8C827A] block">Full Outfit Total:</span>
                    <strong className="text-xl font-bold text-[#1A1715] tabular-nums">
                      {formatNaira(totalSetPrice)}
                    </strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        pieces.forEach((p) =>
                          addToCart(p, p.sizes[0] || 'Standard', p.colors[0]?.name || 'Standard', 1)
                        );
                      }}
                      className="py-2.5 px-4 bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#1A1715] text-xs font-semibold rounded-xl border border-[#D5C7B4] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#8C827A]" />
                      <span>Add Set to Bag</span>
                    </button>

                    <a
                      href={getGeneralWhatsAppUrl(`Hi Lydia & Hannah! I love "${look.title}" in your lookbook. I'd like to check sizes and order this full outfit (Est: ${formatNaira(totalSetPrice)}).`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 bg-[#25D366] hover:bg-[#20BE5A] text-white text-xs font-semibold rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Order Outfit</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
