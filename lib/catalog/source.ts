/**
 * The catalogue, read from the API.
 *
 * Everything the public site knows about products now comes through here. It
 * replaces reading the TypeScript arrays in `products/`, which could only
 * change by editing code and redeploying — so a product edited in the admin
 * dashboard was invisible to the storefront no matter how long anyone waited.
 *
 * Three decisions worth stating, because each has a tempting wrong answer.
 *
 * **No fallback to the static catalogue.** When the API cannot be reached these
 * functions throw. The alternative — quietly serving the arrays that are still
 * in the repository — would show months-old prices as though they were current,
 * and nothing on the page would say so. A product page that fails to build is a
 * problem someone fixes; a product page quoting a withdrawn price is a problem
 * someone finds out about from a customer.
 *
 * **Tags, not just time.** Every request is tagged, so an admin save can
 * invalidate exactly what it changed through `revalidateTag`. The time-based
 * window is a backstop for anything that misses the webhook, not the primary
 * mechanism — waiting out a TTL is not "promptly".
 *
 * **Published only, decided upstream.** The API's public endpoints never return
 * a draft or archived product. This file does no filtering of its own, because
 * a second filter here would be a second place for the rule to be wrong, and
 * the one that matters is the one in front of the database.
 */

import {
  categoriesFromApi,
  productFromApi,
  type ApiCategory,
  type ApiProduct,
} from "./from-api";
import type { ProductCardView } from "./card";
import { getCategory } from "./categories";
import type { Category, Product } from "./types";

/* ------------------------------------------------------------------ *
 * Where the API is
 * ------------------------------------------------------------------ */

/**
 * Server-side only. `API_URL` first so the Next server can be pointed
 * somewhere different from the browser, then the public variable the admin
 * dashboard already needs.
 *
 * No localhost default in a production build, matching `lib/admin/config.ts`.
 * A deploy with neither variable set should fail loudly at build time rather
 * than spend every request dialling a port on the Vercel instance.
 */
function baseUrl(): string {
  const candidates = [process.env.API_URL, process.env.NEXT_PUBLIC_API_URL];

  for (const candidate of candidates) {
    const trimmed = candidate?.trim().replace(/\/+$/, "");
    if (trimmed) return trimmed;
  }

  if (process.env.NODE_ENV === "production") {
    throw new CatalogUnavailableError(
      "No API address is configured. Set API_URL or NEXT_PUBLIC_API_URL to the " +
        "backend's public URL and redeploy.",
    );
  }

  return "http://localhost:5080";
}

/* ------------------------------------------------------------------ *
 * Cache tags
 * ------------------------------------------------------------------ */

/** Everything catalogue-shaped. Invalidated by any product or category change. */
export const CATALOG_TAG = "catalog";

/** One product, so editing it does not rebuild the whole catalogue. */
export const productTag = (slug: string) => `product:${slug}`;

/**
 * How long a cached response stays fresh without a webhook.
 *
 * An hour, not a minute. Revalidation is push-based: the admin save tells the
 * site what changed. This only covers the case where that call was lost, and
 * polling every minute to cover a rare failure would mean the API serves the
 * whole catalogue sixty times an hour to answer "nothing changed".
 */
const FRESH_FOR_SECONDS = 3600;

/* ------------------------------------------------------------------ *
 * Failure
 * ------------------------------------------------------------------ */

/**
 * The API could not be reached, or answered in a way that cannot be rendered.
 *
 * Distinct from "that product does not exist", which is an ordinary 404 and is
 * returned as null. Conflating the two is how an outage turns into a sitemap
 * with no products in it and a set of 404s that search engines then act on.
 */
export class CatalogUnavailableError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "CatalogUnavailableError";
    this.status = status;
  }
}

const TIMEOUT_MS = 10_000;

