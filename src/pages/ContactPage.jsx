import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const WHATSAPP_NUMBER = '918886000847';
const DISPLAY_PHONE = '8886000847';

function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.phone.trim()) e.phone = true;
    if (!form.message.trim()) e.message = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const text = `*New Contact Message — UP Traders*%0A%0A*Name:* ${encodeURIComponent(form.name)}%0A*Phone:* ${encodeURIComponent(form.phone)}%0A*Subject:* ${encodeURIComponent(form.subject || 'General Enquiry')}%0A%0A*Message:*%0A${encodeURIComponent(form.message)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    setSent(true);
  };

  const inputClass = (key) =>
    `w-full px-4 py-3 rounded-xl border bg-brand-beige focus:outline-none focus:ring-2 transition-shadow text-gray-900 placeholder:text-gray-400 ${
      errors[key] ? 'border-red-400 focus:ring-red-300' : 'border-green-900/15 focus:ring-green-500'
    }`;

  if (sent) return (
    <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
        <svg className="w-7 h-7 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </div>
      <h3 className="text-lg font-bold text-gray-900">WhatsApp Opened!</h3>
      <p className="text-gray-600 text-xs md:text-sm">Your message is pre-filled in WhatsApp. Send it directly to connect with UP Traders.</p>
      <button onClick={() => { setSent(false); setForm({ name: '', phone: '', subject: '', message: '' }); }}
        className="text-xs font-bold text-[#1B7A2B] underline mt-2">Send another message</button>
    </div>
  );

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Full Name *</label>
        <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className={inputClass('name')} placeholder="Your Name" />
        {errors.name && <p className="text-xs text-red-500 mt-1">Name is required</p>}
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Mobile / WhatsApp Number *</label>
        <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          className={inputClass('phone')} placeholder="e.g. 8886000847" />
        {errors.phone && <p className="text-xs text-red-500 mt-1">Mobile number is required</p>}
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Subject</label>
        <input type="text" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
          className={inputClass('subject')} placeholder="Grocery enquiry, bulk requirement, etc." />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Message *</label>
        <textarea rows={3} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className={inputClass('message') + ' resize-none'} placeholder="Write your message or grocery requirement..." />
        {errors.message && <p className="text-xs text-red-500 mt-1">Message is required</p>}
      </div>
      <motion.button type="submit"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-[#1B7A2B] hover:bg-[#156321] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-xs md:text-sm uppercase tracking-wider"
      >
        Send via WhatsApp
        <Send className="w-4 h-4" />
      </motion.button>
    </form>
  );
}

export function ContactPage() {
  return (
    <div className="bg-brand-beige min-h-screen pb-20 md:pb-12 font-sans">
      <Header title="Contact Us" />

      {/* Hero Banner */}
      <div className="px-4 md:px-24 pt-10 md:pt-14 pb-8 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-[#1B7A2B] font-bold tracking-widest uppercase text-xs mb-2">Get in Touch</h4>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-3">
            Contact UP Traders
          </h1>
          <div className="w-20 h-1.5 bg-[#1B7A2B] rounded-full mb-4"></div>
          <p className="text-gray-700 max-w-2xl text-sm md:text-base leading-relaxed">
            Need daily groceries, rice, pulses, cooking oils, bulk supplies, or function orders in Sangareddy? We are here to assist you.
          </p>
        </motion.div>
      </div>

      {/* Contact Cards + Form */}
      <div className="px-4 md:px-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

          {/* Contact Info & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-5"
          >
            {/* Store Location */}
            <div className="bg-white border border-green-900/10 rounded-2xl p-5 md:p-6 flex items-start gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-[#1B7A2B]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-gray-900 text-base md:text-lg mb-1">Store Address</h3>
                <p className="text-gray-800 text-sm font-medium leading-relaxed">
                  10-34 Malkapur X Road, Sangareddy – 502001, Telangana, India
                </p>
              </div>
            </div>

            {/* Direct Phone & Call Now */}
            <div className="bg-white border border-green-900/10 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-[#1B7A2B]" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-gray-900 text-base md:text-lg">Phone</h3>
                  <p className="text-gray-800 text-sm font-semibold">{DISPLAY_PHONE}</p>
                </div>
              </div>
              <a
                href={`tel:${DISPLAY_PHONE}`}
                className="bg-[#1B7A2B] hover:bg-[#156321] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm text-center uppercase tracking-wider transition-all shrink-0"
              >
                CALL NOW
              </a>
            </div>

            {/* WhatsApp Chat & Action */}
            <div className="bg-white border border-green-900/10 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-gray-900 text-base md:text-lg">WhatsApp</h3>
                  <p className="text-gray-800 text-sm font-semibold">{DISPLAY_PHONE}</p>
                </div>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello UP Traders, I would like to enquire about grocery products.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm text-center uppercase tracking-wider transition-all shrink-0"
              >
                CHAT ON WHATSAPP
              </a>
            </div>

            {/* Fast Local Delivery Note */}
            <div className="bg-[#156321] text-white p-5 md:p-6 rounded-2xl shadow-sm">
              <h4 className="font-serif font-bold text-base mb-1">Fast Local Delivery</h4>
              <p className="text-xs text-green-100 leading-relaxed">
                1-Hour Delivery* available in selected service areas across Sangareddy, subject to product availability.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white border border-green-900/10 rounded-3xl shadow-md p-6 md:p-8"
          >
            <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-1">Send a Message</h2>
            <p className="text-xs md:text-sm text-gray-500 mb-6">Leave us a message and we'll connect via WhatsApp.</p>
            <ContactForm />
          </motion.div>

        </div>
      </div>

      {/* Map Section */}
      <div className="px-4 md:px-24 pb-8">
        <div className="bg-white rounded-3xl border border-green-900/10 overflow-hidden shadow-xs">
          <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-gray-900 text-base md:text-lg">Our Location</h3>
              <p className="text-xs text-gray-500">10-34 Malkapur X Road, Sangareddy – 502001, Telangana</p>
            </div>
            <a
              href="https://maps.google.com/?q=Malkapur+X+Road+Sangareddy+502001"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#1B7A2B] hover:underline"
            >
              Open in Google Maps &rarr;
            </a>
          </div>
          <div className="w-full h-64 md:h-80 bg-gray-100">
            <iframe
              title="UP Traders Location"
              src="https://maps.google.com/maps?q=Malkapur%20X%20Road,%20Sangareddy,%20Telangana%20502001&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
