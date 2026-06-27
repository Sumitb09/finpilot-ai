export function formatCurrency(
  amount: number,
  currency: string = "INR"
): string {
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${getCurrencySymbol(currency)}${amount.toLocaleString()}`;
  }
}

export function getCurrencySymbol(
  currency: string = "INR"
): string {
  const symbols: Record<string, string> = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CNY: "¥",
    AUD: "A$",
    CAD: "C$",
    SGD: "S$",
    AED: "د.إ",
    CHF: "CHF ",
  };

  return symbols[currency] ?? `${currency} `;
}