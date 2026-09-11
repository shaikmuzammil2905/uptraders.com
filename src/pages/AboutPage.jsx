import React from 'react';
import { Link } from 'react-router-dom';
import {
  Store,
  ShieldCheck,
  Utensils,
  Truck,
  CheckCircle2,
  Package,
  Phone,
  MessageSquare
} from 'lucide-react';
import { Header } from '../components/Header';
import logo from '../assets/up-traders-logo.png';

const SERVICES = [
  {
    icon: Store,
    title: 'Retail Grocery',
    description: 'Everyday household groceries including premium rice, cooking oils, pure ghee, grains, pulses, sugar, iodized salt, spices and complete FMCG products.'
  },
  {
    icon: ShieldCheck,
    title: 'Bulk Orders',
    description: 'Wholesale grocery provisions and volume supply for hotels, restaurants, hostels, businesses, and large household requirements with exciting offers.'
  },
  {
    icon: Utensils,
    title: 'Function Orders',
    description: 'Complete catering and function grocery supply for weddings, receptions, birthday parties, religious ceremonies, and community gatherings.'
  },
  {
    icon: Truck,
    title: 'Local Delivery',
    description: 'Fast local delivery right to your doorstep across Sangareddy. 1-Hour Delivery* available in selected service areas.'
  }
];

export function AboutPage() {
  return (
    <div className="bg-brand-beige min-h-screen pb-20 md:pb-12 font-sans">
      <Header title="About Us" />

      {/* Hero Section */}
      <div className="px-4 md:px-24 pt-10 md:pt-14 pb-8 md:pb-12">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-100 text-green-800 text-xs font-bold mb-3">
            <Store className="w-4 h-4" /> About UP Traders
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-4">
            Your Trusted Grocery Partner
          </h1>
          <div className="w-20 h-1.5 bg-[#1B7A2B] rounded-full mb-6"></div>
          
          <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-6 font-medium">
            UP Traders is a complete grocery store serving everyday grocery and FMCG needs, including rice, oil, ghee, grains, pulses, sugar, spices and other daily essentials.
          </p>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Located at Malkapur X Road, Sangareddy, we are dedicated to providing fresh, clean, and authentic kitchen staples alongside everyday FMCG consumer goods for homes, caterers, and commercial establishments.
          </p>
        </div>
      </div>

      {/* Core Services Section */}
      <div className="px-4 md:px-24 pb-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">What We Offer</h2>
          <p className="text-xs md:text-sm text-gray-500">Comprehensive grocery solutions for daily needs, bulk supplies, and special events</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div key={idx} className="bg-white p-6 md:p-8 rounded-3xl border border-green-900/10 shadow-xs flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-green-50 text-[#1B7A2B] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-gray-900 text-lg mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1B7A2B]" />
                    {srv.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    {srv.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Visiting Card Summary Box */}
      <div className="px-4 md:px-24 pb-16">
        <div className="bg-gradient-to-br from-[#1B7A2B] to-[#156321] text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3">
              UP Traders — Complete Grocery Store
            </h3>
            <p className="text-green-100 text-sm md:text-base leading-relaxed mb-6">
              "Rice / Oil & Ghee Grains & Pulses / Sugar Spices All FMCG Items Available Here. Undertaking all Bulk Orders & Function Orders with Exciting Offers."
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/category/all" className="bg-[#FFC107] text-[#156321] font-bold text-xs md:text-sm px-6 py-3 rounded-xl shadow-md uppercase tracking-wider hover:bg-yellow-400 transition-all">
                Shop Groceries
              </Link>
              <Link to="/bulk-orders" className="bg-white/15 text-white border border-white/40 font-bold text-xs md:text-sm px-6 py-3 rounded-xl uppercase tracking-wider hover:bg-white/25 transition-all">
                Bulk Orders
              </Link>
              <Link to="/function-orders" className="bg-white/15 text-white border border-white/40 font-bold text-xs md:text-sm px-6 py-3 rounded-xl uppercase tracking-wider hover:bg-white/25 transition-all">
                Function Orders
              </Link>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center shrink-0 w-full md:w-auto">
            <p className="text-xs uppercase tracking-widest text-amber-300 font-bold mb-1">Store Address</p>
            <p className="text-sm font-semibold text-white max-w-xs mb-3">
              10-34 Malkapur X Road, Sangareddy – 502001, Telangana
            </p>
            <p className="text-xs uppercase tracking-widest text-amber-300 font-bold mb-1">Phone / WhatsApp</p>
            <p className="text-lg font-bold text-white mb-4">8886000847</p>
            <div className="flex justify-center gap-2">
              <a href="tel:8886000847" className="bg-white text-[#1B7A2B] font-bold text-xs px-4 py-2 rounded-lg shadow-xs">
                Call Now
              </a>
              <a href="https://wa.me/918886000847" target="_blank" rel="noopener noreferrer" className="bg-[#FFC107] text-[#156321] font-bold text-xs px-4 py-2 rounded-lg shadow-xs">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
