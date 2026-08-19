import Link from "next/link";

import type { Category, Product } from "@/lib/catalog/types";
import { toCardView } from "@/lib/catalog/card";
import type { SearchIndexEntry } from "@/lib/catalog/search-index";
import ProductCard from "./ProductCard";
import ProductsLiveSearch from "./ProductsLiveSearch";

/**
 * The shop page.
 *
 * This stays a server component: the grid is rendered into the HTML so crawlers
 * (and visitors with slow connections) get the full catalogue without running
 * any JavaScript. `ProductsLiveSearch` layers instant filtering on top and only
 * replaces the results area once the visitor types.
 *
 * Category filtering is real links to `/products/category/[slug]`, so every
 * view has its own URL.
 */
export default function ProductsBrowser({
  products,
  categories,
  searchEntries,
  query,
  activeCategory,
}: {
  products: Product[];
  categories: Category[];
  searchEntries: SearchIndexEntry[];
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
    <ul className="space-y-0.5">
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

  const serverResults =
    groups.length > 0 ? (
      <div className="space-y-9">
        {groups.map((group) => (
          <section key={group.category.slug}>
            <div className="mb-3.5 flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
              <h3 className="text-base font-extrabold text-gray-900 lg:text-lg">
                <Link
                  href={`/products/category/${group.category.slug}`}
                  className="hover:text-red-600"
                >
                  {group.category.name}
                </Link>
              </h3>
              <Link
                href={`/products/category/${group.category.slug}`}
                className="text-sm font-bold text-red-600 hover:text-red-700"
              >
                View all {group.items.length} &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {group.items.map((product) => (
                <ProductCard key={product.slug} view={toCardView(product)} />
              ))}
            </div>
          </section>
        ))}
      </div>
    ) : (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} view={toCardView(product)} />
        ))}
      </div>
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

          <h1 className="mt-1.5 text-2xl font-extrabold text-gray-900 lg:text-3xl">
            Printing products in Lagos
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-gray-700">
            Bags, packaging, flyers, banners, apparel, invitations and corporate
            stationery. Every price shown is a starting price for the batch size
            listed beside it.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-7">
        <div className="flex gap-8">
          <aside className="hidden w-56 flex-shrink-0 lg:block">
            <nav
              aria-label="Product categories"
              className="sticky top-4 rounded-xl bg-white p-3.5 shadow-sm"
            >
              <h2 className="mb-2.5 px-3 text-xs font-extrabold uppercase tracking-wide text-gray-500">
                Categories
              </h2>
              {categoryNav}
            </nav>
          </aside>

          <div className="min-w-0 flex-1">
            {/* Mobile category filter — works without JavaScript. */}
            <details className="mb-4 rounded-xl bg-white p-3.5 shadow-sm lg:hidden">
              <summary className="cursor-pointer text-sm font-bold text-gray-900">
                Browse categories
                {activeCategory ? `: ${activeCategory.name}` : ""}
              </summary>
              <nav aria-label="Product categories" className="mt-2.5">
                {categoryNav}
              </nav>
            </details>

            <ProductsLiveSearch
              entries={searchEntries}
              initialQuery={trimmed}
              serverCount={products.length}
              headingSuffix={activeCategory?.name}
            >
              {serverResults}
            </ProductsLiveSearch>
          </div>
        </div>
      </section>
    </div>
  );
}
