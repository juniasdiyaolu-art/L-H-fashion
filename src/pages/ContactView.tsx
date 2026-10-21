import React, { useState } from 'react';
import { WHATSAPP_CONFIG, getGeneralWhatsAppUrl } from '../utils/whatsapp';
import {
  MessageCircle,
  Instagram,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Phone,
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    topic: 'Product & Sizing Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setSubmitted(true);
    // Send directly into WhatsApp
    const whatsappText = `✨ *NEW INQUIRY VIA WEBSITE* ✨\n👤 *Name:* ${formData.name}\n📞 *Phone:* ${formData.phone || 'N/A'}\n📌 *Topic:* ${formData.topic}\n💬 *Message:* ${formData.message}`;
    setTimeout(() => {
      window.open(getGeneralWhatsAppUrl(whatsappText), '_blank');
    }, 500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#8C4328] bg-[#F7EBE5] px-3 py-1.5 rounded-full">
          <span>We'd Love To Hear From You</span>
          <span aria-hidden="true">·</span>
          <span>Fast Friendly Care</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#1A1715]">
          Get in Touch
        </h1>
        <p className="text-xs sm:text-sm text-[#5C554D] leading-relaxed">
          Questions about sizing, custom delivery timelines, or wholesale? We are most responsive directly on WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Contact Details & Showroom */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#EBE3D5] space-y-6 shadow-xs">
            <h2 className="font-editorial text-2xl font-semibold text-[#1A1715]">
              Contact Channels
            </h2>

            <div className="space-y-4 text-xs text-[#4A4540]">
              <a
                href={getGeneralWhatsAppUrl('Hi Lydia & Hannah! I am reaching out from your contact page.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] text-[#166534] hover:bg-[#DCFCE7] transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-semibold">WhatsApp (Primary)</strong>
                  <span>{WHATSAPP_CONFIG.displayNumber} · Instant reply during business hours</span>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#EBE3D5]">
                <MapPin className="w-5 h-5 text-[#C86242] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-semibold text-[#1A1715]">Studio & Showroom</strong>
                  <span>{WHATSAPP_CONFIG.studioLocation}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#EBE3D5]">
                <Mail className="w-5 h-5 text-[#C86242] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-semibold text-[#1A1715]">Direct Email</strong>
                  <span>{WHATSAPP_CONFIG.supportEmail}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#EBE3D5]">
                <Instagram className="w-5 h-5 text-[#C86242] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-semibold text-[#1A1715]">Instagram DM</strong>
                  <span>{WHATSAPP_CONFIG.instagramHandle}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F5EFE6] border border-[#E0D5C3]">
                <Clock className="w-5 h-5 text-[#8C827A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-semibold text-[#1A1715]">Customer Care Hours</strong>
                  <span>Monday – Friday: 9:00 AM – 7:00 PM WAT</span>
                  <br />
                  <span>Saturday: 10:00 AM – 5:00 PM WAT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Inquiry Form */}
        <div className="lg:col-span-7 bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#EBE3D5] shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="font-editorial text-2xl font-semibold text-[#1A1715]">
              Send Us a Message
            </h2>
            <p className="text-xs text-[#6B635B]">
              Fill out this quick form to dispatch your message straight to our customer desk on WhatsApp.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-semibold text-[#1A1715]">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amaka Adebayo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-white border border-[#D5C7B4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C86242]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-semibold text-[#1A1715]">WhatsApp Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. 0814 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 bg-white border border-[#D5C7B4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C86242]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-[#1A1715]">Inquiry Reason</label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full p-3 bg-white border border-[#D5C7B4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C86242]"
                >
                  <option value="Product & Sizing Inquiry">Product & Sizing Inquiry</option>
                  <option value="Order Tracking / Dispatch">Order Tracking / Dispatch</option>
                  <option value="Showroom Fitting Appointment">Showroom Fitting Appointment</option>
                  <option value="Exchange or Return">Exchange or Return</option>
                  <option value="Wholesale / Custom Orders">Wholesale / Custom Orders</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-[#1A1715]">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help you today? Ask about fit, color recommendations, or delivery timing..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 bg-white border border-[#D5C7B4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C86242]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#20BE5A] text-white font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.99] cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send via WhatsApp Chat</span>
              </button>
            </form>
          ) : (
            <div className="p-8 text-center space-y-3 bg-[#F0FDF4] rounded-2xl border border-[#DCFCE7]">
              <CheckCircle2 className="w-10 h-10 text-[#166534] mx-auto" />
              <h3 className="font-editorial text-2xl font-semibold text-[#166534]">
                Opening WhatsApp Chat...
              </h3>
              <p className="text-xs text-[#166534] max-w-sm mx-auto">
                Thank you, {formData.name}! Your message is formatted and opening directly in WhatsApp so our team can reply immediately.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
