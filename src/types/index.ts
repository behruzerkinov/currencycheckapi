export type Transaction = {
  id: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string;
  note: string;
  currency: string;
};

export type CurrencyRate = {
  code: string;
  rate: number;
};

export type ChartData = {
  name: string;
  value: number;
};