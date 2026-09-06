"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ApiError } from "./api";

/* ------------------------------------------------------------------ *
 * Loading data
 * ------------------------------------------------------------------ */

interface Query<T> {
  data: T | null;
  error: ApiError | null;
  loading: boolean;
  /** Re-runs the fetch, keeping whatever is already on screen. */
  reload: () => void;
}

/**
 * Loads something from the API and tracks the three states every screen needs.
 *
 * Each run aborts the one before it, so a fast typist filtering a table cannot
 * have an early response land after a later one and overwrite it. The abort is
 * not reported as an error — it is the caller's own doing.
 *
 * `deps` behaves like a dependency array: change a filter, the query re-runs.
 */
export function useQuery<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: unknown[],
): Query<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(true);
  const [nonce, setNonce] = useState(0);

  // Held in a ref so changing the fetcher identity does not re-run the effect;
  // the dependency array is what decides that.
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetcherRef
      .current(controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        setData(result);
        setError(null);
      })
      .catch((caught: unknown) => {
        if (controller.signal.aborted) return;
        if (caught instanceof DOMException && caught.name === "AbortError") return;

        setError(
          caught instanceof ApiError
            ? caught
            : new ApiError(0, "Something went wrong loading this."),
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  const reload = useCallback(() => setNonce((n) => n + 1), []);

  return { data, error, loading, reload };
}

/* ------------------------------------------------------------------ *
 * Filters that live in the URL
 * ------------------------------------------------------------------ */

/**
 * Reads and writes filter state through the query string.
 *
 * In the URL rather than component state so a filtered view can be sent to a
 * colleague, survives a reload, and works with the browser's back button — all
 * of which a table full of orders is expected to do. It also means the sidebar
 * can link straight to "orders awaiting payment" without any special casing.
 */
export function useUrlFilters<T extends Record<string, string>>(defaults: T) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const current = { ...defaults };
  for (const key of Object.keys(defaults) as (keyof T)[]) {
    const value = params.get(String(key));
    if (value !== null) current[key] = value as T[keyof T];
  }

  const setFilters = useCallback(
    (changes: Partial<Record<keyof T, string | null>>) => {
      const next = new URLSearchParams(params.toString());

      for (const [key, value] of Object.entries(changes)) {
        if (value === null || value === "") next.delete(key);
        else next.set(key, String(value));
      }

      // Any filter change returns to the first page: staying on page 4 of a
      // result set that now has two pages shows an empty table.
      if (!("page" in changes)) next.delete("page");

      const search = next.toString();
      router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  return [current, setFilters] as const;
}

/* ------------------------------------------------------------------ *
 * Debounce
 * ------------------------------------------------------------------ */

/**
 * Delays a value until it stops changing.
 *
 * Search boxes only. Three hundred milliseconds is long enough that typing
 * "business cards" is one request rather than fourteen, and short enough that
 * the table still feels like it is keeping up.
 */
export function useDebounced<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
