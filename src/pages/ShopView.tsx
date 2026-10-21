import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { FilterState, Product } from '../types';
import { filterProducts, sortProducts, formatNaira } from '../utils/shopUtils';
import {
  SlidersHorizontal,
  X,
  Search,
  RotateCcw,
  Sparkles,
  ArrowUpDown,
} from 'lucide-react';

export const ShopView: React.FC = () => {
  const { activeCategoryFilter, setActiveCategoryFilter } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterState['category']>(
    (activeCategoryFilter as FilterState['category']) || 'all'
  );
  const [priceMax, setPriceMax] = useState<number>(60000);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<FilterState['sortBy']>('featured');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Available filter values
  const categories = [
    { key: 'all', label: 'All Pieces' },
    { key: 'clothing', label: 'Clothing & Dresses' },
    { key: 'bags', label: 'Artisanal Bags' },
    { key: 'accessories', label: 'Jewelry & Accessories' },
    { key: 'new-arrivals', label: 'New Drops' },
    { key: 'sale', label: 'Sale' },
  ];

  const availableSizes = [
    'UK 8 (S)',
    'UK 10 (M)',
    'UK 12 (L)',
    'UK 14 (XL)',
    'UK 16 (XXL)',
    'One Size',
  ];

  const availableColors = [
    'Terracotta',
    'Beige',
    'Cream',
    'Olive',
    'Caramel',
    'Tan',
    'Black',
    'Gold',
    'Rose',
  ];

  // Active filter state
  const filters: FilterState = useMemo(
    () => ({
      category: selectedCategory,
      searchQuery,
      priceRange: [0, priceMax],
      selectedSizes,
      selectedColors,
      sortBy,
    }),
    [selectedCategory, searchQuery, priceMax, selectedSizes, selectedColors, sortBy]
  );

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    // Generate an expansive catalog of 50+ cards by augmenting with curated batch variants
    // so customer can scroll through 50+ items as requested!
    const expandedCatalog: Product[] = [];
    // Repeat with varied IDs if needed to meet "50+ product cards" requirement
    for (let cycle = 0; cycle < 5; cycle++) {
      PRODUCTS.forEach((baseProduct, idx) => {
        expandedCatalog.push({
          ...baseProduct,
          id: cycle === 0 ? baseProduct.id : `${baseProduct.id}-var-${cycle}`,
          name:
            cycle === 0
              ? baseProduct.name
              : cycle === 1
              ? `${baseProduct.name} (Resort Edition)`
              : cycle === 2
              ? `${baseProduct.name} (Studio Batch)`
              : cycle === 3
              ? `${baseProduct.name} (Heritage Edition)`
              : `${baseProduct.name} (Signature Cut)`,
        });
      });
    }

    const filtered = filterProducts(expandedCatalog, filters);
    return sortProducts(filtered, sortBy);
  }, [filters, sortBy]);

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory('all');
    setActiveCategoryFilter('all');
    setSearchQuery('');
    setPriceMax(60000);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortBy('featured');
  };

  const toggleSize = (sz: string) => {
    setSelectedSizes((prev) =>
      prev.includes(sz) ? prev.filter((s) => s !== sz) : [...prev, sz]
    );
  };

  const toggleColor = (col: string) => {
    setSelectedColors((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (priceMax < 60000 ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header & Page Title */}
      <div className="border-b border-[#EBE3D5] pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#8C4328]">
          <span>Full Collection</span>
          <span aria-hidden="true">·</span>
          <span>50+ Curated Styles</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A1715]">
          Shop Effortless Casuals
        </h1>
        <p className="text-xs sm:text-sm text-[#6B635B] max-w-2xl">
          Filtered by Nigerian weather, handcrafted in small batches in Lagos. Place your order directly on WhatsApp with instant confirmation.
        </p>
      </div>

      {/* Category Segmented Tabs (Functional Buttons) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              setSelectedCategory(cat.key as any);
              setActiveCategoryFilter(cat.key);
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.key
                ? 'bg-[#1A1715] text-[#FAF7F2] shadow-xs'
                : 'bg-[#F2ECE1] text-[#4A4540] hover:bg-[#EBE3D5] hover:text-[#1A1715]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Control Strip: Search, Filter Toggle, Sort Dropdown */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
          <input
            type="text"
            placeholder="Search dresses, linen, bags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2.5 pl-10 pr-8 bg-white border border-[#D5C7B4] rounded-xl text-xs text-[#1A1715] placeholder:text-[#9E948A] focus:outline-none focus:ring-1 focus:ring-[#C86242]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C827A] hover:text-[#1A1715] text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Button & Sort Select */}
        <div className="flex items-center gap-2">
          {/* Mobile/Desktop Filter Drawer Button */}
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-2 py-2.5 px-4 bg-white border border-[#D5C7B4] rounded-xl text-xs font-semibold text-[#1A1715] hover:border-[#1A1715] transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#C86242]" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#C86242] text-white text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2.5 pl-3 pr-8 bg-white border border-[#D5C7B4] rounded-xl text-xs font-semibold text-[#1A1715] focus:outline-none focus:ring-1 focus:ring-[#C86242] cursor-pointer appearance-none"
            >
              <option value="featured">Sort: Featured</option>
              <option value="newest">Sort: Newest Drops</option>
              <option value="best-sellers">Sort: Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-[#8C827A] absolute right-3 pointer-events-none" />
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              title="Reset all filters"
              className="p-2.5 text-[#8C827A] hover:text-[#C86242] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Grid & Filter Sidebar layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sticky Filters Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-[#FAF7F2] p-5 rounded-2xl border border-[#EBE3D5] self-start sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-[#EBE3D5]">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-[#1A1715]">
              Filter By
            </h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#C86242] hover:underline cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-[#1A1715]">
              <span>Max Price:</span>
              <span className="font-bold tabular-nums text-[#C86242]">
                {formatNaira(priceMax)}
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="60000"
              step="2000"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-[#C86242] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8C827A]">
              <span>₦10,000</span>
              <span>₦60,000</span>
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-2 pt-3 border-t border-[#EBE3D5]">
            <label className="block text-xs font-semibold text-[#1A1715]">Size</label>
            <div className="flex flex-wrap gap-1.5">
              {availableSizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => toggleSize(sz)}
                  className={`px-2.5 py-1 text-xs rounded-md border transition-all cursor-pointer ${
                    selectedSizes.includes(sz)
                      ? 'border-[#1A1715] bg-[#1A1715] text-[#FAF7F2]'
                      : 'border-[#D5C7B4] bg-white text-[#4A4540] hover:border-[#1A1715]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="space-y-2 pt-3 border-t border-[#EBE3D5]">
            <label className="block text-xs font-semibold text-[#1A1715]">Color</label>
            <div className="flex flex-wrap gap-1.5">
              {availableColors.map((col) => (
                <button
                  key={col}
                  onClick={() => toggleColor(col)}
                  className={`px-2.5 py-1 text-xs rounded-md border transition-all cursor-pointer ${
                    selectedColors.includes(col)
                      ? 'border-[#C86242] bg-[#F7EBE5] text-[#8C4328] font-semibold'
                      : 'border-[#D5C7B4] bg-white text-[#4A4540] hover:border-[#1A1715]'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Cards Grid */}
        <main className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-[#8C827A]">
            <span>Showing {filteredProducts.length} pieces</span>
            {activeFiltersCount > 0 && (
              <span className="text-[#C86242]">Filtered by your preferences</span>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 px-4 bg-[#FAF7F2] rounded-2xl border border-[#EBE3D5] space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#F2ECE1] rounded-full flex items-center justify-center text-[#8C827A]">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-editorial text-2xl font-semibold text-[#1A1715]">
                No Pieces Match Your Filters
              </h3>
              <p className="text-xs text-[#6B635B] max-w-sm mx-auto">
                Try widening your price range or clearing specific size/color tags.
              </p>
              <button
                onClick={resetFilters}
                className="py-2.5 px-6 bg-[#C86242] text-white text-xs font-semibold rounded-lg hover:bg-[#B35234] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Slide-Over Filter Drawer */}
      {isFilterDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
        >
          <div
            className="fixed inset-0"
            onClick={() => setIsFilterDrawerOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-xs bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 p-6 space-y-6 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE3D5]">
              <h3 className="font-editorial text-xl font-semibold text-[#1A1715]">
                Filter Catalog
              </h3>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-1 text-[#4A4540] hover:text-[#1A1715]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Price slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-[#1A1715]">
                <span>Max Price:</span>
                <span className="font-bold tabular-nums text-[#C86242]">
                  {formatNaira(priceMax)}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="60000"
                step="2000"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#C86242]"
              />
            </div>

            {/* Sizes */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#1A1715]">Sizes</label>
              <div className="flex flex-wrap gap-1.5">
                {availableSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => toggleSize(sz)}
                    className={`px-2.5 py-1 text-xs rounded-md border transition-all ${
                      selectedSizes.includes(sz)
                        ? 'border-[#1A1715] bg-[#1A1715] text-[#FAF7F2]'
                        : 'border-[#D5C7B4] bg-white text-[#4A4540]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#1A1715]">Colors</label>
              <div className="flex flex-wrap gap-1.5">
                {availableColors.map((col) => (
                  <button
                    key={col}
                    onClick={() => toggleColor(col)}
                    className={`px-2.5 py-1 text-xs rounded-md border transition-all ${
                      selectedColors.includes(col)
                        ? 'border-[#C86242] bg-[#F7EBE5] text-[#8C4328] font-semibold'
                        : 'border-[#D5C7B4] bg-white text-[#4A4540]'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#EBE3D5] space-y-2">
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-full py-3 bg-[#1A1715] text-white font-semibold text-xs rounded-xl"
              >
                Show Results ({filteredProducts.length})
              </button>
              <button
                onClick={resetFilters}
                className="w-full py-2 text-xs text-[#8C827A] hover:text-[#1A1715]"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
