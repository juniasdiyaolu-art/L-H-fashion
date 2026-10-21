import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { formatNaira } from '../utils/shopUtils';
import { getProductWhatsAppUrl } from '../utils/whatsapp';
import { X, Heart, ShoppingBag, MessageCircle, Trash2 } from 'lucide-react';

export const WishlistModal: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlistIds,
    toggleWishlist,
    addToCart,
    setSelectedProduct,
    setPage,
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wishlist-modal-title"
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
    >
      <div
        className="fixed inset-0 cursor-pointer"
        onClick={() => setIsWishlistOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 border-l border-[#EBE3D5]">
        {/* Header */}
        <div className="p-5 border-b border-[#EBE3D5] flex items-center justify-between bg-[#F5EFE6]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C86242] fill-current" />
            <h2 id="wishlist-modal-title" className="font-editorial text-xl font-semibold text-[#1A1715]">
              Saved Wishlist ({wishlistedProducts.length})
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 text-[#4A4540] hover:text-[#1A1715] hover:bg-[#EBE3D5] rounded-full transition-colors cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#EBE3D5]">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#F2ECE1] rounded-full flex items-center justify-center text-[#8C827A]">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-editorial text-xl font-semibold text-[#1A1715]">
                Your Wishlist is Empty
              </h3>
              <p className="text-sm text-[#6B635B] max-w-xs mx-auto">
                Tap the heart on any product to save it here for later or order whenever you’re ready.
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  setPage('shop');
                }}
                className="py-2.5 px-6 bg-[#C86242] text-white text-xs font-semibold rounded-lg hover:bg-[#B35234] transition-colors cursor-pointer shadow-xs"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div key={product.id} className="pt-4 first:pt-0 flex gap-3">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  onClick={() => {
                    setIsWishlistOpen(false);
                    setSelectedProduct(product);
                  }}
                  className="w-20 h-24 object-cover rounded-lg bg-[#EBE3D5] cursor-pointer shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4
                        onClick={() => {
                          setIsWishlistOpen(false);
                          setSelectedProduct(product);
                        }}
                        className="font-medium text-sm text-[#1A1715] hover:text-[#C86242] cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#1A1715] mt-1 tabular-nums">
                        {formatNaira(product.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="text-[#9E948A] hover:text-[#C86242] p-1 transition-colors cursor-pointer"
                      aria-label={`Remove ${product.name} from wishlist`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => {
                        addToCart(product, product.sizes[0] || 'Standard', product.colors[0]?.name || 'Standard', 1);
                      }}
                      className="flex-1 py-1.5 px-3 bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#1A1715] text-xs font-semibold rounded-md border border-[#D5C7B4] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                    <a
                      href={getProductWhatsAppUrl(product, product.sizes[0] || 'Standard', product.colors[0]?.name || 'Standard')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-3 bg-[#25D366] hover:bg-[#20BE5A] text-white text-xs font-semibold rounded-md flex items-center justify-center gap-1 shadow-xs transition-colors"
                      title="Order on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Order</span>
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
