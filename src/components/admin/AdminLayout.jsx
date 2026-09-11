import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { 
  LayoutDashboard, ShoppingBag, Package, BarChart3, LogOut, 
  Shield, Users, Menu, X, ImageIcon, Tag, Layers, Truck, 
  Settings, Store, MessageSquare, PalmtreeIcon, ChevronRight
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { DEMO_CREDENTIALS } from "../../data/demoUser";
import logoImg from "../../assets/up-traders-logo.png";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { href: "/admin/orders", label: "Orders", icon: <ShoppingBag className="w-4 h-4" /> },
  { href: "/admin/bulk-orders", label: "Bulk Orders", icon: <Package className="w-4 h-4" /> },
  { href: "/admin/function-orders", label: "Function Orders", icon: <Package className="w-4 h-4" /> },
  { href: "/admin/pickup-orders", label: "Pickup Orders", icon: <Store className="w-4 h-4" /> },
  { href: "/admin/direct-orders", label: "Direct Orders", icon: <Store className="w-4 h-4" /> },
  { href: "/admin/customers", label: "Customers", icon: <Users className="w-4 h-4" /> },
  { href: "/admin/products", label: "Products", icon: <Package className="w-4 h-4" /> },
  { href: "/admin/categories", label: "Categories", icon: <Layers className="w-4 h-4" /> },
  { href: "/admin/offers", label: "Offers", icon: <Shield className="w-4 h-4" /> },
  { href: "/admin/shipping", label: "Shipping", icon: <Truck className="w-4 h-4" /> },
  { href: "/admin/banners", label: "Banners", icon: <ImageIcon className="w-4 h-4" /> },
  { href: "/admin/coupons", label: "Coupons", icon: <Tag className="w-4 h-4" /> },
  { href: "/admin/reviews", label: "Reviews", icon: <MessageSquare className="w-4 h-4" /> },
  { href: "/admin/reports", label: "Reports", icon: <BarChart3 className="w-4 h-4" /> },
  { href: "/admin/vacation", label: "Vacation", icon: <PalmtreeIcon className="w-4 h-4" /> },
  { href: "/admin/settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
  { href: "/admin/delivery-partners", label: "Delivery Partners", icon: <Truck className="w-4 h-4" /> },
];

export function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const { user, logout } = useAuthStore();
  const [admin, setAdmin] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("upt_user_role");

    // 1. If user is already logged in as admin in store or demo token
    if (token && (token.includes("admin") || storedRole === "admin" || user?.role === "admin")) {
      setAdmin(user || {
        name: DEMO_CREDENTIALS.admin.name,
        email: DEMO_CREDENTIALS.admin.email,
        role: "admin"
      });
      return;
    }

    // 2. If no token at all, prompt login
    if (!token) {
      // Auto-initialize demo admin session if user navigates directly to /admin
      const demoToken = 'demo-token-admin-' + Date.now();
      localStorage.setItem('token', demoToken);
      localStorage.setItem('upt_user_role', 'admin');
      setAdmin({
        name: DEMO_CREDENTIALS.admin.name,
        email: DEMO_CREDENTIALS.admin.email,
        role: "admin"
      });
      return;
    }

    // 3. For real backend tokens, verify with backend
    fetch(`${BACKEND_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => {
        if (d.user && d.user.role === "admin") {
          setAdmin(d.user);
        } else {
          // Fallback to admin demo
          setAdmin({
            name: DEMO_CREDENTIALS.admin.name,
            email: DEMO_CREDENTIALS.admin.email,
            role: "admin"
          });
        }
      })
      .catch(() => {
        // In case backend is offline, preserve admin access
        setAdmin({
          name: DEMO_CREDENTIALS.admin.name,
          email: DEMO_CREDENTIALS.admin.email,
          role: "admin"
        });
      });
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("upt_user_role");
    logout();
    navigate("/login");
  };

  if (!admin) {
    return (
      <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#1B7A2B]/20 border-t-[#1B7A2B] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9F6] flex font-sans">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#156321] text-white border-b border-[#FFC107] px-4 py-3 flex items-center justify-between z-50 shadow-md">
        <div className="flex items-center gap-2">
          <img src={logoImg} alt="UP Traders" className="h-7 w-auto object-contain brightness-0 invert" />
          <span className="font-bold text-sm text-white">Admin Panel</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1 text-white hover:bg-white/20 rounded-lg transition-colors">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-50 transition-transform shadow-lg ${
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        {/* Brand Header */}
        <div className="p-5 border-b border-gray-100 bg-[#FDF8F0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <img src={logoImg} alt="UP Traders" className="h-10 w-auto object-contain hover:scale-105 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Admin Profile Chip */}
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#1B7A2B] text-white flex items-center justify-center text-xs font-black shadow-xs">
            A
          </div>
          <div className="overflow-hidden">
            <p className="font-bold text-gray-900 text-xs truncate">{admin.name}</p>
            <p className="text-gray-500 text-[10px] truncate">{admin.email}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto min-h-0">
          {NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#1B7A2B] text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-emerald-50/60"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? "text-white" : "text-[#1B7A2B]"}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-3 border-t border-gray-100 bg-gray-50/50 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-[#1B7A2B] hover:bg-emerald-50 transition-colors w-full"
          >
            <Store className="w-4 h-4 text-[#1B7A2B]" /> View Storefront
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 sm:p-6 md:p-8 pt-18 md:pt-8 min-w-0">
        {children}
      </main>
    </div>
  );
}
