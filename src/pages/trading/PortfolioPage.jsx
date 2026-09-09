import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, BarChart3 } from 'lucide-react';
import { useTradingStore } from '../../store/useTradingStore';
import { PortfolioCard } from '../../components/trading/PortfolioCard';
import { BuySellModal } from '../../components/trading/BuySellModal';
import { demoStocks } from '../../data/demoStocks';

function fmt(n) {
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function PortfolioPage() {
  const { portfolio, balance, loadPortfolio, loadStocks, stocks } = useTradingStore();
  const [orderModal, setOrderModal] = useState(null);
  const [view, setView] = useState('cards'); // 'cards' | 'table'

  useEffect(() => {
    loadPortfolio();
    loadStocks();
  }, []);

  const totalInvested = portfolio.reduce((sum, h) => sum + h.invested, 0);
  const totalValue = portfolio.reduce((sum, h) => sum + h.currentValue, 0);
  const totalPnL = portfolio.reduce((sum, h) => sum + h.pnl, 0);
  const totalPnLPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

  const handleBuyMore = (symbol) => {
    const stock = stocks.find((s) => s.symbol === symbol) || demoStocks.find((s) => s.symbol === symbol);
    if (stock) setOrderModal({ stock, mode: 'BUY' });
  };
  const handleSell = (symbol) => {
    const stock = stocks.find((s) => s.symbol === symbol) || demoStocks.find((s) => s.symbol === symbol);
    if (stock) setOrderModal({ stock, mode: 'SELL' });
  };

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Portfolio</h2>
          <p className="text-sm text-gray-400 mt-0.5">{portfolio.length} holdings</p>
        </div>
        <button
          onClick={loadPortfolio}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="text-xs text-gray-400 mb-1">Available Balance</div>
          <div className="font-bold text-gray-900 text-lg">₹{fmt(balance)}</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="text-xs text-gray-400 mb-1">Total Invested</div>
          <div className="font-bold text-gray-900 text-lg">₹{fmt(totalInvested)}</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="text-xs text-gray-400 mb-1">Current Value</div>
          <div className="font-bold text-gray-900 text-lg">₹{fmt(totalValue)}</div>
        </div>
        <div className={`rounded-2xl border shadow-sm p-4 ${totalPnL >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="text-xs text-gray-400 mb-1">Total P&L</div>
          <div className={`font-bold text-lg flex items-center gap-1 ${totalPnL >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            {totalPnL >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {totalPnL >= 0 ? '+' : ''}₹{fmt(Math.abs(totalPnL))}
          </div>
          <div className={`text-xs font-semibold ${totalPnL >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            {totalPnLPercent >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Holdings */}
      {portfolio.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-5xl mb-4">📊</div>
          <div className="text-gray-700 font-bold text-lg mb-1">No holdings yet</div>
          <div className="text-gray-400 text-sm mb-4">Start trading in the Markets section</div>
          <a href="/trade/markets" className="text-sm font-bold text-[#D61A3C] hover:underline">
            Go to Markets →
          </a>
        </div>
      ) : (
        <>
          {/* View toggle */}
          <div className="flex items-center gap-2 mb-4">
            <button onClick={() => setView('cards')} className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${view === 'cards' ? 'bg-[#0A0F1E] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
              Cards
            </button>
            <button onClick={() => setView('table')} className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${view === 'table' ? 'bg-[#0A0F1E] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
              Table
            </button>
          </div>

          {view === 'cards' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolio.map((h) => (
                <PortfolioCard key={h.symbol} holding={h} onBuy={handleBuyMore} onSell={handleSell} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Stock</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Qty</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Avg Price</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Invested</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Value</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">P&L</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {portfolio.map((h) => (
                      <tr key={h.symbol} className="hover:bg-gray-50/80 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-bold text-gray-900">{h.symbol}</div>
                          <div className="text-[10px] text-gray-400">{h.name}</div>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-800">{h.qty}</td>
                        <td className="px-4 py-3 text-right text-gray-700 hidden sm:table-cell">₹{fmt(h.avgPrice)}</td>
                        <td className="px-4 py-3 text-right text-gray-700">₹{fmt(h.invested)}</td>
                        <td className="px-4 py-3 text-right font-bold text-gray-900">₹{fmt(h.currentValue)}</td>
                        <td className="px-4 py-3 text-right">
                          <div className={`font-bold text-sm ${h.pnl >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {h.pnl >= 0 ? '+' : ''}₹{fmt(Math.abs(h.pnl))}
                          </div>
                          <div className={`text-[10px] ${h.pnl >= 0 ? 'text-green-500' : 'text-red-400'}`}>
                            {h.pnlPercent >= 0 ? '+' : ''}{h.pnlPercent?.toFixed(2)}%
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => handleBuyMore(h.symbol)} className="bg-green-500 hover:bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded transition-colors">BUY</button>
                            <button onClick={() => handleSell(h.symbol)} className="bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded transition-colors">SELL</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Order Modal */}
      {orderModal && (
        <BuySellModal
          stock={orderModal.stock}
          mode={orderModal.mode}
          onClose={() => setOrderModal(null)}
          onSuccess={() => { setOrderModal(null); loadPortfolio(); }}
        />
      )}
    </div>
  );
}
