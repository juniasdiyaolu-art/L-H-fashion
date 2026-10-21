import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { formatNaira, getRecommendedProducts } from '../utils/shopUtils';
import { getProductWhatsAppUrl, getRestockNotifyWhatsAppUrl } from '../utils/whatsapp';
import {
  X,
  Heart,
  MessageCircle,
  ShoppingBag,
  Ruler,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Bell,
  Sparkles,
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    isInWishlist,
    toggleWishlist,
    setIsSizeGuideOpen,
  } = useShop();

  if (!selectedProduct) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(selectedProduct.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(
    selectedProduct.colors[0]?.name || 'Standard'
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const wishlisted = isInWishlist(selectedProduct.id);
  const relatedProducts = getRecommendedProducts(PRODUCTS, selectedProduct, 3);

  // Handle direct single-item WhatsApp order
  const handleOrderWhatsApp = () => {
    if (!selectedProduct.inStock) {
      window.open(getRestockNotifyWhatsAppUrl(selectedProduct, selectedSize, selectedColor), '_blank');
      return;
    }
    const url = getProductWhatsAppUrl(selectedProduct, selectedSize, selectedColor);
    window.open(url, '_blank');
  };

  // Add to shopping bag
  const handleAddToBag = () => {
    if (!selectedProduct.inStock) return;
    addToCart(selectedProduct, selectedSize, selectedColor, 1);
    setSelectedProduct(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      {/* Click backdrop to close */}
      <div
        className="fixed inset-0"
        onClick={() => setSelectedProduct(null)}
        aria-hidden="true"
      />

      {/* Modal Surface */}
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#EBE3D5] overflow-hidden z-10 max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 bg-[#FAF7F2]/90 hover:bg-white text-[#1A1715] rounded-full shadow-sm border border-[#E0D5C3] transition-colors cursor-pointer"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Image Gallery */}
        <div className="w-full md:w-1/2 p-6 bg-[#F5EFE6] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EBE3D5] overflow-y-auto">
          <div className="space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[3/4] w-full bg-[#EBE3D5] rounded-xl overflow-hidden shadow-inner">
              <img
                src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                alt={selectedProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className={`absolute top-3 left-3 p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                  wishlisted
                    ? 'bg-[#C86242] text-white'
                    : 'bg-[#FAF7F2]/80 text-[#1A1715] hover:text-[#C86242]'
                }`}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
              </button>

              {!selectedProduct.inStock && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center">
                  <span className="px-4 py-2 bg-[#1A1715] text-[#FAF7F2] font-semibold text-sm rounded-md tracking-wider uppercase">
                    Sold Out
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails row */}
            {selectedProduct.images.length > 1 && (
              <div className="flex items-center gap-3">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-[#C86242] scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Value props strip */}
          <div className="mt-6 pt-4 border-t border-[#E0D5C3] grid grid-cols-2 gap-2 text-[11px] text-[#6B635B]">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#C86242] shrink-0" />
              <span>Lagos Same-Day Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-[#C86242] shrink-0" />
              <span>7-Day Size Exchange</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C86242] shrink-0" />
              <span>100% Verified Quality</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
              <span>Direct WhatsApp Care</span>
            </div>
          </div>
        </div>

        {/* Right Side: Product Details & Purchase Module */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Category & Status */}
            <div>
              <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#8C827A] mb-1 font-medium">
                <span>
                  {selectedProduct.category} · {selectedProduct.subCategory}
                </span>
                {selectedProduct.inStock ? (
                  <span className="text-[#3A7545] font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#3A7545] inline-block" />
                    {selectedProduct.stockCount <= 3 ? `Only ${selectedProduct.stockCount} in stock` : 'In Stock (Lekki Studio)'}
                  </span>
                ) : (
                  <span className="text-[#9E4228] font-semibold">Out of Stock</span>
                )}
              </div>

              {/* Title */}
              <h2 id="product-modal-title" className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1A1715]">
                {selectedProduct.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-2xl font-bold text-[#1A1715] tabular-nums">
                  {formatNaira(selectedProduct.price)}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-sm text-[#9E948A] line-through tabular-nums">
                    {formatNaira(selectedProduct.originalPrice)}
                  </span>
                )}
                {selectedProduct.originalPrice && (
                  <span className="text-xs font-semibold text-[#C86242] uppercase tracking-wider">
                    Save {formatNaira(selectedProduct.originalPrice - selectedProduct.price)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#4A4540] leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Color Selector */}
            {selectedProduct.colors.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-[#4A4540]">
                  <span>Color: <strong className="text-[#1A1715]">{selectedColor}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  {selectedProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`group relative p-1 rounded-full border-2 transition-all cursor-pointer ${
                        selectedColor === c.name ? 'border-[#C86242] scale-105' : 'border-transparent hover:border-[#D5C7B4]'
                      }`}
                      title={c.name}
                      aria-label={`Select color ${c.name}`}
                    >
                      <span
                        className="block w-6 h-6 rounded-full border border-black/15 shadow-inner"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {selectedProduct.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-[#4A4540]">
                  <span>Size: <strong className="text-[#1A1715]">{selectedSize}</strong></span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[#C86242] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>View Size Guide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'border-[#1A1715] bg-[#1A1715] text-[#FAF7F2] shadow-xs'
                          : 'border-[#D5C7B4] bg-[#FAF7F2] text-[#4A4540] hover:border-[#1A1715]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Action Buttons */}
            <div className="space-y-2 pt-2">
              {selectedProduct.inStock ? (
                <>
                  {/* Primary 1-Click WhatsApp Order Button */}
                  <button
                    onClick={handleOrderWhatsApp}
                    className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#20BE5A] text-white font-semibold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.99] cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Order on WhatsApp (Instant Response)</span>
                  </button>

                  {/* Secondary Add to Order List Button */}
                  <button
                    onClick={handleAddToBag}
                    className="w-full py-3 px-6 bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#1A1715] font-semibold text-sm rounded-xl border border-[#D5C7B4] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4 text-[#3A7545]" />
                        <span className="text-[#3A7545]">Added to Order Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#8C827A]" />
                        <span>Add to Order Bag (Combine Multiple Items)</span>
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  onClick={handleOrderWhatsApp}
                  className="w-full py-3.5 px-6 bg-[#1A1715] hover:bg-[#2C2724] text-[#FAF7F2] font-semibold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Bell className="w-5 h-5 text-[#E0A96D]" />
                  <span>Notify Me on WhatsApp When Restocked</span>
                </button>
              )}
            </div>

            {/* Garment Details & Care Accordion */}
            <div className="pt-4 border-t border-[#EBE3D5] space-y-3 text-xs text-[#5C554D]">
              <div>
                <h4 className="font-semibold text-[#1A1715] mb-1.5 uppercase tracking-wider text-[11px]">
                  Garment Details
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedProduct.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-[#1A1715] mb-1 uppercase tracking-wider text-[11px]">
                  Fabric & Care
                </h4>
                <p>{selectedProduct.fabricCare}</p>
              </div>
            </div>
          </div>

          {/* "You May Also Like" Cross-sell row */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-[#EBE3D5]">
              <h4 className="font-editorial text-base font-semibold text-[#1A1715] mb-3">
                Complete Your Look
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {relatedProducts.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => {
                      setSelectedProduct(rel);
                      setActiveImageIndex(0);
                    }}
                    className="text-left group cursor-pointer"
                  >
                    <div className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-[#EBE3D5] mb-1.5">
                      <img
                        src={rel.images[0]}
                        alt={rel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="font-medium text-[11px] text-[#1A1715] truncate group-hover:text-[#C86242]">
                      {rel.name}
                    </p>
                    <p className="text-[11px] font-semibold text-[#6B635B] tabular-nums">
                      {formatNaira(rel.price)}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
