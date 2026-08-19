import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import type { ProductCardView } from "@/lib/catalog/card";

/**
 * One product card — shared by the homepage rail, the shop grid, category
 * pages, related products and the live search results.
 *
 * Two deliberate decisions here:
 *
 * 1. **It only shows what you need to scan.** Image, name, one short line,
 *    starting price, CTA. Materials, sizes, finishing, options and FAQs live
 *    on the detail page; putting them here is what made the grid feel packed.
 *
 * 2. **The whole card is one link.** Rather than wrapping the card in an
 *    anchor (which would nest the CTA inside it and produce invalid HTML), a
 *    single stretched overlay link covers the card. Image, name, excerpt,
 *    price and the "Order Now" affordance are all inside its hit area, so a
 *    click anywhere lands on the product page — but there is still exactly one
 *    anchor per card and one tab stop.
 */
export default function ProductCard({
  view,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  priority = false,
}: {
  view: ProductCardView;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-red-300 hover:shadow-lg focus-within:border-red-400 focus-within:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={view.image}
          alt={view.imageAlt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5 sm:p-4">
        <h3 className="text-sm font-bold leading-snug text-gray-900 transition group-hover:text-red-600 lg:text-base">
          {view.name}
        </h3>

        <p className="line-clamp-2 text-xs leading-snug text-gray-500 sm:text-[13px]">
          {view.excerpt}
        </p>

        <p className="mt-auto pt-1 text-sm font-bold text-red-600">
          {view.priceLabel}
        </p>

        {/* Visual affordance only — the stretched link below handles navigation,
            so this must not be an anchor or a button. */}
        <span
          aria-hidden="true"
          className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition group-hover:bg-red-600 group-hover:text-white sm:text-sm"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          Order Now
        </span>
      </div>

      <Link
        href={`/products/${view.slug}`}
        className="absolute inset-0 z-10 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
      >
        {/* The card's visible text is decorative to assistive tech because the
            link covers it, so the accessible name is spelled out here. */}
        <span className="sr-only">
          {view.name} — {view.priceLabel}. Order now.
        </span>
      </Link>
    </article>
  );
}
