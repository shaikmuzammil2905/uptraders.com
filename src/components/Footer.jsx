import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, MessageSquare, Clock } from 'lucide-react';
import logoUrl from '../assets/up-traders-logo.png';

export function Footer() {
  return (
    <footer className="bg-[#FFC107] border-t border-brand-yellow text-gray-900 pt-12 pb-24 md:pb-12 w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-3">
            <Link to="/" className="inline-block">
              <img src={logoUrl} alt="UP Traders" className="h-14 w-auto object-contain" />
            </Link>
            <p className="text-xs text-gray-900 font-semibold tracking-wide uppercase">
              Complete Grocery Store
            </p>
            <p className="text-sm text-gray-800 font-medium leading-relaxed mt-1">
              Your trusted partner for daily groceries, rice, pulses, cooking oils, ghee, spices, grains and all FMCG items in Sangareddy.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2.5">
            <h3 className="text-base font-bold text-brand-red mb-1 font-serif">Quick Links</h3>
            <Link to="/" className="text-sm text-gray-900 font-medium hover:text-brand-red transition-colors">Home</Link>
            <Link to="/category/all" className="text-sm text-gray-900 font-medium hover:text-brand-red transition-colors">Categories</Link>
            <Link to="/category/all" className="text-sm text-gray-900 font-medium hover:text-brand-red transition-colors">Sale</Link>
            <Link to="/wishlist" className="text-sm text-gray-900 font-medium hover:text-brand-red transition-colors">Wishlist</Link>
            <Link to="/about" className="text-sm text-gray-900 font-medium hover:text-brand-red transition-colors">About</Link>
            <Link to="/contact" className="text-sm text-gray-900 font-medium hover:text-brand-red transition-colors">Contact</Link>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-2.5">
            <h3 className="text-base font-bold text-brand-red mb-1 font-serif">Services</h3>
            <Link to="/bulk-orders" className="text-sm text-gray-900 font-medium hover:text-brand-red transition-colors">Bulk Orders</Link>
            <Link to="/function-orders" className="text-sm text-gray-900 font-medium hover:text-brand-red transition-colors">Function Orders</Link>
            <Link to="/contact" className="text-sm text-gray-900 font-medium hover:text-brand-red transition-colors">Local Delivery</Link>
            <div className="mt-2 text-xs text-gray-800 bg-white/40 p-2.5 rounded-xl border border-black/5">
              <span className="font-bold block text-brand-red">1-Hour Delivery*</span>
              <span className="text-[11px] text-gray-700">Available in selected service areas.</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-brand-red mb-1 font-serif">Contact</h3>
            <div className="flex items-start gap-2.5 text-sm text-gray-900 font-medium">
              <Phone className="w-4 h-4 shrink-0 text-brand-red mt-0.5" />
              <a href="tel:8886000847" className="hover:underline">8886000847</a>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-gray-900 font-medium">
              <MessageSquare className="w-4 h-4 shrink-0 text-brand-red mt-0.5" />
              <a href="https://wa.me/918886000847" target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp: 8886000847</a>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-gray-900 font-medium">
              <MapPin className="w-4 h-4 shrink-0 text-brand-red mt-0.5" />
              <span>10-34 Malkapur X Road, Sangareddy – 502001, Telangana, India</span>
            </div>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-900 font-semibold">
            © {new Date().getFullYear()} UP Traders. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-800 font-medium">
            <Link to="/privacy-policy" className="hover:text-brand-red transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-brand-red transition-colors">Terms of Service</Link>
            <Link to="/shipping-policy" className="hover:text-brand-red transition-colors">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
