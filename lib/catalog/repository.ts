import type { Category, Product } from "./types";
import { ALL_PRODUCTS } from "./products";
import { CATEGORIES, getCategory } from "./categories";
import { lowestUnitAmount } from "./pricing";
import { searchProducts, type SearchResult } from "./search";

/**
 * The single seam between the UI and wherever product data lives.
 *
 * Today every function reads from the local `ALL_PRODUCTS` array. When the
 * ASP.NET Core API arrives, only the bodies here change — swap the array reads
 * for `fetch` calls that return the same `Product` and `Category` shapes and
 * no component needs touching. The functions are already async for that
 * reason, and the synchronous variants below exist only for the places Next
 * needs data during static generation.
 */

const PUBLISHED = ALL_PRODUCTS.filter((p) => p.published);

const BY_SLUG = new Map(PUBLISHED.map((p) => [p.slug, p]));

const BY_CATEGORY = PUBLISHED.reduce<Map<string, Product[]>>((acc, product) => {
  const list = acc.get(product.categorySlug) ?? [];
  list.push(product);
  acc.set(product.categorySlug, list);
  return acc;
}, new Map());

/* ---------------------------------------------------------------- *
 * Synchronous accessors — used by generateStaticParams and sitemaps *
 * ---------------------------------------------------------------- */

export function listProductsSync(): Product[] {
  return PUBLISHED;
}

export function getProductSync(slug: string): Product | undefined {
  return BY_SLUG.get(slug);
}

export function listCategoriesSync(): Category[] {
  return CATEGORIES.filter((c) => (BY_CATEGORY.get(c.slug)?.length ?? 0) > 0);
}

/* ------------------------------------------- *
 * Async API — mirrors the future REST endpoints *
 * ------------------------------------------- */

export async function listProducts(): Promise<Product[]> {
  return PUBLISHED;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return BY_SLUG.get(slug);
}

export async function listCategories(): Promise<Category[]> {
  return listCategoriesSync();
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  return getCategory(slug);
}

export async function listProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  return listProductsByCategorySync(categorySlug);
}

export function listProductsByCategorySync(categorySlug: string): Product[] {
  const products = BY_CATEGORY.get(categorySlug) ?? [];
  return [...products].sort(
    (a, b) => lowestUnitAmount(a) - lowestUnitAmount(b)
  );
}

export async function listFeaturedProducts(limit = 12): Promise<Product[]> {
  return listFeaturedProductsSync(limit);
}

export function listFeaturedProductsSync(limit = 12): Product[] {
  return PUBLISHED.filter((p) => p.featured).slice(0, limit);
}

/**
 * Related products: explicit `relatedSlugs` first, then others from the same
 * category, then anything else — always filled to `limit` where possible.
 */
export function getRelatedProductsSync(product: Product, limit = 4): Product[] {
  const seen = new Set([product.slug]);
  const out: Product[] = [];

  const push = (candidate: Product | undefined) => {
    if (!candidate || seen.has(candidate.slug) || out.length >= limit) return;
    seen.add(candidate.slug);
    out.push(candidate);
  };

  for (const slug of product.relatedSlugs) push(BY_SLUG.get(slug));
  for (const sibling of listProductsByCategorySync(product.categorySlug)) {
    push(sibling);
  }
  for (const other of PUBLISHED) push(other);

  return out;
}

export async function getRelatedProducts(
  product: Product,
  limit = 4
): Promise<Product[]> {
  return getRelatedProductsSync(product, limit);
}

export function searchSync(query: string, limit?: number): SearchResult[] {
  return searchProducts(PUBLISHED, query, limit);
}

export async function search(
  query: string,
  limit?: number
): Promise<SearchResult[]> {
  return searchSync(query, limit);
}

/* ------------------------------- *
 * Data quality — developer-facing *
 * ------------------------------- */

export interface DataReviewItem {
  slug: string;
  name: string;
  published: boolean;
  source?: string;
  notes: string[];
}

/**
 * Every value that looked wrong in the source price list and was preserved or
 * withheld rather than guessed at. Surfaced at /data-review in development.
 */
export function getDataReviewItems(): DataReviewItem[] {
  return ALL_PRODUCTS.filter((p) => p.dataReview?.length).map((p) => ({
    slug: p.slug,
    name: p.name,
    published: p.published,
    source: p.sourceRef,
    notes: p.dataReview ?? [],
  }));
}
