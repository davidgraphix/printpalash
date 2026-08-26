import type { MetadataRoute } from "next";

import { SERVICES } from "@/lib/services";
import { listCategoriesSync, listProductsSync } from "@/lib/catalog/repository";
import { SITE_URL } from "@/lib/site";

/**
 * Every indexable URL on the site, generated from the same data the pages
 * render from — so a new product or category cannot be published without also
 * appearing here.
 *
 * Deliberately excluded:
 *  - API routes and the development-only /data-review page
 *  - unpublished products
 *  - `?search=` result URLs, which are noindex and canonicalise to /products
 *
 * No `lastModified` is emitted. The previous version stamped `new Date()` on
 * every entry, which told Google that all 141 URLs changed on every deploy.
 * That is untrue, and Google's documented behaviour is to start ignoring
 * lastmod from sites that report it inaccurately. There is no per-page change
 * tracking in the catalogue to derive a real value from, so the honest option
 * is to omit it and let Google use its own change detection. Add it back per
 * URL once the admin dashboard can record when a product was actually edited.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: {
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

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  for (const category of listCategoriesSync()) {
    entries.push({
      url: `${SITE_URL}/products/category/${category.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const product of listProductsSync()) {
    entries.push({
      url: `${SITE_URL}/products/${product.slug}`,
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
