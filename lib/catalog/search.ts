import type { Product } from "./types";
import { getCategory } from "./categories";

/**
 * Product search.
 *
 * The previous implementation did a raw `includes()` on the lowercased query,
 * so "business cards" missed "Business Card", "t shirt" missed "T-Shirt" and
 * "wedding" missed the wedding programme. This module normalises both sides,
 * matches per token rather than on the whole string, and maps the words
 * customers actually type onto the words the catalogue uses.
 */

/** Lowercase, strip punctuation, collapse whitespace. */
export function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Crude but effective singularisation so "cards" matches "card" and
 * "boxes" matches "box". Deliberately conservative — it only strips endings
 * that are unambiguous.
 */
function singularize(token: string): string {
  if (token.length <= 3) return token;
  if (token.endsWith("ies")) return `${token.slice(0, -3)}y`;
  if (token.endsWith("ses") || token.endsWith("xes") || token.endsWith("ches"))
    return token.slice(0, -2);
  if (token.endsWith("s") && !token.endsWith("ss")) return token.slice(0, -1);
  return token;
}

/**
 * A lone single character is a legitimate prefix search — typing "p" should
 * start showing paper bags, posters and polos straight away. A single
 * character sitting next to other words is noise, though: the "t" in
 * "t shirt" would otherwise match half the catalogue, so it is dropped.
 */
export function tokenize(value: string): string[] {
  const raw = normalize(value).split(" ").filter(Boolean);
  const kept = raw.length === 1 ? raw : raw.filter((token) => token.length > 1);
  return kept.map(singularize);
}

/**
 * Words customers type mapped to words that appear in the catalogue.
 * Kept small and specific — this is a vocabulary bridge, not a thesaurus.
 */
const SYNONYMS: Record<string, string[]> = {
  tshirt: ["shirt", "tee"],
  tee: ["shirt"],
  shirt: ["polo", "tshirt"],
  polo: ["shirt"],
  cloth: ["clothing", "apparel"],
  clothe: ["clothing", "apparel"],
  wear: ["clothing", "apparel"],
  merch: ["clothing", "apparel", "souvenir"],
  uniform: ["polo", "shirt", "apparel"],
  print: ["printing"],
  printing: ["print"],
  complimentary: ["business", "card"],
  visiting: ["business", "card"],
  handbill: ["flyer"],
  leaflet: ["flyer", "brochure"],
  pamphlet: ["brochure"],
  booklet: ["brochure"],
  profile: ["brochure"],
  nylon: ["poly", "bag"],
  cellophane: ["poly", "bag"],
  carton: ["box", "packaging"],
  packaging: ["box", "pack"],
  pack: ["packaging"],
  wedding: ["invitation", "programme", "bridal"],
  bridal: ["wedding", "invitation"],
  invite: ["invitation"],
  iv: ["invitation"],
  burial: ["funeral"],
  obituary: ["funeral"],
  memorial: ["funeral"],
  jotter: ["notebook"],
  diary: ["notebook"],
  biro: ["pen"],
  cup: ["mug"],
  mug: ["cup"],
  cap: ["hat"],
  hat: ["cap"],
  banner: ["rollup", "roll", "flag"],
  rollup: ["banner"],
  standee: ["banner", "rollup"],
  signage: ["banner", "sticker"],
  decal: ["sticker"],
  label: ["sticker", "tag"],
  souvenir: ["gift", "keyring", "mug"],
  gift: ["souvenir"],
  giveaway: ["souvenir", "gift"],
  letterhead: ["letterhead", "stationery"],
  stationery: ["letterhead", "folder", "pen"],
  id: ["identity", "card"],
  paperbag: ["paper", "bag"],
  headwear: ["cap", "hat"],
};

function expand(tokens: string[]): Set<string> {
  const out = new Set<string>();
  for (const token of tokens) {
    out.add(token);
    for (const extra of SYNONYMS[token] ?? []) out.add(singularize(extra));
  }
  return out;
}

/**
 * Weighted haystacks: a hit in the name counts for far more than a hit
 * somewhere in the description.
 */
export interface Haystacks {
  name: string;
  category: string;
  body: string;
}

