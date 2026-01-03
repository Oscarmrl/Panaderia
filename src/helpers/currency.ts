const LEMPIRA_RATE = 27.5; // tasa fija USD → HNL

export const USDToHNL = (
  amountUSD: number,
  formatted = true
): string | number => {
  const amountHNL = amountUSD * LEMPIRA_RATE;

  if (formatted) {
    return new Intl.NumberFormat("es-HN", {
      style: "currency",
      currency: "HNL",
    }).format(amountHNL);
  }

  return amountHNL;
};
