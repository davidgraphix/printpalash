"use client";

import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X } from "lucide-react";

import {
  searchIndex,
  type SearchIndexEntry,
} from "@/lib/catalog/search-index";
import ProductCard from "./ProductCard";

const SUGGESTIONS = ["business card", "flyer", "paper bag", "t shirt", "banner"];

/**
 * Live filtering for the shop grid.
 *
 * The server has already rendered the correct grid for the current URL — the
 * full catalogue, a category, or `?search=` results — and that markup is passed
 * in as `children`. This component renders the toolbar above it and only takes
 * over the results area once the visitor types something *different* from what
 * the server rendered.
 *
 * That ordering matters: the crawlable default view stays fully server-rendered
 * (which is what fixed the empty-catalogue problem), while typing still filters
 * instantly with no page load and no Enter key.
 */
export default function ProductsLiveSearch({
  entries,
  initialQuery = "",
  serverCount,
  headingSuffix,
  children,
}: {
  entries: SearchIndexEntry[];
  initialQuery?: string;
  serverCount: number;
  /** Category name when browsing a category, otherwise undefined. */
  headingSuffix?: string;
  children: ReactNode;
}) {
  const inputId = useId();
  const router = useRouter();
  const pathname = usePathname();

  const [term, setTerm] = useState(initialQuery);
  // Nothing touches the URL until the visitor actually types, so a plain page
  // view never rewrites its own address.
  const [hasTyped, setHasTyped] = useState(false);

  const trimmed = term.trim();
  const baseQuery = initialQuery.trim();

  // Show the server's markup whenever it is already correct for what is in the
  // box: an empty box (full catalogue or category) or a term the server has
  // already filtered on. Only genuinely new input is rendered client-side.
  const showServerResults = !trimmed || trimmed === baseQuery;

  const liveResults = useMemo(
    () => (showServerResults ? [] : searchIndex(entries, trimmed)),
    [entries, trimmed, showServerResults]
  );

  useEffect(() => {
    if (!hasTyped || typeof window === "undefined") return;

    // Cleared the box while on a ?search= URL — send them back to the full
    // server-rendered shop rather than leaving a filtered grid on screen.
    if (!trimmed && baseQuery) {
      router.replace(pathname);
      return;
    }

    // Otherwise keep the URL shareable. history.replaceState rather than
    // router.replace so live typing does not fire a request per keystroke.
    const url = new URL(window.location.href);
    if (trimmed) url.searchParams.set("search", trimmed);
    else url.searchParams.delete("search");
    window.history.replaceState(null, "", url.toString());
  }, [hasTyped, trimmed, baseQuery, router, pathname]);

  const count = showServerResults ? serverCount : liveResults.length;

  const heading = trimmed
    ? `Results for “${trimmed}”`
    : headingSuffix ?? "All products";

  return (
    <>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-gray-900 lg:text-xl">
            {heading}
          </h2>
          <p className="mt-0.5 text-sm text-gray-500" aria-live="polite">
            {count} product{count === 1 ? "" : "s"}
          </p>
        </div>

        <div className="relative w-full sm:w-80" role="search">
          <label htmlFor={inputId} className="sr-only">
            Search products
          </label>
          <input
            id={inputId}
            type="text"
            value={term}
            onChange={(event) => {
              setTerm(event.target.value);
              setHasTyped(true);
            }}
            placeholder="Search flyers, paper bags, business cards…"
            autoComplete="off"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-10 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
          />
          {trimmed ? (
            <button
              type="button"
              onClick={() => {
                setTerm("");
                setHasTyped(true);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-red-600"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <Search
              aria-hidden
              className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            />
          )}
        </div>
      </div>

      {showServerResults ? (
        children
      ) : liveResults.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {liveResults.map(({ card }) => (
            <ProductCard key={card.slug} view={card} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-white px-6 py-12 text-center shadow-sm">
          <h3 className="text-base font-bold text-gray-800">
            Nothing matched “{trimmed}”.
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
            Try a broader word, or browse a category. We print more than fits in
            one search — if you cannot find it, just ask.
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <li key={suggestion}>
                <button
                  type="button"
                  onClick={() => {
                    setTerm(suggestion);
                    setHasTyped(true);
                  }}
                  className="inline-flex rounded-full border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition hover:border-red-300 hover:text-red-600"
                >
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
          <Link
            href="/get-a-quote"
            className="mt-5 inline-flex rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Ask for a custom quote
          </Link>
        </div>
      )}
    </>
  );
}
