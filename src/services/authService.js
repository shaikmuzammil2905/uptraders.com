// ============================================================
// AUTH SERVICE — Replace mock logic with real API calls when backend is ready
// ============================================================

import { DEMO_CREDENTIALS, demoUser } from '../data/demoUser';

const SESSION_KEY = 'trading_session';

export const authService = {
  /**
   * Demo login — validates against hardcoded demo credentials
   * TODO: Replace with: await api.post('/trading/auth/login', { email, password })
   */
  loginDemo: (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (
          email.trim().toLowerCase() === DEMO_CREDENTIALS.email.toLowerCase() &&
          password === DEMO_CREDENTIALS.password
        ) {
          const session = { user: demoUser, loggedIn: true, loginTime: Date.now() };
          localStorage.setItem(SESSION_KEY, JSON.stringify(session));
          resolve({ success: true, user: demoUser });
        } else {
          resolve({ success: false, error: 'Invalid email or password. Use demo@uptraders.com / Demo@123' });
        }
      }, 800); // Simulate network delay
    });
  },

  /**
   * Get current session
   * TODO: Replace with token validation against real backend
   */
  getSession: () => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const session = JSON.parse(raw);
      return session?.loggedIn ? session : null;
    } catch {
      return null;
    }
  },

  /**
   * Logout
   * TODO: Also call API to invalidate token
   */
  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  isLoggedIn: () => {
    return !!authService.getSession();
  },
};
