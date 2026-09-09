import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Bell, AlertCircle } from 'lucide-react';
import { TradingSidebar } from './TradingSidebar';
import { useTradingStore } from '../../store/useTradingStore';
import { useTradingAuthStore } from '../../store/useTradingAuthStore';

function TradingToast() {
  const toast = useTradingStore((s) => s.toast);
  if (!toast) return null;

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-amber-500',
  };

  return (
    <div
      key={toast.id}
      className={`fixed top-5 right-5 z-[9999] ${colors[toast.type] || colors.success} text-white px-5 py-3 rounded-2xl shadow-2xl text-sm font-medium max-w-sm animate-[slideInRight_0.3s_ease-out]`}
      style={{ animation: 'slideInRight 0.3s ease-out' }}
    >
      {toast.message}
    </div>
  );
}

export function TradingLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useTradingAuthStore((s) => s.user);
  const location = useLocation();

  // Page title from pathname
  const pageTitles = {
    '/trade/dashboard': 'Dashboard',
    '/trade/markets': 'Markets',
    '/trade/watchlist': 'Watchlist',
    '/trade/portfolio': 'Portfolio',
    '/trade/orders': 'Orders',
    '/trade/transactions': 'Transactions',
    '/trade/profile': 'Profile',
  };
  const pageTitle = pageTitles[location.pathname] || 'Trading';

  return (
    <div className="flex h-screen bg-[#F0F4FF] overflow-hidden">
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 shadow-xl z-20">
        <TradingSidebar />
      </aside>

      {/* ── Mobile Sidebar Overlay ── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-64 flex-shrink-0 z-50 shadow-2xl">
            <TradingSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-100 px-4 lg:px-6 py-3 flex items-center justify-between flex-shrink-0 z-10">
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base lg:text-lg font-bold text-gray-800 leading-tight">{pageTitle}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            {/* Demo badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
              <AlertCircle className="w-3 h-3 text-amber-500" />
              <span className="text-[10px] font-semibold text-amber-600">DEMO MODE</span>
            </div>

            {/* Notification bell */}
            <button className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D61A3C] rounded-full" />
            </button>

            {/* User avatar */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-1.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#D61A3C] to-[#ff474f] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {user?.name?.[0] || 'D'}
              </div>
              <span className="text-xs font-semibold text-gray-700 hidden sm:block max-w-[100px] truncate">
                {user?.name || 'Demo Trader'}
              </span>
            </div>
          </div>
        </header>

        {/* Demo banner strip */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1.5 flex items-center justify-center gap-2 lg:hidden">
          <AlertCircle className="w-3 h-3 text-white" />
          <span className="text-xs text-white font-medium">Demo Trading — No real transactions</span>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Toast */}
      <TradingToast />

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(110%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
