import type { Metadata } from "next";

import ProductsBrowser from "@/components/Products/ProductsBrowser";
import Footer from "@/components/Footer/Footer";
import TrustedBrands from "@/components/Trusted-Brands/TrustedBrands";
import JsonLd from "@/components/SEO/JsonLd";
import {
  listCategoriesSync,
  listProductsSync,
  searchSync,
} from "@/lib/catalog/repository";
import { breadcrumbJsonLd, itemListJsonLd, pageMetadata } from "@/lib/seo";

interface ProductsPageProps {
  searchParams: Promise<{ search?: string }>;
}

const BASE_METADATA = {
  title: "Printing Products in Lagos — Bags, Packaging, Flyers & Branding",
  description:
    "Browse every product PrintPalash prints in Lagos: custom paper bags, packaging boxes, flyers and posters, banners, business cards, branded apparel, wedding invitations and office stationery.",
  keywords: [
    "printing products Lagos",
    "printing company Lagos",
    "custom printing Nigeria",
    "branding materials Lagos",
  ],
};

export async function generateMetadata({
  searchParams,
}: ProductsPageProps): Promise<Metadata> {
  const { search } = await searchParams;
  const query = search?.trim();

  // Search result pages are a different view of the same catalogue, so they
  // are kept out of the index and canonicalised back to /products. That
  // prevents an unbounded set of ?search= URLs competing with the real pages.
  if (query) {
    return pageMetadata({
      title: `Search results for “${query}”`,
      description: `Printing products matching “${query}” at PrintPalash in Lagos, Nigeria.`,
      path: "/products",
      index: false,
    });
  }

  return pageMetadata({ ...BASE_METADATA, path: "/products" });
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { search } = await searchParams;
  const query = search?.trim();

  const categories = listCategoriesSync();
  const products = query
    ? searchSync(query).map((result) => result.product)
    : listProductsSync();

  return (
    <>
      {!query && (
        <>
          <JsonLd
            data={breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
            ])}
          />
          <JsonLd
            data={itemListJsonLd(
              categories.map((category) => ({
                name: category.name,
                path: `/products/category/${category.slug}`,
              })),
              "PrintPalash product categories"
            )}
          />
        </>
      )}

      <ProductsBrowser
        products={products}
        categories={categories}
        query={query}
      />

      <TrustedBrands />
      <Footer />
    </>
  );
}
