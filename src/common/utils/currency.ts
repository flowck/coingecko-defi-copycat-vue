export function numberToCurrency(value: number, currency: string): string {
  const options = { style: "currency", currency };
  try {
    return value ? value.toLocaleString("us-EN", options) : "";
  } catch {
    return value.toString();
  }
}
