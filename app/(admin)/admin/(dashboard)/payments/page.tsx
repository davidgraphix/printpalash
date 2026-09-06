"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Info } from "lucide-react";

import { Badge, Card, EmptyState, Skeleton } from "@/components/admin/ui/primitives";
import { can } from "@/lib/admin/config";
import { useSession } from "@/lib/admin/session";
import {
  Column, DataTable, FilterBar, PageHeader, Pagination, SearchInput, Select,
} from "@/components/admin/ui/table";
import { useDebounced, useQuery, useUrlFilters } from "@/lib/admin/hooks";
import { dateTime, money, spaced } from "@/lib/admin/format";
import { payments } from "@/lib/admin/resources";
import type { PaymentListItem } from "@/lib/admin/types";

const METHODS = ["BankTransfer", "Pos", "Cash", "OnlineLink"];
const PAGE_SIZE = 25;

export default function PaymentsPage() {
  return (
    <Suspense fallback={<Skeleton className="h-96 rounded-lg" />}>
      <PaymentsList />
    </Suspense>
  );
}

function PaymentsList() {
  const { role } = useSession();

  // The endpoint is Super-Admin-only server-side. Saying so beats rendering the
  // filters and then a permission error underneath them.
  if (!can.viewFinancials(role)) {
    return (
      <Card>
        <EmptyState
          title="Payments are Super Admin only"
          description="The ledger shows every amount received across every order."
        />
      </Card>
    );
  }

  const [filters, setFilters] = useUrlFilters({
    search: "", method: "", verified: "", from: "", to: "", page: "1",
  });

  const [searchText, setSearchText] = useState(filters.search);
  const search = useDebounced(searchText, 300);

  useEffect(() => {
    if (search !== filters.search) setFilters({ search: search || null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const page = Math.max(1, Number(filters.page) || 1);

  const criteria = {
    search: filters.search || undefined,
    method: filters.method || undefined,
    verified: filters.verified === "true" ? true : filters.verified === "false" ? false : undefined,
    from: filters.from || undefined,
    to: filters.to || undefined,
  };

  const { data, error, loading, reload } = useQuery(
    (signal) => payments.list({ ...criteria, page, pageSize: PAGE_SIZE }, signal),
    [filters.search, filters.method, filters.verified, filters.from, filters.to, page],
  );

  // Totals for the whole filter, not just the visible page — a payments screen
  // that sums only what fits on screen answers a question nobody asked.
  const { data: totals } = useQuery(
    (signal) => payments.totals(criteria, signal),
    [filters.search, filters.method, filters.verified, filters.from, filters.to],
  );

  const hasFilters = Boolean(
    filters.search || filters.method || filters.verified || filters.from || filters.to,
  );

  const columns: Column<PaymentListItem>[] = [
    {
      header: "Amount",
      numeric: true,
      cell: (row) => <span className="font-semibold">{money(row.amount)}</span>,
    },
    {
      header: "Order",
      cell: (row) => (
        <Link
          href={`/admin/orders/${row.orderId}`}
          className="font-medium text-red-700 hover:underline"
          onClick={(event) => event.stopPropagation()}
        >
          {row.orderNumber}
        </Link>
      ),
    },
    { header: "Customer", cell: (row) => <span className="truncate">{row.customerName}</span> },
    {
      header: "Method",
      cell: (row) => <span className="text-xs text-gray-700">{spaced(row.paymentMethod)}</span>,
    },
    {
      header: "Reference",
      secondary: true,
      cell: (row) => (
        <span className="font-mono text-xs text-gray-600">{row.referenceNumber ?? "—"}</span>
      ),
    },
    {
      header: "Verified",
      secondary: true,
      cell: (row) =>
        row.isVerified ? <Badge tone="success">Verified</Badge> : <Badge tone="neutral">—</Badge>,
    },
    {
      header: "Recorded",
      secondary: true,
      cell: (row) => (
        <span className="text-xs text-gray-600">
          {dateTime(row.createdAt)}
          <span className="block">{row.recordedBy}</span>
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Payments"
        description="Every payment across every order. Super Admins only."
      />

      {totals && (
        <div className="grid gap-3 sm:grid-cols-2">
          <Card>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              {hasFilters ? "Matching payments" : "Payments recorded"}
            </p>
            <p className="mt-1 font-heading text-2xl font-extrabold tabular-nums text-gray-900">
              {totals.count.toLocaleString()}
            </p>
          </Card>
          <Card>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              {hasFilters ? "Matching total" : "Total collected"}
            </p>
            <p className="mt-1 font-heading text-2xl font-extrabold tabular-nums text-gray-900">
              {money(totals.total)}
            </p>
          </Card>
        </div>
      )}

      <FilterBar
        active={hasFilters}
        onClear={() => {
          setSearchText("");
          setFilters({ search: null, method: null, verified: null, from: null, to: null });
        }}
      >
        <SearchInput
          value={searchText}
          onChange={setSearchText}
          placeholder="Order number, customer or reference"
        />

        <Select
          label="Method" allLabel="All methods"
          value={filters.method}
          onChange={(value) => setFilters({ method: value || null })}
          options={METHODS.map((m) => ({ value: m, label: spaced(m) }))}
        />

        <Select
          label="Verified" allLabel="Verified & not"
          value={filters.verified}
          onChange={(value) => setFilters({ verified: value || null })}
          options={[
            { value: "true", label: "Verified only" },
            { value: "false", label: "Unverified only" },
          ]}
        />

        <input
          type="date" value={filters.from} aria-label="From"
          onChange={(event) => setFilters({ from: event.target.value || null })}
          className="h-9 rounded-md border border-gray-300 bg-white px-2 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
        />
        <input
          type="date" value={filters.to} aria-label="To"
          onChange={(event) => setFilters({ to: event.target.value || null })}
          className="h-9 rounded-md border border-gray-300 bg-white px-2 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
        />
      </FilterBar>

      <DataTable
        columns={columns}
        rows={data?.items ?? null}
        keyOf={(row) => row.id}
        loading={loading}
        error={error}
        onRetry={reload}
        empty={{
          title: hasFilters ? "No payments match" : "No payments recorded",
          description: hasFilters ? "Try widening the date range." : undefined,
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

      <p className="flex items-start gap-1.5 text-xs text-gray-500">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        Read-only. Payments are recorded and reversed on the order itself, where the
        overpayment guard and the transactional recalculation live.
      </p>
    </div>
  );
}
