import Link from "next/link";
import { listCategoriesSync, listFeaturedProductsSync } from "@/lib/catalog/repository";
import ProductCard from "./ProductCard";

export default function PopularProducts() {
  const products = listFeaturedProductsSync(12);
  const categories = listCategoriesSync();

  if (products.length === 0) return null;

  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="container mx-auto px-4">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl lg:text-3xl">
              Popular products
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              The printing jobs Lagos businesses order from us most often.
            </p>
          </div>

          <Link
            href="/products"
            className="shrink-0 whitespace-nowrap text-sm font-bold text-red-600 hover:text-red-700"
          >
            See all products &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {/* Category links give the homepage a route into every part of the
            catalogue, for readers and for crawlers. */}
        <nav aria-label="Product categories" className="mt-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500">
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
