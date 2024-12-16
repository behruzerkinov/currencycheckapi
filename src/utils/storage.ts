import { Transaction } from '../types';

export const saveTransactions = (transactions: Transaction[]) => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

export const loadTransactions = (): Transaction[] => {
  const stored = localStorage.getItem('transactions');
  return stored ? JSON.parse(stored) : [];
};