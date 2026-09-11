import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Calendar, CheckCircle, HeartHandshake, PartyPopper, Phone, Send, Sparkles, Utensils, MessageSquare } from 'lucide-react';

const WHATSAPP_NUMBER = "918886000847";
const DISPLAY_PHONE = "8886000847";

const FUNCTION_TYPES = [
  'Wedding',
  'Birthday',
  'Party',
  'Religious Function',
  'Family Function',
  'Community Event',
  'Other'
];

export function FunctionOrdersPage() {
  const [form, setForm] = useState({
    name: '',
    mobileNumber: '',
    functionType: 'Wedding',
    productsRequired: '',
    quantity: '',
    functionDate: '',
    deliveryLocation: '',
    additionalRequirements: ''
  });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.mobileNumber.trim()) e.mobileNumber = true;
    if (!form.functionDate.trim()) e.functionDate = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const text = `*FUNCTION & EVENT GROCERY ORDER ENQUIRY — UP TRADERS*%0A%0A` +
      `*Name:* ${encodeURIComponent(form.name)}%0A` +
      `*Mobile Number:* ${encodeURIComponent(form.mobileNumber)}%0A` +
      `*Function Type:* ${encodeURIComponent(form.functionType)}%0A` +
      `*Function Date:* ${encodeURIComponent(form.functionDate)}%0A` +
      `*Products Required:* ${encodeURIComponent(form.productsRequired || 'Complete Function Grocery Kit')}%0A` +
      `*Quantity / Guests:* ${encodeURIComponent(form.quantity || 'Not specified')}%0A` +
      `*Delivery Location:* ${encodeURIComponent(form.deliveryLocation || 'Sangareddy')}%0A` +
      `*Additional Requirements:* ${encodeURIComponent(form.additionalRequirements || 'None')}`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    setSent(true);
  };

  return (
    <div className="bg-brand-beige min-h-screen pb-20 md:pb-12 font-sans">
      <Header title="Function Orders" />

      {/* Hero Section */}
      <div className="px-4 md:px-24 pt-10 md:pt-14 pb-8 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
            <PartyPopper className="w-4 h-4 text-amber-700" /> Event & Function Provisions
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-3">
            Function & Event Grocery Orders
          </h1>
          <div className="w-20 h-1.5 bg-[#1B7A2B] rounded-full mb-4"></div>
          <p className="text-gray-700 max-w-2xl text-sm md:text-base leading-relaxed">
            Planning a wedding, party or function? Contact UP Traders for your large grocery requirements with exciting offers and doorstep delivery.
          </p>
        </motion.div>
      </div>

      {/* Highlights */}
      <div className="px-4 md:px-24 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-green-900/10 shadow-xs text-center">
            <div className="w-10 h-10 rounded-full bg-green-50 text-[#1B7A2B] flex items-center justify-center mx-auto mb-2.5">
              <Utensils className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Catering Essentials</h4>
            <p className="text-xs text-gray-500">Rice bags, cooking oils, ghee, dals, spices & dry fruits</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-green-900/10 shadow-xs text-center">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Pooja & Ritual Items</h4>
            <p className="text-xs text-gray-500">Pure camphor, jaggery, turmeric & essential pooja items</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-green-900/10 shadow-xs text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2.5">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Scheduled Delivery</h4>
            <p className="text-xs text-gray-500">Delivered directly to your function hall, venue or home</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-green-900/10 shadow-xs text-center">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2.5">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Exciting Offers</h4>
            <p className="text-xs text-gray-500">Special packaged package deals for marriage & event orders</p>
          </div>
        </div>
      </div>

      {/* Form & Support Section */}
      <div className="px-4 md:px-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          
          {/* Function Order Form */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-green-900/10 shadow-md">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-1">Function Grocery Request</h2>
            <p className="text-xs md:text-sm text-gray-500 mb-6">Enter your event details and grocery list to receive an instant WhatsApp quote.</p>

            {sent ? (
              <div className="py-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-green-100 text-[#1B7A2B] flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Request Ready on WhatsApp!</h3>
                <p className="text-sm text-gray-600 max-w-sm mb-6">WhatsApp has opened with your function provisions checklist. Press send to submit.</p>
                <button
                  onClick={() => setSent(false)}
                  className="text-sm font-bold text-[#1B7A2B] underline"
                >
                  Submit Another Function Order
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-green-500'}`}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">Name is required</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      value={form.mobileNumber}
                      onChange={e => setForm({ ...form, mobileNumber: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.mobileNumber ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-green-500'}`}
                      placeholder="e.g. 8886000847"
                    />
                    {errors.mobileNumber && <p className="text-xs text-red-500 mt-1">Mobile Number is required</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Function Type *</label>
                    <select
                      value={form.functionType}
                      onChange={e => setForm({ ...form, functionType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-brand-beige text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {FUNCTION_TYPES.map(ft => (
                        <option key={ft} value={ft}>{ft}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Function Date *</label>
                    <input
                      type="date"
                      value={form.functionDate}
                      onChange={e => setForm({ ...form, functionDate: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border bg-brand-beige text-gray-900 focus:outline-none focus:ring-2 ${errors.functionDate ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-green-500'}`}
                    />
                    {errors.functionDate && <p className="text-xs text-red-500 mt-1">Date is required</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Products Required</label>
                  <textarea
                    rows={3}
                    value={form.productsRequired}
                    onChange={e => setForm({ ...form, productsRequired: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    placeholder="e.g. Sona Masoori Rice, Cow Ghee, Sunflower Oil, Toor Dal, Sugar, Dry Fruits, Garam Masala..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Estimated Quantity / Guests</label>
                    <input
                      type="text"
                      value={form.quantity}
                      onChange={e => setForm({ ...form, quantity: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g. 500 Guests / 100 Kgs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Delivery Location / Venue</label>
                    <input
                      type="text"
                      value={form.deliveryLocation}
                      onChange={e => setForm({ ...form, deliveryLocation: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g. Function Hall / Sangareddy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Additional Requirements</label>
                  <input
                    type="text"
                    value={form.additionalRequirements}
                    onChange={e => setForm({ ...form, additionalRequirements: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Specific delivery timings, custom packaging..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#1B7A2B] hover:bg-[#156321] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all mt-3 uppercase tracking-wider text-xs md:text-sm"
                >
                  REQUEST FUNCTION ORDER
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            )}
          </div>

          {/* Quick Contact */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-green-900/10 shadow-xs">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 font-serif">Function Order Helpline</h3>
              <p className="text-xs md:text-sm text-gray-600 mb-6 leading-relaxed">
                Need to discuss full provision lists with our experienced staff? Call or WhatsApp UP Traders.
              </p>

              <div className="flex flex-col gap-3.5">
                <a
                  href={`tel:${DISPLAY_PHONE}`}
                  className="flex items-center justify-between p-4 rounded-2xl bg-green-50 text-green-900 border border-green-200 hover:bg-green-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#1B7A2B]" />
                    <div>
                      <p className="text-[11px] font-bold text-[#1B7A2B] uppercase tracking-wider">Call Helpline</p>
                      <p className="text-base font-bold text-gray-900">{DISPLAY_PHONE}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-[#1B7A2B] text-white px-3.5 py-1.5 rounded-full">CALL NOW</span>
                </a>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello UP Traders, I want to discuss grocery requirements for a function/event.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-amber-700" />
                    <div>
                      <p className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">WhatsApp Us</p>
                      <p className="text-base font-bold text-gray-900">{DISPLAY_PHONE}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-amber-600 text-white px-3.5 py-1.5 rounded-full">WHATSAPP US</span>
                </a>
              </div>
            </div>

            <div className="bg-[#156321] text-white p-6 md:p-8 rounded-3xl shadow-lg">
              <h4 className="text-base md:text-lg font-bold mb-2 font-serif">Event Convenience</h4>
              <p className="text-xs md:text-sm text-green-100 leading-relaxed mb-3">
                Save time and hassle by getting all groceries, oils, ghee, dry fruits, spices, and pooja items bundled in organized crates delivered right to your event location.
              </p>
              <div className="text-[11px] font-bold text-amber-300">
                ★ 1-Hour Delivery* in selected service areas
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
