/**
 * Cache tags on the catalogue reads.
 *
 * The API flushes the storefront by tag. After a bulk import it sends no slug,
 * which flushes `catalog` alone — so every read that feeds a public page has to
 * carry that tag, or the page it feeds keeps serving pre-import content and
 * nothing anywhere reports a problem.
 *
 * That is not hypothetical. The production catalogue was restored by a direct
 * import, the storefront went on serving renders made while the database was
 * empty, and the shop had no products on it until the caches expired.
 *
 * Asserted against the source because the tags are build-time arguments to
 * fetch, invisible at runtime. A new read added without a tag is exactly the
 * kind of omission that is impossible to notice by looking at the site.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync("lib/catalog/source.ts", "utf8");
const sitemap = readFileSync("app/sitemap.ts", "utf8");

/** Every `tags` array literal passed to the request helpers. */
function tagLists() {
  return [...source.matchAll(/\[\s*(CATALOG_TAG[^\]]*)\]/g)].map((m) =>
    m[1].replace(/\s+/g, " ").trim(),
  );
}

test("every tagged read includes the shared catalogue tag", () => {
  const lists = tagLists();

  assert.ok(lists.length >= 4, `expected at least four tagged reads, found ${lists.length}`);

  for (const list of lists) {
    assert.ok(
      list.startsWith("CATALOG_TAG"),
      `a read is tagged "${list}" without CATALOG_TAG`,
    );
  }
});

test("no request helper is called without tags", () => {
  // getJson and getRequired both take tags as a required argument. A call that
  // passed an empty array would type-check and silently escape every flush.
  assert.doesNotMatch(source, /get(?:Json|Required)<[^>]*>\(\s*`[^`]*`\s*,\s*\[\s*\]\s*\)/);
});

test("the four public surfaces all read through tagged functions", () => {
  // Listings and search, product details, related rows, categories.
  for (const fn of [
    "export async function fetchCards",
    "export async function fetchProduct",
    "export async function fetchRelatedCards",
    "export async function fetchCategories",
  ]) {
    assert.ok(source.includes(fn), `${fn} is missing`);
  }
});

test("product details carry both the shared tag and their own", () => {
  // The shared tag is what a bulk import flushes; the per-product tag is what a
  // single admin edit flushes. A product page needs both or one of those two
  // paths misses it.
  const lists = tagLists();
  const perProduct = lists.filter((l) => l.includes("productTag("));

  assert.ok(perProduct.length >= 2, "expected product and related reads to be tagged per product");

  for (const list of perProduct) {
    assert.ok(list.startsWith("CATALOG_TAG"), `"${list}" omits the shared tag`);
  }
});

test("the sitemap is built from tagged reads", () => {
  // The sitemap was the surface that stayed stale longest after the import,
  // because it is cached and nothing had flushed it.
  assert.match(sitemap, /fetchCards\(/);
  assert.match(sitemap, /fetchCategories\(/);
  assert.doesNotMatch(sitemap, /ALL_PRODUCTS|listProductsSync|listCategoriesSync/);
});

test("the shared tag name matches the one the API sends", () => {
  // The API posts no slug for a bulk import, and the route maps that to
  // CATALOG_TAG. If this string ever changes, both sides have to change.
  assert.match(source, /export const CATALOG_TAG = "catalog"/);
});
