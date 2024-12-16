import React from 'react';
import { format } from 'date-fns';
import { Transaction } from '../types';
import { Trash2 } from 'lucide-react';

type Props = {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
};

export default function TransactionList({ transactions, onDeleteTransaction }: Props) {
  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold text-gray-100 mb-4">Transactions</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className={`p-4 rounded-lg border ${
              transaction.type === 'income'
                ? 'bg-emerald-900/20 border-emerald-800'
                : 'bg-rose-900/20 border-rose-800'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-100">{transaction.category}</p>
                <p className="text-sm text-gray-400">
                  {format(new Date(transaction.date), 'PPP')}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`font-bold ${
                    transaction.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'} {transaction.amount}{' '}
                  {transaction.currency}
                </p>
                <button
                  onClick={() => onDeleteTransaction(transaction.id)}
                  className="text-sm text-gray-400 hover:text-rose-400 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            {transaction.note && (
              <p className="text-sm text-gray-400 mt-2">{transaction.note}</p>
            )}
          </div>
        ))}
        {transactions.length === 0 && (
          <p className="text-center text-gray-400">No transactions yet</p>
        )}
      </div>
    </div>
  );
}