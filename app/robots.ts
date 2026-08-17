import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Public pages, product images and the CSS/JS Google needs to render the site
 * are all crawlable. Only API routes and the development-only data review page
 * are disallowed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/data-review"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
