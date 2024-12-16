import React, { useState, useEffect } from 'react';
import { Transaction } from './types';
import { loadTransactions, saveTransactions } from './utils/storage';
import CurrencyConverter from './components/CurrencyConverter';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Dashboard from './components/Dashboard';
import { Wallet } from 'lucide-react';

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const savedTransactions = loadTransactions();
    setTransactions(savedTransactions);
  }, []);

  const handleAddTransaction = (transaction: Transaction) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  const handleDeleteTransaction = (id: string) => {
    const updatedTransactions = transactions.filter((t) => t.id !== id);
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Wallet className="w-8 h-8 text-indigo-500" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Personal Finance Dashboard
          </h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Dashboard transactions={transactions} />
          </div>
          
          <div className="space-y-8">
            <CurrencyConverter />
            <TransactionForm onAddTransaction={handleAddTransaction} />
          </div>
        </div>

        <div className="mt-8">
          <TransactionList
            transactions={transactions}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </div>
      </div>
    </div>
  );
}