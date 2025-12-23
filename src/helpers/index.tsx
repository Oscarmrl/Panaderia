export function FormatCurrency(number: number) {
  return new Intl.NumberFormat("es-HN", {
    style: "currency",
    currency: "HNL",
  }).format(number);
}
