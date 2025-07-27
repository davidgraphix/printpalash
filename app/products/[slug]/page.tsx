import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts } from "@/lib/products-data";
import ProductDetail from "@/components//Products/ProductDetails";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all products (for static generation)
export async function generateStaticParams() {
  const allProducts = getAllProducts();

  return allProducts.map((product) => ({
    slug: product.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} - Your Store Name`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
