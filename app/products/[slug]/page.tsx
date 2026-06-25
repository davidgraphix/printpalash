import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getAllProducts,
  getProductSeoMeta,
} from "@/lib/products-data";
import ProductDetail from "@/components/Products/ProductDetails";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const baseUrl = "https://printpalash.com";

const getAbsoluteImageUrl = (image?: string) => {
  if (!image) return `${baseUrl}/opengraph-image.png`;

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${baseUrl}${image}`;
};

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
      title: "Product Not Found | PrintPalash",
      description:
        "The product you are looking for could not be found on PrintPalash.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const url = `${baseUrl}/products/${product.slug}`;
  const productImage = product.images?.[0] || product.image;
  const imageUrl = getAbsoluteImageUrl(productImage);

  const { seoTitle, seoDescription } = getProductSeoMeta(product);

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url,
      siteName: "PrintPalash",
      type: "website",
      locale: "en_NG",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${product.name} printing in Lagos by PrintPalash`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const url = `${baseUrl}/products/${product.slug}`;
  const { seoTitle, seoDescription } = getProductSeoMeta(product);

  const productImages =
    product.images && product.images.length > 0
      ? product.images.map((image) => getAbsoluteImageUrl(image))
      : [getAbsoluteImageUrl(product.image)];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description: seoDescription,
    image: productImages,
    sku: product.slug,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "PrintPalash",
    },
    manufacturer: {
      "@type": "Organization",
      name: "PrintPalash",
      url: baseUrl,
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "NGN",
      price: product.priceNumeric,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "LocalBusiness",
        name: "PrintPalash",
        url: baseUrl,
        telephone: "+2347035017359",
        address: {
          "@type": "PostalAddress",
          streetAddress: "29 Shipeolu Street",
          addressLocality: "Shomolu",
          addressRegion: "Lagos",
          addressCountry: "NG",
        },
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${baseUrl}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <ProductDetail product={product} />
    </>
  );
}