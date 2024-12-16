import { Transaction } from '../types';

export const calculateTotalIncome = (transactions: Transaction[]): number =>
  transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

export const calculateTotalExpense = (transactions: Transaction[]): number =>
  transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

export const calculateNetBalance = (transactions: Transaction[]): number =>
  calculateTotalIncome(transactions) - calculateTotalExpense(transactions);

export const calculateExpensesByCategory = (transactions: Transaction[]): Record<string, number> =>
  transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc: Record<string, number>, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});