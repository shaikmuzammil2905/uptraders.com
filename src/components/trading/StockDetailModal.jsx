import React, { useState } from 'react';
import { X, Star, TrendingUp, TrendingDown, Plus, Minus } from 'lucide-react';
import { StockChart } from './StockChart';
import { BuySellModal } from './BuySellModal';
import { useTradingStore } from '../../store/useTradingStore';

function fmt(n) {
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function InfoRow({ label, value, valueClass = '' }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
      <span className="text-xs text-gray-500">{label}</span>
      <span className={`text-xs font-semibold text-gray-800 ${valueClass}`}>{value}</span>
    </div>
  );
}

export function StockDetailModal({ stock, onClose }) {
  const [orderMode, setOrderMode] = useState(null); // 'BUY' | 'SELL' | null
  const { watchlist, addToWatchlist, removeFromWatchlist } = useTradingStore();
  const isWatched = watchlist.includes(stock?.symbol);
  const isPos = (stock?.change || 0) >= 0;

  if (!stock) return null;

  const handleWatchlist = () => {
    if (isWatched) removeFromWatchlist(stock.symbol);
    else addToWatchlist(stock.symbol);
  };

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={handleBackdrop}
      >
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-start justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0A0F1E] to-[#1a2744] flex items-center justify-center text-2xl">
                {stock.logo}
              </div>
              <div>
                <div className="font-bold text-gray-900 text-lg leading-tight">{stock.symbol}</div>
                <div className="text-xs text-gray-500 leading-tight">{stock.name}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{stock.sector} · NSE</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleWatchlist}
                className={`p-2 rounded-xl transition-colors ${isWatched ? 'bg-amber-100 text-amber-500' : 'bg-gray-100 text-gray-400 hover:text-amber-500'}`}
                title={isWatched ? 'Remove from watchlist' : 'Add to watchlist'}
              >
                <Star className={`w-4 h-4 ${isWatched ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Price */}
              <div className="mb-5">
                <div className="text-3xl font-bold text-gray-900">₹{fmt(stock.price)}</div>
                <div className={`flex items-center gap-1.5 mt-1 ${isPos ? 'text-green-600' : 'text-red-500'}`}>
                  {isPos ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="font-bold">{isPos ? '+' : ''}₹{fmt(Math.abs(stock.change))}</span>
                  <span className="text-sm">({isPos ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
                  <span className="text-xs text-gray-400 ml-1">Today</span>
                </div>
              </div>

              {/* Chart */}
              <div className="mb-5">
                <StockChart symbol={stock.symbol} currentPrice={stock.price} />
              </div>

              {/* Stock Details */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Today's Range</div>
                  <InfoRow label="Day High" value={`₹${fmt(stock.dayHigh)}`} valueClass="text-green-600" />
                  <InfoRow label="Day Low" value={`₹${fmt(stock.dayLow)}`} valueClass="text-red-500" />
                  <InfoRow label="Prev Close" value={`₹${fmt(stock.prevClose)}`} />
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">52 Week</div>
                  <InfoRow label="52W High" value={`₹${fmt(stock.week52High)}`} valueClass="text-green-600" />
                  <InfoRow label="52W Low" value={`₹${fmt(stock.week52Low)}`} valueClass="text-red-500" />
                  <InfoRow label="Volume" value={stock.volume} />
                </div>
              </div>

              {/* Fundamentals */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-5">
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Fundamentals</div>
                <InfoRow label="Market Cap" value={stock.marketCap} />
                <InfoRow label="P/E Ratio" value={stock.pe} />
                <InfoRow label="EPS" value={`₹${stock.eps}`} />
              </div>
            </div>
          </div>

          {/* Action Buttons — sticky */}
          <div className="px-6 py-4 border-t border-gray-100 flex gap-3 flex-shrink-0 bg-white">
            <button
              onClick={() => setOrderMode('BUY')}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-500/20"
            >
              <Plus className="w-4 h-4" /> BUY
            </button>
            <button
              onClick={() => setOrderMode('SELL')}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-500/20"
            >
              <Minus className="w-4 h-4" /> SELL
            </button>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {orderMode && (
        <BuySellModal
          stock={stock}
          mode={orderMode}
          onClose={() => setOrderMode(null)}
          onSuccess={() => setOrderMode(null)}
        />
      )}
    </>
  );
}
