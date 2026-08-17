import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ServiceDetail from "@/components/Services/ServiceDetail";
import Footer from "@/components/Footer/Footer";
import JsonLd from "@/components/SEO/JsonLd";
import { SERVICES } from "@/lib/services";
import { CATEGORIES } from "@/lib/catalog/categories";
import { listProductsByCategorySync } from "@/lib/catalog/repository";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { SITE, absoluteUrl } from "@/lib/site";

interface ServicePageProps {
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
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service not found",
      description: "This service is not available on PrintPalash.",
      robots: { index: false, follow: true },
    };
  }

  return pageMetadata({
    // lib/services.ts metaTitles end in "| Print Palash Studios"; strip it so
    // the root layout's "%s | PrintPalash" template does not stack a second
    // brand on the end.
    title: service.metaTitle.split("|")[0].trim(),
    description: service.description,
    path: `/services/${service.slug}`,
    keywords: [service.h1.toLowerCase(), `${service.title.toLowerCase()} Nigeria`],
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) notFound();

  /**
   * Products to link out to from this service page: every category that names
   * this service as related. That keeps the service -> product internal links
   * derived from one mapping instead of a second hand-maintained list.
   */
  const relatedCategories = CATEGORIES.filter((category) =>
    category.relatedServiceSlugs.includes(service.slug)
  );

  const relatedProducts = relatedCategories
    .flatMap((category) => listProductsByCategorySync(category.slug).slice(0, 3))
    .slice(0, 6);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/services/${service.slug}`)}#service`,
    name: service.h1,
    description: service.description,
    serviceType: service.title,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: [
      { "@type": "City", name: "Lagos" },
      { "@type": "Country", name: "Nigeria" },
    ],
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      {service.faqs.length > 0 && (
        <JsonLd
          data={faqJsonLd(
            service.faqs.map((faq) => ({ question: faq.q, answer: faq.a }))
          )}
        />
      )}

      <ServiceDetail
        service={service}
        relatedProducts={relatedProducts}
        relatedCategories={relatedCategories}
      />
      <Footer />
    </>
  );
}
