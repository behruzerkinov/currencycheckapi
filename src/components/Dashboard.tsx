import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Transaction } from '../types';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import {
  calculateTotalIncome,
  calculateTotalExpense,
  calculateNetBalance,
  calculateExpensesByCategory,
} from '../utils/calculations';
import { StatCard } from './StatCard';
import { ExpensesChart } from './ExpensesChart';

type Props = {
  transactions: Transaction[];
};

export default function Dashboard({ transactions }: Props) {
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpense = calculateTotalExpense(transactions);
  const netBalance = calculateNetBalance(transactions);
  const expensesByCategory = calculateExpensesByCategory(transactions);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Income"
          value={totalIncome}
          icon={<TrendingUp className="w-6 h-6 text-emerald-500" />}
          type="income"
        />
        <StatCard
          title="Total Expenses"
          value={totalExpense}
          icon={<TrendingDown className="w-6 h-6 text-rose-500" />}
          type="expense"
        />
        <StatCard
          title="Net Balance"
          value={netBalance}
          icon={<Wallet className="w-6 h-6 text-indigo-500" />}
          type={netBalance >= 0 ? 'income' : 'expense'}
        />
      </div>

      <ExpensesChart expensesByCategory={expensesByCategory} />
    </div>
  );
}