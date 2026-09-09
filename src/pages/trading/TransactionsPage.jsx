import React, { useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';
import { useTradingStore } from '../../store/useTradingStore';

function fmt(n) {
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function TransactionsPage() {
  const { orders, ordersLoading, loadOrders, balance } = useTradingStore();

  useEffect(() => {
    loadOrders();
  }, []);

  // Build transaction-style records from orders
  const transactions = orders.map((o) => ({
    id: o.id,
    date: o.date,
    time: o.time,
    description: `${o.type === 'BUY' ? 'Bought' : 'Sold'} ${o.qty} shares of ${o.symbol}`,
    type: o.type === 'BUY' ? 'DEBIT' : 'CREDIT',
    amount: o.total,
    status: o.status,
  }));

  // Add initial balance credit
  const allTransactions = [
    {
      id: 'TXN-INIT',
      date: '2024-08-01',
      time: '09:00 AM',
      description: 'Account funded (Demo)',
      type: 'CREDIT',
      amount: 100000,
      status: 'COMPLETED',
    },
    ...transactions,
  ];

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Transactions</h2>
          <p className="text-sm text-gray-400 mt-0.5">{allTransactions.length} transactions</p>
        </div>
        <button
          onClick={loadOrders}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Balance card */}
      <div className="bg-gradient-to-br from-[#0A0F1E] to-[#1a2744] rounded-2xl p-5 mb-5 text-white">
        <div className="text-xs text-white/50 mb-1">Current Balance</div>
        <div className="text-3xl font-bold">₹{fmt(balance)}</div>
        <div className="text-xs text-green-400 mt-1 font-semibold">Demo Account · UT-DEMO-1001</div>
      </div>

      {/* Transactions list */}
      <div className="space-y-2">
        {ordersLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl h-16 animate-pulse border border-gray-100" />
          ))
        ) : (
          allTransactions.map((txn) => {
            const isCredit = txn.type === 'CREDIT';
            return (
              <div key={txn.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 flex items-center gap-3">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isCredit ? 'bg-green-100' : 'bg-red-100'}`}>
                  {isCredit
                    ? <ArrowDownRight className="w-5 h-5 text-green-600" />
                    : <ArrowUpRight className="w-5 h-5 text-red-500" />}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800 text-sm truncate">{txn.description}</div>
                  <div className="text-[10px] text-gray-400">{txn.date} {txn.time && `· ${txn.time}`} · {txn.id}</div>
                </div>

                {/* Amount */}
                <div className="text-right flex-shrink-0">
                  <div className={`font-bold text-sm ${isCredit ? 'text-green-600' : 'text-red-500'}`}>
                    {isCredit ? '+' : '-'}₹{fmt(txn.amount)}
                  </div>
                  <div className={`text-[10px] font-semibold ${txn.status === 'COMPLETED' ? 'text-green-500' : txn.status === 'CANCELLED' ? 'text-gray-400' : 'text-amber-500'}`}>
                    {txn.status}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <p className="text-[10px] text-gray-400 text-center mt-4">
        All transactions are demo data. No real money involved.
      </p>
    </div>
  );
}
