"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";

import {
  searchIndex,
  type SearchIndexEntry,
} from "@/lib/catalog/search-index";

/**
 * Type-ahead product search used on the homepage.
 *
 * Matching goes through the same scorer as the shop page, so "business cards",
 * "t shirt" and "wedding" all resolve the way a customer expects rather than
 * relying on an exact substring of the product name.
 */
export default function ProductSearch({
  entries,
  placeholder = "Search for flyers, paper bags, business cards…",
  label = "Search products",
}: {
  entries: SearchIndexEntry[];
  placeholder?: string;
  label?: string;
}) {
  const router = useRouter();
  const [term, setTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const trimmed = term.trim();
  const results = useMemo(
    () => (trimmed ? searchIndex(entries, trimmed, 6) : []),
    [entries, trimmed]
  );

  const showResults = isFocused && trimmed.length > 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!trimmed) return;
    setIsFocused(false);
    router.push(`/products?search=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md" role="search">
      <label htmlFor="hero-product-search" className="sr-only">
        {label}
      </label>

      <div className="relative">
        <input
          id="hero-product-search"
          type="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => window.setTimeout(() => setIsFocused(false), 150)}
          placeholder={placeholder}
          autoComplete="off"
          aria-expanded={showResults}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 pr-20 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-100"
        />

        {trimmed && (
          <button
            type="button"
            onClick={() => setTerm("")}
            className="absolute right-11 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <button
          type="submit"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 transition hover:text-red-600 focus-visible:ring-2 focus-visible:ring-red-500"
          aria-label="Search products"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>

      {showResults && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          {results.length > 0 ? (
            <>
              <p className="border-b px-4 py-2 text-xs font-bold uppercase tracking-wide text-gray-500">
                Products
              </p>

              <ul className="max-h-[340px] overflow-y-auto">
                {results.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      href={`/products/${entry.slug}`}
                      onClick={() => {
                        setTerm("");
                        setIsFocused(false);
                      }}
                      className="flex items-center gap-3 border-b px-4 py-2.5 transition last:border-b-0 hover:bg-red-50"
                    >
                      <span className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={entry.image}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-gray-900">
                          {entry.name}
                        </span>
                        <span className="block truncate text-xs text-gray-500">
                          {entry.categoryName}
                        </span>
                        <span className="mt-0.5 block truncate text-xs font-bold text-red-600">
                          {entry.priceLabel}
                        </span>
                      </span>

                      <ArrowUpRight
                        aria-hidden
                        className="h-4 w-4 flex-shrink-0 text-gray-400"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href={`/products?search=${encodeURIComponent(trimmed)}`}
                onClick={() => setIsFocused(false)}
                className="block bg-gray-50 px-4 py-2.5 text-center text-sm font-bold text-red-600 transition hover:bg-red-50"
              >
                See all matching products
              </Link>
            </>
          ) : (
            <div className="px-4 py-5 text-center">
              <p className="text-sm font-bold text-gray-800">
                Nothing matched “{trimmed}”
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Try flyers, paper bags, business cards, banners, T-shirts or
                brochures.
              </p>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
