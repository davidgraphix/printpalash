import type { Metadata } from "next";

import ProductsBrowser from "@/components/Products/ProductsBrowser";
import Footer from "@/components/Footer/Footer";
import TrustedBrands from "@/components/Trusted-Brands/TrustedBrands";
import JsonLd from "@/components/SEO/JsonLd";
import { fetchCards, fetchCategories } from "@/lib/catalog/source";
import { buildSearchIndexFromCards } from "@/lib/catalog/search-index";
import { breadcrumbJsonLd, itemListJsonLd, pageMetadata } from "@/lib/seo";

interface ProductsPageProps {
  searchParams: Promise<{ search?: string }>;
}

/**
 * An hour, as a backstop behind the tag invalidation that /api/revalidate does.
 * Matches the product pages so the grid and the detail pages cannot disagree
 * about what the catalogue contains.
 */
export const revalidate = 3600;

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

  /*
   * Both reads together, and neither failure caught.
   *
   * An empty grid with the category navigation still drawn would read as "the
   * shop has nothing in it", which is worse than a page that failed: a visitor
   * leaves, and a crawler records a category page with no products. Letting it
   * throw returns a 500, which is retried.
   *
   * The full catalogue in one request. 104 products is well inside the API's
   * 200-row limit, and the grid groups by category client-side exactly as it
   * did when the data was local.
   */
  const [cards, categories] = await Promise.all([
    // The API's search matches name, short description and category name. It
    // is used for the server-rendered results so that what a crawler sees and
    // what the live dropdown shows come from the same rule.
    query ? fetchCards({ search: query }) : fetchCards(),
    fetchCategories(),
  ]);

  // The live dropdown searches this in the browser, so it is built from the
  // cards already being sent rather than from a second fetch.
  const searchEntries = buildSearchIndexFromCards(
    query ? await fetchCards() : cards,
  );

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
        products={cards}
        categories={categories}
        searchEntries={searchEntries}
        query={query}
      />

      <TrustedBrands />
      <Footer />
    </>
  );
}
