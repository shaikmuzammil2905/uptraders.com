import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Wallet, TrendingUp, TrendingDown, BarChart3, ArrowUpRight, ArrowDownRight,
  Star, Briefcase, ClipboardList, RefreshCw
} from 'lucide-react';
import { useTradingAuthStore } from '../../store/useTradingAuthStore';
import { useTradingStore } from '../../store/useTradingStore';

function fmt(n) {
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function StatCard({ icon: Icon, label, value, sub, isPositive, color = 'blue' }) {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-emerald-500',
    red: 'from-red-500 to-rose-500',
    purple: 'from-purple-500 to-violet-500',
    orange: 'from-orange-400 to-amber-500',
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-5 relative overflow-hidden group">
      {/* Background gradient accent */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${colors[color]} opacity-5 rounded-full -translate-y-6 translate-x-6 group-hover:opacity-10 transition-opacity`} />

      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center shadow-md`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {sub !== undefined && (
          <div className={`flex items-center gap-0.5 text-xs font-semibold ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
            {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            {sub}
          </div>
        )}
      </div>

      <div className="text-2xl font-bold text-gray-900 mb-0.5">{value}</div>
      <div className="text-xs text-gray-500 font-medium">{label}</div>
    </div>
  );
}

export function TradingDashboardPage() {
  const user = useTradingAuthStore((s) => s.user);
  const { stocks, portfolio, balance, orders, watchlist, loadStocks, loadPortfolio, loadOrders, loadWatchlist } = useTradingStore();

  useEffect(() => {
    loadStocks();
    loadPortfolio();
    loadOrders();
    loadWatchlist();
  }, []);

  const portfolioValue = portfolio.reduce((sum, h) => sum + h.currentValue, 0);
  const totalInvested = portfolio.reduce((sum, h) => sum + h.invested, 0);
  const totalPnL = portfolio.reduce((sum, h) => sum + h.pnl, 0);
  const totalPnLPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

  // Top gainers/losers from stocks
  const sorted = [...stocks].sort((a, b) => b.changePercent - a.changePercent);
  const gainers = sorted.slice(0, 3);
  const losers = sorted.slice(-3).reverse();

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <p className="text-sm text-gray-500 mb-0.5">Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'} 👋</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Welcome back, {user?.name || 'Demo Trader'}</h2>
          <p className="text-sm text-gray-400 mt-0.5">Account: {user?.accountId} · <span className="text-amber-500 font-semibold">Demo Mode</span></p>
        </div>
        <button onClick={() => { loadStocks(); loadPortfolio(); loadOrders(); }} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm transition-colors">
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <StatCard
          icon={Wallet}
          label="Available Balance"
          value={`₹${balance.toLocaleString('en-IN')}`}
          color="blue"
        />
        <StatCard
          icon={Briefcase}
          label="Portfolio Value"
          value={`₹${fmt(portfolioValue)}`}
          sub={`${totalPnLPercent >= 0 ? '+' : ''}${totalPnLPercent.toFixed(2)}%`}
          isPositive={totalPnLPercent >= 0}
          color="purple"
        />
        <StatCard
          icon={totalPnL >= 0 ? TrendingUp : TrendingDown}
          label="Total P&L"
          value={`${totalPnL >= 0 ? '+' : ''}₹${fmt(Math.abs(totalPnL))}`}
          isPositive={totalPnL >= 0}
          sub={`${totalPnL >= 0 ? '+' : ''}${totalPnLPercent.toFixed(2)}%`}
          color={totalPnL >= 0 ? 'green' : 'red'}
        />
        <StatCard
          icon={BarChart3}
          label="Total Invested"
          value={`₹${fmt(totalInvested)}`}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
        {/* Top Gainers */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">🚀 Top Gainers</h3>
            <Link to="/trade/markets" className="text-xs text-[#D61A3C] font-semibold hover:underline">View all</Link>
          </div>
          <div className="space-y-2.5">
            {gainers.map((s) => (
              <div key={s.symbol} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A0F1E] to-[#1a2744] flex items-center justify-center text-sm">
                    {s.logo}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{s.symbol}</div>
                    <div className="text-[10px] text-gray-400">₹{fmt(s.price)}</div>
                  </div>
                </div>
                <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                  +{s.changePercent.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">📉 Top Losers</h3>
            <Link to="/trade/markets" className="text-xs text-[#D61A3C] font-semibold hover:underline">View all</Link>
          </div>
          <div className="space-y-2.5">
            {losers.map((s) => (
              <div key={s.symbol} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A0F1E] to-[#1a2744] flex items-center justify-center text-sm">
                    {s.logo}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{s.symbol}</div>
                    <div className="text-[10px] text-gray-400">₹{fmt(s.price)}</div>
                  </div>
                </div>
                <div className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg">
                  {s.changePercent.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">💼 Holdings</h3>
            <Link to="/trade/portfolio" className="text-xs text-[#D61A3C] font-semibold hover:underline">View all</Link>
          </div>
          {portfolio.length === 0 ? (
            <div className="text-center py-6 text-gray-400 text-sm">
              <div className="text-3xl mb-2">📊</div>
              No holdings yet
            </div>
          ) : (
            <div className="space-y-2.5">
              {portfolio.slice(0, 3).map((h) => (
                <div key={h.symbol} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                  <div>
                    <div className="text-sm font-bold text-gray-900">{h.symbol}</div>
                    <div className="text-[10px] text-gray-400">{h.qty} shares</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">₹{fmt(h.currentValue)}</div>
                    <div className={`text-[10px] font-semibold ${h.pnl >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {h.pnl >= 0 ? '+' : ''}₹{fmt(Math.abs(h.pnl))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">📋 Recent Orders</h3>
          <Link to="/trade/orders" className="text-xs text-[#D61A3C] font-semibold hover:underline">View all</Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="text-center py-6 text-gray-400 text-sm">No orders yet</div>
        ) : (
          <div className="space-y-2">
            {recentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${o.type === 'BUY' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                    {o.type}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-gray-800">{o.symbol}</div>
                    <div className="text-[10px] text-gray-400">{o.qty} shares · {o.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">₹{fmt(o.total)}</div>
                  <span className={`text-[10px] font-bold ${o.status === 'COMPLETED' ? 'text-green-600' : o.status === 'CANCELLED' ? 'text-gray-400' : 'text-amber-600'}`}>
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { to: '/trade/markets', icon: '📈', label: 'Markets', sub: `${stocks.length} stocks` },
          { to: '/trade/watchlist', icon: '⭐', label: 'Watchlist', sub: `${watchlist.length} stocks` },
          { to: '/trade/portfolio', icon: '💼', label: 'Portfolio', sub: `${portfolio.length} holdings` },
          { to: '/trade/orders', icon: '📋', label: 'Orders', sub: `${orders.length} orders` },
        ].map((q) => (
          <Link key={q.to} to={q.to}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 flex flex-col items-center gap-1.5 text-center group"
          >
            <div className="text-2xl group-hover:scale-110 transition-transform">{q.icon}</div>
            <div className="font-bold text-gray-800 text-sm">{q.label}</div>
            <div className="text-[10px] text-gray-400">{q.sub}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
