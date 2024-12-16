import React from 'react';
import { SUPPORTED_CURRENCIES } from '../config/constants';

type Props = {
  value: string;
  onChange: (value: string) => void;
  label: string;
};

export default function CurrencySelect({ value, onChange, label }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input w-full p-2"
      >
        {SUPPORTED_CURRENCIES.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}