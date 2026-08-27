import type { NextConfig } from "next";

const HOUR = 3_600;
/** One day, in seconds. */
const DAY = 86_400;

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Matches the breakpoints the product grids actually request, so Next
    // stops generating sizes nothing asks for.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [48, 64, 96, 128, 256, 384],
    /**
     * Optimised images were being served with
     * `Cache-Control: public, max-age=0, must-revalidate`, inherited from the
     * host's default headers on `/public`. That made every browser revalidate
     * every product image on every navigation, which is what made them feel
     * slow. A real TTL fixes that.
     *
     * One DAY rather than one year, deliberately. Product image URLs are not
     * content-hashed: the catalogue references literal paths like
     * `/product-images/bags/a4-paper-bag.jpg`, so replacing a photo reuses the
     * same URL. The optimiser caches its output against (url, width, quality)
     * only — it does not look at the source file's mtime or ETag — so a longer
     * TTL would pin a replaced photo for that entire period. Verified by
     * overwriting a source file and re-requesting: the optimiser kept serving
     * the old bytes, and kept doing so across a server restart.
     *
     * A day keeps the caching win while capping how long a swapped photo can
     * linger. If these files are ever content-hashed or version-stamped, this
     * can safely go back up to a year.
     */
    minimumCacheTTL: DAY,
  },

  // One canonical URL shape. Next's default is trailingSlash: false, stated
  // explicitly here so it cannot drift and create /products/ vs /products
  // duplicates.
  trailingSlash: false,

  poweredByHeader: false,

  async redirects() {
    return [
      // Renamed to match the price list, which lists this as a feather banner.
      {
        source: "/products/flag-banner",
        destination: "/products/feather-banner",
        permanent: true,
      },
      // This route rendered every product's full detail page on one URL,
      // duplicating the entire catalogue's content. Removed; send the traffic
      // to the shop.
      {
        source: "/product-specification",
        destination: "/products",
        permanent: true,
      },
      // The old placeholder category route never rendered products.
      {
        source: "/products/category",
        destination: "/products",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      /**
       * Caching for the raw image files, which the optimiser also reads when
       * deciding what to put on its own output.
       *
       * NOT `immutable`, and not a year. Both of these paths serve literal,
       * non-versioned filenames straight out of `public/` — `/product-images/*`
       * is referenced by hard-coded path from the catalogue data, and the
       * `/assests/*` files used via `src="/assests/..."` are the same. A photo
       * can therefore be replaced at its existing URL, which is exactly how a
       * non-technical update would happen.
       *
       * `immutable` tells the browser never to revalidate, not even on a
       * reload, so a returning visitor would have been pinned to the old photo
       * for the full max-age with no way to clear it. An hour of freshness plus
       * stale-while-revalidate keeps repeat views instant, still removes the
       * per-navigation revalidation that made images feel slow, and lets a
       * replaced photo propagate quickly. ETags are already served, so the
       * revalidation itself is a cheap 304.
       *
       * The genuinely immutable assets — `/_next/static/*`, including the
       * content-hashed `/_next/static/media/*` files produced by static
       * imports — are handled by Next itself and are untouched here.
       */
      {
        source: "/product-images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${HOUR}, stale-while-revalidate=${DAY}`,
          },
        ],
      },
      {
        source: "/assests/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${HOUR}, stale-while-revalidate=${DAY}`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
