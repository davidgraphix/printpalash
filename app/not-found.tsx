import Link from "next/link";
import SiteChrome from "@/components/Site/SiteChrome";
import type { Metadata } from "next";

import { CATEGORIES } from "@/lib/catalog/categories";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for is not available on PrintPalash.",
  robots: { index: false, follow: true },
};

/**
 * Unmatched URLs.
 *
 * This lives at the root rather than inside the (site) group because a URL that
 * matches nothing never enters that group, so a not-found file there would only
 * cover notFound() calls from within real routes. It renders the site chrome
 * explicitly for the same reason: the root layout no longer provides it, and a
 * 404 with no header is a dead end on the one page a lost visitor is most
 * likely to hit.
 */
export default function NotFound() {
  return (
    <SiteChrome withSearch={false}>
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16 text-center lg:py-24">
        <p className="text-5xl font-extrabold text-red-600">404</p>
        <h1 className="mt-2 text-2xl font-extrabold text-gray-900 lg:text-3xl">
          We could not find that page
        </h1>
        <p className="mx-auto mt-2 max-w-md text-gray-600">
          The link may be out of date. Everything we print is still here — pick
          a category below or search the full catalogue.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          <Link
            href="/products"
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Browse all products
          </Link>
          <Link
            href="/get-a-quote"
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-900 transition hover:border-red-300 hover:text-red-600"
          >
            Get a quote
          </Link>
        </div>

        <nav aria-label="Product categories" className="mx-auto mt-8 max-w-3xl">
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500">
            Product categories
          </h2>
          <ul className="mt-2.5 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/products/category/${category.slug}`}
                  className="inline-flex rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 transition hover:border-red-300 hover:text-red-600"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
    </SiteChrome>
  );
}
