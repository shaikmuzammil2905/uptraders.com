import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, CreditCard, Shield, Edit3, Key, LogOut, ChevronRight, BadgeCheck, AlertCircle } from 'lucide-react';
import { useTradingAuthStore } from '../../store/useTradingAuthStore';
import logoImg from '../../assets/logo.png';

export function TradingProfilePage() {
  const user = useTradingAuthStore((s) => s.user);
  const logout = useTradingAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/trade/login');
  };

  const profile = user || {
    name: 'Demo Trader',
    email: 'demo@uptraders.com',
    phone: '+91 XXXXX XXXXX',
    accountId: 'UT-DEMO-1001',
    kycStatus: 'VERIFIED',
    segment: 'EQUITY',
    broker: 'UpTraders',
    joinedDate: '2024-01-15',
  };

  return (
    <div className="p-4 lg:p-6 max-w-2xl mx-auto">
      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-5">Profile</h2>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-[#0A0F1E] to-[#1a2744] rounded-3xl p-6 mb-4 text-white">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D61A3C] to-[#ff474f] flex items-center justify-center text-3xl font-bold shadow-lg">
            {profile.name?.[0] || 'D'}
          </div>
          <div>
            <div className="font-bold text-xl leading-tight">{profile.name}</div>
            <div className="text-white/60 text-sm">{profile.email}</div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <BadgeCheck className="w-3.5 h-3.5 text-green-400" />
              <span className="text-xs text-green-400 font-semibold">KYC {profile.kycStatus}</span>
            </div>
          </div>
        </div>

        {/* Account details */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="bg-white/5 rounded-xl p-3">
            <div className="text-white/40 text-[10px] mb-0.5">Account ID</div>
            <div className="text-white font-bold text-sm">{profile.accountId}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <div className="text-white/40 text-[10px] mb-0.5">Segment</div>
            <div className="text-white font-bold text-sm">{profile.segment}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <div className="text-white/40 text-[10px] mb-0.5">Broker</div>
            <div className="text-white font-bold text-sm">{profile.broker}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <div className="text-white/40 text-[10px] mb-0.5">Member Since</div>
            <div className="text-white font-bold text-sm">{profile.joinedDate}</div>
          </div>
        </div>
      </div>

      {/* Demo notice */}
      <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-4">
        <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
        <div className="text-xs text-amber-700">
          This is a <strong>demo profile</strong>. All data shown is for demonstration purposes only.
        </div>
      </div>

      {/* Details */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 divide-y divide-gray-50">
        {[
          { icon: User, label: 'Full Name', value: profile.name },
          { icon: Mail, label: 'Email', value: profile.email },
          { icon: Phone, label: 'Phone', value: profile.phone },
          { icon: CreditCard, label: 'Account ID', value: profile.accountId },
          { icon: Shield, label: 'KYC Status', value: profile.kycStatus, valueClass: 'text-green-600' },
        ].map(({ icon: Icon, label, value, valueClass = '' }) => (
          <div key={label} className="flex items-center px-5 py-3.5 gap-3">
            <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-gray-400">{label}</div>
              <div className={`text-sm font-semibold text-gray-800 ${valueClass}`}>{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 divide-y divide-gray-50">
        <button
          onClick={() => setEditMode(true)}
          className="flex items-center gap-3 px-5 py-3.5 w-full hover:bg-gray-50 transition-colors"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
            <Edit3 className="w-4 h-4 text-blue-500" />
          </div>
          <span className="flex-1 text-sm font-semibold text-gray-700 text-left">Edit Profile</span>
          <ChevronRight className="w-4 h-4 text-gray-300" />
        </button>

        <button
          className="flex items-center gap-3 px-5 py-3.5 w-full hover:bg-gray-50 transition-colors"
        >
          <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center">
            <Key className="w-4 h-4 text-purple-500" />
          </div>
          <span className="flex-1 text-sm font-semibold text-gray-700 text-left">Change Password</span>
          <ChevronRight className="w-4 h-4 text-gray-300" />
        </button>
      </div>

      {/* Logout */}
      {!showLogoutConfirm ? (
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full flex items-center justify-center gap-2 bg-white border border-red-200 text-red-500 font-bold py-3.5 rounded-2xl hover:bg-red-50 transition-colors shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      ) : (
        <div className="bg-white border border-red-200 rounded-2xl p-4 shadow-sm">
          <p className="text-sm text-gray-700 font-medium text-center mb-3">Are you sure you want to logout?</p>
          <div className="flex gap-2">
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Edit Profile Toast */}
      {editMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="font-bold text-gray-900 mb-1">Edit Profile</h3>
            <p className="text-xs text-gray-400 mb-4">Profile editing will be available when backend is connected.</p>
            <div className="space-y-3 mb-4">
              <input type="text" defaultValue={profile.name} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none" placeholder="Full Name" />
              <input type="email" defaultValue={profile.email} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none" placeholder="Email" />
              <input type="tel" defaultValue={profile.phone} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none" placeholder="Phone" />
            </div>
            <button onClick={() => setEditMode(false)} className="w-full bg-[#D61A3C] text-white font-bold py-3 rounded-xl text-sm">
              Close (Demo Only)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
