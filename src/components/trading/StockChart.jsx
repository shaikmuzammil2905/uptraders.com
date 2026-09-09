import React, { useEffect, useState, useRef } from 'react';
import { stockService } from '../../services/stockService';

const PERIODS = ['1D', '1W', '1M', '1Y'];

function formatTime(isoStr, period) {
  const d = new Date(isoStr);
  if (period === '1D') return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  if (period === '1W') return d.toLocaleDateString('en-IN', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
  if (period === '1M') return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' });
}

export function StockChart({ symbol, currentPrice }) {
  const [period, setPeriod] = useState('1D');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoverIdx, setHoverIdx] = useState(null);
  const svgRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setHoverIdx(null);
    stockService.getChartData(symbol, period).then((d) => {
      setData(d);
      setLoading(false);
    });
  }, [symbol, period]);

  if (loading || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center bg-gray-50 rounded-2xl">
        <div className="text-sm text-gray-400">Loading chart...</div>
      </div>
    );
  }

  const prices = data.map((d) => d.price);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const range = maxP - minP || 1;

  const W = 600;
  const H = 180;
  const PAD = { top: 10, right: 10, bottom: 30, left: 10 };

  const xScale = (i) => PAD.left + (i / (data.length - 1)) * (W - PAD.left - PAD.right);
  const yScale = (p) => PAD.top + ((maxP - p) / range) * (H - PAD.top - PAD.bottom);

  const pathD = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i).toFixed(1)},${yScale(d.price).toFixed(1)}`)
    .join(' ');

  const fillD = `${pathD} L${xScale(data.length - 1).toFixed(1)},${(H - PAD.bottom).toFixed(1)} L${xScale(0).toFixed(1)},${(H - PAD.bottom).toFixed(1)} Z`;

  const firstPrice = prices[0];
  const lastPrice = prices[prices.length - 1];
  const isPositive = lastPrice >= firstPrice;
  const strokeColor = isPositive ? '#22c55e' : '#ef4444';
  const fillColor = isPositive ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)';

  const hovered = hoverIdx !== null ? data[hoverIdx] : null;

  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = W / rect.width;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const relX = mouseX - PAD.left;
    const chartW = W - PAD.left - PAD.right;
    const idx = Math.round((relX / chartW) * (data.length - 1));
    setHoverIdx(Math.max(0, Math.min(data.length - 1, idx)));
  };

  return (
    <div>
      {/* Period tabs */}
      <div className="flex items-center gap-1 mb-3">
        {PERIODS.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              period === p
                ? 'bg-[#D61A3C] text-white shadow-sm'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {p}
          </button>
        ))}
        {hovered && (
          <div className="ml-auto text-xs text-gray-500">
            <span className="font-bold text-gray-800">₹{hovered.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            {' · '}{formatTime(hovered.time, period)}
          </div>
        )}
      </div>

      {/* SVG Chart */}
      <div className="relative bg-gray-50 rounded-2xl overflow-hidden">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-48 cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverIdx(null)}
        >
          <defs>
            <linearGradient id={`grad-${symbol}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.15" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((frac) => {
            const y = PAD.top + frac * (H - PAD.top - PAD.bottom);
            return (
              <line key={frac} x1={PAD.left} y1={y} x2={W - PAD.right} y2={y}
                stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4 4" />
            );
          })}

          {/* Fill area */}
          <path d={fillD} fill={`url(#grad-${symbol})`} />

          {/* Price line */}
          <path d={pathD} fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Hover dot */}
          {hoverIdx !== null && (
            <>
              <line
                x1={xScale(hoverIdx)} y1={PAD.top}
                x2={xScale(hoverIdx)} y2={H - PAD.bottom}
                stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3" opacity="0.5"
              />
              <circle cx={xScale(hoverIdx)} cy={yScale(data[hoverIdx].price)} r="4"
                fill="white" stroke={strokeColor} strokeWidth="2" />
            </>
          )}
        </svg>

        {/* Demo watermark */}
        <div className="absolute bottom-2 right-3 text-[9px] text-gray-300 font-medium tracking-wider uppercase">
          Demo Data
        </div>
      </div>

      {/* Price range */}
      <div className="flex items-center justify-between mt-2 text-[10px] text-gray-400">
        <span>Low: ₹{minP.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        <span className={`font-semibold text-xs ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
          {isPositive ? '▲' : '▼'} {Math.abs(((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2)}% this {period === '1D' ? 'day' : period === '1W' ? 'week' : period === '1M' ? 'month' : 'year'}
        </span>
        <span>High: ₹{maxP.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
      </div>
    </div>
  );
}
