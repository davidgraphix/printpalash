/**
 * Turns the API's public product payload into the storefront's own `Product`.
 *
 * The point of this file is how little it invents.
 *
 * Four things the storefront renders are not columns in the database and never
 * were: the FAQ list, the SEO keywords, the search terms, and the SEO title and
 * description when a product does not override them. They are *derived* — from
 * the price, the delivery turnarounds, the finishing spec, the name and the
 * category, all of which the API does return. So this hands those fields to
 * `defineProduct`, the same function the static catalogue has always used, and
 * gets the same derivation rather than a second implementation of it.
 *
 * That matters beyond tidiness. A separate derivation here would drift from the
 * one the static pages were built with, and the first visible symptom would be
 * product pages whose FAQ markup quietly changed.
 *
 * Two fields are then overridden, because the API knows better than the
 * derivation does:
 *
 *   - Image alt text. `defineProduct` generates "<name>, view 2" from a single
 *     base string, because the static records only carried paths. The API
 *     carries the real alt text a person wrote per image, and discarding it to
 *     keep the derivation pure would be a step backwards for anyone using a
 *     screen reader.
 *   - The brand, which `defineProduct` hardcodes.
 *
 * One field genuinely has no source: `relatedSlugs`. All 107 static records
 * carry a curated list and the database has no column for it. The repository
 * already falls back to same-category products when the list is empty, and the
 * API's own /related endpoint does the same thing server-side, so an empty list
 * here degrades to that rather than breaking. It is a real loss of editorial
 * intent and is recorded as such rather than papered over.
 */

import { defineProduct } from "./products/define";
import type {
  Category,
  PriceQuote,
  Product,
  ProductImage,
  ProductOptionGroup,
} from "./types";

/* ------------------------------------------------------------------ *
 * The API's shapes
 *
 * Declared here rather than imported, because the API is a separate service
 * with its own repository. These mirror PublicProductDto and PublicCategoryDto;
 * every field is optional-tolerant, since an older deployment of the API will
 * not have the newer ones.
 * ------------------------------------------------------------------ */

export interface ApiImage {
  url: string;
  altText: string;
}

export interface ApiOption {
  id: string;
  label: string;
  detail?: string | null;
  priceAmount?: number | null;
  priceQuantity?: number | null;
  priceUnit?: string | null;
  priceNote?: string | null;
}

export interface ApiOptionGroup {
  id: string;
  label: string;
  affectsPrice: boolean;
  options: ApiOption[];
}

export interface ApiSpecifications {
  material?: string | null;
  size?: string | null;
  finishing?: string | null;
  pages?: string | null;
  branding?: string | null;
  design?: string | null;
}

export interface ApiProduct {
  name: string;
  slug: string;
  categoryName: string;
  categorySlug: string;
  brandName?: string | null;
  shortDescription: string;
  description: string;
  basePrice?: number | null;
  priceQuantity: number;
  priceUnit: string;
  minimumQuantity: number;
  priceLabel: string;
  priceNote?: string | null;
  specifications: ApiSpecifications;
  deliveryLagos?: string | null;
  deliveryNationwide?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  images: ApiImage[];
  optionGroups?: ApiOptionGroup[] | null;
  featured?: boolean | null;
}

export interface ApiCategory {
  name: string;
  slug: string;
  tagline?: string | null;
  description?: string | null;
  productCount: number;
}

/* ------------------------------------------------------------------ *
 * Prices
 * ------------------------------------------------------------------ */

const clean = (value: string | null | undefined): string | undefined => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

/**
 * A price quote, or undefined when the API published no figure.
 *
 * The API withholds every price for a product flagged for pricing review —
 * amount, label and tiers alike — so `basePrice` arriving as null is a
 * deliberate decision upstream, not missing data. Returning undefined here is
 * what makes the page ask for a quote instead of showing a number, which is
 * the behaviour the gate exists to produce.
 *
 * `isStartingFrom` is always true. Every figure in this catalogue is a
 * "starting from" price on a batch basis; the API has no column saying
 * otherwise, and asserting a fixed price would overstate what is known.
 */
function toPrice(
  amount: number | null | undefined,
  quantity: number | null | undefined,
  unit: string | null | undefined,
  note?: string | null,
): PriceQuote | undefined {
  if (amount === null || amount === undefined) return undefined;
  if (!Number.isFinite(amount)) return undefined;

  return {
    amount,
    currency: "NGN",
    // A missing or nonsensical basis falls back to one unit. Rendering an
    // amount against "per 0" would read as a division error on a product page.
    quantity: Number.isFinite(quantity) && (quantity ?? 0) > 0 ? quantity! : 1,
    unit: clean(unit) ?? "piece",
    isStartingFrom: true,
    ...(clean(note) ? { note: clean(note)! } : {}),
  };
}

