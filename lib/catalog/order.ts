import type { Product } from "./types";
import { formatPrice, resolvePrice } from "./pricing";
import { absoluteUrl, whatsappLink } from "../site";

export interface OrderRequest {
  product: Product;
  customerName: string;
  customerPhone?: string;
  /** How many units the customer wants. */
  quantity: number;
  /** optionGroup id -> option id. */
  selectedOptions: Record<string, string>;
  /** Anything the customer typed into the notes field. */
  notes?: string;
}

/**
 * Builds the WhatsApp message for an order.
 *
 * Everything in here is customer-facing: product name, the options they
 * actually picked, the price as it was shown on the page, and the page URL so
 * the sales team can open exactly what the customer was looking at. No slugs,
 * option ids, internal totals or other implementation detail leaks through.
 *
 * The price line deliberately repeats the page's wording ("From ₦24,000 per
 * 100 pieces") rather than a computed total. The published figures are
 * "starting from" prices for a batch, so multiplying them by a quantity — as
 * the previous implementation did — produced totals that were wrong by orders
 * of magnitude.
 */
export function buildOrderMessage(request: OrderRequest): string {
  const { product, customerName, customerPhone, quantity, selectedOptions, notes } =
    request;

  const lines: string[] = ["Hello PrintPalash,"];

  const name = customerName.trim();
  lines.push(name ? `My name is ${name}.` : "I would like to place an order.");
  lines.push(`I want to order ${product.name}.`);
  lines.push("");

  lines.push(`Quantity: ${quantity.toLocaleString("en-NG")}`);

  // What the customer actually chose comes first.
  const chosenLabels = new Set<string>();
  for (const group of product.optionGroups) {
    const chosen = group.options.find((o) => o.id === selectedOptions[group.id]);
    if (!chosen) continue;
    chosenLabels.add(group.label.toLowerCase());
    lines.push(`${group.label}: ${chosen.label}`);
  }

  // Then the fixed specs — skipping any the customer already picked above,
  // so a bag with a size selector does not list "Size" twice with different
  // answers.
  const specLines: [string, string | undefined][] = [
    ["Material", product.specs.material],
    ["Size", product.specs.size],
    ["Finishing", product.specs.finishing],
  ];
  for (const [label, value] of specLines) {
    if (!value || chosenLabels.has(label.toLowerCase())) continue;
    lines.push(`${label}: ${value}`);
  }

  const price = resolvePrice(product, selectedOptions);
  lines.push(
    price
      ? `Price shown on the website: ${formatPrice(price)}`
      : "Price shown on the website: quote on request"
  );

  const phone = customerPhone?.trim();
  if (phone) lines.push(`My phone number: ${phone}`);

  const extra = notes?.trim();
  if (extra) {
    lines.push("");
    lines.push(`Additional details: ${extra}`);
  }

  lines.push("");
  lines.push(`Product page: ${absoluteUrl(`/products/${product.slug}`)}`);
  lines.push("");
  lines.push("Please confirm availability, final price and delivery time.");

  return lines.join("\n");
}

export function buildOrderLink(request: OrderRequest): string {
  return whatsappLink(buildOrderMessage(request));
}

/** Lighter message for the "Get a quote" CTA, where no options are chosen. */
export function buildQuoteLink(product: Product): string {
  return whatsappLink(
    [
      "Hello PrintPalash,",
      `I would like a quote for ${product.name}.`,
      "",
      "Please let me know the price, available options and delivery time.",
      "",
      `Product page: ${absoluteUrl(`/products/${product.slug}`)}`,
    ].join("\n")
  );
}