/** Flattens a product into the three haystacks the scorer reads. */
export function productHaystacks(product: Product): Haystacks {
  const category = getCategory(product.categorySlug);
  return {
    name: normalize(product.name),
    category: normalize(
      [category?.name, category?.tagline].filter(Boolean).join(" ")
    ),
    body: normalize(
      [
        product.shortDescription,
        product.description,
        product.specs.material,
        product.specs.finishing,
        product.specs.size,
        product.searchTerms.join(" "),
        product.optionGroups
          .flatMap((g) => g.options.map((o) => o.label))
          .join(" "),
      ]
        .filter(Boolean)
        .join(" ")
    ),
  };
}

/** Matches a token against a haystack on word boundaries, allowing plurals. */
function haystackHas(haystack: string, token: string): boolean {
  if (!token) return false;
  // Word-boundary match that also accepts the plural form of the token.
  const pattern = new RegExp(
    `(^| )${token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(e?s)?( |$)`
  );
  return pattern.test(haystack);
}

/**
 * Matches a token against the *start of any word* in the haystack.
 *
 * This is what makes live search feel instant: "p" matches "Paper Bag" and
 * "Pizza Box" but not the "p" buried inside "shopping". A bare `includes`
 * would match both, which is why prefix matching is used for short tokens.
 */
function startsWord(haystack: string, token: string): boolean {
  if (!token) return false;
  const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^| )${escaped}`).test(haystack);
}

/**
 * Scores one item's haystacks against a query.
 *
 * Returns 0 when any query token fails to match anywhere, so
 * "wedding invitation" does not return every invitation plus every wedding
 * item — both words have to land.
 */
export function scoreHaystacks(
  haystacks: Haystacks,
  query: string,
  bonus = 0
): number {
  const tokens = tokenize(query);
  if (tokens.length === 0) return 0;

  let total = 0;

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    // Only the final token can still be half-typed, so only it gets prefix
    // treatment. Earlier tokens in "business car" are complete words.
    const isTrailing = index === tokens.length - 1;
    let best = 0;

    for (const candidate of expand([token])) {
      // A relevance ladder keyed off how much the customer has actually typed.
      // One or two characters is far too little to search inside descriptions
      // with, so short tokens only look at names and categories.
      const searchBody = candidate.length >= 3;
      const allowInfix = candidate.length >= 4;

      // Name — the strongest signal.
      if (haystackHas(haystacks.name, candidate)) best = Math.max(best, 10);
      else if (isTrailing && startsWord(haystacks.name, candidate)) {
        best = Math.max(best, 8);
      } else if (allowInfix && haystacks.name.includes(candidate)) {
        best = Math.max(best, 6);
      }

      // Category name and tagline. Prefix matching here is gated on the same
      // three-character threshold as the body: on one or two letters a tagline
      // hit would drag in every product in that category.
      if (haystackHas(haystacks.category, candidate)) best = Math.max(best, 4);
      else if (searchBody && isTrailing && startsWord(haystacks.category, candidate)) {
        best = Math.max(best, 3);
      }

      // Description, specifications and customer-vocabulary terms.
      if (searchBody) {
        if (haystackHas(haystacks.body, candidate)) best = Math.max(best, 2);
        else if (isTrailing && startsWord(haystacks.body, candidate)) {
          best = Math.max(best, 1.5);
        } else if (allowInfix && haystacks.body.includes(candidate)) {
          best = Math.max(best, 1);
        }
      }
    }

    if (best === 0) return 0;
    total += best;
  }

  // Nudge an exact phrase match in the name to the top.
  if (haystacks.name.includes(normalize(query))) total += 8;

  return total + bonus;
}

export interface SearchResult {
  product: Product;
  score: number;
}

export function searchProducts(
  products: Product[],
  query: string,
  limit?: number
): SearchResult[] {
  const results: SearchResult[] = [];

  for (const product of products) {
    const score = scoreHaystacks(
      productHaystacks(product),
      query,
      product.featured ? 1 : 0
    );
    if (score > 0) results.push({ product, score });
  }

  results.sort(
    (a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name)
  );

  return typeof limit === "number" ? results.slice(0, limit) : results;
}
