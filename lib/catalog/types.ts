/**
 * Catalog domain model.
 *
 * These interfaces are deliberately transport-agnostic: they describe what a
 * product *is*, not where it came from. The local data files in
 * `lib/catalog/products/` are one implementation; a REST response from the
 * ASP.NET Core API is another. Only `lib/catalog/repository.ts` should ever
 * need to change when the backend arrives.
 */

export type CurrencyCode = "NGN";

/**
 * A published price, kept faithful to the printed price list.
 *
 * The price list quotes things like "STARTING FROM ₦24,000 PER 100PCS", so a
 * bare number is not enough — `amount` always belongs to `quantity` × `unit`.
 * Never render `amount` on its own as the price of a single item.
 */
export interface PriceQuote {
  /** Advertised amount, exactly as printed in the price list. */
  amount: number;
  currency: CurrencyCode;
  /** Number of units the amount covers. `1` means the amount is per unit. */
  quantity: number;
  /** Singular name of one unit: "piece", "bundle", "set", "pack". */
  unit: string;
  /**
   * True when the price list presents this as a "starting from" figure, i.e.
   * the real price depends on artwork, finishing and final quantity.
   */
  isStartingFrom: boolean;
  /** Qualifier printed alongside the price, e.g. "for 12oz cups". */
  note?: string;
}

/** One selectable choice inside an option group. */
export interface ProductOption {
  id: string;
  label: string;
  /** Present when choosing this option changes the published price. */
  price?: PriceQuote;
  /** Extra detail shown under the label, e.g. exact dimensions. */
  detail?: string;
}

export interface ProductOptionGroup {
  id: string;
  label: string;
  /** When true, the selected option's `price` replaces the base price. */
  affectsPrice: boolean;
  options: ProductOption[];
}

/** Specifications as published in the price list. */
export interface ProductSpecs {
  size?: string;
  material?: string;
  finishing?: string;
  design?: string;
  pages?: string;
  branding?: string;
}

export interface DeliveryInfo {
  /** Turnaround for delivery inside Lagos. */
  lagos?: string;
  /** Turnaround for other states / nationwide. */
  nationwide?: string;
}

export interface ProductImage {
  src: string;
  /** Describes what is actually in the frame. Never keyword-stuffed. */
  alt: string;
  width?: number;
  height?: number;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface ProductSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface Product {
  /** Stable identifier — doubles as the SKU in structured data. */
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  brand?: string;
  shortDescription: string;
  description: string;

  /**
   * Lowest published price for the product. Undefined when the price list
   * does not publish one; the UI then asks the customer for a quote rather
   * than showing an invented figure.
   */
  startingPrice?: PriceQuote;

  specs: ProductSpecs;
  delivery: DeliveryInfo;
  optionGroups: ProductOptionGroup[];

  image: ProductImage;
  gallery: ProductImage[];

  featured: boolean;
  published: boolean;

  seo: ProductSeo;
  /** Explicit related products; the repository falls back to same-category. */
  relatedSlugs: string[];
  faqs: ProductFAQ[];

  /** Extra terms customers actually type. Feeds search, never rendered. */
  searchTerms: string[];

  /** Page of the supplied price list this record was transcribed from. */
  sourceRef?: string;
  /**
   * Developer-facing notes about values that looked wrong in the source but
   * were preserved rather than guessed at. Never rendered to customers.
   */
  dataReview?: string[];
}

export interface Category {
  slug: string;
  name: string;
  /** Short line used on category cards. */
  tagline: string;
  description: string;
  seo: ProductSeo;
  /** Genuine FAQs shown on the category page and mirrored into FAQ JSON-LD. */
  faqs: ProductFAQ[];
  /** Service slugs from `lib/services.ts` that relate to this category. */
  relatedServiceSlugs: string[];
}
