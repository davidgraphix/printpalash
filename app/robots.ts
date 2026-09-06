import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Public pages, product images and the CSS/JS Google needs to render the site
 * are all crawlable. Only API routes, the development-only data review page and
 * the staff dashboard are disallowed.
 *
 * The admin also sends `noindex, nofollow` in its own metadata, which is the
 * instruction that actually keeps it out of an index — robots.txt is a request
 * a crawler may ignore, and it is publicly readable, so it announces the path
 * rather than hiding it. Both are here because they fail differently: this
 * stops well-behaved crawlers spending budget on pages they cannot render, and
 * the meta tag stops anything that crawls anyway from indexing what it finds.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/data-review", "/admin"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
