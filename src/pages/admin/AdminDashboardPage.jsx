import React, { useEffect, useState } from "react";
import { ShoppingBag, Users, TrendingUp, MessageCircle, Package, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
const WA_NUMBER = "918886000847";

const INITIAL_DEMO_ORDERS = [
  { id: "1082", address: { name: "Sri Sai Kirana Mart (Praveen)", phone: "8886000847" }, total: 29220, status: "delivered", items: [{ name: "Sona Masoori 25kg", qty: 10 }, { name: "Sunflower Oil 15L", qty: 4 }] },
  { id: "1079", address: { name: "Rajesh Kumar (Malkapur X Road)", phone: "9848011223" }, total: 1840, status: "paid", items: [{ name: "Basmati Rice 5kg", qty: 1 }, { name: "Desi Ghee 1L", qty: 1 }] },
  { id: "1075", address: { name: "Lakshmi Kirana & General Store", phone: "9440123456" }, total: 14500, status: "processing", items: [{ name: "Sugar 50kg Bag", qty: 3 }, { name: "Toor Dal 30kg", qty: 1 }] },
  { id: "1071", address: { name: "Venkatesh Rao", phone: "9988776655" }, total: 950, status: "shipped", items: [{ name: "Refined Sunflower Oil 1L", qty: 3 }, { name: "Wheat Atta 5kg", qty: 1 }] }
];

export function AdminDashboardPage() {
  const [orders, setOrders] = useState(INITIAL_DEMO_ORDERS);
  const [usersCount, setUsersCount] = useState(148);
  const [productsCount, setProductsCount] = useState(42);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const h = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch(`${BACKEND_URL}/admin/orders`, { headers: h }).then((r) => r.json()).catch(() => null),
      fetch(`${BACKEND_URL}/admin/users`, { headers: h }).then((r) => r.json()).catch(() => null),
      fetch(`${BACKEND_URL}/admin/products`, { headers: h }).then((r) => r.json()).catch(() => null),
    ]).then(([od, ud, pd]) => {
      if (od && od.orders && od.orders.length > 0) setOrders(od.orders);
      if (ud && ud.users) setUsersCount(ud.users.length);
      if (pd && pd.products) setProductsCount(pd.products.length);
    }).catch(() => {});
  }, []);

  const revenue = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + Number(o.total || 0), 0);
  const pending = orders.filter((o) => o.status === "paid" || o.status === "processing" || o.status === "pending").length;

  const stats = [
    { label: "Total Orders", value: orders.length, icon: <ShoppingBag className="w-5 h-5" />, color: "bg-emerald-50 text-[#1B7A2B]" },
    { label: "Total Revenue", value: `₹${revenue.toLocaleString('en-IN')}`, icon: <TrendingUp className="w-5 h-5" />, color: "bg-amber-50 text-amber-600" },
    { label: "Active Customers", value: usersCount, icon: <Users className="w-5 h-5" />, color: "bg-blue-50 text-blue-600" },
    { label: "Pending Processing", value: pending, icon: <Clock className="w-5 h-5" />, color: "bg-orange-50 text-orange-600" },
    { label: "Active Products", value: productsCount, icon: <Package className="w-5 h-5" />, color: "bg-purple-50 text-purple-600" },
  ];

  const notifyWhatsApp = (order) => {
    const phone = order.address?.phone || order.address?.mobile || WA_NUMBER;
    const items = (order.items || []).map((i) => `${i.qty}x ${i.name}`).join(", ");
    const msg = encodeURIComponent(`Hi ${order.address?.name || "Customer"}! 🙏 Greetings from UP Traders Sangareddy. Your grocery order #UPT-${order.id} (${items}) is confirmed and being prepared for delivery. Contact: 8886000847.`);
    window.open(`https://wa.me/${phone.replace(/\D/g, "")}?text=${msg}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">UP Traders Admin Dashboard</h1>
            <span className="bg-emerald-100 text-[#1B7A2B] text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wide">
              Store Control
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Store management, orders dispatch, commodities inventory & customer support • Sangareddy, Telangana
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4" /> Store WhatsApp Support
          </a>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-gray-200/90 p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">{s.label}</span>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${s.color}`}>
                {s.icon}
              </div>
            </div>
            <p className="text-xl sm:text-2xl font-black text-gray-900 mt-3">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">Recent Customer & B2B Orders</h2>
          <span className="text-xs text-gray-400 font-semibold">{orders.length} orders recorded</span>
        </div>

        <div className="overflow-x-auto -mx-5 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-5 sm:px-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-400 uppercase tracking-wider font-semibold border-b border-gray-100">
                  <th className="text-left py-3 pr-4">Order ID</th>
                  <th className="text-left py-3 pr-4">Customer / Kirana Partner</th>
                  <th className="text-left py-3 pr-4">Amount</th>
                  <th className="text-left py-3 pr-4">Status</th>
                  <th className="text-right py-3">Quick Notify</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 pr-4 font-bold text-gray-900">UPT-{order.id}</td>
                    <td className="py-3 pr-4 text-gray-700 font-semibold">{order.address?.name || "Customer"}</td>
                    <td className="py-3 pr-4 font-black text-[#1B7A2B]">₹{order.total?.toLocaleString('en-IN')}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        order.status === "delivered" ? "bg-emerald-100 text-emerald-800" :
                        order.status === "paid" ? "bg-blue-100 text-blue-800" :
                        order.status === "shipped" ? "bg-purple-100 text-purple-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => notifyWhatsApp(order)}
                        className="inline-flex items-center gap-1.5 text-xs bg-[#25D366] hover:bg-[#20bd5a] text-white px-3 py-1 rounded-lg font-bold transition-all shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Dispatch
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
