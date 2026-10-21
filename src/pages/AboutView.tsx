import React from 'react';
import { IMAGES } from '../data/products';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { Sparkles, Heart, ShieldCheck, MessageCircle, MapPin } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#8C4328] bg-[#F7EBE5] px-3 py-1.5 rounded-full">
          <span>Our Story</span>
          <span aria-hidden="true">·</span>
          <span>Founded in Lagos</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#1A1715]">
          Effortless Fashion, Honestly Made.
        </h1>
        <p className="text-sm sm:text-base text-[#5C554D] leading-relaxed">
          The story behind Lydia & Hannah Collective, and our mission to create breathable, timeless staples for modern African women.
        </p>
      </div>

      {/* Founders Hero Image */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-[#E0D5C3] shadow-xl bg-[#EBE3D5]">
        <img
          src={IMAGES.aboutFounders}
          alt="Lydia and Hannah in their Lagos design atelier studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#FAF7F2]/95 backdrop-blur-md p-4 rounded-xl border border-[#D5C7B4] shadow-md max-w-md">
          <h3 className="font-editorial text-base font-bold text-[#1A1715]">
            Lydia & Hannah Oladipo
          </h3>
          <p className="text-xs text-[#6B635B]">
            Co-Founders & Creative Directors in our Lekki Phase 1 Design Studio, Lagos.
          </p>
        </div>
      </div>

      {/* Editorial Story */}
      <div className="space-y-8 text-sm sm:text-base text-[#4A4540] leading-relaxed">
        <div className="space-y-4">
          <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1A1715]">
            Born from a Frustration with Fast Fashion in Lagos
          </h2>
          <p>
            In early 2023, sisters Lydia and Hannah found themselves asking the same question every weekend: <em>Why is it so difficult to find elegant, high-quality casual wear in Nigeria that doesn't melt in 34°C humidity?</em>
          </p>
          <p>
            Foreign fast-fashion brands were delivering synthetic polyesters that trapped heat and deteriorated after three washes. Meanwhile, luxury boutiques were importing European pieces with 400% markups that felt out of touch with real daily living.
          </p>
          <p>
            We believed Nigerian women deserved better: pure European flax linen that breathes, Nigerian vegetable-tanned leather that ages with grace, and feminine silhouettes that flatter curves without clinginess.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#EBE3D5] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#F7EBE5] flex items-center justify-center text-[#C86242]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#1A1715]">
              Fabric Integrity First
            </h3>
            <p className="text-xs text-[#6B635B] leading-relaxed">
              We never use cheap synthetic polyesters. Every blouse, trouser, and dress is cut from 100% natural linen, cotton-silk, or organic cotton that keeps you cool.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#EBE3D5] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#F7EBE5] flex items-center justify-center text-[#C86242]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#1A1715]">
              Artisan Craft in Small Batches
            </h3>
            <p className="text-xs text-[#6B635B] leading-relaxed">
              Our leather totes and brass accessories are handcrafted in limited runs by generational master artisans in Kano and Lagos. Fair wages, zero sweatshops.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#EBE3D5] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#F7EBE5] flex items-center justify-center text-[#25D366]">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#1A1715]">
              Human-First Ordering
            </h3>
            <p className="text-xs text-[#6B635B] leading-relaxed">
              No robotic forms or payment gateway errors. We chat directly with every customer on WhatsApp to confirm sizing, measurements, and delivery instructions.
            </p>
          </div>
        </div>

        {/* Studio note */}
        <div className="bg-[#F5EFE6] p-6 sm:p-8 rounded-2xl border border-[#E0D5C3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-editorial text-xl font-semibold text-[#1A1715] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#C86242]" />
              Visit Our Lekki Design Showroom
            </h3>
            <p className="text-xs text-[#6B635B]">
              Plot 14, Admiralty Way, Lekki Phase 1, Lagos. Try on sample sizes or pick up your orders in person Monday through Saturday.
            </p>
          </div>
          <a
            href={getGeneralWhatsAppUrl('Hi Lydia & Hannah! I would love to schedule a showroom visit or check today’s studio hours.')}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-5 bg-[#25D366] hover:bg-[#20BE5A] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
