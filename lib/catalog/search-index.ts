import { listProductsSync } from "./repository";
import { toCardView, type ProductCardView } from "./card";
import { productHaystacks, scoreHaystacks, type Haystacks } from "./search";

/**
 * A pre-flattened, client-safe view of the catalogue.
 *
 * The header, hero and shop search boxes are client components. Shipping full
 * product objects to the browser would put every description, spec and FAQ
 * into the JavaScript bundle. This index carries only the card view plus the
 * three haystack strings the scorer needs.
 *
 * Because the card view comes from the same `toCardView` builder the server
 * grid uses, live search results and server-rendered results are guaranteed to
 * look identical — there is no second copy of product data.
 */
export interface SearchIndexEntry {
  card: ProductCardView;
  haystacks: Haystacks;
  featured: boolean;
}

export function buildSearchIndex(): SearchIndexEntry[] {
  return listProductsSync().map((product) => ({
    card: toCardView(product),
    haystacks: productHaystacks(product),
    featured: product.featured,
  }));
}

export function searchIndex(
  entries: SearchIndexEntry[],
  query: string,
  limit?: number
): SearchIndexEntry[] {
  const scored = entries
    .map((entry) => ({
      entry,
      score: scoreHaystacks(entry.haystacks, query, entry.featured ? 1 : 0),
    }))
    .filter((row) => row.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || a.entry.card.name.localeCompare(b.entry.card.name)
    )
    .map((row) => row.entry);

  return typeof limit === "number" ? scored.slice(0, limit) : scored;
}