async function getJson<T>(
  path: string,
  tags: string[],
): Promise<T | null> {
  const url = `${baseUrl()}${path}`;

  let response: Response;

  try {
    response = await fetch(url, {
      headers: { Accept: "application/json" },
      // A hung API must not hold a page render open indefinitely.
      signal: AbortSignal.timeout(TIMEOUT_MS),
      next: { tags, revalidate: FRESH_FOR_SECONDS },
    });
  } catch (caught) {
    throw new CatalogUnavailableError(
      `Could not reach the catalogue API at ${path}: ${
        caught instanceof Error ? caught.message : "unknown error"
      }`,
    );
  }

  // The one status that is not a failure. It means the product is not
  // published, or never existed, and the caller turns it into a 404.
  if (response.status === 404) return null;

  if (!response.ok) {
    throw new CatalogUnavailableError(
      `The catalogue API answered ${response.status} for ${path}.`,
      response.status,
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new CatalogUnavailableError(
      `The catalogue API returned a body that is not JSON for ${path}.`,
    );
  }
}

/** Throws rather than returning null, for paths where absence is not expected. */
async function getRequired<T>(path: string, tags: string[]): Promise<T> {
  const body = await getJson<T>(path, tags);

  if (body === null) {
    throw new CatalogUnavailableError(
      `The catalogue API has no resource at ${path}.`,
      404,
    );
  }

  return body;
}

/* ------------------------------------------------------------------ *
 * Cards
 *
 * The API's card payload already carries exactly what ProductCardView needs,
 * including the formatted price label and the quote fallback for a product
 * whose price is flagged for review. So the grid, the search results, the
 * related row and the popular row all read cards rather than whole products —
 * which is also why none of them has to download a catalogue to render.
 * ------------------------------------------------------------------ */

interface ApiCard {
  name: string;
  slug: string;
  categoryName: string;
  categorySlug: string;
  excerpt: string;
  priceLabel: string;
  imageUrl?: string | null;
  imageAlt?: string | null;
  featured?: boolean | null;
}

/** A card with the extra fields the grid filters on. */
export interface CatalogCard extends ProductCardView {
  categorySlug: string;
  featured: boolean;
}

const PLACEHOLDER_IMAGE = "/assests/printpalash-logo.png";

function toCard(dto: ApiCard): CatalogCard {
  return {
    slug: dto.slug,
    name: dto.name,
    categoryName: dto.categoryName,
    categorySlug: dto.categorySlug,
    excerpt: dto.excerpt ?? "",
    priceLabel: dto.priceLabel ?? "Request a quote",
    // A product with no image still has to render. The logo is a deliberate
    // stand-in rather than a broken image element.
    image: dto.imageUrl?.trim() || PLACEHOLDER_IMAGE,
    imageAlt: dto.imageAlt?.trim() || dto.name,
    featured: dto.featured ?? false,
  };
}

export interface CardQuery {
  category?: string;
  search?: string;
  /** The API clamps this to 200. */
  limit?: number;
}

export async function fetchCards({
  category,
  search,
  limit = 200,
}: CardQuery = {}): Promise<CatalogCard[]> {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (search) params.set("search", search);
  params.set("limit", String(limit));

  const rows = await getRequired<ApiCard[]>(
    `/api/catalog/products?${params}`,
    [CATALOG_TAG],
  );

  return rows.map(toCard);
}

export async function fetchRelatedCards(
  slug: string,
  limit = 4,
): Promise<CatalogCard[]> {
  const rows = await getRequired<ApiCard[]>(
    `/api/catalog/products/${encodeURIComponent(slug)}/related?limit=${limit}`,
    [CATALOG_TAG, productTag(slug)],
  );

  return rows.map(toCard);
}

/* ------------------------------------------------------------------ *
 * Products and categories
 * ------------------------------------------------------------------ */

/**
 * One product, or null when the API does not publish it.
 *
 * Null covers both "no such slug" and "not published", which the API
 * deliberately does not distinguish — telling an anonymous visitor that a slug
 * exists but is a draft is a disclosure in itself.
 */
export async function fetchProduct(slug: string): Promise<Product | null> {
  const dto = await getJson<ApiProduct>(
    `/api/catalog/products/${encodeURIComponent(slug)}`,
    [CATALOG_TAG, productTag(slug)],
  );

  if (dto === null) return null;

  return productFromApi(dto) ?? null;
}

/**
 * Which categories exist, and what is in them, from the API — merged with the
 * editorial copy that only exists in the repository.
 *
 * The database holds a category's name, slug, tagline, description and product
 * count. It does not hold the FAQ list, the SEO title, or the mapping from a
 * category to the service pages that relate to it. Those were written by hand,
 * they are rendered on every category page, and the FAQ list is also emitted as
 * FAQ structured data.
 *
 * So this takes the catalogue facts from the API and the prose from
 * `categories.ts`. Replacing the whole object with the API's version would
 * have silently removed the FAQ section and the related-services links from
 * fifteen pages, along with their markup — a migration quietly deleting
 * content it was never asked to touch.
 *
 * A category the static file does not know about still works: it keeps the
 * API's name and description and simply has no FAQs, which is what a category
 * created in the admin should look like until somebody writes some.
 */
export async function fetchCategories(): Promise<Category[]> {
  const rows = await getRequired<ApiCategory[]>(
    "/api/catalog/categories",
    [CATALOG_TAG],
  );

  return categoriesFromApi(rows).map(withEditorial);
}

function withEditorial(category: Category): Category {
  const editorial = getCategory(category.slug);

  if (!editorial) return category;

  return {
    ...category,
    // Prose and hand-written structure, from the repository.
    tagline: editorial.tagline || category.tagline,
    description: editorial.description || category.description,
    seo: editorial.seo,
    faqs: editorial.faqs,
    relatedServiceSlugs: editorial.relatedServiceSlugs,
    // Name and count stay the API's: renaming a category in the admin should
    // show up, and the count has to match what the grid actually renders.
    name: category.name,
    productCount: category.productCount,
  };
}

/** One category by slug, or null when the API does not publish it. */
export async function fetchCategory(slug: string): Promise<Category | null> {
  const wanted = slug.trim().toLowerCase();
  return (await fetchCategories()).find((c) => c.slug === wanted) ?? null;
}

/** Every published slug, for sitemap and static-param generation. */
export async function fetchProductSlugs(): Promise<string[]> {
  return (await fetchCards()).map((card) => card.slug);
}
