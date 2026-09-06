"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Plus, Star } from "lucide-react";

import { PricingReviewBadge, ProductStatusBadge } from "@/components/admin/ui/badges";
import { Button, Skeleton } from "@/components/admin/ui/primitives";
import {
  Column, DataTable, FilterBar, PageHeader, Pagination, SearchInput, Select,
} from "@/components/admin/ui/table";
import { useDebounced, useQuery, useUrlFilters } from "@/lib/admin/hooks";
import { can } from "@/lib/admin/config";
import { priceBasis } from "@/lib/admin/format";
import { brands, categories, products } from "@/lib/admin/resources";
import { useSession } from "@/lib/admin/session";
import type { ProductListItem } from "@/lib/admin/types";

const STATUSES = ["Draft", "Published", "Unpublished", "Archived"];

const REVIEW_STATUSES = [
  { value: "NeedsReview", label: "Needs review" },
  { value: "Confirmed", label: "Confirmed" },
  { value: "ManuallyApproved", label: "Manually approved" },
  { value: "NoPricePublished", label: "No published price" },
];

const PAGE_SIZE = 25;

export default function ProductsPage() {
  return (
    <Suspense fallback={<Skeleton className="h-96 rounded-lg" />}>
      <ProductsList />
    </Suspense>
  );
}

function ProductsList() {
  const router = useRouter();
  const { role } = useSession();

  const [filters, setFilters] = useUrlFilters({
    search: "", categoryId: "", brandId: "", status: "",
    featured: "", pricingReview: "", page: "1",
  });

  const [searchText, setSearchText] = useState(filters.search);
  const search = useDebounced(searchText, 300);

  useEffect(() => {
    if (search !== filters.search) setFilters({ search: search || null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const page = Math.max(1, Number(filters.page) || 1);

  const { data, error, loading, reload } = useQuery(
    (signal) =>
      products.list(
        {
          search: filters.search || undefined,
          categoryId: filters.categoryId || undefined,
          brandId: filters.brandId || undefined,
          status: filters.status || undefined,
          featured: filters.featured === "true" ? true : undefined,
          pricingReview: filters.pricingReview || undefined,
          page,
          pageSize: PAGE_SIZE,
        },
        signal,
      ),
    [filters.search, filters.categoryId, filters.brandId, filters.status,
     filters.featured, filters.pricingReview, page],
  );

  const { data: categoryList } = useQuery((signal) => categories.list(signal), []);
  const { data: brandList } = useQuery((signal) => brands.list(signal), []);

  const hasFilters = Boolean(
    filters.search || filters.categoryId || filters.brandId ||
    filters.status || filters.featured || filters.pricingReview,
  );

  const columns: Column<ProductListItem>[] = [
    {
      header: "Product",
      cell: (row) => (
        <div className="flex min-w-0 items-center gap-2.5">
          {row.primaryImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={row.primaryImageUrl}
              alt=""
              className="h-9 w-9 shrink-0 rounded object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-9 w-9 shrink-0 rounded bg-gray-100" aria-hidden="true" />
          )}

          <div className="min-w-0">
            <p className="flex items-center gap-1 truncate font-medium text-gray-900">
              {row.name}
              {row.isFeatured && (
                <Star className="h-3 w-3 shrink-0 fill-amber-400 text-amber-400" aria-label="Featured" />
              )}
            </p>
            <p className="truncate text-xs text-gray-500">{row.categoryName}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Price",
      secondary: true,
      cell: (row) => (
        <span className="text-xs text-gray-700">
          {priceBasis(row.basePrice, row.priceQuantity, row.priceUnit)}
        </span>
      ),
    },
    { header: "Status", cell: (row) => <ProductStatusBadge status={row.status} /> },
    {
      header: "Pricing",
      cell: (row) => <PricingReviewBadge status={row.pricingReviewStatus} />,
    },
    {
      header: "Quotable",
      cell: (row) =>
        row.canAutoQuote ? (
          <span className="text-xs text-green-700">Yes</span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700">
            <AlertTriangle className="h-3 w-3" aria-hidden="true" />
            No
          </span>
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Products"
        description="The catalogue the public website reads."
        actions={
          can.managePricing(role) && (
            <Button size="sm" onClick={() => router.push("/admin/products/new")}>
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              New product
            </Button>
          )
        }
      />

      {/* The queue that blocks revenue, surfaced wherever products are listed. */}
      {filters.pricingReview !== "NeedsReview" && (
        <PricingReviewCallout
          onOpen={() => setFilters({ pricingReview: "NeedsReview", status: null })}
        />
      )}

      <FilterBar
        active={hasFilters}
        onClear={() => {
          setSearchText("");
          setFilters({
            search: null, categoryId: null, brandId: null,
            status: null, featured: null, pricingReview: null,
          });
        }}
      >
        <SearchInput value={searchText} onChange={setSearchText} placeholder="Name or slug" />

        <Select
          label="Category" allLabel="All categories"
          value={filters.categoryId}
          onChange={(value) => setFilters({ categoryId: value || null })}
          options={(categoryList ?? []).map((c) => ({ value: c.id, label: c.name }))}
        />

        <Select
          label="Brand" allLabel="All brands"
          value={filters.brandId}
          onChange={(value) => setFilters({ brandId: value || null })}
          options={(brandList ?? []).map((b) => ({ value: b.id, label: b.name }))}
        />

        <Select
          label="Status" allLabel="All statuses"
          value={filters.status}
          onChange={(value) => setFilters({ status: value || null })}
          options={STATUSES.map((s) => ({ value: s, label: s }))}
        />

        <Select
          label="Pricing review" allLabel="All pricing"
          value={filters.pricingReview}
          onChange={(value) => setFilters({ pricingReview: value || null })}
          options={REVIEW_STATUSES}
        />

        <Select
          label="Featured" allLabel="Featured & not"
          value={filters.featured}
          onChange={(value) => setFilters({ featured: value || null })}
          options={[{ value: "true", label: "Featured only" }]}
        />
      </FilterBar>

      <DataTable
        columns={columns}
        rows={data?.items ?? null}
        keyOf={(row) => row.id}
        loading={loading}
        error={error}
        onRetry={reload}
        onRowClick={(row) => router.push(`/admin/products/${row.id}`)}
        empty={{
          title: hasFilters ? "No products match those filters" : "No products yet",
          description: hasFilters ? "Try clearing a filter." : undefined,
        }}
      />

      {data && (
        <Pagination
          page={data.page}
          pageSize={data.pageSize}
          totalCount={data.totalCount}
          onPageChange={(next) => setFilters({ page: String(next) })}
        />
      )}
    </div>
  );
}

/**
 * How many products cannot be quoted right now.
 *
 * Shown above the table rather than buried in a filter, because a flagged
 * product is not a cosmetic warning — it is a product the site will not price,
 * and every one of them is a sale that cannot complete itself.
 */
function PricingReviewCallout({ onOpen }: { onOpen: () => void }) {
  const { data } = useQuery(
    (signal) => products.list({ pricingReview: "NeedsReview", pageSize: 1 }, signal),
    [],
  );

  if (!data || data.totalCount === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2.5">
      <AlertTriangle className="h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
      <p className="flex-1 text-sm text-amber-900">
        <b>{data.totalCount}</b>{" "}
        {data.totalCount === 1 ? "product is" : "products are"} blocked from automatic
        quoting until someone confirms the price.
      </p>
      <Button variant="secondary" size="sm" onClick={onOpen}>
        Review them
      </Button>
    </div>
  );
}
