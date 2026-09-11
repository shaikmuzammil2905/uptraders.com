import { create } from 'zustand';
import api from '../utils/api';
import { useCartStore } from './useCartStore';
import { useWishlistStore } from './useWishlistStore';
import { DEMO_CREDENTIALS, demoShopkeeperOrders } from '../data/demoUser';

// Decode JWT and check expiry without any library
function isTokenExpired(token) {
  // Demo tokens never expire
  if (token && token.startsWith('demo-token-')) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

function getValidToken() {
  const token = localStorage.getItem('token');
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export const useAuthStore = create((set, get) => ({
  user: null,
  token: getValidToken(),
  addresses: [],
  orders: [],
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  signup: async (name, email, phone, password, country, role = 'customer') => {
    set({ loading: true, error: null });
    try {
      await api.post('/auth/signup', { name, email, phone, password, country, role });
      set({ loading: false });
      return { success: true };
    } catch (err) {
      const error = err.response?.data?.error || 'Signup failed';
      set({ loading: false, error });
      return { success: false, error };
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });

    const cleanEmail = email.trim().toLowerCase();

    // 1. Shopkeeper Demo Login
    if (
      cleanEmail === DEMO_CREDENTIALS.shopkeeper.email.toLowerCase() &&
      password === DEMO_CREDENTIALS.shopkeeper.password
    ) {
      const demoToken = 'demo-token-shopkeeper-' + Date.now();
      const shopkeeperData = {
        id: 'sk-001',
        name: DEMO_CREDENTIALS.shopkeeper.name,
        email: DEMO_CREDENTIALS.shopkeeper.email,
        phone: DEMO_CREDENTIALS.shopkeeper.phone,
        role: 'shopkeeper',
        businessName: DEMO_CREDENTIALS.shopkeeper.businessName,
        gstin: DEMO_CREDENTIALS.shopkeeper.gstin,
        location: DEMO_CREDENTIALS.shopkeeper.location
      };
      localStorage.setItem('token', demoToken);
      set({ token: demoToken, user: shopkeeperData, orders: demoShopkeeperOrders, loading: false });
      return { success: true, role: 'shopkeeper' };
    }

    // 2. Admin Demo Login
    if (
      cleanEmail === DEMO_CREDENTIALS.admin.email.toLowerCase() &&
      password === DEMO_CREDENTIALS.admin.password
    ) {
      const demoToken = 'demo-token-admin-' + Date.now();
      const adminData = {
        id: 'admin-001',
        name: DEMO_CREDENTIALS.admin.name,
        email: DEMO_CREDENTIALS.admin.email,
        phone: '8886000847',
        role: 'admin',
      };
      localStorage.setItem('token', demoToken);
      set({ token: demoToken, user: adminData, loading: false });
      return { success: true, role: 'admin' };
    }

    // 3. Customer Demo Login
    if (
      cleanEmail === DEMO_CREDENTIALS.customer.email.toLowerCase() &&
      password === DEMO_CREDENTIALS.customer.password
    ) {
      const demoToken = 'demo-token-customer-' + Date.now();
      const demoUserData = {
        id: 'demo-001',
        name: 'Demo Customer',
        email: DEMO_CREDENTIALS.customer.email,
        phone: '+91 88860 00847',
        role: 'customer',
      };
      localStorage.setItem('token', demoToken);
      set({ token: demoToken, user: demoUserData, loading: false });
      return { success: true, role: 'customer' };
    }

    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      set({ token: data.token, user: data.user, loading: false });
      return { success: true, role: data.user.role };
    } catch (err) {
      const error = err.response?.data?.error || 'Invalid credentials or login failed';
      set({ loading: false, error });
      return { success: false, error };
    }
  },

  googleLogin: async (idToken) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post('/auth/google', { idToken });
      localStorage.setItem('token', data.token);
      set({ token: data.token, user: data.user, loading: false });
      return { success: true, role: data.user.role };
    } catch (err) {
      const error = err.response?.data?.error || 'Google Login failed';
      set({ loading: false, error });
      return { success: false, error };
    }
  },

  fetchProfile: async () => {
    if (!get().token) return;
    if (isTokenExpired(get().token)) {
      localStorage.removeItem('token');
      set({ user: null, token: null, addresses: [], orders: [] });
      return;
    }
    // Demo session handling
    if (get().token.startsWith('demo-token-')) {
      if (!get().user) {
        if (get().token.includes('shopkeeper')) {
          set({
            user: {
              id: 'sk-001',
              name: DEMO_CREDENTIALS.shopkeeper.name,
              email: DEMO_CREDENTIALS.shopkeeper.email,
              phone: DEMO_CREDENTIALS.shopkeeper.phone,
              role: 'shopkeeper',
              businessName: DEMO_CREDENTIALS.shopkeeper.businessName,
              gstin: DEMO_CREDENTIALS.shopkeeper.gstin,
              location: DEMO_CREDENTIALS.shopkeeper.location
            },
            orders: demoShopkeeperOrders,
            addresses: []
          });
        } else if (get().token.includes('admin')) {
          set({
            user: {
              id: 'admin-001',
              name: DEMO_CREDENTIALS.admin.name,
              email: DEMO_CREDENTIALS.admin.email,
              phone: '8886000847',
              role: 'admin',
            },
            addresses: [],
            orders: []
          });
        } else {
          set({
            user: {
              id: 'demo-001',
              name: 'Demo Customer',
              email: DEMO_CREDENTIALS.customer.email,
              phone: '+91 88860 00847',
              role: 'customer',
            },
            addresses: [],
            orders: [],
          });
        }
      }
      return;
    }
    set({ loading: true });
    try {
      const { data } = await api.get('/auth/profile');
      set({ user: data.user, addresses: data.addresses, orders: data.orders, loading: false });
    } catch (err) {
      set({ loading: false });
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        set({ user: null, token: null, addresses: [], orders: [] });
      }
    }
  },

  updateProfile: async (name, phone) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.put('/auth/profile', { name, phone });
      set(state => ({ user: { ...state.user, ...data.user, name, phone }, loading: false }));
      return { success: true };
    } catch (err) {
      const error = err.response?.data?.error || 'Update failed';
      set({ loading: false, error });
      return { success: false, error };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, addresses: [], orders: [] });
    useCartStore.getState().clearCart();
    useWishlistStore.setState({ items: [] });
  },

  isLoggedIn: () => !!get().token,
}));
