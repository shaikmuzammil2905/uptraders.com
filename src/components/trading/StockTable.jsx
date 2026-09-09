import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Search, ChevronUp, ChevronDown } from 'lucide-react';

function fmt(n) {
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function StockTable({ stocks, onBuy, onSell, onRowClick, loading }) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortDir, setSortDir] = useState('asc');

  const filtered = stocks.filter((s) => {
    const q = search.toLowerCase();
    return s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q) || s.sector.toLowerCase().includes(q);
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    const av = a[sortKey], bv = b[sortKey];
    if (typeof av === 'number') return sortDir === 'asc' ? av - bv : bv - av;
    return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
  });

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  const SortIcon = ({ k }) => {
    if (sortKey !== k) return <ChevronUp className="w-3 h-3 text-gray-300" />;
    return sortDir === 'asc' ? <ChevronUp className="w-3 h-3 text-[#D61A3C]" /> : <ChevronDown className="w-3 h-3 text-[#D61A3C]" />;
  };

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search stocks by name, symbol or sector..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#D61A3C]/20 focus:border-[#D61A3C]/50 transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer select-none" onClick={() => toggleSort('symbol')}>
                  <div className="flex items-center gap-1">Symbol <SortIcon k="symbol" /></div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Company</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer select-none" onClick={() => toggleSort('price')}>
                  <div className="flex items-center justify-end gap-1">Price <SortIcon k="price" /></div>
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell cursor-pointer select-none" onClick={() => toggleSort('change')}>
                  <div className="flex items-center justify-end gap-1">Change <SortIcon k="change" /></div>
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer select-none" onClick={() => toggleSort('changePercent')}>
                  <div className="flex items-center justify-end gap-1">% <SortIcon k="changePercent" /></div>
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400 text-sm">Loading stocks...</td>
                </tr>
              )}
              {!loading && sorted.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400 text-sm">No stocks found for "{search}"</td>
                </tr>
              )}
              {!loading && sorted.map((stock) => {
                const isPos = stock.change >= 0;
                return (
                  <tr
                    key={stock.symbol}
                    className="hover:bg-gray-50/80 transition-colors cursor-pointer"
                    onClick={() => onRowClick?.(stock)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A0F1E] to-[#1a2744] flex items-center justify-center text-base flex-shrink-0">
                          {stock.logo}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">{stock.symbol}</div>
                          <div className="text-[10px] text-gray-400 sm:hidden truncate max-w-[100px]">{stock.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div className="text-sm text-gray-700 truncate max-w-[160px]">{stock.name}</div>
                      <div className="text-[10px] text-gray-400">{stock.sector}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="font-bold text-gray-900">₹{fmt(stock.price)}</div>
                    </td>
                    <td className="px-4 py-3 text-right hidden md:table-cell">
                      <div className={`font-semibold text-sm ${isPos ? 'text-green-600' : 'text-red-500'}`}>
                        {isPos ? '+' : ''}₹{fmt(Math.abs(stock.change))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`inline-flex items-center gap-0.5 px-2 py-1 rounded-lg text-xs font-bold ${isPos ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                        {isPos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {isPos ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onBuy?.(stock)}
                          className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                        >
                          BUY
                        </button>
                        <button
                          onClick={() => onSell?.(stock)}
                          className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                        >
                          SELL
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-[10px] text-gray-400 text-center mt-2">
        {sorted.length} of {stocks.length} stocks shown · All prices are mock demo data
      </p>
    </div>
  );
}
