import { listProductsSync } from "./repository";
import { toCardView, type ProductCardView } from "./card";
import {
  normalize,
  productHaystacks,
  scoreHaystacks,
  type Haystacks,
} from "./search";
import type { CatalogCard } from "./source";

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

/**
 * The same index, built from the API's card payload.
 *
 * Narrower than the product-based version on purpose, because a card is all
 * the listing endpoint returns. The haystacks lose the full description, the
 * specifications, the hand-written search terms and the variant labels, so a
 * search for "kraft" or "A2" no longer matches a product whose name does not
 * contain the word.
 *
 * That is the same limit the API's own server-side search has — it matches on
 * name, short description and category name — so the live dropdown and the
 * server-rendered results page now agree with each other. Fetching 104 full
 * products to rebuild the richer index would be 104 requests per page render,
 * which is a worse trade than a slightly blunter search.
 */
export function buildSearchIndexFromCards(
  cards: CatalogCard[],
): SearchIndexEntry[] {
  return cards.map((card) => ({
    card,
    haystacks: {
      name: normalize(card.name),
      category: normalize(card.categoryName),
      body: normalize(card.excerpt),
    },
    featured: card.featured,
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
