import Link from "next/link";

import { fetchCards, fetchCategories } from "@/lib/catalog/source";
import ProductCard from "./ProductCard";

/**
 * Featured products, from the API.
 *
 * The homepage must render even when the catalogue cannot be read, so unlike
 * the product and category pages this one swallows the failure and returns
 * nothing. A missing "Popular Products" row leaves a complete, working home
 * page; a thrown error takes the whole site's front door down because one
 * section could not load.
 *
 * That trade is only right here. On a product page the product *is* the page,
 * so failing loudly is correct there.
 */
export default async function PopularProducts() {
  let products: Awaited<ReturnType<typeof fetchCards>> = [];
  let categories: Awaited<ReturnType<typeof fetchCategories>> = [];

  try {
    [products, categories] = await Promise.all([
      fetchCards(),
      fetchCategories(),
    ]);
  } catch (caught) {
    console.error(
      "[home] Popular products unavailable; the section is omitted.",
      caught,
    );
    return null;
  }

  // The API orders featured first but does not say where they stop, which is
  // why the card carries the flag.
  products = products.filter((card) => card.featured).slice(0, 12);

  if (products.length === 0) return null;

  return (
    <section className="bg-white py-10 lg:py-12">
      <div className="container mx-auto px-4">
        {/* Heading and the "see all" link only — no explanatory paragraph, per
            the client's note that the homepage felt packed. */}
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl lg:text-3xl">
            Popular Products
          </h2>

          <Link
            href="/products"
            className="shrink-0 whitespace-nowrap text-sm font-bold text-red-600 hover:text-red-700"
          >
            See all products &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} view={product} />
          ))}
        </div>

        {/* Category links give the homepage a route into every part of the
            catalogue, for readers and for crawlers. */}
        <nav aria-label="Product categories" className="mt-7">
          <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500">
            Shop by category
          </h3>
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/products/category/${category.slug}`}
                  className="inline-flex rounded-full border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition hover:border-red-300 hover:text-red-600"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
