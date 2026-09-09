import React, { useState, useEffect } from 'react';
import { X, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { useTradingStore } from '../../store/useTradingStore';

function fmt(n) {
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function BuySellModal({ stock, mode, onClose, onSuccess }) {
  const [orderType, setOrderType] = useState('MARKET');
  const [qty, setQty] = useState('');
  const [limitPrice, setLimitPrice] = useState(stock?.price?.toFixed(2) || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { buyStock, sellStock, balance, portfolio } = useTradingStore();

  const isBuy = mode === 'BUY';
  const price = orderType === 'MARKET' ? (stock?.price || 0) : parseFloat(limitPrice || '0');
  const qtyNum = parseInt(qty || '0', 10);
  const estimated = isNaN(qtyNum * price) ? 0 : qtyNum * price;

  const holding = portfolio?.find((h) => h.symbol === stock?.symbol);
  const maxSell = holding?.qty || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!qtyNum || qtyNum <= 0) { setError('Enter a valid quantity'); return; }
    if (orderType === 'LIMIT' && (!limitPrice || parseFloat(limitPrice) <= 0)) {
      setError('Enter a valid limit price'); return;
    }
    if (!isBuy && qtyNum > maxSell) {
      setError(`You only have ${maxSell} shares of ${stock.symbol}`); return;
    }
    if (isBuy && estimated > balance) {
      setError(`Insufficient balance. Available: ₹${fmt(balance)}`); return;
    }

    setLoading(true);
    try {
      let result;
      if (isBuy) {
        result = await buyStock(stock.symbol, stock.name, qtyNum, price, orderType);
      } else {
        result = await sellStock(stock.symbol, stock.name, qtyNum, price, orderType);
      }

      if (result.success) {
        onSuccess?.();
        onClose?.();
      } else {
        setError(result.error || 'Order failed');
      }
    } finally {
      setLoading(false);
    }
  };

  // Close on escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!stock) return null;

  const accentColor = isBuy ? 'green' : 'red';
  const btnClass = isBuy
    ? 'bg-green-500 hover:bg-green-600 text-white'
    : 'bg-red-500 hover:bg-red-600 text-white';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className={`px-6 py-4 flex items-center justify-between border-b ${isBuy ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${isBuy ? 'bg-green-100' : 'bg-red-100'}`}>
              {isBuy ? '📈' : '📉'}
            </div>
            <div>
              <div className="font-bold text-gray-900">{isBuy ? 'Buy' : 'Sell'} {stock.symbol}</div>
              <div className="text-xs text-gray-500">{stock.name}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-white/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Current Price */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <span className="text-sm text-gray-600">Current Price</span>
            <div className="text-right">
              <div className="font-bold text-gray-900">₹{fmt(stock.price)}</div>
              <div className={`text-xs font-semibold ${stock.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {stock.change >= 0 ? '+' : ''}₹{fmt(Math.abs(stock.change))} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>

          {/* Balance / Holdings Info */}
          {isBuy ? (
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Available Balance</span>
              <span className="font-semibold text-gray-800">₹{fmt(balance)}</span>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Holdings</span>
              <span className="font-semibold text-gray-800">
                {maxSell} shares {holding ? `(avg ₹${fmt(holding.avgPrice)})` : '(none)'}
              </span>
            </div>
          )}

          {/* Order Type */}
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">Order Type</label>
            <div className="flex rounded-xl border border-gray-200 overflow-hidden">
              {['MARKET', 'LIMIT'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setOrderType(t)}
                  className={`flex-1 py-2 text-xs font-bold transition-all ${
                    orderType === t ? (isBuy ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">Quantity</label>
            <input
              type="number"
              min="1"
              max={!isBuy ? maxSell : undefined}
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="Number of shares"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D61A3C]/20 focus:border-[#D61A3C]/50"
              required
            />
          </div>

          {/* Limit Price */}
          {orderType === 'LIMIT' && (
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">Limit Price (₹)</label>
              <input
                type="number"
                step="0.05"
                min="0.01"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                placeholder="Enter limit price"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D61A3C]/20 focus:border-[#D61A3C]/50"
                required
              />
            </div>
          )}

          {/* Estimated Amount */}
          <div className={`flex items-center justify-between p-3 rounded-xl border ${isBuy ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <span className="text-sm font-medium text-gray-700">Estimated {isBuy ? 'Cost' : 'Value'}</span>
            <span className="text-lg font-bold text-gray-900">
              {estimated > 0 ? `₹${fmt(estimated)}` : '—'}
            </span>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 text-xs text-red-600">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          {/* Demo note */}
          <div className="flex items-center gap-1.5 text-[10px] text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            This is a demo order. No real money or shares are involved.
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-60 ${btnClass}`}
          >
            {loading ? 'Placing Order...' : `${isBuy ? 'Buy' : 'Sell'} ${qtyNum > 0 ? qtyNum : ''} ${stock.symbol} ${estimated > 0 ? `@ ₹${fmt(estimated)}` : ''}`}
          </button>
        </form>
      </div>
    </div>
  );
}
