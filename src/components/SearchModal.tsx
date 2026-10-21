import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { formatNaira } from '../utils/shopUtils';
import { Search, X, ShoppingBag } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setSelectedProduct, setPage, setActiveCategoryFilter } = useShop();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subCategory.toLowerCase().includes(q) ||
      p.colors.some((c) => c.name.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isSearchOpen) return null;

  const popularTags = ['Linen', 'Dresses', 'Totes', 'Earrings', 'Wrap', 'Trousers', 'Bags'];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-start justify-center pt-12 sm:pt-20 px-4 animate-in fade-in duration-150"
    >
      <div
        className="fixed inset-0 cursor-pointer"
        onClick={() => setIsSearchOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#EBE3D5] overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        {/* Search input header */}
        <div className="p-4 sm:p-5 border-b border-[#EBE3D5] flex items-center gap-3 bg-[#F5EFE6]">
          <Search className="w-5 h-5 text-[#8C827A] shrink-0" />
          <input
            id="search-modal-title"
            type="search"
            autoFocus
            placeholder="Search dresses, linen, bags, jewelry..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-base sm:text-lg text-[#1A1715] placeholder:text-[#9E948A] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#8C827A] hover:text-[#1A1715] text-xs font-semibold"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-[#4A4540] hover:text-[#1A1715] hover:bg-[#EBE3D5] rounded-full transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="px-5 py-3 border-b border-[#EBE3D5] flex items-center gap-2 overflow-x-auto text-xs text-[#6B635B]">
          <span className="font-semibold text-[#1A1715] shrink-0">Popular:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 bg-[#EFE8DC] hover:bg-[#E6DEC8] text-[#4A4540] rounded-md transition-colors whitespace-nowrap cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-4 sm:p-5">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-sm text-[#8C827A]">
              Type a product name, fabric, or color above to explore the catalog.
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <p className="font-medium text-[#1A1715]">No items found for "{query}"</p>
              <p className="text-xs text-[#8C827A]">
                Try searching for "Linen", "Dress", "Tote", or view our full collection.
              </p>
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setActiveCategoryFilter('all');
                  setPage('shop');
                }}
                className="mt-3 py-2 px-4 bg-[#C86242] text-white text-xs font-semibold rounded-lg"
              >
                View All Products
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-medium text-[#8C827A]">
                Found {searchResults.length} matching piece{searchResults.length > 1 ? 's' : ''}:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSelectedProduct(product);
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl border border-[#EBE3D5] hover:border-[#C86242] bg-white transition-all cursor-pointer group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-18 object-cover rounded-lg bg-[#EBE3D5] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-[#8C827A] font-semibold">
                        {product.category}
                      </p>
                      <h4 className="text-xs font-semibold text-[#1A1715] group-hover:text-[#C86242] transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs font-bold text-[#1A1715] mt-1 tabular-nums">
                        {formatNaira(product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
