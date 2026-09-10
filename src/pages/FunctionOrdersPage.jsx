import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Calendar, CheckCircle, HeartHandshake, PartyPopper, Phone, Send, Sparkles, Utensils } from 'lucide-react';

const WHATSAPP_NUMBER = "918886000847";

export function FunctionOrdersPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    eventType: 'Marriage',
    guestCount: '',
    eventDate: '',
    venueLocation: '',
    requirements: '',
    notes: ''
  });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.phone.trim()) e.phone = true;
    if (!form.eventDate.trim()) e.eventDate = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const text = `*NEW FUNCTION / MARRIAGE ORDER ENQUIRY — UP TRADERS*%0A%0A` +
      `*Name:* ${encodeURIComponent(form.name)}%0A` +
      `*Phone:* ${encodeURIComponent(form.phone)}%0A` +
      `*Event Type:* ${encodeURIComponent(form.eventType)}%0A` +
      `*Event Date:* ${encodeURIComponent(form.eventDate)}%0A` +
      `*Expected Guest Count:* ${encodeURIComponent(form.guestCount || 'Not specified')}%0A` +
      `*Venue / Delivery Location:* ${encodeURIComponent(form.venueLocation || 'Aspari / Nearby')}%0A` +
      `*List of Items Needed:* ${encodeURIComponent(form.requirements || 'Full Function Grocery Checklist')}%0A` +
      `*Special Instructions:* ${encodeURIComponent(form.notes || 'None')}`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    setSent(true);
  };

  return (
    <div className="bg-brand-beige min-h-screen pb-20 md:pb-12 font-sans">
      <Header title="Function Orders" />

      {/* Hero Section */}
      <div className="px-4 md:px-24 pt-12 md:pt-16 pb-10 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-4">
            <PartyPopper className="w-4 h-4 text-amber-700" /> Marriage & Event Provisions Specialist
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-4">
            Marriage & Function Grocery Supplies
          </h1>
          <div className="w-20 h-1.5 bg-brand-red rounded-full mb-6"></div>
          <p className="text-gray-900/70 max-w-2xl text-base md:text-lg leading-relaxed">
            Planning a marriage, reception, housewarming, catering function, or religious ceremony? UP Traders supplies complete, hassle-free grocery lists tailored for large gatherings.
          </p>
        </motion.div>
      </div>

      {/* Highlights */}
      <div className="px-4 md:px-24 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-brand-red/10 shadow-sm text-center">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Utensils className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Catering Essentials</h4>
            <p className="text-xs text-gray-500">Premium Rice, Oils, Spices, Ghee & Dry Fruits</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-brand-red/10 shadow-sm text-center">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Pooja & Ritual Supplies</h4>
            <p className="text-xs text-gray-500">Camphor, Jaggery, Coconuts & Ceremonial Needs</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-brand-red/10 shadow-sm text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Scheduled Delivery</h4>
            <p className="text-xs text-gray-500">Delivered directly to your function hall or home</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-brand-red/10 shadow-sm text-center">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-3">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Return Surplus Packing</h4>
            <p className="text-xs text-gray-500">Hassle-free return policy on sealed, unopened bags</p>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="px-4 md:px-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* Form */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand-red/10 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Event Grocery Supply</h2>
            <p className="text-sm text-gray-500 mb-6">Submit your event details or list of items for instant assistance and complete estimate.</p>

            {sent ? (
              <div className="py-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Function Order Enquiry Sent!</h3>
                <p className="text-sm text-gray-600 max-w-sm mb-6">We have prepared your WhatsApp message with all event details. Hit Send in WhatsApp to connect with our manager.</p>
                <button
                  onClick={() => setSent(false)}
                  className="text-sm font-bold text-brand-red underline"
                >
                  Submit Another Function Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Contact Person Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-amber-500'}`}
                    placeholder="e.g. Venkat Reddy"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-amber-500'}`}
                      placeholder="+91 98660 48155"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Type of Function</label>
                    <select
                      value={form.eventType}
                      onChange={e => setForm({ ...form, eventType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-brand-beige text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Marriage / Wedding">Marriage / Wedding</option>
                      <option value="Reception / Engagement">Reception / Engagement</option>
                      <option value="Housewarming (Gruhapravesam)">Housewarming (Gruhapravesam)</option>
                      <option value="Religious Pooja / Festival">Religious Pooja / Festival</option>
                      <option value="Birthday / Anniversary">Birthday / Anniversary</option>
                      <option value="Catering / Community Meal">Catering / Community Meal</option>
                      <option value="Other Function">Other Event</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Function Date *</label>
                    <input
                      type="date"
                      value={form.eventDate}
                      onChange={e => setForm({ ...form, eventDate: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border bg-brand-beige text-gray-900 focus:outline-none focus:ring-2 ${errors.eventDate ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-amber-500'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Estimated Guests</label>
                    <input
                      type="text"
                      value={form.guestCount}
                      onChange={e => setForm({ ...form, guestCount: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="e.g. 500 - 1000 Guests"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Venue / Delivery Address</label>
                  <input
                    type="text"
                    value={form.venueLocation}
                    onChange={e => setForm({ ...form, venueLocation: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="e.g. SR Function Hall, Aspari Main Road"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">List of Grocery Items or Notes</label>
                  <textarea
                    rows={3}
                    value={form.requirements}
                    onChange={e => setForm({ ...form, requirements: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    placeholder="Enter your cook / chef's itemized list (e.g. Basmati Rice 100kg, Refined Oil 50L, Cashews 5kg, Sugar 100kg...)"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-brand-red text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all mt-4"
                >
                  Submit Function Enquiry via WhatsApp
                  <Send className="w-5 h-5" />
                </motion.button>
              </form>
            )}
          </div>

          {/* Manager Direct Call & Assistance */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand-red/10 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Direct Function Desk</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Contact our experienced function coordinators to get complete meal list consultations and item quantity estimations for your guests.
              </p>
              
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+919866048155"
                  className="flex items-center justify-between p-4 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-amber-700" />
                    <div>
                      <p className="text-xs font-bold text-amber-700 uppercase">Function Desk Manager</p>
                      <p className="text-base font-bold">+91 98660 48155</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-amber-700 text-white px-3 py-1 rounded-full">Call Now</span>
                </a>

                <a
                  href="tel:+919390268250"
                  className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-emerald-700" />
                    <div>
                      <p className="text-xs font-bold text-emerald-700 uppercase">Function Desk Manager</p>
                      <p className="text-base font-bold">+91 93902 68250</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-emerald-700 text-white px-3 py-1 rounded-full">Call Now</span>
                </a>
              </div>
            </div>

            <div className="bg-amber-900 text-white p-6 md:p-8 rounded-3xl shadow-lg">
              <h4 className="text-lg font-bold mb-2">Why Order Event Groceries from UP Traders?</h4>
              <p className="text-xs text-amber-100 leading-relaxed mb-3">
                We have over a decade of trust supplying marriages across the region with uncompromised quality rice, pure ghee, premium dry fruits, fresh pulses, and cooking oils.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
