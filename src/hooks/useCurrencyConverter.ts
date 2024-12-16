import { useState, useEffect } from 'react';
import { DEMO_EXCHANGE_RATES, DEFAULT_CURRENCY } from '../config/constants';

export function useCurrencyConverter(
  amount: number,
  fromCurrency: string,
  toCurrency: string
) {
  const [result, setResult] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Convert to USD first (as base currency)
      const amountInUSD = amount / DEMO_EXCHANGE_RATES[fromCurrency];
      // Then convert to target currency
      const convertedAmount = amountInUSD * DEMO_EXCHANGE_RATES[toCurrency];
      setResult(convertedAmount);
      setError(null);
    } catch (err) {
      setError('Error converting currency');
      setResult(0);
    }
  }, [amount, fromCurrency, toCurrency]);

  return { result, error };
}