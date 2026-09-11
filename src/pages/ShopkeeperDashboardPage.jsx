import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Store, Package, ShoppingCart, TrendingUp, Download, Phone, 
  CheckCircle2, Clock, AlertCircle, RefreshCw, Search, Filter, 
  MapPin, FileText, ChevronRight, Sparkles, Truck, ShieldCheck,
  Building2, Hash, ArrowUpRight, MessageCircle
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { demoShopkeeperOrders } from '../data/demoUser';
import logoImg from '../assets/up-traders-logo.png';

const WHOLESALE_CATEGORIES = [
  { id: 'all', name: 'All Commodities' },
  { id: 'rice', name: 'Rice & Grains' },
  { id: 'oil', name: 'Edible Oils & Ghee' },
  { id: 'pulses', name: 'Dals & Pulses' },
  { id: 'spices', name: 'Spices & Masalas' },
  { id: 'sugar', name: 'Sugar & Jaggery' },
];

const WHOLESALE_RATE_CARD = [
  {
    id: 'ws-1',
    category: 'rice',
    name: 'HMT Kolam Premium Raw Rice (25kg Bag)',
    brand: 'UP Traders Select',
    mrp: 1650,
    wholesalePrice: 1390,
    margin: '15.7%',
    minOrderQty: '2 Bags (50kg)',
    stock: 'In Stock (450 Bags)',
    gst: '0% (Exempt)',
    badge: 'Fast Moving'
  },
  {
    id: 'ws-2',
    category: 'rice',
    name: 'Sona Masoori Old Crop Rice (25kg Bag)',
    brand: 'Godavari Super',
    mrp: 1550,
    wholesalePrice: 1280,
    margin: '17.4%',
    minOrderQty: '4 Bags (100kg)',
    stock: 'In Stock (620 Bags)',
    gst: '0% (Exempt)',
    badge: 'Best Seller'
  },
  {
    id: 'ws-3',
    category: 'oil',
    name: 'Freedom Refined Sunflower Oil (15kg Tin)',
    brand: 'Freedom',
    mrp: 2150,
    wholesalePrice: 1840,
    margin: '14.4%',
    minOrderQty: '2 Tins (30kg)',
    stock: 'In Stock (180 Tins)',
    gst: '5%',
    badge: 'High Demand'
  },
  {
    id: 'ws-4',
    category: 'oil',
    name: 'Pure Desi Cow Ghee (15kg Bulk Jar)',
    brand: 'UP Traders Fresh Dairy',
    mrp: 10500,
    wholesalePrice: 8750,
    margin: '16.6%',
    minOrderQty: '1 Jar (15kg)',
    stock: 'In Stock (45 Jars)',
    gst: '12%',
    badge: 'Premium'
  },
  {
    id: 'ws-5',
    category: 'pulses',
    name: 'Premium Toor Dal Fatka Grade-A (30kg Sack)',
    brand: 'Desi Gold',
    mrp: 4950,
    wholesalePrice: 4150,
    margin: '16.1%',
    minOrderQty: '1 Sack (30kg)',
    stock: 'In Stock (210 Sacks)',
    gst: '0% (Exempt)',
    badge: 'Staple'
  },
  {
    id: 'ws-6',
    category: 'sugar',
    name: 'M-30 Refined Crystal Sugar (50kg Bag)',
    brand: 'Uttam Sugar',
    mrp: 2350,
    wholesalePrice: 1980,
    margin: '15.7%',
    minOrderQty: '2 Bags (100kg)',
    stock: 'In Stock (320 Bags)',
    gst: '5%',
    badge: 'High Volume'
  },
  {
    id: 'ws-7',
    category: 'spices',
    name: 'Guntur Sannam Red Chilli Powder (10kg Sack)',
    brand: 'Sangareddy Spice Mills',
    mrp: 3200,
    wholesalePrice: 2650,
    margin: '17.1%',
    minOrderQty: '1 Sack (10kg)',
    stock: 'In Stock (90 Sacks)',
    gst: '5%',
    badge: 'Direct Farm'
  },
  {
    id: 'ws-8',
    category: 'spices',
    name: 'Salem Turmeric Powder High Curcumin (10kg Sack)',
    brand: 'UP Pure Spices',
    mrp: 2400,
    wholesalePrice: 1950,
    margin: '18.7%',
    minOrderQty: '1 Sack (10kg)',
    stock: 'In Stock (75 Sacks)',
    gst: '5%',
    badge: 'Special Margin'
  }
];

