"use client";

import { useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";

import {
  searchIndex,
  type SearchIndexEntry,
} from "@/lib/catalog/search-index";

/**
 * Type-ahead product search.
 *
 * Used in the site header (so it is available on every page, including product
 * detail pages) and in the homepage hero. Results appear as you type — there is
 * no submit step — and matching runs through the same scorer as the shop page,
 * so "p", "pa", "paper" and "business card" all behave the way a customer
 * expects.
 *
 * `useId` keeps the input id unique, because two instances of this component
 * can be mounted on the same page.
 */
export default function ProductSearch({
  entries,
  variant = "hero",
  placeholder = "Search for flyers, paper bags, business cards…",
  label = "Search products",
}: {
  entries: SearchIndexEntry[];
  variant?: "hero" | "header";
  placeholder?: string;
  label?: string;
}) {
  const router = useRouter();
  const inputId = useId();
  const listboxId = `${inputId}-results`;
  const blurTimer = useRef<number | undefined>(undefined);

  const [term, setTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const trimmed = term.trim();
  const results = useMemo(
    () => (trimmed ? searchIndex(entries, trimmed, 6) : []),
    [entries, trimmed]
  );

  const showResults = isOpen && trimmed.length > 0;

  const goToResults = () => {
    if (!trimmed) return;
    setIsOpen(false);
    router.push(`/products?search=${encodeURIComponent(trimmed)}`);
  };

  const isHeader = variant === "header";

  return (
    <div
      className={`relative ${isHeader ? "w-full" : "max-w-md"}`}
      role="search"
    >
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>

      <div className="relative">
        <input
          id={inputId}
          type="text"
          value={term}
          onChange={(event) => {
            setTerm(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            // Delay so a click on a result is registered before we unmount it.
            blurTimer.current = window.setTimeout(() => setIsOpen(false), 150);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              goToResults();
            }
            if (event.key === "Escape") setIsOpen(false);
          }}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-expanded={showResults}
          aria-controls={listboxId}
          aria-autocomplete="list"
          className={
            isHeader
              ? "w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-3 pr-16 text-sm text-gray-800 placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-100"
              : "w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 pr-20 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-100"
          }
        />

        {trimmed && (
          <button
            type="button"
            onClick={() => {
              window.clearTimeout(blurTimer.current);
              setTerm("");
              setIsOpen(false);
            }}
            className="absolute right-9 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <button
          type="button"
          onClick={goToResults}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 transition hover:text-red-600 focus-visible:ring-2 focus-visible:ring-red-500"
          aria-label="See all matching products"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>

      {showResults && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          {results.length > 0 ? (
            <>
              <p className="border-b px-4 py-2 text-xs font-bold uppercase tracking-wide text-gray-500">
                {results.length === 6 ? "Top matches" : "Products"}
              </p>

              <ul id={listboxId} className="max-h-[320px] overflow-y-auto">
                {results.map(({ card }) => (
                  <li key={card.slug}>
                    <Link
                      href={`/products/${card.slug}`}
                      onClick={() => {
                        window.clearTimeout(blurTimer.current);
                        setTerm("");
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-3 border-b px-3 py-2.5 transition last:border-b-0 hover:bg-red-50"
                    >
                      <span className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={card.image}
                          alt=""
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-gray-900">
                          {card.name}
                        </span>
                        <span className="block truncate text-xs text-gray-500">
                          {card.categoryName}
                        </span>
                        <span className="block truncate text-xs font-bold text-red-600">
                          {card.priceLabel}
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
                onClick={() => {
                  window.clearTimeout(blurTimer.current);
                  setIsOpen(false);
                }}
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
    </div>
  );
}
