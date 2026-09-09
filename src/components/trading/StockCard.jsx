import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Plus, Minus, Eye } from 'lucide-react';

function fmt(n) {
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function StockCard({ stock, onBuy, onSell, onView, inWatchlist, onWatchlistToggle }) {
  const isPositive = stock.change >= 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-4 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0A0F1E] to-[#1a2744] flex items-center justify-center text-lg flex-shrink-0">
            {stock.logo}
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm leading-tight">{stock.symbol}</div>
            <div className="text-[10px] text-gray-400 leading-tight truncate max-w-[120px]">{stock.sector}</div>
          </div>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
          isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
        }`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
        </div>
      </div>

      {/* Price */}
      <div className="mb-3">
        <div className="text-xl font-bold text-gray-900">₹{fmt(stock.price)}</div>
        <div className={`text-xs font-semibold ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
          {isPositive ? '+' : ''}₹{fmt(Math.abs(stock.change))} today
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onBuy?.(stock)}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 transition-colors"
        >
          <Plus className="w-3 h-3" /> BUY
        </button>
        <button
          onClick={() => onSell?.(stock)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 transition-colors"
        >
          <Minus className="w-3 h-3" /> SELL
        </button>
        <button
          onClick={() => onView?.(stock)}
          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
