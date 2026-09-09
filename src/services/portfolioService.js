// ============================================================
// PORTFOLIO SERVICE — Replace mock logic with real API calls when backend is ready
// ============================================================

import { demoPortfolio } from '../data/demoPortfolio';
import { demoUser } from '../data/demoUser';

const PORTFOLIO_KEY = 'trading_portfolio';
const WATCHLIST_KEY = 'trading_watchlist';
const BALANCE_KEY = 'trading_balance';

const getPortfolio = () => {
  try {
    const raw = localStorage.getItem(PORTFOLIO_KEY);
    return raw ? JSON.parse(raw) : [...demoPortfolio];
  } catch {
    return [...demoPortfolio];
  }
};

const savePortfolio = (portfolio) => {
  localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(portfolio));
};

const getBalance = () => {
  try {
    const raw = localStorage.getItem(BALANCE_KEY);
    return raw ? parseFloat(raw) : demoUser.availableBalance;
  } catch {
    return demoUser.availableBalance;
  }
};

const saveBalance = (balance) => {
  localStorage.setItem(BALANCE_KEY, String(balance));
};

export const portfolioService = {
  /**
   * Get portfolio holdings
   * TODO: Replace with: await api.get('/trading/portfolio')
   */
  getPortfolio: () => {
    return Promise.resolve(getPortfolio());
  },

  /**
   * Get available balance
   * TODO: Replace with: await api.get('/trading/balance')
   */
  getBalance: () => {
    return Promise.resolve(getBalance());
  },

  /**
   * Update portfolio after a buy
   * TODO: This will be handled server-side after backend integration
   */
  addHolding: (symbol, name, qty, price) => {
    return new Promise((resolve) => {
      const portfolio = getPortfolio();
      const total = qty * price;
      const existing = portfolio.find((h) => h.symbol === symbol);

      if (existing) {
        const newQty = existing.qty + qty;
        const newInvested = existing.invested + total;
        const newAvgPrice = newInvested / newQty;
        const updated = portfolio.map((h) =>
          h.symbol === symbol
            ? {
                ...h,
                qty: newQty,
                avgPrice: parseFloat(newAvgPrice.toFixed(2)),
                invested: parseFloat(newInvested.toFixed(2)),
                currentValue: parseFloat((newQty * h.currentPrice).toFixed(2)),
                pnl: parseFloat((newQty * h.currentPrice - newInvested).toFixed(2)),
                pnlPercent: parseFloat(((newQty * h.currentPrice - newInvested) / newInvested * 100).toFixed(2)),
              }
            : h
        );
        savePortfolio(updated);
      } else {
        const newHolding = {
          symbol,
          name,
          qty,
          avgPrice: price,
          currentPrice: price,
          invested: total,
          currentValue: total,
          pnl: 0,
          pnlPercent: 0,
          sector: 'Equity',
        };
        savePortfolio([...portfolio, newHolding]);
      }

      // Deduct from balance
      const balance = getBalance();
      saveBalance(Math.max(0, balance - total));

      resolve({ success: true });
    });
  },

  /**
   * Update portfolio after a sell
   * TODO: This will be handled server-side after backend integration
   */
  removeHolding: (symbol, qty, price) => {
    return new Promise((resolve) => {
      const portfolio = getPortfolio();
      const existing = portfolio.find((h) => h.symbol === symbol);

      if (!existing || existing.qty < qty) {
        resolve({ success: false, error: 'Insufficient holdings' });
        return;
      }

      const total = qty * price;
      let updated;
      if (existing.qty === qty) {
        updated = portfolio.filter((h) => h.symbol !== symbol);
      } else {
        const newQty = existing.qty - qty;
        const newInvested = existing.avgPrice * newQty;
        updated = portfolio.map((h) =>
          h.symbol === symbol
            ? {
                ...h,
                qty: newQty,
                invested: parseFloat(newInvested.toFixed(2)),
                currentValue: parseFloat((newQty * h.currentPrice).toFixed(2)),
                pnl: parseFloat((newQty * h.currentPrice - newInvested).toFixed(2)),
                pnlPercent: parseFloat(((newQty * h.currentPrice - newInvested) / newInvested * 100).toFixed(2)),
              }
            : h
        );
      }

      savePortfolio(updated);

      // Add to balance
      const balance = getBalance();
      saveBalance(balance + total);

      resolve({ success: true });
    });
  },

  /**
   * Get watchlist
   * TODO: Replace with: await api.get('/trading/watchlist')
   */
  getWatchlist: () => {
    try {
      const raw = localStorage.getItem(WATCHLIST_KEY);
      return Promise.resolve(raw ? JSON.parse(raw) : ['RELIANCE', 'TCS', 'INFY']);
    } catch {
      return Promise.resolve(['RELIANCE', 'TCS', 'INFY']);
    }
  },

  /**
   * Add stock to watchlist
   * TODO: Replace with: await api.post('/trading/watchlist', { symbol })
   */
  addToWatchlist: (symbol) => {
    const raw = localStorage.getItem(WATCHLIST_KEY);
    const list = raw ? JSON.parse(raw) : ['RELIANCE', 'TCS', 'INFY'];
    if (!list.includes(symbol)) {
      const updated = [...list, symbol];
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
    }
    return Promise.resolve({ success: true });
  },

  /**
   * Remove stock from watchlist
   * TODO: Replace with: await api.delete(`/trading/watchlist/${symbol}`)
   */
  removeFromWatchlist: (symbol) => {
    const raw = localStorage.getItem(WATCHLIST_KEY);
    const list = raw ? JSON.parse(raw) : [];
    const updated = list.filter((s) => s !== symbol);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
    return Promise.resolve({ success: true });
  },

  /**
   * Reset to demo data
   */
  reset: () => {
    localStorage.removeItem(PORTFOLIO_KEY);
    localStorage.removeItem(BALANCE_KEY);
  },
};