function toOptionGroups(groups: ApiOptionGroup[] | null | undefined): ProductOptionGroup[] {
  return (groups ?? []).map((group) => ({
    id: group.id,
    label: group.label,
    affectsPrice: group.affectsPrice,
    options: group.options.map((option) => {
      const price = toPrice(
        option.priceAmount,
        option.priceQuantity,
        option.priceUnit,
        option.priceNote,
      );

      return {
        id: option.id,
        label: option.label,
        ...(clean(option.detail) ? { detail: clean(option.detail)! } : {}),
        ...(price ? { price } : {}),
      };
    }),
  }));
}

function toGallery(images: ApiImage[]): ProductImage[] {
  return images
    .filter((image) => clean(image.url))
    .map((image) => ({
      src: image.url.trim(),
      alt: clean(image.altText) ?? "",
    }));
}

/* ------------------------------------------------------------------ *
 * Products
 * ------------------------------------------------------------------ */

/**
 * Maps one API product. Returns undefined for a payload with no slug or no
 * name, because both are load-bearing — the slug is the page's address and the
 * name is its heading — and a half-product on the storefront is worse than one
 * absent from a list.
 */
export function productFromApi(dto: ApiProduct): Product | undefined {
  const slug = clean(dto.slug);
  const name = clean(dto.name);

  if (!slug || !name) return undefined;

  const gallery = toGallery(dto.images ?? []);

  const derived = defineProduct({
    slug,
    name,
    category: dto.categorySlug,
    short: dto.shortDescription ?? "",
    description: dto.description ?? "",
    price: toPrice(dto.basePrice, dto.priceQuantity, dto.priceUnit, dto.priceNote),
    specs: {
      ...(clean(dto.specifications?.size) ? { size: clean(dto.specifications.size) } : {}),
      ...(clean(dto.specifications?.material)
        ? { material: clean(dto.specifications.material) }
        : {}),
      ...(clean(dto.specifications?.finishing)
        ? { finishing: clean(dto.specifications.finishing) }
        : {}),
      ...(clean(dto.specifications?.design) ? { design: clean(dto.specifications.design) } : {}),
      ...(clean(dto.specifications?.pages) ? { pages: clean(dto.specifications.pages) } : {}),
      ...(clean(dto.specifications?.branding)
        ? { branding: clean(dto.specifications.branding) }
        : {}),
    },
    delivery: {
      ...(clean(dto.deliveryLagos) ? { lagos: clean(dto.deliveryLagos) } : {}),
      ...(clean(dto.deliveryNationwide)
        ? { nationwide: clean(dto.deliveryNationwide) }
        : {}),
    },
    options: toOptionGroups(dto.optionGroups),
    // Paths only; the real alt text is restored below.
    images: gallery.map((image) => image.src),
    featured: dto.featured ?? false,
    // The API serves published products only. Anything that reaches this
    // function is public by definition.
    published: true,
    seo: {
      ...(clean(dto.seoTitle) ? { title: clean(dto.seoTitle)! } : {}),
      ...(clean(dto.seoDescription) ? { description: clean(dto.seoDescription)! } : {}),
    },
  });

  return {
    ...derived,
    ...(clean(dto.categoryName) ? { categoryName: clean(dto.categoryName)! } : {}),
    ...(clean(dto.brandName) ? { brand: clean(dto.brandName)! } : {}),
    // The alt text a person actually wrote, in place of the generated
    // "<name>, view 2". An image whose alt text is blank upstream keeps the
    // derived one rather than becoming an empty attribute.
    gallery: gallery.map((image, index) => ({
      ...image,
      alt: image.alt || derived.gallery[index]?.alt || "",
    })),
    image: gallery.length
      ? { ...gallery[0], alt: gallery[0].alt || derived.image?.alt || "" }
      : derived.image,
  };
}

/** Maps a list, dropping any entry too incomplete to render. */
export function productsFromApi(items: ApiProduct[]): Product[] {
  return items
    .map(productFromApi)
    .filter((product): product is Product => product !== undefined);
}

/* ------------------------------------------------------------------ *
 * Categories
 * ------------------------------------------------------------------ */

/**
 * Maps one API category.
 *
 * `seo` and `faqs` are derived the same way the static records are, and
 * `relatedServiceSlugs` has no database column — the static list pairs each
 * category with hand-picked service pages, which is editorial and not
 * reproducible from the API.
 */
export function categoryFromApi(dto: ApiCategory): Category | undefined {
  const slug = clean(dto.slug);
  const name = clean(dto.name);

  if (!slug || !name) return undefined;

  const description =
    clean(dto.description) ??
    `${name} printing in Lagos, produced by PrintPalash.`;

  return {
    slug,
    name,
    productCount: dto.productCount ?? 0,
    tagline: clean(dto.tagline) ?? "",
    description,
    seo: {
      title: `${name} Printing in Lagos`,
      description,
      keywords: [name.toLowerCase(), `${name.toLowerCase()} printing lagos`],
    },
    faqs: [],
    relatedServiceSlugs: [],
  };
}

export function categoriesFromApi(items: ApiCategory[]): Category[] {
  return items
    .map(categoryFromApi)
    .filter((category): category is Category => category !== undefined);
}
