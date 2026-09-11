import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { PackageCheck, Phone, Send, ShieldCheck, Truck, CheckCircle, MessageSquare } from 'lucide-react';

const WHATSAPP_NUMBER = "918886000847";
const DISPLAY_PHONE = "8886000847";

export function BulkOrdersPage() {
  const [form, setForm] = useState({
    name: '',
    mobileNumber: '',
    whatsappNumber: '',
    productsRequired: '',
    quantity: '',
    deliveryLocation: '',
    additionalRequirements: ''
  });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.mobileNumber.trim()) e.mobileNumber = true;
    if (!form.productsRequired.trim()) e.productsRequired = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const text = `*BULK GROCERY ENQUIRY — UP TRADERS*%0A%0A` +
      `*Full Name:* ${encodeURIComponent(form.name)}%0A` +
      `*Mobile Number:* ${encodeURIComponent(form.mobileNumber)}%0A` +
      `*WhatsApp Number:* ${encodeURIComponent(form.whatsappNumber || form.mobileNumber)}%0A` +
      `*Products Required:* ${encodeURIComponent(form.productsRequired)}%0A` +
      `*Quantity:* ${encodeURIComponent(form.quantity || 'Not specified')}%0A` +
      `*Delivery Location:* ${encodeURIComponent(form.deliveryLocation || 'Sangareddy / Surrounding')}%0A` +
      `*Additional Requirements:* ${encodeURIComponent(form.additionalRequirements || 'None')}`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    setSent(true);
  };

  return (
    <div className="bg-brand-beige min-h-screen pb-20 md:pb-12 font-sans">
      <Header title="Bulk Orders" />

      {/* Hero Section */}
      <div className="px-4 md:px-24 pt-10 md:pt-14 pb-8 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-100 text-green-800 text-xs font-bold mb-3">
            <PackageCheck className="w-4 h-4" /> Retail & Bulk Orders Desk
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-3">
            Bulk Grocery Orders
          </h1>
          <div className="w-20 h-1.5 bg-[#1B7A2B] rounded-full mb-4"></div>
          <p className="text-gray-700 max-w-2xl text-sm md:text-base leading-relaxed">
            UP Traders accepts bulk grocery requirements for businesses, shops, organizations and large orders with exciting offers and local delivery in Sangareddy.
          </p>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="px-4 md:px-24 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-5 md:p-6 rounded-2xl border border-green-900/10 shadow-xs flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-green-50 text-[#1B7A2B] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1">Exciting Bulk Offers</h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">Special volume pricing on rice bags, cooking oils, ghee, dals, and FMCG supplies.</p>
            </div>
          </div>
          <div className="bg-white p-5 md:p-6 rounded-2xl border border-green-900/10 shadow-xs flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1">Fast Local Delivery</h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">Direct delivery to your shop, enterprise, or residence in Sangareddy.</p>
            </div>
          </div>
          <div className="bg-white p-5 md:p-6 rounded-2xl border border-green-900/10 shadow-xs flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <PackageCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1">Quality Guaranteed</h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">Clean, authentic staples, branded items, and sealed fresh FMCG packs.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form & Contact Section */}
      <div className="px-4 md:px-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          
          {/* Bulk Order Form */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-green-900/10 shadow-md">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-1">Submit Bulk Enquiry</h2>
            <p className="text-xs md:text-sm text-gray-500 mb-6">Fill in your requirements below to generate an instant enquiry via WhatsApp.</p>

            {sent ? (
              <div className="py-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-green-100 text-[#1B7A2B] flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp Opened!</h3>
                <p className="text-sm text-gray-600 max-w-sm mb-6">Your enquiry has been pre-filled. Press send on WhatsApp to submit.</p>
                <button
                  onClick={() => setSent(false)}
                  className="text-sm font-bold text-[#1B7A2B] underline"
                >
                  Send Another Bulk Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-green-500'}`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">Full Name is required</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">WhatsApp Number</label>
                    <input
                      type="tel"
                      value={form.whatsappNumber}
                      onChange={e => setForm({ ...form, whatsappNumber: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="If different from mobile"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Products Required *</label>
                  <textarea
                    rows={3}
                    value={form.productsRequired}
                    onChange={e => setForm({ ...form, productsRequired: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 resize-none ${errors.productsRequired ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-green-500'}`}
                    placeholder="List the grocery products required (e.g. Basmati Rice 25kg, Sunflower Oil 5L, Toor Dal, Sugar...)"
                  />
                  {errors.productsRequired && <p className="text-xs text-red-500 mt-1">Products Required is required</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Quantity</label>
                    <input
                      type="text"
                      value={form.quantity}
                      onChange={e => setForm({ ...form, quantity: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g. 5 bags / 50 kgs / 10 tins"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Delivery Location</label>
                    <input
                      type="text"
                      value={form.deliveryLocation}
                      onChange={e => setForm({ ...form, deliveryLocation: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g. Malkapur X Road, Sangareddy"
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
                    placeholder="Preferred brands, special packing, or delivery date..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#1B7A2B] hover:bg-[#156321] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all mt-3 uppercase tracking-wider text-xs md:text-sm"
                >
                  SEND BULK ENQUIRY
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            )}
          </div>

          {/* Direct Support */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-green-900/10 shadow-xs">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 font-serif">Direct Contact</h3>
              <p className="text-xs md:text-sm text-gray-600 mb-6 leading-relaxed">
                Connect directly with UP Traders for instant bulk order quotations and offer details.
              </p>
              
              <div className="flex flex-col gap-3.5">
                <a
                  href={`tel:${DISPLAY_PHONE}`}
                  className="flex items-center justify-between p-4 rounded-2xl bg-green-50 text-green-900 border border-green-200 hover:bg-green-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#1B7A2B]" />
                    <div>
                      <p className="text-[11px] font-bold text-[#1B7A2B] uppercase tracking-wider">Call Directly</p>
                      <p className="text-base font-bold text-gray-900">{DISPLAY_PHONE}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-[#1B7A2B] text-white px-3.5 py-1.5 rounded-full">CALL NOW</span>
                </a>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello UP Traders, I would like to enquire about bulk grocery orders.')}`}
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
              <h4 className="text-base md:text-lg font-bold mb-2 font-serif">UP Traders Promise</h4>
              <ul className="text-xs md:text-sm space-y-2 text-green-100 leading-relaxed">
                <li>✓ Undertaking all Bulk Orders & Function Orders with exciting offers</li>
                <li>✓ 1-Hour Delivery* in selected service areas</li>
                <li>✓ Clean, weighed, authentic quality grocery staples</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
