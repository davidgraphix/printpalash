import Link from "next/link";
import { Search } from "lucide-react";

import type { Category, Product } from "@/lib/catalog/types";
import ProductCard from "./ProductCard";

/**
 * The shop page.
 *
 * This is a server component on purpose. The previous version put the whole
 * grid inside a client component behind a Suspense boundary that depended on
 * `useSearchParams`, which meant the served HTML contained no products at all —
 * the single most important page for non-branded search was empty to crawlers,
 * and any hydration hiccup left real visitors with a blank page too.
 *
 * Search is a plain GET form and category filtering is a set of real links, so
 * every state of this page has its own URL, renders on the server, and works
 * with JavaScript disabled.
 */
export default function ProductsBrowser({
  products,
  categories,
  query,
  activeCategory,
}: {
  products: Product[];
  categories: Category[];
  query?: string;
  activeCategory?: Category;
}) {
  const trimmed = query?.trim() ?? "";
  const isFiltered = Boolean(trimmed || activeCategory);

  const groups = isFiltered
    ? []
    : categories
        .map((category) => ({
          category,
          items: products.filter((p) => p.categorySlug === category.slug),
        }))
        .filter((group) => group.items.length > 0);

  const categoryNav = (
    <ul className="space-y-1">
      <li>
        <Link
          href="/products"
          aria-current={!activeCategory ? "page" : undefined}
          className={`block rounded-lg px-3 py-2 text-sm transition ${
            !activeCategory
              ? "bg-red-50 font-bold text-red-600"
              : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
          }`}
        >
          All products
        </Link>
      </li>
      {categories.map((category) => (
        <li key={category.slug}>
          <Link
            href={`/products/category/${category.slug}`}
            aria-current={
              activeCategory?.slug === category.slug ? "page" : undefined
            }
            className={`block rounded-lg px-3 py-2 text-sm transition ${
              activeCategory?.slug === category.slug
                ? "bg-red-50 font-bold text-red-600"
                : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
            }`}
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="border-b bg-pink-50">
        <div className="container mx-auto px-4 py-5">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-600">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-red-600">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="font-medium text-gray-900">
                Products
              </li>
            </ol>
          </nav>

          <h1 className="mt-1 text-2xl font-extrabold text-gray-900 lg:text-3xl">
            Printing products in Lagos
          </h1>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-gray-700">
            Everything PrintPalash produces — bags, packaging, flyers, banners,
            apparel, invitations and corporate stationery. Every price shown is
            a starting price for the batch size listed beside it, not the price
            of a single item.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-6">
        <div className="flex gap-8">
          <aside className="hidden w-60 flex-shrink-0 lg:block">
            <nav
              aria-label="Product categories"
              className="sticky top-4 rounded-xl bg-white p-4 shadow-sm"
            >
              <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-gray-900">
                Shop by category
              </h2>
              {categoryNav}
            </nav>
          </aside>

          <div className="flex-1">
            {/* Mobile category filter — no JavaScript required. */}
            <details className="mb-4 rounded-xl bg-white p-4 shadow-sm lg:hidden">
              <summary className="cursor-pointer text-sm font-bold text-gray-900">
                Filter by category
                {activeCategory ? `: ${activeCategory.name}` : ""}
              </summary>
              <nav aria-label="Product categories" className="mt-3">
                {categoryNav}
              </nav>
            </details>

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-gray-900 lg:text-xl">
                  {trimmed
                    ? `Results for “${trimmed}”`
                    : activeCategory
                      ? activeCategory.name
                      : "All products"}
                </h2>
                <p className="mt-0.5 text-sm text-gray-500">
                  {products.length} product{products.length === 1 ? "" : "s"}
                </p>
              </div>

              {/* Plain GET form: the query lives in the URL and is applied
                  server-side, so results are shareable and crawlable. */}
              <form
                action="/products"
                method="get"
                role="search"
                className="relative w-full sm:w-80"
              >
                <label htmlFor="product-search" className="sr-only">
                  Search products
                </label>
                <input
                  id="product-search"
                  name="search"
                  type="search"
                  defaultValue={trimmed}
                  placeholder="Search flyers, paper bags, business cards…"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-10 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
                <button
                  type="submit"
                  aria-label="Search products"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 transition hover:text-red-600"
                >
                  <Search aria-hidden className="h-4 w-4" />
                </button>
              </form>
            </div>

            {trimmed && (
              <p className="mb-4 text-sm text-gray-600">
                <Link
                  href="/products"
                  className="font-bold text-red-600 hover:text-red-700"
                >
                  Clear search
                </Link>{" "}
                to browse everything.
              </p>
            )}

            {groups.length > 0 ? (
              <div className="space-y-10">
                {groups.map((group) => (
                  <section key={group.category.slug}>
                    <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <h3 className="text-lg font-extrabold text-gray-900">
                          <Link
                            href={`/products/category/${group.category.slug}`}
                            className="hover:text-red-600"
                          >
                            {group.category.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600">
                          {group.category.tagline}
                        </p>
                      </div>
                      <Link
                        href={`/products/category/${group.category.slug}`}
                        className="text-sm font-bold text-red-600 hover:text-red-700"
                      >
                        View all {group.items.length} &rarr;
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                      {group.items.map((product) => (
                        <ProductCard key={product.slug} product={product} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-white px-6 py-12 text-center shadow-sm">
                <h3 className="text-base font-bold text-gray-800">
                  Nothing matched “{trimmed}”.
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
                  Try a broader word, or browse a category. We print more than
                  fits in one search — if you cannot find it, just ask.
                </p>
                <ul className="mt-4 flex flex-wrap justify-center gap-2">
                  {["business card", "flyer", "paper bag", "t shirt", "banner"].map(
                    (suggestion) => (
                      <li key={suggestion}>
                        <Link
                          href={`/products?search=${encodeURIComponent(suggestion)}`}
                          className="inline-flex rounded-full border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition hover:border-red-300 hover:text-red-600"
                        >
                          {suggestion}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
                <Link
                  href="/get-a-quote"
                  className="mt-5 inline-flex rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
                >
                  Ask for a custom quote
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
