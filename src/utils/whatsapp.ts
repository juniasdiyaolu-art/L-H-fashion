import { CartItem, Product } from '../types';
import { formatNaira } from './shopUtils';

export const WHATSAPP_CONFIG = {
  phoneNumber: '2348145900000', // Lydia & Hannah Collective Customer Care
  displayNumber: '+234 814 590 0000',
  instagramHandle: '@lh.collective',
  supportEmail: 'orders@lydiaandhannah.com',
  studioLocation: 'Plot 14, Admiralty Way, Lekki Phase 1, Lagos, Nigeria',
  freeDeliveryThreshold: 75000,
};

/**
 * Clean phone number for wa.me URL
 */
function getSanitizedPhone(): string {
  return WHATSAPP_CONFIG.phoneNumber.replace(/[^0-9]/g, '');
}

/**
 * Generate standard WhatsApp chat link with optional prefilled message
 */
export function getGeneralWhatsAppUrl(
  customMessage: string = 'Hi Lydia & Hannah Collective! I would like to make an inquiry about your latest collection.'
): string {
  const phone = getSanitizedPhone();
  const encoded = encodeURIComponent(customMessage);
  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * Direct 1-click single product order message:
 * Format: "Hi! I'd like to order [product name], size [size], color [color]. Price: [price]."
 */
export function getProductWhatsAppUrl(
  product: Product,
  size: string,
  color: string,
  city?: string
): string {
  const phone = getSanitizedPhone();
  let message = `Hi! I'd like to order *${product.name}*, size: *${size}*, color: *${color}*. Price: *${formatNaira(product.price)}*.`;
  if (city && city.trim()) {
    message += `\nDelivery City: ${city.trim()}`;
  }
  message += `\nPlease confirm availability and payment details. Thank you!`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Out-of-stock "Notify me on WhatsApp" message
 */
export function getRestockNotifyWhatsAppUrl(
  product: Product,
  size?: string,
  color?: string
): string {
  const phone = getSanitizedPhone();
  let msg = `Hi Lydia & Hannah! Please notify me when *${product.name}*`;
  if (size || color) {
    msg += ` (${[size ? `Size: ${size}` : '', color ? `Color: ${color}` : ''].filter(Boolean).join(', ')})`;
  }
  msg += ` is restocked. Thank you!`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

/**
 * Complete Order List message builder for the shopping bag
 */
export function getOrderBagWhatsAppUrl(params: {
  items: CartItem[];
  customerName?: string;
  city?: string;
  deliveryAddress?: string;
  deliveryFee?: number;
  subtotal: number;
  total: number;
  notes?: string;
}): string {
  const phone = getSanitizedPhone();
  const { items, customerName, city, deliveryAddress, deliveryFee = 0, subtotal, total, notes } = params;

  let lines: string[] = [];
  lines.push(`✨ *NEW ORDER — LYDIA & HANNAH COLLECTIVE* ✨`);
  lines.push(`----------------------------------------`);
  if (customerName && customerName.trim()) {
    lines.push(`👤 *Customer:* ${customerName.trim()}`);
  }
  if (city && city.trim()) {
    lines.push(`📍 *Delivery Location:* ${city.trim()}`);
  }
  if (deliveryAddress && deliveryAddress.trim()) {
    lines.push(`🏠 *Address:* ${deliveryAddress.trim()}`);
  }
  lines.push(`----------------------------------------`);
  lines.push(`🛍️ *ITEMS ORDERED:*`);

  items.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    lines.push(
      `${index + 1}. *${item.product.name}*` +
      `\n   • Size: ${item.selectedSize} | Color: ${item.selectedColor}` +
      `\n   • Qty: ${item.quantity} × ${formatNaira(item.product.price)} = *${formatNaira(itemTotal)}*`
    );
  });

  lines.push(`----------------------------------------`);
  lines.push(`Subtotal: ${formatNaira(subtotal)}`);
  if (deliveryFee === 0 && subtotal >= WHATSAPP_CONFIG.freeDeliveryThreshold) {
    lines.push(`Delivery Fee: *FREE* (Order qualifies over ${formatNaira(WHATSAPP_CONFIG.freeDeliveryThreshold)})`);
  } else if (deliveryFee > 0) {
    lines.push(`Delivery Estimate: ${formatNaira(deliveryFee)}`);
  } else {
    lines.push(`Delivery Estimate: To be confirmed based on address`);
  }
  lines.push(`*Estimated Total: ${formatNaira(total)}*`);

  if (notes && notes.trim()) {
    lines.push(`----------------------------------------`);
    lines.push(`📝 *Special Instructions:* ${notes.trim()}`);
  }

  lines.push(`----------------------------------------`);
  lines.push(`Please send payment details & confirm my order. Thank you! 💕`);

  const fullMessage = lines.join('\n');
  return `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`;
}

/**
 * AI Stylist recommendation order message
 */
export function getStylistWhatsAppUrl(params: {
  occasion: string;
  budget: string;
  productNames: string[];
  totalEst: number;
}): string {
  const phone = getSanitizedPhone();
  const lines = [
    `✨ *L&H AI STYLIST CURATION* ✨`,
    `Hi! I used your AI Stylist for:`,
    `• Occasion: *${params.occasion}*`,
    `• Budget: *${params.budget}*`,
    `• Recommended Pieces: ${params.productNames.join(', ')}`,
    `• Estimated Total: *${formatNaira(params.totalEst)}*`,
    `\nI'd like to check sizes and place an order for this look!`,
  ];
  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join('\n'))}`;
}
