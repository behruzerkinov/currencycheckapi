import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = [
  '#818cf8', // Indigo
  '#34d399', // Emerald
  '#fbbf24', // Amber
  '#f87171', // Red
  '#a78bfa', // Purple
  '#60a5fa', // Blue
  '#34d399', // Green
  '#f472b6', // Pink
  '#fb923c', // Orange
  '#94a3b8', // Gray
];

type Props = {
  expensesByCategory: Record<string, number>;
};

export function ExpensesChart({ expensesByCategory }: Props) {
  const chartData = Object.entries(expensesByCategory)
    .map(([name, value]) => ({
      name,
      value,
      percentage: ((value / Object.values(expensesByCategory).reduce((a, b) => a + b, 0)) * 100).toFixed(1)
    }))
    .sort((a, b) => b.value - a.value); // Sort by value descending

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg shadow-lg">
          <p className="font-medium text-gray-200">{data.name}</p>
          <p className="text-sm text-gray-300">
            Amount: ${data.value.toFixed(2)}
          </p>
          <p className="text-sm text-gray-400">
            {data.percentage}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-300 mb-4">
        Expenses by Category
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="vertical" 
              align="right"
              verticalAlign="middle"
              formatter={(value, entry: any) => (
                <span className="text-gray-300">
                  {value} ({entry.payload.percentage}%)
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}