import React from 'react';
import { ReactNode } from 'react';

type Props = {
  title: string;
  value: number;
  icon: ReactNode;
  type: 'income' | 'expense';
};

export function StatCard({ title, value, icon, type }: Props) {
  const valueColor = type === 'income' ? 'text-emerald-500' : 'text-rose-500';

  return (
    <div className="stat-card">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
      </div>
      <p className={`text-2xl font-bold mt-2 ${valueColor}`}>
        ${value.toFixed(2)}
      </p>
    </div>
  );
}