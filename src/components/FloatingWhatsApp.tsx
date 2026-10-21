import React, { useState } from 'react';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  const whatsAppUrl = getGeneralWhatsAppUrl(
    'Hi Lydia & Hannah Collective! I am browsing your site and would love to ask about placing an order.'
  );

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 group">
      {/* Gentle Floating Tooltip for First-time visitors */}
      {!tooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 bg-[#1A1715] text-[#FAF7F2] text-xs py-2 px-3.5 rounded-full shadow-lg border border-[#3A3530] animate-in fade-in slide-in-from-right duration-300">
          <span>Need help styling or ordering?</span>
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E0A96D] hover:underline font-semibold"
          >
            Chat with us
          </a>
          <button
            onClick={() => setTooltipDismissed(true)}
            className="text-[#8C827A] hover:text-white ml-1 p-0.5"
            aria-label="Dismiss chat tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat directly with Lydia & Hannah on WhatsApp"
        className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20BE5A] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        {/* Gentle Pulse Ring */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none"
          style={{ animationDuration: '3s' }}
        />
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
};
