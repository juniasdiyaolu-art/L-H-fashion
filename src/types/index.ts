export type ProductCategory = 'clothing' | 'bags' | 'accessories';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  subCategory: string;
  isNew?: boolean;
  isSale?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  stockCount: number;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  description: string;
  details: string[];
  fabricCare: string;
  fitNote?: string;
}

export interface CartItem {
  id: string; // unique item key: `${productId}_${size}_${color}`
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface LookbookOutfit {
  id: string;
  title: string;
  tagline: string;
  image: string;
  occasion: string;
  productIds: string[];
  vibe: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  productPurchased: string;
  date: string;
  verified: boolean;
}

export interface DeliveryZone {
  id: string;
  name: string;
  timeline: string;
  fee: number;
}

export type PageView = 'home' | 'shop' | 'collections' | 'about' | 'contact' | 'delivery' | 'wishlist' | 'product';

export interface FilterState {
  category: 'all' | ProductCategory | 'new-arrivals' | 'sale';
  searchQuery: string;
  priceRange: [number, number];
  selectedSizes: string[];
  selectedColors: string[];
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'best-sellers';
}
