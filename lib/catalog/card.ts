import type { Product } from "./types";
import { formatPriceShort } from "./pricing";
import { getCategory } from "./categories";

/**
 * The minimal shape a product card needs.
 *
 * Cards deliberately carry far less than a `Product`: name, a very short
 * excerpt, the starting price and one image. Specifications, materials,
 * finishing, sizes, options and FAQs stay on the product detail page — the
 * grid is for scanning, not for reading.
 *
 * Having one view type also means the server-rendered grid and the live search
 * results render from the same builder, so there is no second copy of product
 * data anywhere in the client bundle.
 */
export interface ProductCardView {
  slug: string;
  name: string;
  categoryName: string;
  /** One short line. Never the full description. */
  excerpt: string;
  /** Already formatted with its quantity basis, or the quote fallback. */
  priceLabel: string;
  image: string;
  imageAlt: string;
}

const EXCERPT_MAX = 72;

/**
 * Trims a product's short description down to a single scannable line.
 * Cuts on a word boundary so the text never breaks mid-word.
 */
export function toExcerpt(text: string, max = EXCERPT_MAX): string {
  const firstSentence = text.split(/(?<=\.)\s/)[0] ?? text;
  const clean = firstSentence.replace(/\.$/, "").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

export function toCardView(product: Product): ProductCardView {
  return {
    slug: product.slug,
    name: product.name,
    categoryName: getCategory(product.categorySlug)?.name ?? "Products",
    excerpt: toExcerpt(product.shortDescription),
    priceLabel: product.startingPrice
      ? formatPriceShort(product.startingPrice)
      : "Request a quote",
    image: product.image.src,
    imageAlt: product.image.alt,
  };
}
