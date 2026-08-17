import { CATEGORIES } from "@/lib/catalog/categories";
import { listProductsSync } from "@/lib/catalog/repository";
import { formatPriceShort } from "@/lib/catalog/pricing";
import { SERVICES } from "@/lib/services";
import { PHONE_DISPLAY, SITE, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Plain-text summary for language models, generated from the same catalogue
 * the site renders — so it cannot list products or prices that do not exist.
 */
export function GET() {
  const products = listProductsSync();

  const categorySections = CATEGORIES.map((category) => {
    const items = products.filter((p) => p.categorySlug === category.slug);
    if (items.length === 0) return "";

    const lines = items
      .map(
        (product) =>
          `- ${product.name} — ${
            product.startingPrice
              ? formatPriceShort(product.startingPrice)
              : "price on request"
          } — ${SITE_URL}/products/${product.slug}`
      )
      .join("\n");

    return `### ${category.name}\n${category.description}\nCategory page: ${SITE_URL}/products/category/${category.slug}\n\n${lines}\n`;
  })
    .filter(Boolean)
    .join("\n");

  const serviceLines = SERVICES.map(
    (service) => `- ${service.h1} — ${SITE_URL}/services/${service.slug}`
  ).join("\n");

  const content = `# PrintPalash

${SITE.description}

Website: ${SITE_URL}

## About

PrintPalash is a printing, packaging and branding company based in ${SITE.address.addressLocality}, Lagos, Nigeria. We produce print and branded materials for businesses, schools, churches, event planners, fashion labels, restaurants and corporate organisations across Lagos and nationwide.

## Important note on pricing

Every price on this site is a STARTING price for a stated batch size, not the
price of a single item. For example "From ₦24,000 per 100 flyers" means ₦24,000
covers 100 flyers. Final pricing depends on artwork, finishing and total
quantity, and is confirmed before production.

## Services

${serviceLines}

## Products

${categorySections}

## Contact

Address: ${SITE.address.streetAddress}, ${SITE.address.addressLocality}, ${SITE.address.addressRegion}, Nigeria
Phone: ${PHONE_DISPLAY}
Email: ${SITE.email}
Opening hours: ${SITE.openingHours.display}

## Key pages

- Homepage: ${SITE_URL}
- All products: ${SITE_URL}/products
- All services: ${SITE_URL}/services
- Get a quote: ${SITE_URL}/get-a-quote
- Contact: ${SITE_URL}/contact
- Blog: ${SITE_URL}/blog
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
