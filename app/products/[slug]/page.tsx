import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts } from "@/lib/products-data";
import ProductDetail from "@/components/Products/ProductDetails";
import type { Metadata } from "next";

interface ProductPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  const allProducts = getAllProducts();
  return allProducts.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProductBySlug(params.slug);

  if (!product) return { title: "Product Not Found" };

  const url = `https://printpalash.com/products/${product.slug}`;

  return {
    title: `${product.name} | Print Palash Studios`,
    description: product.description,
    alternates: { canonical: url },
    openGraph: {
      title: product.name,
      description: product.description,
      url,
      images: [product.image],
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
