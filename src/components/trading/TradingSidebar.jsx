import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, TrendingUp, Star, Briefcase, ClipboardList,
  ArrowLeftRight, User, LogOut, ChevronRight, AlertCircle
} from 'lucide-react';
import { useTradingAuthStore } from '../../store/useTradingAuthStore';
import logoImg from '../../assets/logo.png';

const navItems = [
  { to: '/trade/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/trade/markets', icon: TrendingUp, label: 'Markets' },
  { to: '/trade/watchlist', icon: Star, label: 'Watchlist' },
  { to: '/trade/portfolio', icon: Briefcase, label: 'Portfolio' },
  { to: '/trade/orders', icon: ClipboardList, label: 'Orders' },
  { to: '/trade/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/trade/profile', icon: User, label: 'Profile' },
];

export function TradingSidebar({ onClose }) {
  const logout = useTradingAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/trade/login');
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#0A0F1E] to-[#0D1526] text-white">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="UpTraders" className="h-9 w-auto object-contain" />
          <div>
            <div className="font-bold text-sm text-white leading-tight">UpTraders</div>
            <div className="text-[10px] text-green-400 font-semibold tracking-wide">DEMO PLATFORM</div>
          </div>
        </div>
      </div>

      {/* Demo Banner */}
      <div className="mx-3 mt-3 mb-1 rounded-xl bg-amber-500/10 border border-amber-500/20 px-3 py-2 flex items-center gap-2">
        <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
        <span className="text-[10px] text-amber-300 font-medium leading-tight">
          Demo Trading — No real transactions
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-[#D61A3C]/20 text-[#ff6b6b] border border-[#D61A3C]/30'
                  : 'text-white/60 hover:text-white hover:bg-white/8'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? 'text-[#ff6b6b]' : 'text-white/40 group-hover:text-white/80'}`} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight className="w-3 h-3 text-[#ff6b6b]" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4 border-t border-white/10 pt-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
