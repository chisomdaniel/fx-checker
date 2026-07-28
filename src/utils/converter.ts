export function convertCurrency(amount: number, rate: number): number {
  return parseFloat((amount * rate).toFixed(2));
}
