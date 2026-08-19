"use client";

import { Clock, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import ProductSearch from "@/components/Products/ProductSearch";
import type { SearchIndexEntry } from "@/lib/catalog/search-index";
import { PHONE_DISPLAY, PHONE_E164, SITE } from "@/lib/site";

/**
 * Site header.
 *
 * The product search lives here so it is present on every page — including
 * product detail pages, where the client reported it was missing. It is the
 * same component the homepage hero uses, driven by the same catalogue index.
 */
export default function Header({
  searchEntries,
}: {
  searchEntries: SearchIndexEntry[];
}) {
  const logo = (
    <Link href="/" aria-label="PrintPalash home" className="inline-block">
      <Image
        src="/assests/printpalash-logo.png"
        alt="PrintPalash Logo"
        width={280}
        height={280}
        priority
        className="h-auto w-32 object-contain sm:w-40 lg:w-48"
      />
    </Link>
  );

  return (
    <header className="border-b border-gray-200 bg-white py-2.5">
      <div className="container mx-auto px-4">
        {/* Mobile */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-shrink-0">{logo}</div>

            <a
              href={`tel:${PHONE_E164}`}
              className="flex items-center gap-2 text-right"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <Phone aria-hidden className="h-4 w-4 text-gray-600" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[10px] text-gray-500">Need help?</span>
                <span className="text-[11px] font-medium text-gray-900">
                  {PHONE_DISPLAY}
                </span>
              </span>
            </a>
          </div>

          <div className="mt-2.5">
            <ProductSearch
              entries={searchEntries}
              variant="header"
              placeholder="Search products…"
            />
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden items-center gap-6 lg:flex">
          <div className="flex-shrink-0">{logo}</div>

          <div className="min-w-0 flex-1 max-w-md">
            <ProductSearch
              entries={searchEntries}
              variant="header"
              placeholder="Search products…"
            />
          </div>

          <div className="flex flex-shrink-0 items-center gap-6">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                <Clock aria-hidden className="h-4 w-4 text-gray-600" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-gray-900">
                  {SITE.openingHours.hoursShort}
                </span>
                <span className="text-xs text-gray-500">
                  {SITE.openingHours.daysShort}
                </span>
              </span>
            </div>

            <a
              href={`tel:${PHONE_E164}`}
              className="flex items-center gap-2.5 hover:text-red-600"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                <Phone aria-hidden className="h-4 w-4 text-gray-600" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-xs text-gray-500">Need help? Call</span>
                <span className="text-sm font-semibold text-gray-900">
                  {PHONE_DISPLAY}
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
