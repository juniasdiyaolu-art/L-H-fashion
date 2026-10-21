import React from 'react';
import { useShop } from '../context/ShopContext';
import { SIZE_CHART } from '../data/products';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { X, Ruler, MessageCircle, HelpCircle } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();

  if (!isSizeGuideOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div
        className="fixed inset-0 cursor-pointer"
        onClick={() => setIsSizeGuideOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#EBE3D5] overflow-hidden z-10 animate-in zoom-in-95 duration-150 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EBE3D5]">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#C86242]" />
            <h2 id="size-guide-title" className="font-editorial text-2xl font-semibold text-[#1A1715]">
              Size Guide & Fit Chart
            </h2>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-2 text-[#4A4540] hover:text-[#1A1715] hover:bg-[#EBE3D5] rounded-full transition-colors cursor-pointer"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Introduction */}
        <div className="my-4 text-xs text-[#5C554D] leading-relaxed">
          Our silhouettes are cut with relaxed, flattering ease for warm African weather and feminine curves. Use the chart below as your guide. If you are between sizes, we recommend sizing up for loose linen styles or sizing down for bias-cut silk skirts.
        </div>

        {/* Sizing Table */}
        <div className="overflow-x-auto border border-[#E0D5C3] rounded-xl bg-white">
          <table className="w-full text-left text-xs text-[#1A1715]">
            <thead className="bg-[#F5EFE6] text-[#4A4540] font-semibold uppercase text-[11px] tracking-wider border-b border-[#E0D5C3]">
              <tr>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Bust</th>
                <th className="py-3 px-4">Waist</th>
                <th className="py-3 px-4">Hips</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE3D5]">
              {SIZE_CHART.map((row) => (
                <tr key={row.uk} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#1A1715] whitespace-nowrap">
                    {row.uk}
                  </td>
                  <td className="py-3 px-4 text-[#5C554D] tabular-nums whitespace-nowrap">
                    {row.bust}
                  </td>
                  <td className="py-3 px-4 text-[#5C554D] tabular-nums whitespace-nowrap">
                    {row.waist}
                  </td>
                  <td className="py-3 px-4 text-[#5C554D] tabular-nums whitespace-nowrap">
                    {row.hips}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fit Guarantee & WhatsApp Fit Advice */}
        <div className="mt-6 p-4 bg-[#F5EFE6] rounded-xl border border-[#EBE3D5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-[#1A1715] flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#C86242]" />
              Still Unsure About Your Fit?
            </h4>
            <p className="text-[11px] text-[#6B635B]">
              Chat directly with Hannah on WhatsApp. Send your measurements or height and we will recommend your perfect fit before dispatch.
            </p>
          </div>
          <a
            href={getGeneralWhatsAppUrl('Hi Hannah! I need advice choosing the right size for a piece I want to order.')}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-4 bg-[#25D366] hover:bg-[#20BE5A] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 whitespace-nowrap shadow-xs transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask Fit Stylist</span>
          </a>
        </div>
      </div>
    </div>
  );
};
