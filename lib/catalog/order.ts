import type { Product } from "./types";
import { formatPrice, resolvePrice } from "./pricing";
import { absoluteUrl, mailtoLink, whatsappLink } from "../site";

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

/**
 * "Get a quote" for a specific product, as an email.
 *
 * The client asked for this CTA to open an email rather than reveal a phone
 * number, so the button next to it is gone. The body is pre-structured with
 * the fields the sales team needs, which turns the first reply into an actual
 * quote instead of a round of questions.
 *
 * The recipient address comes from `lib/site.ts` — it is never written into a
 * component.
 */
export function buildQuoteEmailLink(product: Product): string {
  const price = product.startingPrice
    ? formatPrice(product.startingPrice)
    : "quote on request";

  return mailtoLink(
    `Quote request: ${product.name}`,
    [
      "Hello PrintPalash,",
      "",
      `I would like a quote for ${product.name}.`,
      "",
      "Quantity:",
      "Preferred options:",
      "Deadline:",
      "Do you have artwork ready? (yes / no):",
      "",
      `Price shown on the website: ${price}`,
      `Product page: ${absoluteUrl(`/products/${product.slug}`)}`,
      "",
      "Please confirm the final price and delivery time.",
      "",
      "Thank you.",
    ].join("\n")
  );
}

/** "Get a quote" for a service page, where there is no single product. */
export function buildServiceQuoteEmailLink(
  serviceName: string,
  servicePath: string
): string {
  return mailtoLink(
    `Quote request: ${serviceName}`,
    [
      "Hello PrintPalash,",
      "",
      `I would like a quote for ${serviceName.toLowerCase()}.`,
      "",
      "What I need printed:",
      "Quantity:",
      "Size:",
      "Finishing:",
      "Deadline:",
      "Do you have artwork ready? (yes / no):",
      "",
      `Service page: ${absoluteUrl(servicePath)}`,
      "",
      "Please send pricing, options and delivery time.",
      "",
      "Thank you.",
    ].join("\n")
  );
}
