import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

function fmt(n) {
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const STATUS_COLORS = {
  COMPLETED: 'bg-green-100 text-green-700',
  PENDING: 'bg-amber-100 text-amber-700',
  CANCELLED: 'bg-gray-100 text-gray-600',
  FAILED: 'bg-red-100 text-red-600',
};

export function OrderTable({ orders, loading }) {
  if (loading) {
    return <div className="text-center py-12 text-gray-400 text-sm">Loading orders...</div>;
  }

  if (!orders?.length) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-3">📋</div>
        <div className="text-gray-500 font-medium">No orders yet</div>
        <div className="text-xs text-gray-400 mt-1">Go to Markets to place your first demo order</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Qty</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Price</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-bold text-gray-900 text-sm">{order.symbol}</div>
                  <div className="text-[10px] text-gray-400">{order.orderType} · {order.id}</div>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                    order.type === 'BUY' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                  }`}>
                    {order.type === 'BUY' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {order.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="font-semibold text-gray-800">{order.qty}</span>
                </td>
                <td className="px-4 py-3 text-right hidden md:table-cell">
                  <span className="text-gray-700">₹{fmt(order.price)}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="font-bold text-gray-900">₹{fmt(order.total)}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${STATUS_COLORS[order.status] || STATUS_COLORS.PENDING}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right hidden lg:table-cell">
                  <div className="text-xs text-gray-500">{order.date}</div>
                  <div className="text-[10px] text-gray-400">{order.time}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
