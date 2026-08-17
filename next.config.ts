import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Matches the breakpoints the product grids actually request, so Next
    // stops generating sizes nothing asks for.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [48, 64, 96, 128, 256, 384],
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
    ];
  },
};

export default nextConfig;
