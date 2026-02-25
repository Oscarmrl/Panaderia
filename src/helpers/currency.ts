// Formatea cantidades en Lempiras (HNL)
export const FormatHNL = (
  amountHNL: number,
  formatted = true
): string | number => {
  if (formatted) {
    return new Intl.NumberFormat("es-HN", {
      style: "currency",
      currency: "HNL",
    }).format(amountHNL);
  }

  return amountHNL;
};

// Alias para compatibilidad (eliminar eventualmente)
export const USDToHNL = FormatHNL;
