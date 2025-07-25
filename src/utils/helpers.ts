export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value) + " RWF";

export const formatShortDate = (date: Date): string =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
