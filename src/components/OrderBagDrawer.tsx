import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { DELIVERY_ZONES } from '../data/products';
import { formatNaira } from '../utils/shopUtils';
import { getOrderBagWhatsAppUrl, WHATSAPP_CONFIG } from '../utils/whatsapp';
import {
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  ShoppingBag,
  Truck,
  Sparkles,
} from 'lucide-react';

export const OrderBagDrawer: React.FC = () => {
  const {
    isBagOpen,
    setIsBagOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    selectedZone,
    setSelectedZone,
    setPage,
  } = useShop();

  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  if (!isBagOpen) return null;

  const freeShippingRemainder = WHATSAPP_CONFIG.freeDeliveryThreshold - cartSubtotal;

  const handleSendOrderToWhatsApp = () => {
    if (cartItems.length === 0) return;
    const url = getOrderBagWhatsAppUrl({
      items: cartItems,
      customerName,
      city: selectedZone.name,
      deliveryAddress,
      deliveryFee,
      subtotal: cartSubtotal,
      total: cartTotal,
      notes: orderNotes,
    });
    window.open(url, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-bag-title"
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 cursor-pointer"
        onClick={() => setIsBagOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 border-l border-[#EBE3D5]">
        {/* Header */}
        <div className="p-5 border-b border-[#EBE3D5] flex items-center justify-between bg-[#F5EFE6]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C86242]" />
            <h2 id="order-bag-title" className="font-editorial text-xl font-semibold text-[#1A1715]">
              Your Order List ({cartItems.length})
            </h2>
          </div>
          <button
            onClick={() => setIsBagOpen(false)}
            className="p-2 text-[#4A4540] hover:text-[#1A1715] hover:bg-[#EBE3D5] rounded-full transition-colors cursor-pointer"
            aria-label="Close order bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        <div className="px-5 py-3 bg-[#1A1715] text-white text-xs">
          {freeShippingRemainder > 0 ? (
            <p>
              Add <strong className="text-[#E0A96D]">{formatNaira(freeShippingRemainder)}</strong> more for <strong>FREE nationwide delivery</strong>!
            </p>
          ) : (
            <p className="text-[#E0A96D] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E0A96D]" />
              You unlocked FREE nationwide delivery!
            </p>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#EBE3D5]">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#F2ECE1] rounded-full flex items-center justify-center text-[#8C827A]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-editorial text-xl font-semibold text-[#1A1715]">
                Your Order Bag is Empty
              </h3>
              <p className="text-sm text-[#6B635B] max-w-xs mx-auto">
                Discover our effortless casual dresses, tops, and artisanal leather bags crafted in Lagos.
              </p>
              <button
                onClick={() => {
                  setIsBagOpen(false);
                  setPage('shop');
                }}
                className="py-2.5 px-6 bg-[#C86242] text-white text-xs font-semibold rounded-lg hover:bg-[#B35234] transition-colors cursor-pointer shadow-xs"
              >
                Browse Shop Collection
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex gap-3">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-24 object-cover rounded-lg bg-[#EBE3D5] shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-medium text-sm text-[#1A1715] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-[#8C827A] mt-0.5">
                        Size: <span className="font-semibold text-[#4A4540]">{item.selectedSize}</span> · Color: <span className="font-semibold text-[#4A4540]">{item.selectedColor}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#9E948A] hover:text-[#C86242] p-1 transition-colors cursor-pointer"
                      aria-label={`Remove ${item.product.name} from order`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#D5C7B4] rounded-lg bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 text-[#4A4540] hover:bg-[#F2ECE1] rounded-l-lg transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold tabular-nums text-[#1A1715]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 text-[#4A4540] hover:bg-[#F2ECE1] rounded-r-lg transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-semibold text-[#1A1715] tabular-nums">
                      {formatNaira(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Module */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-[#F5EFE6] border-t border-[#EBE3D5] space-y-4">
            {/* Delivery destination selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#1A1715] flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#C86242]" />
                  Delivery Destination:
                </span>
                <span className="text-[11px] font-normal text-[#8C827A]">{selectedZone.timeline}</span>
              </label>
              <select
                value={selectedZone.id}
                onChange={(e) => {
                  const found = DELIVERY_ZONES.find((z) => z.id === e.target.value);
                  if (found) setSelectedZone(found);
                }}
                className="w-full text-xs py-2 px-3 bg-white border border-[#D5C7B4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C86242]"
              >
                {DELIVERY_ZONES.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name} (+{formatNaira(zone.fee)})
                  </option>
                ))}
              </select>
            </div>

            {/* Customer Details input (Optional for speedy WhatsApp) */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <input
                type="text"
                placeholder="Your Name (Optional)"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="py-1.5 px-3 bg-white border border-[#D5C7B4] rounded-lg placeholder:text-[#9E948A] focus:outline-none focus:ring-1 focus:ring-[#C86242]"
              />
              <input
                type="text"
                placeholder="Delivery Address / Estate"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="py-1.5 px-3 bg-white border border-[#D5C7B4] rounded-lg placeholder:text-[#9E948A] focus:outline-none focus:ring-1 focus:ring-[#C86242]"
              />
            </div>

            {/* Totals */}
            <div className="space-y-1.5 text-xs text-[#4A4540] pt-1">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-medium text-[#1A1715] tabular-nums">{formatNaira(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery:</span>
                <span className="font-medium tabular-nums">
                  {deliveryFee === 0 ? (
                    <strong className="text-[#3A7545]">FREE</strong>
                  ) : (
                    formatNaira(deliveryFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#1A1715] pt-2 border-t border-[#E0D5C3]">
                <span>Total:</span>
                <span className="tabular-nums text-[#C86242]">{formatNaira(cartTotal)}</span>
              </div>
            </div>

            {/* Primary Action: Send Order to WhatsApp */}
            <button
              onClick={handleSendOrderToWhatsApp}
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20BE5A] text-white font-semibold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Send Order to WhatsApp ({formatNaira(cartTotal)})</span>
            </button>

            <div className="flex items-center justify-between text-[11px] text-[#8C827A]">
              <span>💬 Direct human support on WhatsApp</span>
              <button
                onClick={clearCart}
                className="hover:text-[#C86242] transition-colors cursor-pointer"
              >
                Clear all items
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
