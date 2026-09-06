import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetail from "@/components/Products/ProductDetails";
import Footer from "@/components/Footer/Footer";
import JsonLd from "@/components/SEO/JsonLd";
import {
  getProductSync,
  getRelatedProductsSync,
  listProductsSync,
} from "@/lib/catalog/repository";
import { getCategory } from "@/lib/catalog/categories";
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
 * The catalogue is a fixed set, so any slug outside generateStaticParams is a
 * genuine 404. Without this, Next renders the route on demand and returns the
 * not-found body with a 200 status — a soft 404 that Google treats as a real,
 * indexable page.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return listProductsSync().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductSync(slug);

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
  const product = getProductSync(slug);

  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const categoryName = category?.name ?? "Products";
  const related = getRelatedProductsSync(product, 4);

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
