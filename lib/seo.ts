import type { Metadata } from "next";
import { SITE, absoluteUrl } from "./site";
import type { Category, Product, ProductFAQ } from "./catalog/types";
import { lowestUnitAmount } from "./catalog/pricing";

/* ------------------------------------------------------------------ *
 * Metadata helpers                                                    *
 * ------------------------------------------------------------------ */

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  /** Set false for pages that should not be indexed. */
  index?: boolean;
}

/**
 * Builds a complete, unique metadata block for a page: canonical, Open Graph
 * and Twitter card all point at the same absolute URL on the production
 * domain, so no two pages share a canonical by accident.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  image,
  imageAlt,
  type = "website",
  index = true,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : SITE.ogImage;

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type,
      locale: SITE.locale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt ?? title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

export function productMetadata(product: Product): Metadata {
  return pageMetadata({
    title: product.seo.title,
    description: product.seo.description,
    path: `/products/${product.slug}`,
    keywords: product.seo.keywords,
    image: product.image.src,
    imageAlt: product.image.alt,
  });
}

export function categoryMetadata(category: Category): Metadata {
  return pageMetadata({
    // The root layout appends " | PrintPalash" via metadata.title.template.
    title: category.seo.title,
    description: category.seo.description,
    path: `/products/category/${category.slug}`,
    keywords: category.seo.keywords,
  });
}

/* ------------------------------------------------------------------ *
 * JSON-LD                                                             *
 * ------------------------------------------------------------------ */

const ORG_ID = `${SITE.url}/#organization`;
const BUSINESS_ID = `${SITE.url}/#business`;

/**
 * PrintingService is a subtype of LocalBusiness, so this single node serves
 * as both the organisation and the local business entity. Only information
 * already present in the project is included — no invented socials, no
 * ratings, no review counts.
 */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "PrintingService",
    "@id": BUSINESS_ID,
    name: SITE.name,
    alternateName: SITE.legalName,
    url: SITE.url,
    logo: SITE.logo,
    image: SITE.logo,
    description: SITE.description,
    telephone: SITE.phone.e164,
    email: SITE.email,
    priceRange: "₦₦",
    currenciesAccepted: "NGN",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.streetAddress,
      addressLocality: SITE.address.addressLocality,
      addressRegion: SITE.address.addressRegion,
      addressCountry: SITE.address.addressCountry,
    },
    areaServed: [
      { "@type": "City", name: "Lagos" },
      { "@type": "Country", name: "Nigeria" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...SITE.openingHours.days],
        opens: SITE.openingHours.opens,
        closes: SITE.openingHours.closes,
      },
    ],
    sameAs: [...SITE.socialProfiles],
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: SITE.legalName,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: SITE.logo,
    },
    description: SITE.description,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phone.e164,
        contactType: "sales",
        areaServed: "NG",
        availableLanguage: ["en"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.streetAddress,
      addressLocality: SITE.address.addressLocality,
      addressRegion: SITE.address.addressRegion,
      addressCountry: SITE.address.addressCountry,
    },
    sameAs: [...SITE.socialProfiles],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/products?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Product structured data.
 *
 * The catalogue publishes "starting from" prices for a batch, not a fixed
 * price for one unit, so this uses AggregateOffer with `lowPrice` — the
 * schema.org construct that means exactly that. Representing it as a plain
 * Offer `price` would tell Google a single unit costs the batch price.
 *
 * `highPrice` is emitted **only** for products that genuinely have more than
 * one published price (a size, stock or layout choice that changes the
 * figure). Those have a real ceiling. Products with a single "from ₦X" price
 * have a floor and no known maximum, so no ceiling is invented just to satisfy
 * a Search Console recommendation — a made-up highPrice would misrepresent the
 * price to customers.
 *
 * No `aggregateRating` or `review` is emitted either. PrintPalash collects no
 * first-party review data, and Google's own policy treats invented review
 * markup as spam. Search Console lists both as *non-critical* suggestions; the
 * honest response is to leave them out until real reviews exist.
 */
export function productJsonLd(product: Product, categoryName: string) {
  const url = absoluteUrl(`/products/${product.slug}`);
  const lowest = lowestUnitAmount(product);
  const hasPrice = Number.isFinite(lowest);

  const pricedQuotes = [
    product.startingPrice,
    ...product.optionGroups.flatMap((g) =>
      g.affectsPrice ? g.options.map((o) => o.price) : []
    ),
  ].filter((quote): quote is NonNullable<typeof quote> => Boolean(quote));

  const base = product.startingPrice ?? pricedQuotes[0];

  // Distinct published amounts. A product whose options all cost the same has
  // one real price, not a range.
  const amounts = Array.from(new Set(pricedQuotes.map((q) => q.amount)));
  const lowPrice = Math.min(...amounts);
  const highPrice = Math.max(...amounts);
  const hasRealRange = amounts.length > 1;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description: product.seo.description,
    image: product.gallery.map((img) => absoluteUrl(img.src)),
    sku: product.id,
    category: categoryName,
    url,
    brand: { "@type": "Brand", name: SITE.name },
    manufacturer: { "@id": ORG_ID },
    ...(product.specs.material
      ? { material: product.specs.material }
      : {}),
    ...(product.specs.size ? { size: product.specs.size } : {}),
    ...(hasPrice && base
      ? {
          offers: {
            "@type": "AggregateOffer",
            url,
            priceCurrency: base.currency,
            lowPrice,
            // Only when the product really does have a maximum.
            ...(hasRealRange ? { highPrice } : {}),
            offerCount: Math.max(1, amounts.length),
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            eligibleQuantity: {
              "@type": "QuantitativeValue",
              value: base.quantity,
              unitText: base.unit,
            },
            seller: { "@id": BUSINESS_ID },
          },
        }
      : {}),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/**
 * FAQPage data. Only ever called with FAQs that are also rendered visibly on
 * the same page — the markup and the page must agree.
 */
export function faqJsonLd(faqs: ProductFAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function itemListJsonLd(
  items: { name: string; path: string }[],
  listName: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}
