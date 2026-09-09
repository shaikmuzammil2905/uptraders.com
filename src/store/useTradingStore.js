// ============================================================
// TRADING STORE — Global state for trading dashboard
// ============================================================

import { create } from 'zustand';
import { stockService } from '../services/stockService';
import { orderService } from '../services/orderService';
import { portfolioService } from '../services/portfolioService';

export const useTradingStore = create((set, get) => ({
  // Stocks
  stocks: [],
  stocksLoading: false,

  // Portfolio
  portfolio: [],
  balance: 100000,
  portfolioLoading: false,

  // Orders
  orders: [],
  ordersLoading: false,

  // Watchlist
  watchlist: [],

  // Toast notification
  toast: null,

  // ─── Actions ───────────────────────────────────────────────

  showToast: (message, type = 'success') => {
    set({ toast: { message, type, id: Date.now() } });
    setTimeout(() => set({ toast: null }), 4000);
  },

  // Load stocks
  loadStocks: async () => {
    set({ stocksLoading: true });
    const stocks = await stockService.getStocks();
    set({ stocks, stocksLoading: false });
  },

  // Load portfolio
  loadPortfolio: async () => {
    set({ portfolioLoading: true });
    const [portfolio, balance] = await Promise.all([
      portfolioService.getPortfolio(),
      portfolioService.getBalance(),
    ]);
    set({ portfolio, balance, portfolioLoading: false });
  },

  // Load orders
  loadOrders: async () => {
    set({ ordersLoading: true });
    const orders = await orderService.getOrders();
    set({ orders, ordersLoading: false });
  },

  // Load watchlist
  loadWatchlist: async () => {
    const watchlist = await portfolioService.getWatchlist();
    set({ watchlist });
  },

  // Place buy order
  buyStock: async (symbol, name, qty, price, orderType) => {
    const total = qty * price;
    const balance = get().balance;
    if (total > balance) {
      get().showToast('Insufficient balance for this order', 'error');
      return { success: false, error: 'Insufficient balance' };
    }

    const orderResult = await orderService.placeOrder({
      symbol, name, type: 'BUY', orderType, qty, price, total,
    });

    if (orderResult.success) {
      await portfolioService.addHolding(symbol, name, qty, price);
      await get().loadPortfolio();
      await get().loadOrders();
      get().showToast(`Demo order placed: BUY ${qty} ${symbol} @ ₹${price.toLocaleString('en-IN')}`, 'success');
    }

    return orderResult;
  },

  // Place sell order
  sellStock: async (symbol, name, qty, price, orderType) => {
    const portfolio = get().portfolio;
    const holding = portfolio.find((h) => h.symbol === symbol);

    if (!holding || holding.qty < qty) {
      get().showToast(`Insufficient ${symbol} shares to sell`, 'error');
      return { success: false, error: 'Insufficient holdings' };
    }

    const orderResult = await orderService.placeOrder({
      symbol, name, type: 'SELL', orderType, qty, price, total: qty * price,
    });

    if (orderResult.success) {
      await portfolioService.removeHolding(symbol, qty, price);
      await get().loadPortfolio();
      await get().loadOrders();
      get().showToast(`Demo order placed: SELL ${qty} ${symbol} @ ₹${price.toLocaleString('en-IN')}`, 'success');
    }

    return orderResult;
  },

  // Add to watchlist
  addToWatchlist: async (symbol) => {
    await portfolioService.addToWatchlist(symbol);
    const watchlist = await portfolioService.getWatchlist();
    set({ watchlist });
    get().showToast(`${symbol} added to watchlist`, 'success');
  },

  // Remove from watchlist
  removeFromWatchlist: async (symbol) => {
    await portfolioService.removeFromWatchlist(symbol);
    const watchlist = await portfolioService.getWatchlist();
    set({ watchlist });
    get().showToast(`${symbol} removed from watchlist`, 'info');
  },
}));
