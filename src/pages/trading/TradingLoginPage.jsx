import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTradingAuthStore } from '../../store/useTradingAuthStore';
import logoImg from '../../assets/logo.png';

export function TradingLoginPage() {
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useTradingAuthStore();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setLocalError('');
    clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    const result = await login(form.email, form.password);
    if (result.success) {
      navigate('/trade/dashboard');
    } else {
      setLocalError(result.error);
    }
  };

  const fillDemo = () => {
    setForm({ email: 'demo@uptraders.com', password: 'Demo@123' });
    setLocalError('');
    clearError();
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050B18] via-[#0A1628] to-[#0D1E38] flex items-center justify-center px-4 py-8 font-sans">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#D61A3C]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D61A3C]/3 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-sm"
      >
        {/* Demo Trading Banner */}
        <div className="mb-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl px-4 py-2.5 flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <div>
            <div className="text-amber-300 text-xs font-bold">Demo Trading Platform</div>
            <div className="text-amber-400/70 text-[10px]">No real money. No real transactions.</div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-7">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D61A3C] to-[#ff474f] flex items-center justify-center mb-3 shadow-lg shadow-[#D61A3C]/30">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <img src={logoImg} alt="UpTraders" className="h-8 w-auto object-contain mb-2 opacity-90" />
            <h1 className="text-white font-bold text-lg leading-tight text-center">UpTraders</h1>
            <p className="text-white/40 text-xs text-center">Trading Platform</p>
          </div>

          <h2 className="text-white font-bold text-xl mb-1 text-center">Sign In</h2>
          <p className="text-white/40 text-xs text-center mb-6">Access your demo trading account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-white/60 block mb-1.5">Email / Mobile</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  name="email"
                  type="text"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="demo@uptraders.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#D61A3C]/50 focus:ring-2 focus:ring-[#D61A3C]/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-white/60 block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Your password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pl-10 pr-11 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#D61A3C]/50 focus:ring-2 focus:ring-[#D61A3C]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {displayError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-xs text-red-400 text-center">
                {displayError}
              </div>
            )}

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#D61A3C] to-[#ff474f] text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-[#D61A3C]/20 hover:shadow-[#D61A3C]/40 transition-all disabled:opacity-60 mt-1"
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-white/20 text-[10px] uppercase tracking-wider">Demo</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          {/* Demo credentials hint */}
          <button
            onClick={fillDemo}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-left transition-all group"
          >
            <div className="text-[10px] text-white/40 font-semibold uppercase tracking-wider mb-1 group-hover:text-white/60">
              Click to fill demo credentials
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/70 font-medium">demo@uptraders.com</div>
                <div className="text-xs text-white/50">Demo@123</div>
              </div>
              <div className="text-xs text-[#D61A3C] font-bold">USE →</div>
            </div>
          </button>

          {/* Create account */}
          <p className="text-center text-xs text-white/30 mt-5">
            New to trading?{' '}
            <Link to="/signup" className="text-white/60 font-semibold hover:text-white transition-colors">
              Create Account
            </Link>
          </p>
        </div>

        {/* Back to store */}
        <div className="text-center mt-4">
          <Link to="/" className="text-white/30 hover:text-white/60 text-xs transition-colors">
            ← Back to Manikanta Super Market
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
