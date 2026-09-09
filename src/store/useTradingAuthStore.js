// ============================================================
// TRADING AUTH STORE — Separate from the main store auth
// ============================================================

import { create } from 'zustand';
import { authService } from '../services/authService';

export const useTradingAuthStore = create((set) => ({
  user: authService.getSession()?.user || null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    const result = await authService.loginDemo(email, password);
    if (result.success) {
      set({ user: result.user, loading: false });
    } else {
      set({ error: result.error, loading: false });
    }
    return result;
  },

  logout: () => {
    authService.logout();
    set({ user: null, error: null });
  },

  clearError: () => set({ error: null }),

  isLoggedIn: () => authService.isLoggedIn(),
}));
