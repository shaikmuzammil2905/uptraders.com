// ============================================================
// ORDER SERVICE — Replace mock logic with real API calls when backend is ready
// ============================================================

import { demoOrders } from '../data/demoOrders';

const ORDERS_KEY = 'trading_orders';
const PORTFOLIO_KEY = 'trading_portfolio';
const BALANCE_KEY = 'trading_balance';

// Initialize orders from localStorage or demo data
const getOrders = () => {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [...demoOrders];
  } catch {
    return [...demoOrders];
  }
};

const saveOrders = (orders) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

export const orderService = {
  /**
   * Get all orders
   * TODO: Replace with: await api.get('/trading/orders')
   */
  getOrders: () => {
    return Promise.resolve(getOrders());
  },

  /**
   * Place a new order (Buy or Sell)
   * TODO: Replace with: await api.post('/trading/orders', orderData)
   */
  placeOrder: (orderData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders = getOrders();
        const newOrder = {
          id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
          ...orderData,
          status: 'COMPLETED',
          date: new Date().toLocaleDateString('en-IN'),
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        };
        const updated = [newOrder, ...orders];
        saveOrders(updated);
        resolve({ success: true, order: newOrder });
      }, 600);
    });
  },

  /**
   * Cancel an order
   * TODO: Replace with: await api.put(`/trading/orders/${id}/cancel`)
   */
  cancelOrder: (id) => {
    return new Promise((resolve) => {
      const orders = getOrders();
      const updated = orders.map((o) => (o.id === id ? { ...o, status: 'CANCELLED' } : o));
      saveOrders(updated);
      resolve({ success: true });
    });
  },

  /**
   * Reset orders to demo data (for testing)
   */
  resetOrders: () => {
    localStorage.removeItem(ORDERS_KEY);
  },
};
