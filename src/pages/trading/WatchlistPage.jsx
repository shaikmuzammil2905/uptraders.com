import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, TrendingUp, TrendingDown, Plus, Trash2, Search } from 'lucide-react';
import { useTradingStore } from '../../store/useTradingStore';
import { BuySellModal } from '../../components/trading/BuySellModal';
import { StockDetailModal } from '../../components/trading/StockDetailModal';

function fmt(n) {
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function WatchlistPage() {
  const { stocks, watchlist, loadStocks, loadWatchlist, removeFromWatchlist, addToWatchlist, loadPortfolio } = useTradingStore();
  const [orderModal, setOrderModal] = useState(null);
  const [detailModal, setDetailModal] = useState(null);
  const [addSearch, setAddSearch] = useState('');
  const [showAddPanel, setShowAddPanel] = useState(false);

  useEffect(() => {
    loadStocks();
    loadWatchlist();
    loadPortfolio();
  }, []);

  const watchedStocks = stocks.filter((s) => watchlist.includes(s.symbol));
  const unwatchedStocks = stocks.filter(
    (s) =>
      !watchlist.includes(s.symbol) &&
      (addSearch === '' ||
        s.symbol.toLowerCase().includes(addSearch.toLowerCase()) ||
        s.name.toLowerCase().includes(addSearch.toLowerCase()))
  );

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Watchlist</h2>
          <p className="text-sm text-gray-400 mt-0.5">{watchedStocks.length} stocks tracked</p>
        </div>
        <button
          onClick={() => setShowAddPanel((p) => !p)}
          className="flex items-center gap-1.5 bg-[#D61A3C] hover:bg-[#B81633] text-white text-sm font-bold px-4 py-2 rounded-xl shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Stock
        </button>
      </div>

      {/* Add stock panel */}
      {showAddPanel && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-5">
          <h3 className="font-bold text-gray-700 mb-3 text-sm">Add to Watchlist</h3>
          <div className="relative mb-3">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search stock to add..."
              value={addSearch}
              onChange={(e) => setAddSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D61A3C]/20 focus:border-[#D61A3C]/50"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
            {unwatchedStocks.map((s) => (
              <button
                key={s.symbol}
                onClick={() => addToWatchlist(s.symbol)}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-100 hover:border-[#D61A3C]/30 hover:bg-red-50 transition-colors text-left"
              >
                <span className="text-base">{s.logo}</span>
                <div>
                  <div className="font-bold text-xs text-gray-800">{s.symbol}</div>
                  <div className="text-[9px] text-gray-400">{s.sector}</div>
                </div>
              </button>
            ))}
            {unwatchedStocks.length === 0 && (
              <div className="col-span-full text-center py-3 text-xs text-gray-400">
                {addSearch ? 'No stocks match your search' : 'All stocks are in your watchlist!'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Watchlist */}
      {watchedStocks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-5xl mb-4">⭐</div>
          <div className="text-gray-700 font-bold text-lg mb-1">Your watchlist is empty</div>
          <div className="text-gray-400 text-sm mb-4">Add stocks to track their prices</div>
          <Link to="/trade/markets" className="text-sm font-bold text-[#D61A3C] hover:underline">
            Browse Markets →
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {watchedStocks.map((s) => {
            const isPos = s.change >= 0;
            return (
              <div
                key={s.symbol}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 flex items-center gap-3"
              >
                {/* Logo */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A0F1E] to-[#1a2744] flex items-center justify-center text-xl flex-shrink-0">
                  {s.logo}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setDetailModal(s)}>
                  <div className="font-bold text-gray-900">{s.symbol}</div>
                  <div className="text-xs text-gray-400 truncate">{s.name}</div>
                </div>

                {/* Price */}
                <div className="text-right flex-shrink-0">
                  <div className="font-bold text-gray-900">₹{fmt(s.price)}</div>
                  <div className={`text-xs font-semibold ${isPos ? 'text-green-600' : 'text-red-500'}`}>
                    {isPos ? '+' : ''}{s.changePercent.toFixed(2)}%
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => setOrderModal({ stock: s, mode: 'BUY' })}
                    className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    BUY
                  </button>
                  <button
                    onClick={() => setOrderModal({ stock: s, mode: 'SELL' })}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    SELL
                  </button>
                  <button
                    onClick={() => removeFromWatchlist(s.symbol)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Remove from watchlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      {orderModal && (
        <BuySellModal
          stock={orderModal.stock}
          mode={orderModal.mode}
          onClose={() => setOrderModal(null)}
          onSuccess={() => setOrderModal(null)}
        />
      )}
      {detailModal && (
        <StockDetailModal
          stock={detailModal}
          onClose={() => setDetailModal(null)}
        />
      )}
    </div>
  );
}
