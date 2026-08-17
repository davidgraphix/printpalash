import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import Footer from "@/components/Footer/Footer";
import ProductCard from "@/components/Products/ProductCard";
import JsonLd from "@/components/SEO/JsonLd";
import { SERVICES } from "@/lib/services";
import { getCategory } from "@/lib/catalog/categories";
import {
  listCategoriesSync,
  listProductsByCategorySync,
} from "@/lib/catalog/repository";
import {
  breadcrumbJsonLd,
  categoryMetadata,
  faqJsonLd,
  itemListJsonLd,
} from "@/lib/seo";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

/**
 * The catalogue is a fixed set, so any slug outside generateStaticParams is a
 * genuine 404. Without this, Next renders the route on demand and returns the
 * not-found body with a 200 status — a soft 404 that Google treats as a real,
 * indexable page.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return listCategoriesSync().map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    return {
      title: "Category not found",
      description: "This product category is not available on PrintPalash.",
      robots: { index: false, follow: true },
    };
  }

  return categoryMetadata(category);
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategory(slug);

  if (!category) notFound();

  const products = listProductsByCategorySync(slug);
  if (products.length === 0) notFound();

  const relatedServices = SERVICES.filter((service) =>
    category.relatedServiceSlugs.includes(service.slug)
  );
  const otherCategories = listCategoriesSync().filter((c) => c.slug !== slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: category.name, path: `/products/category/${category.slug}` },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          products.map((product) => ({
            name: product.name,
            path: `/products/${product.slug}`,
          })),
          `${category.name} from PrintPalash`
        )}
      />
      {category.faqs.length > 0 && <JsonLd data={faqJsonLd(category.faqs)} />}

      <div className="bg-white">
        <section className="border-b bg-pink-50">
          <div className="container mx-auto px-4 py-6 lg:py-8">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-red-600">
                    Home
                  </Link>
                </li>
                <ChevronRight aria-hidden className="h-4 w-4 text-gray-400" />
                <li>
                  <Link
                    href="/products"
                    className="text-gray-500 hover:text-red-600"
                  >
                    Products
                  </Link>
                </li>
                <ChevronRight aria-hidden className="h-4 w-4 text-gray-400" />
                <li aria-current="page" className="font-semibold text-red-600">
                  {category.name}
                </li>
              </ol>
            </nav>

            <h1 className="mt-2 text-2xl font-extrabold text-gray-900 lg:text-4xl">
              {category.seo.title}
            </h1>
            <p className="mt-2 max-w-3xl leading-relaxed text-gray-700">
              {category.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2.5">
              <Link
                href="/get-a-quote"
                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Get a quote
              </Link>
              <Link
                href="/products"
                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-900 transition hover:border-red-300 hover:text-red-600"
              >
                All products
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8 lg:py-10">
          <h2 className="sr-only">{category.name} products</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard
                key={product.slug}
                product={product}
                priority={index < 4}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ))}
          </div>
        </section>

        {category.faqs.length > 0 && (
          <section className="border-t bg-gray-50 py-10">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-xl font-extrabold text-gray-900 lg:text-2xl">
                  {category.name} — frequently asked questions
                </h2>
                <dl className="mt-4 space-y-3">
                  {category.faqs.map((faq) => (
                    <div
                      key={faq.question}
                      className="rounded-xl border border-gray-200 bg-white p-4"
                    >
                      <dt className="font-bold text-gray-900">{faq.question}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-gray-600">
                        {faq.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>
        )}

        <section className="border-t py-10">
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-2">
            {relatedServices.length > 0 && (
              <div>
                <h2 className="text-lg font-extrabold text-gray-900">
                  Related printing services
                </h2>
                <ul className="mt-3 space-y-2">
                  {relatedServices.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-sm font-semibold text-red-600 hover:text-red-700"
                      >
                        {service.h1}
                      </Link>
                      <p className="text-sm text-gray-600">
                        {service.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h2 className="text-lg font-extrabold text-gray-900">
                Browse other categories
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {otherCategories.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/products/category/${other.slug}`}
                      className="inline-flex rounded-full border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition hover:border-red-300 hover:text-red-600"
                    >
                      {other.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
