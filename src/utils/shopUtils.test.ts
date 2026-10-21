import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatNaira,
  calculateSubtotal,
  calculateDeliveryFee,
  filterProducts,
  sortProducts,
} from './shopUtils';
import { getProductWhatsAppUrl, getOrderBagWhatsAppUrl } from './whatsapp';
import { CartItem, FilterState, Product } from '../types';

const mockProductA: Product = {
  id: 'lh-001',
  name: 'Linen Tiered Midi Dress',
  slug: 'linen-tiered-midi-dress',
  price: 28000,
  originalPrice: 32000,
  category: 'clothing',
  subCategory: 'Dresses',
  isNew: true,
  isSale: true,
  isBestSeller: true,
  inStock: true,
  stockCount: 5,
  images: ['/image1.jpg'],
  sizes: ['S', 'M', 'L'],
  colors: [
    { name: 'Terracotta', hex: '#C86242' },
    { name: 'Sand Cream', hex: '#F3EAD8' },
  ],
  description: 'Pure breathable linen dress crafted for warm Lagos days.',
  details: ['100% French linen', 'Tiered skirt', 'Side pockets'],
  fabricCare: 'Hand wash cold or gentle machine cycle. Line dry.',
};

const mockProductB: Product = {
  id: 'lh-002',
  name: 'Artisanal Woven Leather Tote',
  slug: 'artisanal-woven-leather-tote',
  price: 52000,
  category: 'bags',
  subCategory: 'Totes',
  isNew: false,
  isSale: false,
  isBestSeller: true,
  inStock: true,
  stockCount: 3,
  images: ['/image2.jpg'],
  sizes: ['One Size'],
  colors: [{ name: 'Caramel Tan', hex: '#A3683B' }],
  description: 'Handwoven leather tote bag made by artisans in Kano and Lagos.',
  details: ['Genuine leather', 'Brass hardware', 'Lined interior'],
  fabricCare: 'Condition with leather balm.',
};

test('formatNaira formats numbers correctly with Naira symbol', () => {
  assert.equal(formatNaira(28000), '₦28,000');
  assert.equal(formatNaira(0), '₦0');
});

test('calculateSubtotal sums up item price times quantity', () => {
  const items: CartItem[] = [
    {
      id: 'lh-001_M_Terracotta',
      product: mockProductA,
      selectedSize: 'M',
      selectedColor: 'Terracotta',
      quantity: 2,
    },
    {
      id: 'lh-002_One Size_Caramel Tan',
      product: mockProductB,
      selectedSize: 'One Size',
      selectedColor: 'Caramel Tan',
      quantity: 1,
    },
  ];
  // (28000 * 2) + (52000 * 1) = 56000 + 52000 = 108000
  assert.equal(calculateSubtotal(items), 108000);
});

test('calculateDeliveryFee applies free delivery for subtotal >= 75000', () => {
  // Below threshold
  assert.equal(calculateDeliveryFee(50000, 2500, 75000), 2500);
  // Exactly at threshold
  assert.equal(calculateDeliveryFee(75000, 2500, 75000), 0);
  // Above threshold
  assert.equal(calculateDeliveryFee(100000, 2500, 75000), 0);
});

test('filterProducts filters by category and search query', () => {
  const baseFilters: FilterState = {
    category: 'clothing',
    searchQuery: '',
    priceRange: [0, 100000],
    selectedSizes: [],
    selectedColors: [],
    sortBy: 'featured',
  };

  const filtered = filterProducts([mockProductA, mockProductB], baseFilters);
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].id, 'lh-001');

  // Search query test
  const searchFilters: FilterState = {
    ...baseFilters,
    category: 'all',
    searchQuery: 'tote',
  };
  const searchResults = filterProducts([mockProductA, mockProductB], searchFilters);
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].id, 'lh-002');
});

test('sortProducts sorts correctly by price', () => {
  const sortedLow = sortProducts([mockProductB, mockProductA], 'price-low');
  assert.equal(sortedLow[0].price, 28000);
  assert.equal(sortedLow[1].price, 52000);

  const sortedHigh = sortProducts([mockProductA, mockProductB], 'price-high');
  assert.equal(sortedHigh[0].price, 52000);
  assert.equal(sortedHigh[1].price, 28000);
});

test('getProductWhatsAppUrl generates valid WhatsApp link with prefilled order details', () => {
  const url = getProductWhatsAppUrl(mockProductA, 'M', 'Terracotta', 'Lagos');
  assert.ok(url.startsWith('https://wa.me/2348145900000?text='));
  const decoded = decodeURIComponent(url);
  assert.ok(decoded.includes('Linen Tiered Midi Dress'));
  assert.ok(decoded.includes('size: *M*'));
  assert.ok(decoded.includes('color: *Terracotta*'));
  assert.ok(decoded.includes('₦28,000'));
});

test('getOrderBagWhatsAppUrl builds multi-item WhatsApp checkout message', () => {
  const items: CartItem[] = [
    {
      id: 'lh-001_M_Terracotta',
      product: mockProductA,
      selectedSize: 'M',
      selectedColor: 'Terracotta',
      quantity: 1,
    },
  ];
  const url = getOrderBagWhatsAppUrl({
    items,
    customerName: 'Amina Bello',
    city: 'Abuja',
    deliveryAddress: 'Wuse 2, Abuja',
    deliveryFee: 4500,
    subtotal: 28000,
    total: 32500,
  });
  assert.ok(url.startsWith('https://wa.me/2348145900000?text='));
  const decoded = decodeURIComponent(url);
  assert.ok(decoded.includes('Amina Bello'));
  assert.ok(decoded.includes('Wuse 2, Abuja'));
  assert.ok(decoded.includes('₦32,500'));
});
