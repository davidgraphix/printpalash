import type { MetadataRoute } from "next";

import { SERVICES } from "@/lib/services";
import { listCategoriesSync, listProductsSync } from "@/lib/catalog/repository";
import { SITE_URL } from "@/lib/site";

/**
 * Every indexable URL on the site, generated from the same data the pages
 * render from — so a new product or category cannot be published without also
 * appearing here.
 *
 * Deliberately excluded: /track-order and /get-a-quote form endpoints are
 * included because they are real landing pages, but API routes, the
 * development-only /data-review page and any unpublished product are not.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, changeFrequency: "daily" },
    { path: "/products", priority: 0.9, changeFrequency: "daily" },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/get-a-quote", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/track-order", priority: 0.4, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
    { path: "/money-back", priority: 0.3, changeFrequency: "yearly" },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  for (const category of listCategoriesSync()) {
    entries.push({
      url: `${SITE_URL}/products/category/${category.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  for (const product of listProductsSync()) {
    entries.push({
      url: `${SITE_URL}/products/${product.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  for (const service of SERVICES) {
    entries.push({
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return entries;
}
