import { useState, useEffect } from 'react';

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  { code: 'EGP', symbol: '£', name: 'Egyptian Pound' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
  { code: 'QAR', symbol: '﷼', name: 'Qatari Riyal' },
  { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar' },
  { code: 'BHD', symbol: '.د.ب', name: 'Bahraini Dinar' },
  { code: 'OMR', symbol: '﷼', name: 'Omani Rial' },
  { code: 'JOD', symbol: 'د.ا', name: 'Jordanian Dinar' },
  { code: 'LBP', symbol: '£', name: 'Lebanese Pound' },
  { code: 'CLP', symbol: '$', name: 'Chilean Peso' },
  { code: 'COP', symbol: '$', name: 'Colombian Peso' },
  { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol' },
  { code: 'UYU', symbol: '$U', name: 'Uruguayan Peso' },
  { code: 'ARS', symbol: '$', name: 'Argentine Peso' }
];

const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.0,
  CAD: 1.25,
  AUD: 1.35,
  CHF: 0.92,
  CNY: 6.45,
  INR: 74.5,
  KRW: 1180.0,
  BRL: 5.2,
  MXN: 20.1,
  SGD: 1.35,
  HKD: 7.8,
  NOK: 8.6,
  SEK: 8.7,
  DKK: 6.4,
  PLN: 3.9,
  CZK: 21.5,
  HUF: 295.0,
  RUB: 73.5,
  TRY: 8.5,
  ZAR: 14.8,
  NZD: 1.42,
  THB: 31.2,
  MYR: 4.15,
  IDR: 14250.0,
  PHP: 49.5,
  VND: 22800.0,
  AED: 3.67,
  SAR: 3.75,
  EGP: 15.7,
  ILS: 3.25,
  QAR: 3.64,
  KWD: 0.30,
  BHD: 0.38,
  OMR: 0.38,
  JOD: 0.71,
  LBP: 1507.5,
  CLP: 730.0,
  COP: 3650.0,
  PEN: 3.6,
  UYU: 43.5,
  ARS: 98.5
};

export function useCurrency() {
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('novus-currency');
    return saved ? JSON.parse(saved) : CURRENCIES[0]; // Default to USD
  });

  useEffect(() => {
    localStorage.setItem('novus-currency', JSON.stringify(currency));
  }, [currency]);

  const convertPrice = (usdPrice) => {
    const rate = EXCHANGE_RATES[currency.code] || 1;
    const converted = usdPrice * rate;
    
    // Format based on currency
    if (['JPY', 'KRW', 'IDR', 'VND', 'CLP', 'COP', 'HUF'].includes(currency.code)) {
      return Math.round(converted); // No decimals for these currencies
    }
    
    return Math.round(converted * 100) / 100; // 2 decimal places
  };

  const formatPrice = (usdPrice) => {
    const convertedPrice = convertPrice(usdPrice);
    const formatted = convertedPrice.toLocaleString('en-US', {
      minimumFractionDigits: ['JPY', 'KRW', 'IDR', 'VND', 'CLP', 'COP', 'HUF'].includes(currency.code) ? 0 : 2,
      maximumFractionDigits: ['JPY', 'KRW', 'IDR', 'VND', 'CLP', 'COP', 'HUF'].includes(currency.code) ? 0 : 2
    });
    
    return `${currency.symbol}${formatted}`;
  };

  return {
    currency,
    setCurrency,
    currencies: CURRENCIES,
    convertPrice,
    formatPrice
  };
}