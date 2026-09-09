// ============================================================
// DEMO PORTFOLIO DATA — Replace with real API calls when backend is ready
// ============================================================

export const demoPortfolio = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    qty: 10,
    avgPrice: 2845.00,
    currentPrice: 2950.50,
    invested: 28450.00,
    currentValue: 29505.00,
    pnl: 1055.00,
    pnlPercent: 3.71,
    sector: 'Energy',
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    qty: 5,
    avgPrice: 3980.00,
    currentPrice: 4120.40,
    invested: 19900.00,
    currentValue: 20602.00,
    pnl: 702.00,
    pnlPercent: 3.53,
    sector: 'IT',
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd',
    qty: 10,
    avgPrice: 1620.00,
    currentPrice: 1745.00,
    invested: 16200.00,
    currentValue: 17450.00,
    pnl: 1250.00,
    pnlPercent: 7.72,
    sector: 'IT',
  },
];

export const getTotalInvested = (portfolio) =>
  portfolio.reduce((sum, h) => sum + h.invested, 0);

export const getTotalValue = (portfolio) =>
  portfolio.reduce((sum, h) => sum + h.currentValue, 0);

export const getTotalPnL = (portfolio) =>
  portfolio.reduce((sum, h) => sum + h.pnl, 0);
