import { getCategory } from "./categories";
import { formatPriceShort } from "./pricing";
import { listProductsSync } from "./repository";
import { productHaystacks, scoreHaystacks, type Haystacks } from "./search";

/**
 * A pre-flattened, client-safe view of the catalogue.
 *
 * The header and hero search boxes are client components. Shipping the full
 * product objects to the browser would put the entire catalogue — every
 * description, spec and FAQ — into the JavaScript bundle. This index carries
 * only what the dropdown renders plus the three haystack strings the scorer
 * needs, which is a fraction of the size.
 */
export interface SearchIndexEntry {
  slug: string;
  name: string;
  categoryName: string;
  categorySlug: string;
  priceLabel: string;
  image: string;
  imageAlt: string;
  haystacks: Haystacks;
  featured: boolean;
}

export function buildSearchIndex(): SearchIndexEntry[] {
  return listProductsSync().map((product) => ({
    slug: product.slug,
    name: product.name,
    categoryName: getCategory(product.categorySlug)?.name ?? "Products",
    categorySlug: product.categorySlug,
    priceLabel: product.startingPrice
      ? formatPriceShort(product.startingPrice)
      : "Request a quote",
    image: product.image.src,
    imageAlt: product.image.alt,
    haystacks: productHaystacks(product),
    featured: product.featured,
  }));
}

export function searchIndex(
  entries: SearchIndexEntry[],
  query: string,
  limit = 6
): SearchIndexEntry[] {
  return entries
    .map((entry) => ({
      entry,
      score: scoreHaystacks(entry.haystacks, query, entry.featured ? 1 : 0),
    }))
    .filter((row) => row.score > 0)
    .sort(
      (a, b) => b.score - a.score || a.entry.name.localeCompare(b.entry.name)
    )
    .slice(0, limit)
    .map((row) => row.entry);
}
