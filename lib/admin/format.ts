/**
 * How money, dates and enum names are written across the admin.
 *
 * One place, because the alternative is a dashboard where the same amount reads
 * "₦20,600", "N20600.00" and "20,600.00" on three screens, and a reader cannot
 * tell whether they are looking at the same number.
 */

import type { OrderStatus, PaymentStatus, PricingReviewStatus, Tone } from "./types";

/**
 * Naira, always with the symbol and always to two places.
 *
 * Never abbreviated to "₦1.2m". An admin reconciling a payment needs the exact
 * figure, and a rounded one on a financial screen is worse than useless.
 */
export function money(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return "—";

  return `₦${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** Whole naira, for places where the kobo are noise — card headlines only. */
export function moneyShort(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return "—";
  return `₦${Math.round(amount).toLocaleString("en-NG")}`;
}

export function number(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  return value.toLocaleString("en-NG");
}

/** "12 Sep 2026" — unambiguous, unlike any all-numeric format. */
export function date(value: string | null | undefined): string {
  if (!value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function dateTime(value: string | null | undefined): string {
  if (!value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";

  return `${date(value)}, ${parsed.toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

/** "3 days ago". Relative time is what a list of recent things wants. */
export function relative(value: string | null | undefined): string {
  if (!value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";

  const seconds = Math.round((Date.now() - parsed.getTime()) / 1000);
  if (seconds < 60) return "just now";

  const steps: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.35, "week"],
    [12, "month"],
  ];

  let amount = seconds / 60;
  let unit: Intl.RelativeTimeFormatUnit = "minute";

  for (const [divisor, next] of steps) {
    if (Math.abs(amount) < divisor) break;
    amount /= divisor;
    unit = next;
  }

  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
    -Math.round(amount),
    unit,
  );
}

/** "PendingPayment" → "Pending Payment". */
/**
 * Names that must not be split on their internal capital.
 *
 * The general rule turns "InProduction" into "In Production", which is what we
 * want everywhere except proper nouns: it also turned "WhatsApp" into
 * "Whats App", and printed it that way on a customer invoice.
 */
const UNSPLIT: Record<string, string> = {
  WhatsApp: "WhatsApp",
  WalkIn: "Walk-in",
  PhoneCall: "Phone call",
  POS: "POS",
  Pos: "POS",
};

export function spaced(value: string): string {
  return UNSPLIT[value] ?? value.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
}

/* ------------------------------------------------------------------ *
 * Status colour
 *
 * Defined once so a status looks the same on every screen. Tone carries meaning
 * — amber for waiting on somebody, blue for work in progress, green for done,
 * red for money owed or an order lost — but never carries it alone: every badge
 * shows its label too.
 * ------------------------------------------------------------------ */

export function orderStatusTone(status: OrderStatus): Tone {
  switch (status) {
    case "PendingPayment":
      return "warning";
    case "Proofing":
    case "InProduction":
    case "QualityCheck":
      return "info";
    case "ReadyForDispatch":
    case "OutForDelivery":
      return "info";
    case "Completed":
      return "success";
    case "Cancelled":
    case "Refunded":
      return "danger";
    default:
      return "neutral";
  }
}

export function paymentStatusTone(status: PaymentStatus): Tone {
  switch (status) {
    case "FullyPaid":
      return "success";
    case "PartiallyPaid":
      return "warning";
    case "Unpaid":
      return "danger";
    case "Refunded":
      return "neutral";
    default:
      return "neutral";
  }
}

export function productStatusTone(status: string): Tone {
  switch (status) {
    case "Published":
      return "success";
    case "Draft":
      return "warning";
    case "Unpublished":
    case "Archived":
      return "neutral";
    default:
      return "neutral";
  }
}

export function pricingReviewTone(status: PricingReviewStatus): Tone {
  switch (status) {
    case "Confirmed":
      return "success";
    case "ManuallyApproved":
      return "info";
    case "NeedsReview":
      return "danger";
    case "NoPricePublished":
      return "neutral";
    default:
      return "neutral";
  }
}

/** Wording a person reads, rather than the enum name. */
export const PRICING_REVIEW_LABELS: Record<PricingReviewStatus, string> = {
  Confirmed: "Confirmed",
  NeedsReview: "Needs review",
  NoPricePublished: "No published price",
  ManuallyApproved: "Manually approved",
};

export const PRICING_REVIEW_MEANING: Record<PricingReviewStatus, string> = {
  Confirmed: "Quoted automatically from the published price.",
  NeedsReview:
    "Blocked from automatic quotes until someone confirms the figure. The price is " +
    "preserved exactly as the source published it.",
  NoPricePublished: "No price in the source. Quoted per job.",
  ManuallyApproved: "A person checked the flagged price and approved it for quoting.",
};

/**
 * The price basis, written the way the catalogue means it.
 *
 * Never a bare amount: "₦22,000" alone reads as the price of one bag, and the
 * whole pricing model depends on it not being read that way.
 */
/**
 * A unit, pluralised for the quantity beside it.
 *
 * Shared with priceBasis so the job card and the invoice never disagree about
 * whether ten of something are "box" or "boxes".
 */
export function pluralUnit(unit: string, quantity: number): string {
  if (quantity === 1 || !unit.trim()) return unit;
  return /(s|x|z|ch|sh)$/i.test(unit.trim()) ? `${unit}es` : `${unit}s`;
}

export function priceBasis(
  amount: number | null,
  quantity: number,
  unit: string,
): string {
  if (amount === null) return "Quoted per job";

  const plural = pluralUnit(unit, quantity);

  return quantity === 1
    ? `${money(amount)} per ${unit}`
    : `${money(amount)} per ${number(quantity)} ${plural}`;
}

/** A WhatsApp deep link with a message already written, per the specification. */
export function whatsAppLink(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
