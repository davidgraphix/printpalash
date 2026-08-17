import type {
  DeliveryInfo,
  PriceQuote,
  Product,
  ProductFAQ,
  ProductImage,
  ProductOptionGroup,
  ProductSeo,
  ProductSpecs,
} from "../types";
import { formatBasis, formatNaira } from "../pricing";
import { getCategory } from "../categories";

export interface ProductInput {
  slug: string;
  name: string;
  category: string;
  /** One line for cards and search results. */
  short: string;
  /** Full paragraph for the product page and meta description fallback. */
  description: string;
  /** Omit when the price list publishes no price for this item. */
  price?: PriceQuote;
  specs: ProductSpecs;
  delivery?: DeliveryInfo;
  options?: ProductOptionGroup[];
  /** Public paths, primary image first. */
  images: string[];
  /** Describes what is actually in the primary photo. */
  imageAlt?: string;
  featured?: boolean;
  /** Defaults to true. Set false for records awaiting photography or review. */
  published?: boolean;
  seo?: Partial<ProductSeo>;
  related?: string[];
  /** Product-specific FAQs, prepended before the generated ones. */
  faqs?: ProductFAQ[];
  /** Extra words customers type that the name and specs do not contain. */
  terms?: string[];
  source?: string;
  review?: string[];
}

function buildGallery(images: string[], baseAlt: string): ProductImage[] {
  return images.map((src, index) => ({
    src,
    alt: index === 0 ? baseAlt : `${baseAlt}, view ${index + 1}`,
  }));
}

/**
 * Titles here must NOT carry the brand: the root layout appends
 * " | PrintPalash" through metadata.title.template.
 */
function buildSeoTitle(input: ProductInput): string {
  const category = getCategory(input.category);
  const location = "in Lagos";
  const base = `${input.name} Printing ${location}`;
  // Some product names already read as an action ("Vehicle Branding"), so
  // avoid the awkward "Branding Printing" construction.
  const name = input.name.toLowerCase();
  if (name.includes("branding") || name.includes("printing")) {
    return `${input.name} ${location}`;
  }
  if (category?.slug === "clothing-apparel" || category?.slug === "caps-hats") {
    return `Custom ${input.name} Branding ${location}`;
  }
  return base;
}

function buildSeoDescription(input: ProductInput): string {
  const parts: string[] = [input.short.replace(/\.$/, "")];
  if (input.specs.material) parts.push(input.specs.material.replace(/\.$/, ""));
  if (input.price) {
    parts.push(
      `From ${formatNaira(input.price.amount)} ${formatBasis(input.price)}`
    );
  }
  const text = `${parts.join(". ")}. Order from PrintPalash in Lagos, Nigeria.`;
  return text.length > 300 ? `${text.slice(0, 297).trimEnd()}...` : text;
}

function buildKeywords(input: ProductInput): string[] {
  const category = getCategory(input.category);
  const name = input.name.toLowerCase();
  return Array.from(
    new Set([
      `${name} Lagos`,
      `${name} printing Nigeria`,
      ...(category ? [category.seo.keywords[0]] : []),
    ])
  );
}

/** Genuine FAQs derived from the product's own published specifications. */
function buildGeneratedFaqs(input: ProductInput): ProductFAQ[] {
  const faqs: ProductFAQ[] = [];

  if (input.price) {
    const { quantity, unit } = input.price;
    faqs.push({
      question: `How is ${input.name.toLowerCase()} priced?`,
      answer:
        quantity === 1
          ? `Pricing starts at ${formatNaira(
              input.price.amount
            )} per ${unit}. The final price depends on your artwork, finishing choices and total quantity, so we confirm it before production starts.`
          : `Pricing starts at ${formatNaira(
              input.price.amount
            )} for ${quantity.toLocaleString(
              "en-NG"
            )} ${unit}s — that is the batch size, not the price of a single piece. The final price depends on your artwork, finishing choices and total quantity.`,
    });
  }

  const { lagos, nationwide } = input.delivery ?? {};
  if (lagos || nationwide) {
    const lines = [
      lagos ? `Within Lagos: ${lagos}.` : null,
      nationwide ? `Other states in Nigeria: ${nationwide}.` : null,
    ].filter(Boolean);
    faqs.push({
      question: `How long does ${input.name.toLowerCase()} take to produce?`,
      answer: lines.join(" "),
    });
  }

  if (input.specs.finishing) {
    faqs.push({
      question: `What finishing is available on ${input.name.toLowerCase()}?`,
      answer: input.specs.finishing,
    });
  }

  return faqs;
}

function buildSearchTerms(input: ProductInput): string[] {
  const category = getCategory(input.category);
  return Array.from(
    new Set(
      [
        ...(input.terms ?? []),
        category?.name ?? "",
        input.specs.material ?? "",
        input.specs.finishing ?? "",
        input.specs.size ?? "",
      ].filter(Boolean)
    )
  );
}

export function defineProduct(input: ProductInput): Product {
  const baseAlt = input.imageAlt ?? `${input.name} print sample`;
  const gallery = buildGallery(input.images, baseAlt);

  return {
    id: input.slug,
    slug: input.slug,
    name: input.name,
    categorySlug: input.category,
    brand: "PrintPalash",
    shortDescription: input.short,
    description: input.description,
    startingPrice: input.price,
    specs: input.specs,
    delivery: input.delivery ?? {},
    optionGroups: input.options ?? [],
    image: gallery[0],
    gallery,
    featured: input.featured ?? false,
    published: input.published ?? true,
    seo: {
      title: input.seo?.title ?? buildSeoTitle(input),
      description: input.seo?.description ?? buildSeoDescription(input),
      keywords: input.seo?.keywords ?? buildKeywords(input),
    },
    relatedSlugs: input.related ?? [],
    faqs: [...(input.faqs ?? []), ...buildGeneratedFaqs(input)],
    searchTerms: buildSearchTerms(input),
    ...(input.source ? { sourceRef: input.source } : {}),
    ...(input.review ? { dataReview: input.review } : {}),
  };
}
