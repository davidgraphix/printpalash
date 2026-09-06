"use client";

import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";

import { Button, EmptyState, ErrorState, Skeleton, cx } from "./primitives";
import type { ApiError } from "@/lib/admin/api";

/* ================================================================== *
 * Table
 * ================================================================== */

export interface Column<T> {
  /** Column heading. Empty for an actions column. */
  header: string;
  /** What to draw in the cell. */
  cell: (row: T) => React.ReactNode;
  /** Right-align, for money and counts. */
  numeric?: boolean;
  /** Hidden below `md` — the columns a phone can do without. */
  secondary?: boolean;
  width?: string;
}

/**
 * The admin's data table.
 *
 * Denser than anything on the marketing site: this is scanned, not read. Rows
 * are compact, numbers are right-aligned with tabular figures so columns of
 * naira line up, and the columns a phone cannot fit are dropped rather than
 * squeezed.
 *
 * Loading, empty and error are handled here rather than in each screen, because
 * every table needs all three and duplicating them is how they drift.
 */
export function DataTable<T>({
  columns,
  rows,
  keyOf,
  loading,
  error,
  onRetry,
  onRowClick,
  empty,
  skeletonRows = 8,
}: {
  columns: Column<T>[];
  rows: T[] | null;
  keyOf: (row: T) => string;
  loading?: boolean;
  error?: ApiError | null;
  onRetry?: () => void;
  onRowClick?: (row: T) => void;
  empty?: { title: string; description?: string; action?: React.ReactNode };
  skeletonRows?: number;
}) {
  if (error) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white">
        <ErrorState message={error.message} onRetry={onRetry} />
      </div>
    );
  }

  // Only on the first load: a filter change keeps the old rows visible and dims
  // them, which is far less jarring than the table vanishing on every keystroke.
  const firstLoad = loading && rows === null;

  if (!firstLoad && rows !== null && rows.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white">
        <EmptyState
          title={empty?.title ?? "Nothing here yet"}
          description={empty?.description}
          action={empty?.action}
        />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                style={column.width ? { width: column.width } : undefined}
                className={cx(
                  "whitespace-nowrap px-3 py-2 text-left text-[11px] font-bold uppercase tracking-wide text-gray-500",
                  column.numeric && "text-right",
                  column.secondary && "hidden md:table-cell",
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={cx(loading && !firstLoad && "opacity-60 transition-opacity")}>
          {firstLoad
            ? Array.from({ length: skeletonRows }).map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b border-gray-100 last:border-0">
                  {columns.map((column, index) => (
                    <td
                      key={index}
                      className={cx("px-3 py-2.5", column.secondary && "hidden md:table-cell")}
                    >
                      <Skeleton className="h-4 w-full max-w-[10rem]" />
                    </td>
                  ))}
                </tr>
              ))
            : rows?.map((row) => (
                <tr
                  key={keyOf(row)}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  onKeyDown={
                    onRowClick
                      ? (event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            onRowClick(row);
                          }
                        }
                      : undefined
                  }
                  tabIndex={onRowClick ? 0 : undefined}
                  className={cx(
                    "border-b border-gray-100 last:border-0",
                    onRowClick &&
                      "cursor-pointer hover:bg-gray-50 focus:bg-gray-50 focus:outline-none " +
                        "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-600",
                  )}
                >
                  {columns.map((column, index) => (
                    <td
                      key={index}
                      className={cx(
                        "px-3 py-2.5 align-middle text-gray-800",
                        column.numeric && "text-right tabular-nums",
                        column.secondary && "hidden md:table-cell",
                      )}
                    >
                      {column.cell(row)}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================================================================== *
 * Pagination
 * ================================================================== */

export function Pagination({
  page,
  pageSize,
  totalCount,
  onPageChange,
}: {
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  if (totalCount === 0) return null;

  const first = (page - 1) * pageSize + 1;
  const last = Math.min(page * pageSize, totalCount);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-1 py-2">
      {/* The count matters as much as the controls: "showing 1–25 of 48" tells
          you whether the filter did what you expected. */}
      <p className="text-xs text-gray-600 tabular-nums">
        Showing <b>{first.toLocaleString()}</b>–<b>{last.toLocaleString()}</b> of{" "}
        <b>{totalCount.toLocaleString()}</b>
      </p>

      <div className="flex items-center gap-1">
        <Button
          variant="secondary"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Previous
        </Button>

        <span className="px-2 text-xs text-gray-600 tabular-nums">
          {page} / {totalPages}
        </span>

        <Button
          variant="secondary"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

/* ================================================================== *
 * Filters
 * ================================================================== */

export function SearchInput({
  value,
  onChange,
  placeholder = "Search",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative min-w-0 flex-1 sm:max-w-xs">
      <Search
        className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-9 w-full rounded-md border border-gray-300 bg-white pl-8 pr-8 text-sm placeholder:text-gray-400 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-400 hover:text-gray-700"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export function Select({
  value,
  onChange,
  options,
  label,
  allLabel = "All",
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  label: string;
  allLabel?: string;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label={label}
      className={cx(
        "h-9 rounded-md border bg-white px-2.5 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600",
        // An active filter is visibly active, so nobody wonders why the table
        // is short.
        value ? "border-red-300 bg-red-50 font-medium text-red-900" : "border-gray-300 text-gray-800",
      )}
    >
      <option value="">{allLabel}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

/** The row of controls above a table. Wraps rather than scrolls on a phone. */
export function FilterBar({
  children,
  onClear,
  active,
}: {
  children: React.ReactNode;
  onClear?: () => void;
  active?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {children}
      {active && onClear && (
        <Button variant="ghost" size="sm" onClick={onClear}>
          <X className="h-3.5 w-3.5" aria-hidden="true" />
          Clear filters
        </Button>
      )}
    </div>
  );
}

/* ================================================================== *
 * Page furniture
 * ================================================================== */

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <h1 className="font-heading text-xl font-extrabold tracking-tight text-gray-900">
          {title}
        </h1>
        {description && <p className="mt-0.5 text-sm text-gray-600">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

/** A labelled value. The building block of every detail panel. */
export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("min-w-0", className)}>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </dt>
      <dd className="mt-0.5 break-words text-sm text-gray-900">{children}</dd>
    </div>
  );
}
