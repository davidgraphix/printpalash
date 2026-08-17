import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/catalog/types";
import { formatPriceShort } from "@/lib/catalog/pricing";

/**
 * One product card, shared by the homepage, the shop grid and the related
 * products rail so all three stay consistent.
 *
 * The card shows the published price with its quantity basis ("From ₦24,000
 * per 100 flyers") rather than a bare amount, because every price in the
 * catalogue is a starting price for a batch.
 */
export default function ProductCard({
  product,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  priority = false,
}: {
  product: Product;
  sizes?: string;
  priority?: boolean;
}) {
  const href = `/products/${product.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:border-red-200 hover:shadow-lg">
      <Link href={href} className="block" tabIndex={-1} aria-hidden="true">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="text-sm font-bold leading-snug text-gray-900 lg:text-base">
          <Link
            href={href}
            className="rounded outline-none transition group-hover:text-red-600 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-1 line-clamp-2 text-xs leading-normal text-gray-600 sm:text-sm">
          {product.shortDescription}
        </p>

        <p className="mt-2 text-sm font-bold text-red-600">
          {product.startingPrice
            ? formatPriceShort(product.startingPrice)
            : "Request a quote"}
        </p>

        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-gray-900 transition group-hover:text-red-600 sm:text-sm">
          View details
          <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
