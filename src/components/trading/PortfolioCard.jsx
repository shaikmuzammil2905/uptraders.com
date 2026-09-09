import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

function fmt(n) {
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function PortfolioCard({ holding, onBuy, onSell }) {
  const isPos = holding.pnl >= 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="font-bold text-gray-900">{holding.symbol}</div>
          <div className="text-xs text-gray-500 truncate max-w-[180px]">{holding.name}</div>
        </div>
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold ${isPos ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
          {isPos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {isPos ? '+' : ''}{holding.pnlPercent?.toFixed(2)}%
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 rounded-xl p-2.5">
          <div className="text-[10px] text-gray-400 mb-0.5">Qty</div>
          <div className="font-bold text-gray-900 text-sm">{holding.qty}</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-2.5">
          <div className="text-[10px] text-gray-400 mb-0.5">Avg Price</div>
          <div className="font-bold text-gray-900 text-sm">₹{fmt(holding.avgPrice)}</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-2.5">
          <div className="text-[10px] text-gray-400 mb-0.5">Invested</div>
          <div className="font-bold text-gray-900 text-sm">₹{fmt(holding.invested)}</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-2.5">
          <div className="text-[10px] text-gray-400 mb-0.5">Current Value</div>
          <div className="font-bold text-gray-900 text-sm">₹{fmt(holding.currentValue)}</div>
        </div>
      </div>

      {/* P&L */}
      <div className={`rounded-xl p-3 mb-3 ${isPos ? 'bg-green-50' : 'bg-red-50'}`}>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-semibold ${isPos ? 'text-green-600' : 'text-red-500'}`}>
            Profit & Loss
          </span>
          <span className={`font-bold text-sm ${isPos ? 'text-green-600' : 'text-red-500'}`}>
            {isPos ? '+' : ''}₹{fmt(Math.abs(holding.pnl))}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onBuy?.(holding.symbol)}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 rounded-xl transition-colors"
        >
          + BUY MORE
        </button>
        <button
          onClick={() => onSell?.(holding.symbol)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2 rounded-xl transition-colors"
        >
          SELL
        </button>
      </div>
    </div>
  );
}
