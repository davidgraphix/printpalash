"use client";

import { Plus } from "lucide-react";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { OrderStatusBadge, PaymentStatusBadge } from "@/components/admin/ui/badges";
import { Button, Skeleton } from "@/components/admin/ui/primitives";
import {
  Column,
  DataTable,
  FilterBar,
  PageHeader,
  Pagination,
  SearchInput,
  Select,
} from "@/components/admin/ui/table";
import { useDebounced, useQuery, useUrlFilters } from "@/lib/admin/hooks";
import { can } from "@/lib/admin/config";
import { useSession } from "@/lib/admin/session";
import { date, money, spaced } from "@/lib/admin/format";
import { orders } from "@/lib/admin/resources";
import type { OrderListItem } from "@/lib/admin/types";

const STATUSES = [
  "PendingPayment", "Proofing", "InProduction", "QualityCheck",
  "ReadyForDispatch", "OutForDelivery", "Completed", "Cancelled", "Refunded",
];

const PAYMENT_STATUSES = ["Unpaid", "PartiallyPaid", "FullyPaid", "Refunded"];
const CHANNELS = ["WhatsApp", "Email", "Instagram", "WalkIn", "PhoneCall"];

const PAGE_SIZE = 25;

export default function OrdersPage() {
  return (
    <Suspense fallback={<Skeleton className="h-96 rounded-lg" />}>
      <OrdersList />
    </Suspense>
  );
}

function OrdersList() {
  const router = useRouter();
  const { role } = useSession();

  // Filters live in the URL so a filtered view is shareable, survives a reload,
  // and lets the sidebar link straight to "orders awaiting payment".
  const [filters, setFilters] = useUrlFilters({
    search: "",
    status: "",
    paymentStatus: "",
    channel: "",
    from: "",
    to: "",
    page: "1",
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
      orders.list(
        {
          search: filters.search || undefined,
          status: filters.status || undefined,
          paymentStatus: filters.paymentStatus || undefined,
          channel: filters.channel || undefined,
          from: filters.from || undefined,
          to: filters.to || undefined,
          page,
          pageSize: PAGE_SIZE,
        },
        signal,
      ),
    [filters.search, filters.status, filters.paymentStatus, filters.channel, filters.from, filters.to, page],
  );

  const hasFilters = Boolean(
    filters.search || filters.status || filters.paymentStatus ||
    filters.channel || filters.from || filters.to,
  );

  const columns: Column<OrderListItem>[] = [
    {
      header: "Order",
      cell: (row) => (
        <div className="min-w-0">
          <p className="font-semibold text-gray-900">{row.orderNumber}</p>
          <p className="truncate text-xs text-gray-500">{row.trackingNumber}</p>
        </div>
      ),
    },
    {
      header: "Customer",
      cell: (row) => (
        <div className="min-w-0">
          <p className="truncate text-gray-900">{row.customerName}</p>
          <p className="truncate text-xs text-gray-500">{row.customerPhone}</p>
        </div>
      ),
    },
    {
      header: "Channel",
      secondary: true,
      cell: (row) => <span className="text-xs text-gray-600">{spaced(row.channel)}</span>,
    },
    { header: "Status", cell: (row) => <OrderStatusBadge status={row.status} /> },
    {
      header: "Payment",
      cell: (row) => <PaymentStatusBadge status={row.paymentStatus} />,
    },
    {
      header: "Total",
      numeric: true,
      cell: (row) => <span className="font-medium">{money(row.totalAmount)}</span>,
    },
    {
      header: "Outstanding",
      numeric: true,
      secondary: true,
      cell: (row) => (
        <span className={row.outstandingBalance > 0 ? "font-medium text-red-700" : "text-gray-400"}>
          {row.outstandingBalance > 0 ? money(row.outstandingBalance) : "—"}
        </span>
      ),
    },
    {
      header: "Placed",
      secondary: true,
      cell: (row) => <span className="text-xs text-gray-600">{date(row.createdAt)}</span>,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        actions={
          can.salesOrAbove(role) && (
            <Button size="sm" onClick={() => router.push("/admin/orders/new")}>
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              New order
            </Button>
          )
        }
        title="Orders"
        description={
          filters.status
            ? `Filtered to ${spaced(filters.status).toLowerCase()}.`
            : "Every order placed, across all channels."
        }
      />

      <FilterBar
        active={hasFilters}
        onClear={() => {
          setSearchText("");
          setFilters({
            search: null, status: null, paymentStatus: null,
            channel: null, from: null, to: null,
          });
        }}
      >
        <SearchInput
          value={searchText}
          onChange={setSearchText}
          placeholder="Order number, customer, phone"
        />

        <Select
          label="Status"
          allLabel="All statuses"
          value={filters.status}
          onChange={(value) => setFilters({ status: value || null })}
          options={STATUSES.map((s) => ({ value: s, label: spaced(s) }))}
        />

        <Select
          label="Payment"
          allLabel="All payments"
          value={filters.paymentStatus}
          onChange={(value) => setFilters({ paymentStatus: value || null })}
          options={PAYMENT_STATUSES.map((s) => ({ value: s, label: spaced(s) }))}
        />

        <Select
          label="Channel"
          allLabel="All channels"
          value={filters.channel}
          onChange={(value) => setFilters({ channel: value || null })}
          options={CHANNELS.map((c) => ({ value: c, label: spaced(c) }))}
        />

        <input
          type="date"
          value={filters.from}
          onChange={(event) => setFilters({ from: event.target.value || null })}
          aria-label="Placed from"
          className="h-9 rounded-md border border-gray-300 bg-white px-2 text-sm text-gray-800 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
        />
        <input
          type="date"
          value={filters.to}
          onChange={(event) => setFilters({ to: event.target.value || null })}
          aria-label="Placed to"
          className="h-9 rounded-md border border-gray-300 bg-white px-2 text-sm text-gray-800 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
        />
      </FilterBar>

      <DataTable
        columns={columns}
        rows={data?.items ?? null}
        keyOf={(row) => row.id}
        loading={loading}
        error={error}
        onRetry={reload}
        onRowClick={(row) => router.push(`/admin/orders/${row.id}`)}
        empty={{
          title: hasFilters ? "No orders match those filters" : "No orders yet",
          description: hasFilters
            ? "Try widening the date range or clearing a filter."
            : "Orders placed after a WhatsApp or email consultation appear here.",
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
