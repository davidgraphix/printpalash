import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetail from "@/components/Products/ProductDetails";
import Footer from "@/components/Footer/Footer";
import JsonLd from "@/components/SEO/JsonLd";
import {
  fetchProduct,
  fetchProductSlugs,
  fetchRelatedCards,
} from "@/lib/catalog/source";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  productJsonLd,
  productMetadata,
} from "@/lib/seo";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Slugs that exist when the site is built are prerendered. Anything else is
 * rendered on first request and then cached.
 *
 * `dynamicParams` used to be false, which made the prerendered list the whole
 * catalogue: a product created in the admin returned 404 until somebody
 * redeployed the frontend. It is true now, which is the change that lets a new
 * product become publicly reachable on its own.
 *
 * The soft-404 problem that `false` was solving is still handled, just
 * elsewhere: a slug the API does not publish calls `notFound()` below, which
 * returns a real 404 status. The difference is that the decision is now made by
 * asking the API rather than by consulting a list fixed at build time.
 */
export const dynamicParams = true;

/**
 * An hour, as a backstop. Admin saves call /api/revalidate, which flushes this
 * page's tag immediately; this only covers a call that was lost.
 */
export const revalidate = 3600;

export async function generateStaticParams() {
  // A build must not fail because the API is briefly unreachable. With an empty
  // list every product page simply renders on first request instead — slower
  // for the first visitor, and not a broken deploy.
  try {
    return (await fetchProductSlugs()).map((slug) => ({ slug }));
  } catch (caught) {
    console.error(
      "[products] Could not list product slugs at build time; every product " +
        "page will render on demand instead.",
      caught,
    );
    return [];
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  // A catalogue outage must not publish "Product not found" as this page's
  // title with an indexable status. Letting the error through means the request
  // fails with a 500, which search engines retry, rather than a 200 that tells
  // them the product is gone.
  const product = await fetchProduct(slug);

  if (!product) {
    return {
      title: "Product not found",
      description:
        "The product you are looking for is not available on PrintPalash.",
      robots: { index: false, follow: true },
    };
  }

  return productMetadata(product);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await fetchProduct(slug);

  if (!product) notFound();

  // The category name travels with the product now. It used to be looked up in
  // the static category list, which a category created in the admin would not
  // appear in.
  const categoryName = product.categoryName ?? "Products";

  // Related products are a nicety, not the page. A failure here renders the
  // page without the row rather than failing the whole product page.
  let related: Awaited<ReturnType<typeof fetchRelatedCards>> = [];

  try {
    related = await fetchRelatedCards(product.slug, 4);
  } catch (caught) {
    console.error(`[products] Related products unavailable for ${slug}.`, caught);
  }

  return (
    <>
      <JsonLd data={productJsonLd(product, categoryName)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          {
            name: categoryName,
            path: `/products/category/${product.categorySlug}`,
          },
          { name: product.name, path: `/products/${product.slug}` },
        ])}
      />
      {/* Only emitted when the same FAQs are rendered on the page below. */}
      {product.faqs.length > 0 && <JsonLd data={faqJsonLd(product.faqs)} />}

      <ProductDetail
        product={product}
        categoryName={categoryName}
        categorySlug={product.categorySlug}
        relatedProducts={related}
      />
      <Footer />
    </>
  );
}
