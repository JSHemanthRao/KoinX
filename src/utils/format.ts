export const formatCurrency = (value: number): string => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  
  let formatted = '';
  if (absValue >= 1e6) {
    formatted = `$${(absValue / 1e6).toFixed(2)}M`;
  } else if (absValue >= 1e3) {
    formatted = `$${(absValue / 1e3).toFixed(2)}K`;
  } else {
    formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(absValue);
  }

  return isNegative ? `-${formatted}` : formatted;
};

export const formatCrypto = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 5,
  }).format(value);
};

export const formatCryptoMinimal = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 3,
  }).format(value);
};
