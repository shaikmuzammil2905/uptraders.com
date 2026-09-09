import React, { useEffect, useState } from 'react';
import { RefreshCw, Filter } from 'lucide-react';
import { OrderTable } from '../../components/trading/OrderTable';
import { useTradingStore } from '../../store/useTradingStore';

export function OrdersPage() {
  const { orders, ordersLoading, loadOrders } = useTradingStore();
  const [filter, setFilter] = useState('ALL'); // ALL | BUY | SELL

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = filter === 'ALL' ? orders : orders.filter((o) => o.type === filter);

  const stats = {
    total: orders.length,
    buy: orders.filter((o) => o.type === 'BUY').length,
    sell: orders.filter((o) => o.type === 'SELL').length,
    completed: orders.filter((o) => o.status === 'COMPLETED').length,
  };

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Orders</h2>
          <p className="text-sm text-gray-400 mt-0.5">{orders.length} total orders</p>
        </div>
        <button
          onClick={loadOrders}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Orders', value: stats.total, color: 'text-gray-800' },
          { label: 'Buy Orders', value: stats.buy, color: 'text-green-600' },
          { label: 'Sell Orders', value: stats.sell, color: 'text-red-500' },
          { label: 'Completed', value: stats.completed, color: 'text-blue-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-4">
        {['ALL', 'BUY', 'SELL'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === f
                ? f === 'BUY' ? 'bg-green-500 text-white' : f === 'SELL' ? 'bg-red-500 text-white' : 'bg-[#0A0F1E] text-white'
                : 'text-gray-500 bg-white border border-gray-200 hover:border-gray-300'
            }`}
          >
            {f}
          </button>
        ))}
        <span className="text-xs text-gray-400 ml-auto">{filteredOrders.length} orders</span>
      </div>

      <OrderTable orders={filteredOrders} loading={ordersLoading} />
    </div>
  );
}
