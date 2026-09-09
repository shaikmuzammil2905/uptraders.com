import React, { useEffect, useState } from 'react';
import { LayoutGrid, List, RefreshCw } from 'lucide-react';
import { StockTable } from '../../components/trading/StockTable';
import { StockCard } from '../../components/trading/StockCard';
import { BuySellModal } from '../../components/trading/BuySellModal';
import { StockDetailModal } from '../../components/trading/StockDetailModal';
import { useTradingStore } from '../../store/useTradingStore';

export function MarketsPage() {
  const { stocks, stocksLoading, loadStocks, loadPortfolio } = useTradingStore();
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [orderModal, setOrderModal] = useState(null); // { stock, mode }
  const [detailModal, setDetailModal] = useState(null); // stock

  useEffect(() => {
    loadStocks();
    loadPortfolio();
  }, []);

  const handleBuy = (stock) => setOrderModal({ stock, mode: 'BUY' });
  const handleSell = (stock) => setOrderModal({ stock, mode: 'SELL' });
  const handleView = (stock) => setDetailModal(stock);

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Markets</h2>
          <p className="text-sm text-gray-400 mt-0.5">{stocks.length} stocks · All prices are demo data</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadStocks}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>

          {/* View toggle */}
          <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 transition-colors ${viewMode === 'table' ? 'bg-[#0A0F1E] text-white' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#0A0F1E] text-white' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'table' ? (
        <StockTable
          stocks={stocks}
          loading={stocksLoading}
          onBuy={handleBuy}
          onSell={handleSell}
          onRowClick={handleView}
        />
      ) : (
        <div>
          {/* Grid search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search stocks..."
              className="w-full max-w-xs pl-4 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#D61A3C]/20 focus:border-[#D61A3C]/50 transition-all"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {stocksLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 h-40 animate-pulse" />
              ))
            ) : stocks.map((stock) => (
              <StockCard
                key={stock.symbol}
                stock={stock}
                onBuy={handleBuy}
                onSell={handleSell}
                onView={handleView}
              />
            ))}
          </div>
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
