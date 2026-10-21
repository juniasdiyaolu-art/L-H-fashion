import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { IMAGES, INSTAGRAM_POSTS, LOOKBOOK_SETS, PRODUCTS, REVIEWS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { formatNaira } from '../utils/shopUtils';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import {
  ArrowRight,
  MessageCircle,
  Truck,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle,
  Instagram,
  ShoppingBag,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setPage, setActiveCategoryFilter, setSelectedProduct } = useShop();

  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [newsletterPhone, setNewsletterPhone] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const featuredProducts = PRODUCTS.slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  const handleCategoryClick = (categoryKey: string) => {
    setActiveCategoryFilter(categoryKey);
    setPage('shop');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterPhone.trim()) return;
    setNewsletterSubmitted(true);
    // Also provide link to confirm on WhatsApp
    setTimeout(() => {
      window.open(
        getGeneralWhatsAppUrl(`Hi Lydia & Hannah! Please add my number (${newsletterPhone}) to the VIP restock & new drop list.`),
        '_blank'
      );
    }, 400);
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#FAF7F2] border-b border-[#EBE3D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Bold Headline & Benefit-led sales copy */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#8C4328] bg-[#F7EBE5] px-3 py-1.5 rounded-full">
                <span>The Resort & Weekend Edit</span>
                <span aria-hidden="true">·</span>
                <span>Lagos, Nigeria</span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1A1715] leading-[1.08] tracking-tight">
                Dress Like You Mean It.
              </h1>

              <p className="text-base sm:text-lg text-[#5C554D] leading-relaxed max-w-lg font-normal">
                Effortless silhouettes, pure breathable linen, and artisanal leather designed for the Nigerian climate. Instant WhatsApp ordering with same-day Lagos delivery.
              </p>

              {/* Two Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => handleCategoryClick('new-arrivals')}
                  className="py-3.5 px-6 bg-[#1A1715] hover:bg-[#2C2724] text-white font-semibold text-sm rounded-xl shadow-md transition-transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Shop New Arrivals</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={getGeneralWhatsAppUrl('Hi Lydia & Hannah! I saw your new collection and would love to check out what is in stock today.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-6 bg-[#25D366] hover:bg-[#20BE5A] text-white font-semibold text-sm rounded-xl shadow-md transition-transform active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>

              {/* Quick trust metrics */}
              <div className="pt-4 border-t border-[#EBE3D5] flex items-center gap-6 text-xs text-[#6B635B]">
                <div>
                  <strong className="block text-sm text-[#1A1715] font-semibold">Same-Day</strong>
                  <span>Lagos Delivery</span>
                </div>
                <div className="h-6 w-px bg-[#D5C7B4]" />
                <div>
                  <strong className="block text-sm text-[#1A1715] font-semibold">Zero Card Stress</strong>
                  <span>Direct WhatsApp</span>
                </div>
                <div className="h-6 w-px bg-[#D5C7B4]" />
                <div>
                  <strong className="block text-sm text-[#1A1715] font-semibold">100% Linen & Leather</strong>
                  <span>Artisanal Quality</span>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Lifestyle Photography */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[#E0D5C3] bg-[#EBE3D5]">
                <img
                  src={IMAGES.hero}
                  alt="Lydia and Hannah Collective effortless casual fashion"
                  className="w-full h-full object-cover object-center"
                  priority="high"
                />

                {/* Floating look callout badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#FAF7F2]/95 backdrop-blur-md p-3.5 rounded-xl border border-[#D5C7B4] shadow-lg flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8C827A] font-semibold">
                      Featured Look
                    </span>
                    <h3 className="font-editorial text-sm font-bold text-[#1A1715]">
                      Sahara Linen Wrap & Wide-Leg Trousers
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProduct(PRODUCTS[0]);
                    }}
                    className="py-1.5 px-3 bg-[#C86242] text-white text-xs font-semibold rounded-lg hover:bg-[#B35234] transition-colors cursor-pointer shrink-0"
                  >
                    View Piece
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CATEGORY TILES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C4328]">
            Curated Categories
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#1A1715]">
            Effortless Essentials for Every Day
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
          {[
            { key: 'clothing', label: 'Clothing & Dresses', count: '14 styles', image: IMAGES.lookbookEvening },
            { key: 'bags', label: 'Artisanal Bags', count: '8 styles', image: IMAGES.productWovenTote },
            { key: 'accessories', label: 'Accessories & Jewelry', count: '10 pieces', image: IMAGES.productGoldEarrings },
            { key: 'new-arrivals', label: 'New Arrivals', count: 'Fresh drops', image: IMAGES.productLinenWrap },
            { key: 'sale', label: 'Seasonal Sale', count: 'Up to 25% off', image: IMAGES.productCrossbody },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryClick(cat.key)}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden border border-[#EBE3D5] text-left transition-all duration-200 hover:shadow-md cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.label}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-4 text-white">
                <span className="text-[11px] text-[#E0A96D] font-medium tracking-wide">
                  {cat.count}
                </span>
                <h3 className="font-editorial text-lg sm:text-xl font-semibold leading-tight group-hover:underline">
                  {cat.label}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C4328]">
              Handcrafted in Small Batches
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#1A1715] mt-1">
              New Arrivals This Week
            </h2>
          </div>
          <button
            onClick={() => handleCategoryClick('new-arrivals')}
            className="text-xs font-semibold text-[#1A1715] hover:text-[#C86242] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View All New Drops</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. LOOKBOOK / "SHOP THE LOOK" SECTION */}
      <section className="bg-[#F5EFE6] py-14 sm:py-20 border-y border-[#EBE3D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C4328]">
              L&H Styled Lookbook
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#1A1715]">
              Shop Curated Outfit Sets
            </h2>
            <p className="text-xs sm:text-sm text-[#6B635B]">
              Takes the guesswork out of styling. Order whole head-to-toe outfits directly on WhatsApp with one click.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {LOOKBOOK_SETS.map((look) => (
              <div
                key={look.id}
                className="bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#E0D5C3] shadow-sm flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EBE3D5]">
                  <img
                    src={look.image}
                    alt={look.title}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#1A1715]/80 text-[#FAF7F2] backdrop-blur-xs text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                    {look.occasion}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-editorial text-xl font-semibold text-[#1A1715]">
                      {look.title}
                    </h3>
                    <p className="text-xs text-[#5C554D] mt-1 leading-relaxed">
                      {look.tagline}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EBE3D5] flex items-center justify-between">
                    <button
                      onClick={() => {
                        setPage('collections');
                      }}
                      className="text-xs font-semibold text-[#C86242] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Shop this look</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={getGeneralWhatsAppUrl(`Hi Lydia & Hannah! I saw "${look.title}" in your lookbook and would like to order this full outfit.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-3 bg-[#25D366] text-white text-xs font-semibold rounded-lg flex items-center gap-1 hover:bg-[#20BE5A] transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Order Outfit</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BEST SELLERS ROW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C4328]">
              Most Loved By Nigerian Women
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#1A1715] mt-1">
              Boutique Best Sellers
            </h2>
          </div>
          <button
            onClick={() => handleCategoryClick('all')}
            className="text-xs font-semibold text-[#1A1715] hover:text-[#C86242] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Explore All 50+ Styles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. WHY SHOP WITH US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1A1715] text-[#FAF7F2] rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mb-10 space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E0A96D]">
              The L&H Standard
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold">
              Why Nigerian Women Love Shopping With Us
            </h2>
            <p className="text-xs sm:text-sm text-[#A89C8E]">
              We built Lydia & Hannah Collective to eliminate the frustrations of typical online shopping in Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2A2622] flex items-center justify-center text-[#E0A96D]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#FAF7F2]">
                Pure Breathable Fabrics
              </h3>
              <p className="text-xs text-[#A89C8E] leading-relaxed">
                European linen, silk blends, and vegetable-tanned leather that survive hot humid days without uncomfortable sweating or wrinkling stiffness.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2A2622] flex items-center justify-center text-[#E0A96D]">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#FAF7F2]">
                Fast Reliable Delivery
              </h3>
              <p className="text-xs text-[#A89C8E] leading-relaxed">
                Same-day rider dispatch across Lagos (Island & Mainland); 48-hour tracked delivery to Abuja, Port Harcourt, and nationwide via GIG & DHL.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2A2622] flex items-center justify-center text-[#25D366]">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#FAF7F2]">
                Zero Card Stress
              </h3>
              <p className="text-xs text-[#A89C8E] leading-relaxed">
                No endless checkout forms, failed card debits, or OTP delays. Confirm availability and bank transfer directly on WhatsApp with our team.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2A2622] flex items-center justify-center text-[#E0A96D]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#FAF7F2]">
                7-Day Size Exchange
              </h3>
              <p className="text-xs text-[#A89C8E] leading-relaxed">
                If the fit is slightly off, we exchange the size quickly and courteously with zero argument or hidden return fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C4328]">
              Word of Mouth
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#1A1715] mt-1">
              Loved by Women Across Nigeria
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setActiveReviewIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1))
              }
              className="p-2.5 rounded-full border border-[#D5C7B4] hover:bg-[#F2ECE1] text-[#1A1715] transition-colors cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                setActiveReviewIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1))
              }
              className="p-2.5 rounded-full border border-[#D5C7B4] hover:bg-[#F2ECE1] text-[#1A1715] transition-colors cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#EBE3D5] shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#C86242]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#4A4540] italic leading-relaxed">
                  "{review.review}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#EBE3D5]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-xs text-[#1A1715] flex items-center gap-1">
                      {review.name}
                      <CheckCircle className="w-3.5 h-3.5 text-[#3A7545]" />
                    </h3>
                    <p className="text-[11px] text-[#8C827A]">{review.location}</p>
                  </div>
                  <span className="text-[10px] text-[#8C827A] uppercase tracking-wider">
                    {review.date}
                  </span>
                </div>
                <p className="text-[10px] text-[#6B635B] mt-1 font-medium">
                  Purchased: {review.productPurchased}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. INSTAGRAM PHOTO GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C4328]">
              Join Our Community
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1A1715]">
              Tag Us #LHCollective
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#1A1715] hover:text-[#C86242] flex items-center gap-1.5 transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @lh.collective</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-xl overflow-hidden bg-[#EBE3D5] cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-2.5 text-white text-[11px]">
                <p className="line-clamp-2">{post.caption}</p>
                <span className="text-[10px] text-[#E0A96D] mt-1">❤️ {post.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. EMAIL / WHATSAPP DROP SIGNUP */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5EFE6] rounded-3xl p-8 sm:p-12 border border-[#E0D5C3] text-center space-y-4 shadow-sm">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C4328]">
            Be First In Line
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#1A1715]">
            Never Miss a New Drop or Restock
          </h2>
          <p className="text-xs sm:text-sm text-[#5C554D] max-w-md mx-auto leading-relaxed">
            Our linen pieces and leather bags are produced in limited batches of 15–20 pieces. Join our WhatsApp broadcast for first dibs before items sell out.
          </p>

          {!newsletterSubmitted ? (
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto pt-2"
            >
              <input
                type="tel"
                required
                placeholder="WhatsApp Phone Number (e.g. 0814...)"
                value={newsletterPhone}
                onChange={(e) => setNewsletterPhone(e.target.value)}
                className="w-full sm:w-auto flex-1 py-3 px-4 bg-white border border-[#D5C7B4] rounded-xl text-xs text-[#1A1715] placeholder:text-[#9E948A] focus:outline-none focus:ring-1 focus:ring-[#C86242]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto py-3 px-6 bg-[#25D366] hover:bg-[#20BE5A] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join VIP Broadcast</span>
              </button>
            </form>
          ) : (
            <div className="p-4 bg-[#E8F5E9] text-[#2E7D32] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 max-w-md mx-auto">
              <CheckCircle className="w-4 h-4" />
              <span>You're on the list! Opening WhatsApp to confirm...</span>
            </div>
          )}

          <p className="text-[11px] text-[#8C827A]">
            No spam, ever. Only drop alerts every Friday and private discount codes.
          </p>
        </div>
      </section>
    </div>
  );
};
