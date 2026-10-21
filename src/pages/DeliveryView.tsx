import React from 'react';
import { DELIVERY_ZONES } from '../data/products';
import { formatNaira } from '../utils/shopUtils';
import { WHATSAPP_CONFIG, getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { Truck, RotateCcw, ShieldCheck, MessageCircle, Clock, CheckCircle } from 'lucide-react';

export const DeliveryView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#8C4328] bg-[#F7EBE5] px-3 py-1.5 rounded-full">
          <span>Nationwide Logistics</span>
          <span aria-hidden="true">·</span>
          <span>Nigeria</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#1A1715]">
          Delivery Rates & Returns
        </h1>
        <p className="text-xs sm:text-sm text-[#5C554D] leading-relaxed">
          Transparent shipping timelines, flat rates, and an easy 7-day size exchange guarantee.
        </p>
      </div>

      {/* Free Shipping Highlight Banner */}
      <div className="bg-[#1A1715] text-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#2A2622] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[11px] uppercase tracking-wider text-[#E0A96D] font-bold">
            Free Shipping Threshold
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-semibold">
            Free Delivery on Orders Over {formatNaira(WHATSAPP_CONFIG.freeDeliveryThreshold)}
          </h2>
          <p className="text-xs text-[#A89C8E]">
            Valid for all locations across Lagos, Abuja, Port Harcourt, and nationwide.
          </p>
        </div>

        <a
          href={getGeneralWhatsAppUrl('Hi Lydia & Hannah! I want to check delivery options for my location.')}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-6 bg-[#25D366] hover:bg-[#20BE5A] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-colors shrink-0"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Ask Dispatch Rider</span>
        </a>
      </div>

      {/* Delivery Rates Table */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-editorial text-2xl font-semibold text-[#1A1715] flex items-center gap-2">
            <Truck className="w-6 h-6 text-[#C86242]" />
            Shipping Zones & Delivery Timelines
          </h2>
          <p className="text-xs text-[#6B635B]">
            All parcels are packaged in recyclable branded dustbags with care cards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DELIVERY_ZONES.map((zone) => (
            <div
              key={zone.id}
              className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EBE3D5] flex items-start justify-between gap-4 shadow-xs"
            >
              <div className="space-y-1">
                <h3 className="font-semibold text-sm text-[#1A1715]">{zone.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-[#6B635B]">
                  <Clock className="w-3.5 h-3.5 text-[#C86242]" />
                  <span>{zone.timeline}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-base font-bold text-[#1A1715] tabular-nums block">
                  {formatNaira(zone.fee)}
                </span>
                <span className="text-[10px] text-[#3A7545] font-semibold">
                  Free over {formatNaira(WHATSAPP_CONFIG.freeDeliveryThreshold)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Returns & Size Exchange Policy */}
      <div className="bg-[#FAF7F2] p-6 sm:p-10 rounded-3xl border border-[#EBE3D5] space-y-6">
        <div className="space-y-2">
          <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1A1715] flex items-center gap-2">
            <RotateCcw className="w-6 h-6 text-[#C86242]" />
            Our 7-Day Size Exchange Guarantee
          </h2>
          <p className="text-xs sm:text-sm text-[#5C554D] leading-relaxed">
            We understand that ordering clothes online without trying them on can feel daunting. That's why we make size exchanges effortless:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs text-[#5C554D]">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#1A1715] text-white flex items-center justify-center font-bold text-xs">
              1
            </div>
            <strong className="block text-sm font-semibold text-[#1A1715]">
              Contact Us on WhatsApp
            </strong>
            <p>
              Within 7 days of receiving your order, send us a quick WhatsApp message with your order details and the new size you need.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#1A1715] text-white flex items-center justify-center font-bold text-xs">
              2
            </div>
            <strong className="block text-sm font-semibold text-[#1A1715]">
              Keep Garment Pristine
            </strong>
            <p>
              Items must be unworn, unwashed, and with original brand tags and packaging intact.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#1A1715] text-white flex items-center justify-center font-bold text-xs">
              3
            </div>
            <strong className="block text-sm font-semibold text-[#1A1715]">
              Doorstep Swap or Dropoff
            </strong>
            <p>
              In Lagos, our dispatch rider can deliver your replacement size and collect the previous one. In other states, ship back via GIG logistics.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#EBE3D5] flex items-center justify-between text-xs">
          <span className="text-[#8C827A]">
            Have an exchange request right now?
          </span>
          <a
            href={getGeneralWhatsAppUrl('Hi Lydia & Hannah! I would like to request a size exchange for an order I received.')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C86242] hover:underline font-semibold"
          >
            Start WhatsApp Exchange →
          </a>
        </div>
      </div>
    </div>
  );
};