export function ShopkeeperDashboardPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'rateCard' | 'quickOrder' | 'profile'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchRate, setSearchRate] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [quickItems, setQuickItems] = useState([
    { item: 'HMT Kolam Rice 25kg Bag', qty: 2 },
    { item: 'Freedom Sunflower Oil 15kg Tin', qty: 2 }
  ]);
  const [orderSent, setOrderSent] = useState(false);

  const shopkeeperUser = user || {
    name: 'Praveen Kumar (Sri Sai Kirana Mart)',
    email: 'shopkeeper@uptraders.com',
    phone: '+91 98480 22334',
    businessName: 'Sri Sai Kirana & General Stores',
    gstin: '36AABCS1429B1Z8',
    location: 'Shop #4, Market Yard Road, Sangareddy - 502001'
  };

  const filteredRates = WHOLESALE_RATE_CARD.filter(item => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch = item.name.toLowerCase().includes(searchRate.toLowerCase()) ||
                        item.brand.toLowerCase().includes(searchRate.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleWhatsAppInquiry = (orderNumber, orderTotal) => {
    const msg = `Hello UP Traders Sangareddy! I am Praveen from Sri Sai Kirana Mart. Regarding my B2B Wholesale Order #${orderNumber} (Rs. ${orderTotal?.toLocaleString('en-IN')}), please provide latest dispatch update.`;
    window.open(`https://wa.me/918886000847?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleWhatsAppQuickOrder = (e) => {
    e.preventDefault();
    const itemList = quickItems.map(i => `• ${i.item} x ${i.qty}`).join('\n');
    const msg = `*NEW B2B WHOLESALE ORDER REQUEST*\n*Store Partner:* ${shopkeeperUser.businessName || 'Sri Sai Kirana Mart'}\n*Contact:* ${shopkeeperUser.phone || '9848022334'}\n*Location:* Sangareddy Market Yard\n\n*Requested Commodities:*\n${itemList}\n\nPlease confirm wholesale stock availability and dispatch time.`;
    window.open(`https://wa.me/918886000847?text=${encodeURIComponent(msg)}`, '_blank');
    setOrderSent(true);
    setTimeout(() => setOrderSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF8F0] via-white to-[#F7F9F6] text-gray-800 font-sans pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#156321] via-[#1B7A2B] to-[#156321] text-white pt-8 pb-16 px-4 md:px-8 border-b-4 border-[#FFC107] shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md p-2 flex items-center justify-center border border-white/20 shadow-inner">
              <Store className="w-9 h-9 text-[#FFC107]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#FFC107] text-[#156321] text-xs font-black uppercase px-2.5 py-0.5 rounded-full tracking-wide">
                  Verified B2B Partner
                </span>
                <span className="text-xs text-white/80 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Tier 1 Gold Margin
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black mt-1 tracking-tight">
                {shopkeeperUser.businessName || 'Sri Sai Kirana & General Stores'}
              </h1>
              <p className="text-xs md:text-sm text-white/80 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#FFC107]" />
                {shopkeeperUser.location || 'Sangareddy, Telangana'} • Partner ID: <span className="font-mono text-[#FFC107]">UP-B2B-50201</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-xl text-right">
              <p className="text-[11px] text-white/70 font-semibold uppercase tracking-wider">Direct Wholesale Hub</p>
              <p className="text-base font-black text-[#FFC107] flex items-center justify-end gap-1">
                <Phone className="w-3.5 h-3.5" /> 8886000847
              </p>
            </div>
            <a
              href="https://wa.me/918886000847?text=Hello%20UP%20Traders%20Wholesale%20Team%2C%20I%20need%20assistance%20with%20my%20store%20inventory."
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-4 py-2.5 rounded-xl text-xs md:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Manager
            </a>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-8">
        {/* KPI Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total B2B Purchases</span>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-gray-900 mt-2">₹1,32,950</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">Saved ₹24,800 vs Retail MRP</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Completed Orders</span>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-gray-900 mt-2">{demoShopkeeperOrders.length} Orders</p>
            <p className="text-[11px] text-blue-600 font-semibold mt-1">100% on-time truck dispatch</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Wholesale Margin</span>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-gray-900 mt-2">15.5% - 18.5%</p>
            <p className="text-[11px] text-amber-600 font-semibold mt-1">Direct Sangareddy Mandi rate</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Credit & Delivery</span>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-gray-900 mt-2">Next Day</p>
            <p className="text-[11px] text-purple-600 font-semibold mt-1">Free delivery in Sangareddy town</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-200/80 flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'orders'
                ? 'bg-[#1B7A2B] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <Package className="w-4 h-4" /> Past B2B Orders ({demoShopkeeperOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('rateCard')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'rateCard'
                ? 'bg-[#1B7A2B] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Live Wholesale Rate Card
          </button>
          <button
            onClick={() => setActiveTab('quickOrder')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'quickOrder'
                ? 'bg-[#1B7A2B] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <ShoppingCart className="w-4 h-4" /> Quick Bulk Dispatch Request
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'profile'
                ? 'bg-[#1B7A2B] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <Building2 className="w-4 h-4" /> Kirana Profile & GSTIN
          </button>
        </div>

        {/* TAB 1: PAST ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Wholesale Purchase History</h2>
                <p className="text-xs text-gray-500">Track and reorder high-demand FMCG & staple supplies directly</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Need tax invoices? Contact billing at 8886000847</span>
              </div>
            </div>

            <div className="space-y-4">
              {demoShopkeeperOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-200/90 hover:border-[#1B7A2B]/40 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#1B7A2B]/10 text-[#1B7A2B] font-black flex items-center justify-center text-sm">
                        B2B
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-black text-gray-900 text-base">{order.orderNumber}</h3>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> {order.status}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">
                            {order.paymentMethod}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                          <span>Ordered: {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          <span>•</span>
                          <span>Delivered: {new Date(order.deliveredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-auto">
                      <div className="text-right">
                        <span className="text-xs text-gray-400 font-medium">B2B Invoice Total</span>
                        <p className="text-xl font-black text-[#1B7A2B]">₹{order.totalAmount.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items Table */}
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-gray-400 uppercase font-semibold border-b border-gray-100">
                          <th className="pb-2">Commodity Item</th>
                          <th className="pb-2 text-center">Packaging</th>
                          <th className="pb-2 text-center">B2B Rate</th>
                          <th className="pb-2 text-center">Qty</th>
                          <th className="pb-2 text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {order.items.map((it, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/80">
                            <td className="py-2.5 font-bold text-gray-800">{it.name}</td>
                            <td className="py-2.5 text-center text-gray-500">{it.unit}</td>
                            <td className="py-2.5 text-center text-gray-700 font-semibold">₹{it.price.toLocaleString('en-IN')}</td>
                            <td className="py-2.5 text-center">
                              <span className="bg-gray-100 font-black px-2 py-0.5 rounded text-gray-900">{it.quantity}</span>
                            </td>
                            <td className="py-2.5 text-right font-black text-gray-900">
                              ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-gray-500 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#1B7A2B]" />
                      Delivered to: <span className="font-semibold text-gray-700">{order.shippingAddress}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleWhatsAppInquiry(order.orderNumber, order.totalAmount)}
                        className="px-3.5 py-1.5 rounded-lg border border-emerald-500 text-emerald-700 font-bold text-xs hover:bg-emerald-50 transition-colors flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Re-Order via WhatsApp
                      </button>
                      <button
                        onClick={() => alert(`B2B GST Tax Invoice for #${order.orderNumber} is generated for ${shopkeeperUser.businessName}. Download PDF is ready.`)}
                        className="px-3.5 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200 transition-colors flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" /> Invoice PDF
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: LIVE WHOLESALE RATE CARD */}
        {activeTab === 'rateCard' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Live Wholesale Mandi Rate Card</h2>
                <p className="text-xs text-gray-500">Guaranteed lowest B2B wholesale prices in Sangareddy district</p>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Rice, Oil, Pulses..."
                  value={searchRate}
                  onChange={(e) => setSearchRate(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl pl-9 pr-4 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#1B7A2B] focus:ring-1 focus:ring-[#1B7A2B]"
                />
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {WHOLESALE_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#1B7A2B] text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Rates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRates.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:border-[#FFC107] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">{item.brand}</span>
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 text-sm leading-snug">{item.name}</h3>

                    <div className="mt-3 bg-gray-50 p-3 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block line-through">MRP: ₹{item.mrp}</span>
                        <span className="text-lg font-black text-[#1B7A2B]">₹{item.wholesalePrice}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          Margin: {item.margin}
                        </span>
                        <span className="text-[10px] text-gray-500 block mt-0.5">GST: {item.gst}</span>
                      </div>
                    </div>

                    <div className="mt-3 space-y-1 text-xs text-gray-500">
                      <div className="flex justify-between">
                        <span>Min Order:</span>
                        <span className="font-semibold text-gray-800">{item.minOrderQty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Stock:</span>
                        <span className="font-semibold text-emerald-600">{item.stock}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/918886000847?text=Hello%20UP%20Traders%2C%20I%20want%20to%20order%20bulk%20stock%20of%20${encodeURIComponent(item.name)}%20at%20Wholesale%20Price%20Rs.${item.wholesalePrice}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 w-full bg-[#1B7A2B] hover:bg-[#156321] text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" /> Book Wholesale Stock
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: QUICK BULK ORDER FORM */}
        {activeTab === 'quickOrder' && (
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-emerald-100 text-[#1B7A2B] rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Truck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Direct Store Stock Dispatch Request</h2>
              <p className="text-xs text-gray-500">Fill your required bags/tins and our Sangareddy delivery truck will dispatch next morning</p>
            </div>

            {orderSent && (
              <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-bold text-center">
                ✓ Order draft sent to WhatsApp! Our B2B representative is reviewing your list.
              </div>
            )}

            <form onSubmit={handleWhatsAppQuickOrder} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Kirana Store Partner</label>
                <input
                  type="text"
                  disabled
                  value={`${shopkeeperUser.businessName} (${shopkeeperUser.location})`}
                  className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-600 font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Select Commodities & Quantities</label>
                <div className="space-y-2">
                  {quickItems.map((itemObj, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <select
                        value={itemObj.item}
                        onChange={(e) => {
                          const updated = [...quickItems];
                          updated[index].item = e.target.value;
                          setQuickItems(updated);
                        }}
                        className="flex-1 bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#1B7A2B]"
                      >
                        {WHOLESALE_RATE_CARD.map(r => (
                          <option key={r.id} value={r.name}>{r.name} (₹{r.wholesalePrice})</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        min="1"
                        value={itemObj.qty}
                        onChange={(e) => {
                          const updated = [...quickItems];
                          updated[index].qty = parseInt(e.target.value) || 1;
                          setQuickItems(updated);
                        }}
                        className="w-20 bg-white border border-gray-300 rounded-xl px-2 py-2 text-xs text-center font-bold text-gray-800"
                        placeholder="Qty"
                      />
                      {quickItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setQuickItems(quickItems.filter((_, i) => i !== index))}
                          className="text-red-500 hover:text-red-700 text-xs font-bold px-2 py-1"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setQuickItems([...quickItems, { item: WHOLESALE_RATE_CARD[0].name, qty: 1 }])}
                  className="mt-2 text-xs font-bold text-[#1B7A2B] hover:underline flex items-center gap-1"
                >
                  + Add Another Commodity
                </button>
              </div>

              <div className="bg-[#FDF8F0] p-4 rounded-xl border border-amber-200/60 text-xs text-gray-700 space-y-1">
                <p className="font-bold text-[#156321]">📦 UP Traders Wholesale Guarantee:</p>
                <p>• Same day or next morning direct store delivery in Sangareddy.</p>
                <p>• Clean GST B2B Invoice provided with every truckload.</p>
                <p>• Instant replacement if bag/tin seal is damaged.</p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1B7A2B] hover:bg-[#156321] text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" /> Send Wholesale Order to WhatsApp Dispatch
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: KIRANA STORE PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
              <div className="w-14 h-14 bg-emerald-100 text-[#1B7A2B] rounded-2xl flex items-center justify-center font-black text-xl">
                🏪
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{shopkeeperUser.businessName}</h2>
                <p className="text-xs text-gray-500">Registered Kirana Partner with UP Traders Wholesale Sangareddy</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-50 p-4 rounded-xl">
                <span className="text-gray-400 font-semibold block mb-1">Partner Contact Name</span>
                <span className="font-bold text-gray-900 text-sm">{shopkeeperUser.name}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <span className="text-gray-400 font-semibold block mb-1">Phone / WhatsApp</span>
                <span className="font-bold text-gray-900 text-sm">{shopkeeperUser.phone}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <span className="text-gray-400 font-semibold block mb-1">Email ID</span>
                <span className="font-bold text-gray-900 text-sm">{shopkeeperUser.email}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <span className="text-gray-400 font-semibold block mb-1">GSTIN Number</span>
                <span className="font-bold text-[#1B7A2B] font-mono text-sm">{shopkeeperUser.gstin}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl md:col-span-2">
                <span className="text-gray-400 font-semibold block mb-1">Delivery Destination / Warehouse Address</span>
                <span className="font-bold text-gray-900 text-sm">{shopkeeperUser.location}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
              <span className="text-xs text-gray-500">To update shopkeeper details or GSTIN certificate:</span>
              <a
                href="https://wa.me/918886000847?text=Hello%2C%20I%20need%20to%20update%20my%20Kirana%20partner%20profile%20details."
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[#1B7A2B] hover:underline"
              >
                Contact Helpdesk →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
