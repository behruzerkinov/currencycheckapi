import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Transaction } from '../types';
import { SUPPORTED_CURRENCIES, DEFAULT_CURRENCY, TRANSACTION_CATEGORIES } from '../config/constants';
import CurrencySelect from './CurrencySelect';

type Props = {
  onAddTransaction: (transaction: Transaction) => void;
};

export default function TransactionForm({ onAddTransaction }: Props) {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    type: 'expense',
    note: '',
    currency: DEFAULT_CURRENCY,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const transaction: Transaction = {
      id: Date.now().toString(),
      amount: Number(formData.amount),
      category: formData.category,
      type: formData.type as 'income' | 'expense',
      date: new Date().toISOString(),
      note: formData.note,
      currency: formData.currency,
    };
    onAddTransaction(transaction);
    setFormData({
      amount: '',
      category: '',
      type: 'expense',
      note: '',
      currency: DEFAULT_CURRENCY,
    });
  };

  const categories = formData.type === 'expense' 
    ? TRANSACTION_CATEGORIES.EXPENSE 
    : TRANSACTION_CATEGORIES.INCOME;

  return (
    <form onSubmit={handleSubmit} className="card p-6">
      <h2 className="text-xl font-bold text-gray-100 mb-4">Add Transaction</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Amount</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="input mt-1 block w-full"
            required
            min="0"
            step="any"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value, category: '' })}
            className="input mt-1 block w-full"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="input mt-1 block w-full"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <CurrencySelect
          value={formData.currency}
          onChange={(value) => setFormData({ ...formData, currency: value })}
          label="Currency"
        />

        <div>
          <label className="block text-sm font-medium text-gray-300">Note</label>
          <textarea
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            className="input mt-1 block w-full"
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          <PlusCircle className="w-5 h-5" />
          Add Transaction
        </button>
      </div>
    </form>
  );
}