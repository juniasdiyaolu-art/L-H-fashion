import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { formatNaira } from '../utils/shopUtils';
import { getProductWhatsAppUrl, getRestockNotifyWhatsAppUrl } from '../utils/whatsapp';
import { Heart, MessageCircle, ShoppingBag, Eye, Bell } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, addToCart, isInWishlist, toggleWishlist } = useShop();
  const wishlisted = isInWishlist(product.id);

  const defaultSize = product.sizes[0] || 'Standard';
  const defaultColor = product.colors[0]?.name || 'Default';

  // Handle direct WhatsApp order
  const handleDirectWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) {
      window.open(getRestockNotifyWhatsAppUrl(product, defaultSize, defaultColor), '_blank');
      return;
    }
    window.open(getProductWhatsAppUrl(product, defaultSize, defaultColor), '_blank');
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <article
      onClick={() => setSelectedProduct(product)}
      className="group relative flex flex-col bg-[#FAF7F2] border border-[#EBE3D5] rounded-xl overflow-hidden hover:border-[#D5C7B4] hover:shadow-md transition-all duration-200 cursor-pointer text-left"
    >
      {/* Visual Asset Container (Lead with Imagery) */}
      <div className="relative aspect-[3/4] w-full bg-[#F3ECE1] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Fallback pattern container if image fails */}
        <div className="absolute inset-0 bg-[#EFE8DC] -z-10 flex items-center justify-center text-[#A39688] text-xs">
          {product.name}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors z-10 cursor-pointer ${
            wishlisted
              ? 'bg-[#C86242] text-white shadow-sm'
              : 'bg-[#FAF7F2]/80 text-[#4A4540] hover:text-[#C86242] hover:bg-[#FAF7F2]'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Subtle Status Label (Strict Zero-Pill: Clean quiet unboxed text) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {!product.inStock ? (
            <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-[#1A1715]/80 text-[#FAF7F2] backdrop-blur-xs rounded-sm">
              Sold Out
            </span>
          ) : product.stockCount <= 3 ? (
            <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-[#8C4328]/90 text-white backdrop-blur-xs rounded-sm">
              Only {product.stockCount} Left
            </span>
          ) : product.isNew ? (
            <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-[#FAF7F2]/90 text-[#1A1715] backdrop-blur-xs rounded-sm">
              New Arrival
            </span>
          ) : product.isSale ? (
            <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-[#C86242] text-white rounded-sm">
              Sale
            </span>
          ) : null}
        </div>

        {/* Quick Action Overlay on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          {product.inStock ? (
            <>
              <button
                onClick={handleQuickAdd}
                className="flex-1 py-2 px-3 bg-[#FAF7F2]/95 hover:bg-white text-[#1A1715] text-xs font-semibold rounded-lg shadow-sm border border-[#D5C7B4] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </button>
              <button
                onClick={handleDirectWhatsApp}
                className="py-2 px-3 bg-[#25D366] hover:bg-[#20BE5A] text-white text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Direct WhatsApp Order"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Order</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleDirectWhatsApp}
              className="w-full py-2 px-3 bg-[#1A1715] hover:bg-[#2C2724] text-[#FAF7F2] text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5 text-[#E0A96D]" />
              <span>Notify on WhatsApp</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Metadata: Category & Subcategory as clean unboxed text */}
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#8C827A] mb-1 font-medium">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.subCategory}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-editorial text-lg text-[#1A1715] font-semibold leading-snug line-clamp-1 group-hover:text-[#C86242] transition-colors">
            {product.name}
          </h3>

          {/* Short Benefit / Material Note */}
          <p className="text-xs text-[#6B635B] line-clamp-1 mt-0.5 font-normal">
            {product.description}
          </p>
        </div>

        {/* Price & Primary Mobile Action */}
        <div className="pt-2 border-t border-[#F0E8DC] flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-[#1A1715] tabular-nums">
              {formatNaira(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#9E948A] line-through tabular-nums">
                {formatNaira(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Direct WhatsApp Order CTA Button */}
          {product.inStock ? (
            <button
              onClick={handleDirectWhatsApp}
              className="sm:hidden flex items-center gap-1 px-2.5 py-1.5 bg-[#25D366] text-white text-xs font-semibold rounded-md shadow-xs hover:bg-[#20BE5A] active:scale-95 transition-all cursor-pointer"
              aria-label={`Order ${product.name} on WhatsApp`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Order</span>
            </button>
          ) : (
            <button
              onClick={handleDirectWhatsApp}
              className="sm:hidden flex items-center gap-1 px-2 py-1.5 bg-[#2C2724] text-[#E0A96D] text-[11px] font-semibold rounded-md hover:bg-[#1A1715] transition-colors cursor-pointer"
              aria-label={`Notify when ${product.name} is restocked`}
            >
              <Bell className="w-3 h-3" />
              <span>Notify</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
