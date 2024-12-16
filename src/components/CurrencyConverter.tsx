import React, { useState } from 'react';
import { SUPPORTED_CURRENCIES, DEFAULT_CURRENCY } from '../config/constants';
import { useCurrencyConverter } from '../hooks/useCurrencyConverter';
import CurrencySelect from './CurrencySelect';
import { ArrowRightLeft } from 'lucide-react';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>(DEFAULT_CURRENCY);
  const [toCurrency, setToCurrency] = useState<string>('UZS');

  const { result, error } = useCurrencyConverter(amount, fromCurrency, toCurrency);

  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-4">
        <ArrowRightLeft className="w-5 h-5 text-indigo-500" />
        <h2 className="text-xl font-bold text-gray-100">Currency Converter</h2>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="input w-full p-2"
            min="0"
            step="any"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <CurrencySelect
            value={fromCurrency}
            onChange={setFromCurrency}
            label="From"
          />
          <CurrencySelect
            value={toCurrency}
            onChange={setToCurrency}
            label="To"
          />
        </div>

        {error ? (
          <div className="text-rose-500 text-sm">{error}</div>
        ) : (
          <div className="text-lg font-semibold bg-gray-700 p-3 rounded-lg text-center">
            {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
          </div>
        )}
      </div>
    </div>
  );
}