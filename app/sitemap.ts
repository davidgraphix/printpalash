import type { MetadataRoute } from "next";

import { SERVICES } from "@/lib/services";
import { fetchCards, fetchCategories } from "@/lib/catalog/source";
import { SITE_URL } from "@/lib/site";

/**
 * Every indexable URL, with products and categories read from the API so the
 * sitemap follows the catalogue rather than the last deployment.
 *
 * Deliberately excluded:
 *  - API routes and the development-only /data-review page
 *  - unpublished products, which the API's public endpoints never return
 *  - `?search=` result URLs, which are noindex and canonicalise to /products
 *
 * No `lastModified` is emitted. An earlier version stamped `new Date()` on
 * every entry, which told Google that all 141 URLs changed on every deploy.
 * That is untrue, and Google's documented response to inaccurate lastmod is to
 * start ignoring it. There is still no per-product edit timestamp on the public
 * payload to derive a real value from, so it stays omitted. Add it per URL once
 * the API exposes when a product was actually last changed.
 */
export const revalidate = 3600;

const STATIC_ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/products", priority: 0.9, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/get-a-quote", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/track-order", priority: 0.4, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/money-back", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /*
   * Both reads are awaited together and neither failure is caught.
   *
   * Catching would produce a valid-looking sitemap containing eleven static
   * pages and no catalogue — which does not read as "the API is down", it reads
   * as "those hundred product pages were removed". Google acts on that, and
   * recovering the index afterwards takes far longer than the outage did.
   *
   * Letting it throw makes the route answer 500. A crawler treats that as a
   * transient failure, keeps what it already has, and comes back.
   */
  const [cards, categories] = await Promise.all([
    fetchCards(),
    fetchCategories(),
  ]);

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Only categories that actually have something in them. An empty category
  // page is a thin page, and listing it invites Google to crawl and then
  // discard it.
  for (const category of categories) {
    if (category.productCount === 0) continue;

    entries.push({
      url: `${SITE_URL}/products/category/${category.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const card of cards) {
    entries.push({
      url: `${SITE_URL}/products/${card.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const service of SERVICES) {
    entries.push({
      url: `${SITE_URL}/services/${service.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return entries;
}
