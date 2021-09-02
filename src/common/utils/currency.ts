export function numberToCurrency(value: number, currency: string): string {
  const options = { style: "currency", currency };
  return value ? value.toLocaleString("us-EN", options) : "";
}
