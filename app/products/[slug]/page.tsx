import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts } from "@/lib/products-data";
import ProductDetail from "@/components/Products/ProductDetails";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const allProducts = getAllProducts();
  return allProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

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

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
