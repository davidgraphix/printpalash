import type { NextConfig } from "next";

/** One year, in seconds. */
const YEAR = 31_536_000;

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
     * every product image on every navigation.
     *
     * Product images are immutable in practice — a changed photo gets a new
     * file — so they are cached for a year. Redeploying with a new image at the
     * same path still busts the cache because the optimiser keys on the source
     * file, and a hard purge is available from the hosting dashboard.
     */
    minimumCacheTTL: YEAR,
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
       * Long-lived caching for the raw image files. The image optimiser reads
       * the upstream `Cache-Control` when deciding what to put on its own
       * output, so setting it here fixes both the direct requests and the
       * optimised variants.
       */
      {
        source: "/product-images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${YEAR}, immutable`,
          },
        ],
      },
      {
        source: "/assests/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${YEAR}, immutable`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
