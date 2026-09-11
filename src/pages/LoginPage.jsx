import React, { useState, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Store, User, Shield, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuthStore } from '../store/useAuthStore';
import { DEMO_CREDENTIALS } from '../data/demoUser';
import logoImg from '../assets/up-traders-logo.png';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

function ForgotPassword({ onBack }) {
  const [step, setStep] = useState('email'); // email | otp | password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const otpRefs = useRef([]);

  const inputCls = 'w-full bg-white border border-gray-200 shadow-inner rounded-xl px-4 pl-11 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#1B7A2B] focus:ring-4 focus:ring-[#1B7A2B]/10 focus:bg-white hover:border-gray-300 transition-all duration-300 shadow-sm';
  const btnCls = 'w-full bg-gradient-to-r from-[#1B7A2B] to-[#156321] text-white font-bold py-3.5 rounded-xl text-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 shadow-md';

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch(`${BACKEND_URL}/auth/forgot-password`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStep('otp');
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) return setError('Enter all 6 digits');
    setStep('password');
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) return setError('Password must be at least 6 characters');
    setLoading(true); setError('');
    try {
      const res = await fetch(`${BACKEND_URL}/auth/reset-password`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otp.join(''), newPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess('Password reset successfully! You can now sign in.');
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleOtpChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp]; next[idx] = val; setOtp(next);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  };
  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) otpRefs.current[idx - 1]?.focus();
  };

  if (success) return (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-[#1B7A2B]">
        <CheckCircle className="w-8 h-8" />
      </div>
      <p className="text-sm font-semibold text-emerald-700">{success}</p>
      <button onClick={onBack} className={btnCls}>Back to Sign In</button>
    </div>
  );

  return (
    <div className="space-y-5">
      <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-semibold mb-2 text-gray-500 hover:text-gray-900 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
      </button>

      <div>
        <h4 className="font-bold tracking-widest uppercase text-xs mb-1 text-[#1B7A2B]">Security</h4>
        <h2 className="text-2xl font-sans font-extrabold tracking-tight mb-1 text-gray-900">
          {step === 'email' ? 'Forgot Password' : step === 'otp' ? 'Verify OTP' : 'New Password'}
        </h2>
        <p className="text-xs text-gray-500">
          {step === 'email' && "Enter your registered email and we'll send a 6-digit verification code."}
          {step === 'otp' && `Enter the 6-digit code sent to ${email}`}
          {step === 'password' && 'Create a strong new password for your account.'}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-600 text-center">
          {error}
        </div>
      )}

      {step === 'email' && (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div className="relative group">
            <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="email" required placeholder="Registered email address"
              value={email} onChange={e => setEmail(e.target.value)}
              className={inputCls}
            />
          </div>
          <button type="submit" disabled={loading} className={btnCls}>
            {loading ? 'Sending Code...' : 'Send 6-Digit Code →'}
          </button>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="flex justify-center gap-2">
            {otp.map((d, i) => (
              <input
                key={i} ref={el => otpRefs.current[i] = el}
                type="text" maxLength={1} value={d}
                onChange={e => handleOtpChange(e.target.value, i)}
                onKeyDown={e => handleOtpKeyDown(e, i)}
                className="w-11 h-12 text-center text-lg font-bold rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:border-[#1B7A2B] focus:ring-2 focus:ring-[#1B7A2B]/20"
              />
            ))}
          </div>
          <button type="submit" className={btnCls}>Verify Code →</button>
        </form>
      )}

      {step === 'password' && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="relative group">
            <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type={showPass ? 'text' : 'password'} required
              placeholder="Enter new password (min 6 chars)"
              value={newPassword} onChange={e => setNewPassword(e.target.value)}
              className={inputCls}
            />
            <button type="button" onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <button type="submit" disabled={loading} className={btnCls}>
            {loading ? 'Updating Password...' : 'Save New Password →'}
          </button>
        </form>
      )}
    </div>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const { login, googleLogin, loading, error } = useAuthStore();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [localError, setLocalError] = useState('');
  const [showForgot, setShowForgot] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const executeLogin = async (email, password) => {
    setLocalError('');
    const res = await login(email, password);
    if (res.success) {
      if (res.role === 'shopkeeper') navigate('/shopkeeper/dashboard');
      else if (res.role === 'admin') navigate('/admin');
      else navigate(redirect);
    } else {
      setLocalError(res.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await executeLogin(form.email, form.password);
  };

  const fillAndLogin = (credType) => {
    const cred = DEMO_CREDENTIALS[credType];
    if (cred) {
      setForm({ email: cred.email, password: cred.password });
      executeLogin(cred.email, cred.password);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLocalError('');
      const res = await googleLogin(tokenResponse.access_token);
      if (res.success) navigate(res.role === 'admin' ? '/admin' : redirect);
      else setLocalError(res.error);
    },
    onError: () => {
      setLocalError('Google Login Failed');
    },
  });

  const displayError = localError || error;

  return (
    <div className="min-h-screen w-full font-sans bg-gradient-to-b from-[#FDF8F0] via-white to-[#F5F8F5] flex flex-col items-center justify-center p-4 py-8">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_12px_50px_-12px_rgba(27,122,43,0.15)] border border-[#1B7A2B]/10 p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full"
        >
          {/* Brand Logo & Title */}
          <div className="flex flex-col items-center mb-6">
            <Link to="/" className="mb-2">
              <img
                src={logoImg}
                alt="UP Traders"
                className="h-16 md:h-18 w-auto object-contain hover:scale-105 transition-transform"
              />
            </Link>
            <span className="text-[11px] font-bold text-[#1B7A2B] uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full">
              Sangareddy, Telangana
            </span>
          </div>

          {!showForgot && (
            <div className="text-center mb-5">
              <h2 className="text-2xl font-sans font-black text-gray-900 tracking-tight">Sign In to Your Account</h2>
              <p className="text-xs text-gray-500 mt-0.5">Access wholesale rates, grocery orders & tracking</p>
            </div>
          )}

          {showForgot ? (
            <ForgotPassword onBack={() => setShowForgot(false)} />
          ) : (
            <>
              {/* Quick Demo Credentials Autofill Selector */}
              <div className="mb-5 bg-[#FDF8F0] border border-amber-200/80 rounded-2xl p-3">
                <p className="text-[11px] font-bold text-[#156321] uppercase tracking-wider mb-2 flex items-center gap-1">
                  ⚡ 1-Click Fast Login / Demo Credentials:
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => fillAndLogin('shopkeeper')}
                    className="bg-white hover:bg-emerald-50 border border-emerald-300 hover:border-emerald-500 text-[#156321] py-2 px-1.5 rounded-xl text-[11px] font-bold flex flex-col items-center justify-center transition-all shadow-sm"
                  >
                    <Store className="w-3.5 h-3.5 text-[#1B7A2B] mb-0.5" />
                    <span>Shopkeeper</span>
                    <span className="text-[9px] text-gray-400 font-normal">Wholesale</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fillAndLogin('customer')}
                    className="bg-white hover:bg-amber-50 border border-amber-300 hover:border-amber-500 text-amber-900 py-2 px-1.5 rounded-xl text-[11px] font-bold flex flex-col items-center justify-center transition-all shadow-sm"
                  >
                    <User className="w-3.5 h-3.5 text-amber-600 mb-0.5" />
                    <span>Customer</span>
                    <span className="text-[9px] text-gray-400 font-normal">Retail User</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fillAndLogin('admin')}
                    className="bg-white hover:bg-blue-50 border border-blue-300 hover:border-blue-500 text-blue-900 py-2 px-1.5 rounded-xl text-[11px] font-bold flex flex-col items-center justify-center transition-all shadow-sm"
                  >
                    <Shield className="w-3.5 h-3.5 text-blue-600 mb-0.5" />
                    <span>Admin</span>
                    <span className="text-[9px] text-gray-400 font-normal">Control</span>
                  </button>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#1B7A2B] transition-colors" />
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="e.g. shopkeeper@uptraders.com"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 pl-11 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#1B7A2B] focus:ring-4 focus:ring-[#1B7A2B]/10 hover:border-gray-300 transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-800 block mb-1">Password</label>
                  <div className="relative group">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#1B7A2B] transition-colors" />
                    <input
                      name="password"
                      type={showPass ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange}
                      required
                      placeholder="Your account password"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 pl-11 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#1B7A2B] focus:ring-4 focus:ring-[#1B7A2B]/10 hover:border-gray-300 transition-all shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {displayError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-xs text-red-600 text-center font-medium">
                    {displayError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1B7A2B] hover:bg-[#156321] text-white font-bold py-3.5 rounded-xl text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-60"
                >
                  {loading ? 'Authenticating...' : 'Sign In →'}
                </button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setShowForgot(true)}
                    className="text-xs text-gray-500 hover:text-[#1B7A2B] font-semibold transition-colors"
                  >
                    Forgot Password?
                  </button>
                  <Link to="/signup" className="text-xs font-bold text-[#1B7A2B] hover:underline">
                    New? Create Account
                  </Link>
                </div>
              </form>

              {/* Google OAuth divider */}
              <div className="flex items-center gap-3 w-full my-4">
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="text-gray-400 text-[10px] tracking-wider uppercase font-bold">OR</span>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>

              <button
                type="button"
                onClick={() => loginWithGoogle()}
                className="w-full bg-white border border-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl flex items-center justify-center gap-3 text-xs hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                  </g>
                </svg>
                Continue with Google
              </button>

              {/* Shopkeeper Credentials Helper Footnote */}
              <div className="mt-5 p-3 rounded-xl bg-gray-50 border border-gray-100 text-[11px] text-gray-500">
                <span className="font-bold text-gray-700 block">🏪 Shopkeeper Test Credentials:</span>
                <p>Email: <span className="font-mono text-[#1B7A2B]">shopkeeper@uptraders.com</span></p>
                <p>Password: <span className="font-mono text-[#1B7A2B]">Shopkeeper@123</span></p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
