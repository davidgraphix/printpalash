import type { PriceQuote, Product } from "./types";

/**
 * Builds a "starting from" quote.
 *
 * @param amount   Amount exactly as printed in the price list.
 * @param quantity How many units the amount covers ("PER 100" -> 100).
 */
export function from(
  amount: number,
  quantity: number,
  unit = "piece",
  note?: string
): PriceQuote {
  return {
    amount,
    currency: "NGN",
    quantity,
    unit,
    isStartingFrom: true,
    ...(note ? { note } : {}),
  };
}

const NAIRA = "₦";

export function formatNaira(amount: number): string {
  return `${NAIRA}${amount.toLocaleString("en-NG")}`;
}

function pluralUnit(unit: string, quantity: number): string {
  if (quantity === 1) return unit;
  if (unit.endsWith("s") || unit.endsWith("ch")) return `${unit}es`;
  return `${unit}s`;
}

/** "per 100 pieces", "per bundle", "each". */
export function formatBasis(price: PriceQuote): string {
  if (price.quantity === 1) return `per ${price.unit}`;
  return `per ${price.quantity.toLocaleString("en-NG")} ${pluralUnit(
    price.unit,
    price.quantity
  )}`;
}

/**
 * Full customer-facing price label.
 * e.g. "From ₦24,000 per 100 pieces" — never just "₦24,000".
 */
export function formatPrice(price: PriceQuote): string {
  const base = `${formatNaira(price.amount)} ${formatBasis(price)}`;
  const withPrefix = price.isStartingFrom ? `From ${base}` : base;
  return price.note ? `${withPrefix} (${price.note})` : withPrefix;
}

/** Compact label for cards and search results. */
export function formatPriceShort(price: PriceQuote): string {
  return `From ${formatNaira(price.amount)} ${formatBasis(price)}`;
}

/**
 * Lowest published amount across the base price and every priced option,
 * normalised to a single-unit figure so different products can be compared.
 * Used for sorting only — never displayed.
 */
export function lowestUnitAmount(product: Product): number {
  const quotes: PriceQuote[] = [];
  if (product.startingPrice) quotes.push(product.startingPrice);
  for (const group of product.optionGroups) {
    if (!group.affectsPrice) continue;
    for (const option of group.options) {
      if (option.price) quotes.push(option.price);
    }
  }
  if (quotes.length === 0) return Number.POSITIVE_INFINITY;
  return Math.min(...quotes.map((q) => q.amount / q.quantity));
}

/**
 * The quote that applies once the customer has picked options.
 * Falls back to the product's base price when nothing priced is selected.
 */
export function resolvePrice(
  product: Product,
  selected: Record<string, string>
): PriceQuote | undefined {
  for (const group of product.optionGroups) {
    if (!group.affectsPrice) continue;
    const chosen = group.options.find((o) => o.id === selected[group.id]);
    if (chosen?.price) return chosen.price;
  }
  return product.startingPrice;
}

/**
 * Indicative total for a requested quantity, derived from the published
 * price basis. Rounded up to whole units of the basis because print runs are
 * quoted in batches — asking for 150 of a "per 100" item means two batches.
 */
export function estimateTotal(
  price: PriceQuote,
  requestedQuantity: number
): { batches: number; total: number; coveredQuantity: number } {
  const batches = Math.max(1, Math.ceil(requestedQuantity / price.quantity));
  return {
    batches,
    total: batches * price.amount,
    coveredQuantity: batches * price.quantity,
  };
}
