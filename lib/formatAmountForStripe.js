export function formatAmountForStripe(amount, currency) {
  let numberFormat = new Intl.NumberFormat(["en-IN"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  });

  const parts = numberFormat.formatToParts(amount);

  let isDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === "decimal") {
      isDecimalCurrency = false;
    }
  }
  return isDecimalCurrency ? amount : Math.round(amount * 100);
}
