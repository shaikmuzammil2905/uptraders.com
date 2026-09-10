import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import logoUrl from '../assets/up-traders-logo.png';

export function Footer() {
  return (
    <footer className="bg-[#FFC107] border-t border-brand-yellow text-gray-800 pt-12 pb-24 md:pb-12 w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-16 w-auto shrink-0 flex items-center justify-center">
                <img src={logoUrl} alt="UP Traders" className="h-full w-auto object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl tracking-wide leading-none text-brand-red">UP TRADERS</span>
                <span className="text-black text-[10px] tracking-[0.15em] mt-1 uppercase font-bold">COMPLETE GROCERY STORE</span>
              </div>
            </div>
            <p className="text-sm text-black font-medium leading-relaxed">
              Your primary destination for quality groceries, daily essentials, bulk orders, and function event supplies. Experience excellence with UP Traders.
            </p>
            <div className="flex items-center gap-4 mt-2">
              {/* Facebook */}
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-white text-brand-red hover:bg-brand-red hover:text-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-white text-brand-red hover:bg-brand-red hover:text-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold text-brand-red mb-1">Quick Links</h3>
            <Link to="/" className="text-sm text-black font-medium hover:text-brand-red transition-colors">Home</Link>
            <Link to="/category/all" className="text-sm text-black font-medium hover:text-brand-red transition-colors">Shop All Groceries</Link>
            <Link to="/bulk-orders" className="text-sm text-black font-semibold text-brand-red hover:underline transition-colors">Bulk Orders Inquiry</Link>
            <Link to="/function-orders" className="text-sm text-black font-semibold text-brand-red hover:underline transition-colors">Function / Marriage Orders</Link>
            <Link to="/my-orders" className="text-sm text-black font-medium hover:text-brand-red transition-colors">Order Tracking</Link>
            <Link to="/contact" className="text-sm text-black font-medium hover:text-brand-red transition-colors">Contact Us</Link>
          </div>

          {/* Customer Service */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold text-brand-red mb-1">Customer Service</h3>
            <Link to="/terms-of-service" className="text-sm text-black font-medium hover:text-brand-red transition-colors">Terms & Conditions</Link>
            <Link to="/privacy-policy" className="text-sm text-black font-medium hover:text-brand-red transition-colors">Privacy Policy</Link>
            <Link to="/shipping-policy" className="text-sm text-black font-medium hover:text-brand-red transition-colors">Shipping Policy</Link>
            <Link to="/returns-policy" className="text-sm text-black font-medium hover:text-brand-red transition-colors">Returns & Exchanges</Link>
            <Link to="/contact#faq-section" className="text-sm text-black font-medium hover:text-brand-red transition-colors">FAQs</Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold text-brand-red mb-1">Contact Us</h3>
            <div className="flex items-start gap-3 text-sm text-black font-medium">
              <MapPin className="w-5 h-5 shrink-0 text-brand-red mt-0.5" />
              <span>Aspari main road opposite APGB Bank, 518347</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-black font-medium">
              <Phone className="w-5 h-5 shrink-0 text-brand-red mt-0.5" />
              <span>+91 98660 48155<br />+91 93902 68250</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-black font-medium">
              <Mail className="w-5 h-5 shrink-0 text-brand-red" />
              <span>uptraders.official@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-black font-medium">
              <Clock className="w-5 h-5 shrink-0 text-brand-red" />
              <span>Open Daily: 7:00 AM - 10:00 PM</span>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-300 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-black font-medium">
            © {new Date().getFullYear()} UP Traders LLC — Complete Grocery Store. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-700">
            <Link to="/privacy-policy" className="hover:text-brand-red transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-brand-red transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

