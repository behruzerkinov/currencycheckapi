export const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'UZS', 'RUB'] as const;

export const DEFAULT_CURRENCY = 'USD';

export const TRANSACTION_CATEGORIES = {
  EXPENSE: [
    'Food & Dining',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Healthcare',
    'Education',
    'Bills & Utilities',
    'Housing',
    'Travel',
    'Other'
  ],
  INCOME: [
    'Salary',
    'Freelance',
    'Investments',
    'Business',
    'Other Income'
  ]
} as const;

// For demo purposes, we'll use static exchange rates
// In production, these would come from the API
export const DEMO_EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  UZS: 12800,
  RUB: 92.5,
};