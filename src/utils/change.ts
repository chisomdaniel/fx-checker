export function calRatePercentageChange(
  startRate: number,
  endRate: number,
): number {
  const change = endRate - startRate;
  const changePercentage = (change / startRate) * 100;
  return parseFloat(changePercentage.toFixed(2));
}
