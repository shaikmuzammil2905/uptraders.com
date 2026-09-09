// ============================================================
// STOCK SERVICE — Replace mock data with real market API when backend is ready
// ============================================================

import { demoStocks, getStockBySymbol, searchStocks as searchFn } from '../data/demoStocks';

export const stockService = {
  /**
   * Get all stocks
   * TODO: Replace with: await api.get('/trading/stocks')
   */
  getStocks: () => {
    return Promise.resolve([...demoStocks]);
  },

  /**
   * Get stock by symbol
   * TODO: Replace with: await api.get(`/trading/stocks/${symbol}`)
   */
  getStockBySymbol: (symbol) => {
    return Promise.resolve(getStockBySymbol(symbol) || null);
  },

  /**
   * Search stocks
   * TODO: Replace with: await api.get(`/trading/stocks/search?q=${query}`)
   */
  searchStocks: (query) => {
    return Promise.resolve(searchFn(query));
  },

  /**
   * Get chart data for a stock
   * Generates seeded random walk data for demo purposes
   * TODO: Replace with: await api.get(`/trading/stocks/${symbol}/chart?period=${period}`)
   */
  getChartData: (symbol, period = '1D') => {
    const stock = getStockBySymbol(symbol);
    if (!stock) return Promise.resolve([]);

    const points = { '1D': 78, '1W': 35, '1M': 30, '1Y': 52 }[period] || 78;
    const data = [];
    let price = stock.price * 0.92;

    // Seeded random for consistent demo charts
    let seed = symbol.charCodeAt(0) * 1000 + symbol.charCodeAt(1);
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const now = Date.now();
    const intervals = { '1D': 5 * 60 * 1000, '1W': 3 * 60 * 60 * 1000, '1M': 24 * 60 * 60 * 1000, '1Y': 7 * 24 * 60 * 60 * 1000 };
    const interval = intervals[period];

    for (let i = 0; i < points; i++) {
      const change = (rand() - 0.47) * (stock.price * 0.012);
      price = Math.max(stock.price * 0.7, price + change);
      data.push({
        time: new Date(now - (points - i) * interval).toISOString(),
        price: parseFloat(price.toFixed(2)),
      });
    }
    // Ensure last price matches stock price
    if (data.length > 0) data[data.length - 1].price = stock.price;

    return Promise.resolve(data);
  },
};
