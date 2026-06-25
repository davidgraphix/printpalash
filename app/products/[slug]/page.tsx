import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts } from "@/lib/products-data";
import ProductDetail from "@/components/Products/ProductDetails";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const allProducts = getAllProducts();

  return allProducts.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Print Palash Studios",
    };
  }

  const url = `https://printpalash.com/products/${product.slug}`;
  const productImage = product.images?.[0] || product.image;

  return {
    title: `${product.name} Printing in Lagos, Nigeria`,
    description: `Order premium ${product.name.toLowerCase()} from PrintPalash. ${product.description} Fast delivery in Lagos and across Nigeria.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${product.name} Printing in Lagos, Nigeria | PrintPalash`,
      description: product.description,
      url,
      siteName: "PrintPalash",
      type: "website",
      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: `${product.name} printing in Lagos by PrintPalash`,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return <ProductDetail product={product} />;
}