import { CartItem, FilterState, Product } from '../types';

/**
 * Format currency in Nigerian Naira (₦)
 */
export function formatNaira(amount: number): string {
  if (isNaN(amount)) return '₦0';
  return `₦${amount.toLocaleString('en-NG')}`;
}

/**
 * Calculate total price of cart items
 */
export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
}

/**
 * Calculate delivery fee considering free shipping threshold
 */
export function calculateDeliveryFee(subtotal: number, zoneFee: number, freeThreshold: number = 75000): number {
  if (subtotal <= 0) return 0;
  if (subtotal >= freeThreshold) return 0;
  return zoneFee;
}

/**
 * Filter products according to category, search query, price, size, color
 */
export function filterProducts(products: Product[], filters: FilterState): Product[] {
  return products.filter((product) => {
    // Category filter
    if (filters.category === 'new-arrivals') {
      if (!product.isNew) return false;
    } else if (filters.category === 'sale') {
      if (!product.isSale) return false;
    } else if (filters.category !== 'all') {
      if (product.category !== filters.category) return false;
    }

    // Search query filter (matches name, description, subCategory, or color names)
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      const nameMatch = product.name.toLowerCase().includes(q);
      const descMatch = product.description.toLowerCase().includes(q);
      const subCatMatch = product.subCategory.toLowerCase().includes(q);
      const colorMatch = product.colors.some((c) => c.name.toLowerCase().includes(q));
      if (!nameMatch && !descMatch && !subCatMatch && !colorMatch) {
        return false;
      }
    }

    // Price range filter
    const [minPrice, maxPrice] = filters.priceRange;
    if (product.price < minPrice || product.price > maxPrice) {
      return false;
    }

    // Size filter
    if (filters.selectedSizes.length > 0) {
      const hasMatchingSize = filters.selectedSizes.some((s) => product.sizes.includes(s));
      if (!hasMatchingSize) return false;
    }

    // Color filter
    if (filters.selectedColors.length > 0) {
      const hasMatchingColor = filters.selectedColors.some((c) =>
        product.colors.some((col) => col.name.toLowerCase() === c.toLowerCase())
      );
      if (!hasMatchingColor) return false;
    }

    return true;
  });
}

/**
 * Sort products according to selected sort order
 */
export function sortProducts(products: Product[], sortBy: FilterState['sortBy']): Product[] {
  const cloned = [...products];

  switch (sortBy) {
    case 'newest':
      return cloned.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case 'price-low':
      return cloned.sort((a, b) => a.price - b.price);
    case 'price-high':
      return cloned.sort((a, b) => b.price - a.price);
    case 'best-sellers':
      return cloned.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    case 'featured':
    default:
      return cloned;
  }
}

/**
 * Get related products for "You may also like"
 */
export function getRecommendedProducts(
  allProducts: Product[],
  currentProduct: Product,
  limit: number = 4
): Product[] {
  return allProducts
    .filter((p) => p.id !== currentProduct.id && (p.category === currentProduct.category || p.isBestSeller))
    .slice(0, limit);
}

/**
 * Resolve product items by IDs (e.g. for Lookbook / Outfit Sets)
 */
export function getLookProducts(allProducts: Product[], productIds: string[]): Product[] {
  return productIds
    .map((id) => allProducts.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));
}
