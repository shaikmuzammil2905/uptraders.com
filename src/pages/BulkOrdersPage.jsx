import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PackageCheck, Phone, Send, ShieldCheck, Truck, CheckCircle } from 'lucide-react';

const WHATSAPP_NUMBER = "918886000847";

export function BulkOrdersPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    businessName: '',
    items: '',
    estimatedQuantity: '',
    deliveryDate: '',
    notes: ''
  });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.phone.trim()) e.phone = true;
    if (!form.items.trim()) e.items = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const text = `*NEW BULK ORDER ENQUIRY — UP TRADERS*%0A%0A` +
      `*Name:* ${encodeURIComponent(form.name)}%0A` +
      `*Phone:* ${encodeURIComponent(form.phone)}%0A` +
      `*Business/Organization:* ${encodeURIComponent(form.businessName || 'N/A')}%0A` +
      `*Items Required:* ${encodeURIComponent(form.items)}%0A` +
      `*Estimated Quantity:* ${encodeURIComponent(form.estimatedQuantity || 'Not specified')}%0A` +
      `*Required Date:* ${encodeURIComponent(form.deliveryDate || 'Flexible')}%0A` +
      `*Additional Notes:* ${encodeURIComponent(form.notes || 'None')}`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    setSent(true);
  };

  return (
    <div className="bg-brand-beige min-h-screen pb-20 md:pb-12 font-sans">
      <Header title="Bulk Orders" />

      {/* Hero Section */}
      <div className="px-4 md:px-24 pt-12 md:pt-16 pb-10 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-4">
            <PackageCheck className="w-4 h-4" /> Wholesale & Commercial Supply
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-4">
            Bulk & Wholesale Grocery Orders
          </h1>
          <div className="w-20 h-1.5 bg-brand-red rounded-full mb-6"></div>
          <p className="text-gray-900/70 max-w-2xl text-base md:text-lg leading-relaxed">
            Get best-in-market wholesale prices for restaurants, hotels, hostels, caterers, institutions, and high-volume household purchases directly from UP Traders.
          </p>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="px-4 md:px-24 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-brand-red/10 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Wholesale Pricing</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Exclusive volume discounts and tiered wholesale pricing structure on all essentials.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-brand-red/10 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Prompt Priority Delivery</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Direct door-step or venue delivery scheduled conveniently around your operations.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-brand-red/10 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <PackageCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Guaranteed Freshness</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Hand-inspected, high quality staples, rice, oils, pulses, and packaged goods.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form & Call Section */}
      <div className="px-4 md:px-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* Form */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand-red/10 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Wholesale Quote</h2>
            <p className="text-sm text-gray-500 mb-6">Fill out your bulk requirements and our wholesale desk will contact you via WhatsApp with a customized price list.</p>

            {sent ? (
              <div className="py-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enquiry Sent to WhatsApp!</h3>
                <p className="text-sm text-gray-600 max-w-sm mb-6">We have opened WhatsApp with your pre-filled inquiry. Click Send in WhatsApp to complete.</p>
                <button
                  onClick={() => setSent(false)}
                  className="text-sm font-bold text-brand-red underline"
                >
                  Submit Another Bulk Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Your Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-emerald-500'}`}
                    placeholder="e.g. Ramesh Kumar"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-emerald-500'}`}
                      placeholder="+91 98660 00000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Business / Enterprise Name</label>
                    <input
                      type="text"
                      value={form.businessName}
                      onChange={e => setForm({ ...form, businessName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g. Hotel Grand / Self"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Required Grocery Items *</label>
                  <textarea
                    rows={3}
                    value={form.items}
                    onChange={e => setForm({ ...form, items: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 resize-none ${errors.items ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-emerald-500'}`}
                    placeholder="e.g. Sona Masoori Rice 25kg x 10 bags, Freedom Sunflower Oil 15L x 5 cans, Sugar 50kg..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Est. Total Quantity / Weight</label>
                    <input
                      type="text"
                      value={form.estimatedQuantity}
                      onChange={e => setForm({ ...form, estimatedQuantity: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g. 250 Kgs / 10 Cartons"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Required Delivery Date</label>
                    <input
                      type="date"
                      value={form.deliveryDate}
                      onChange={e => setForm({ ...form, deliveryDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-brand-beige text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Additional Notes</label>
                  <input
                    type="text"
                    value={form.notes}
                    onChange={e => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-brand-beige text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Specific brand preferences, delivery location details..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-brand-red text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all mt-4"
                >
                  Send Bulk Enquiry via WhatsApp
                  <Send className="w-5 h-5" />
                </motion.button>
              </form>
            )}
          </div>

          {/* Quick Contact & Guidelines */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand-red/10 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Prefer Immediate Assistance?</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Speak directly with our wholesale order manager for urgent bulk orders or custom pricing negotiations.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+919866048155"
                  className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-emerald-700" />
                    <div>
                      <p className="text-xs font-bold text-emerald-700 uppercase">Wholesale Desk 1</p>
                      <p className="text-base font-bold">+91 98660 48155</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-emerald-700 text-white px-3 py-1 rounded-full">Call Now</span>
                </a>

                <a
                  href="tel:+919390268250"
                  className="flex items-center justify-between p-4 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-amber-700" />
                    <div>
                      <p className="text-xs font-bold text-amber-700 uppercase">Wholesale Desk 2</p>
                      <p className="text-base font-bold">+91 93902 68250</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-amber-700 text-white px-3 py-1 rounded-full">Call Now</span>
                </a>
              </div>
            </div>

            <div className="bg-emerald-900 text-white p-6 md:p-8 rounded-3xl shadow-lg relative overflow-hidden">
              <h4 className="text-lg font-bold mb-2">UP Traders Wholesale Guarantee</h4>
              <ul className="text-xs space-y-2 text-emerald-100 leading-relaxed">
                <li>✓ Minimum bulk order quantity eligibility starting from 10 Kgs / units</li>
                <li>✓ GST Billing available on commercial invoices</li>
                <li>✓ Direct vehicle loading & hassle-free delivery scheduling</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
