"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Badge, Button, Skeleton } from "@/components/admin/ui/primitives";
import {
  Column, DataTable, FilterBar, PageHeader, Pagination, SearchInput, Select,
} from "@/components/admin/ui/table";
import { CustomerForm } from "@/components/admin/customers/CustomerForm";
import { useDebounced, useQuery, useUrlFilters } from "@/lib/admin/hooks";
import { can } from "@/lib/admin/config";
import { date, money } from "@/lib/admin/format";
import { customers } from "@/lib/admin/resources";
import { useSession } from "@/lib/admin/session";
import type { CustomerListItem } from "@/lib/admin/types";

const PAGE_SIZE = 25;

export default function CustomersPage() {
  return (
    <Suspense fallback={<Skeleton className="h-96 rounded-lg" />}>
      <CustomersList />
    </Suspense>
  );
}

function CustomersList() {
  const router = useRouter();
  const { role } = useSession();

  const [filters, setFilters] = useUrlFilters({
    search: "", tag: "", hasOutstanding: "", page: "1",
  });

  const [searchText, setSearchText] = useState(filters.search);
  const search = useDebounced(searchText, 300);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (search !== filters.search) setFilters({ search: search || null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const page = Math.max(1, Number(filters.page) || 1);

  const { data, error, loading, reload } = useQuery(
    (signal) =>
      customers.list(
        {
          search: filters.search || undefined,
          tag: filters.tag || undefined,
          hasOutstanding: filters.hasOutstanding === "true" ? true : undefined,
          page,
          pageSize: PAGE_SIZE,
        },
        signal,
      ),
    [filters.search, filters.tag, filters.hasOutstanding, page],
  );

  const hasFilters = Boolean(filters.search || filters.tag || filters.hasOutstanding);

  // The server withholds contact details and spend by role, so the columns are
  // built from what actually arrived rather than from an assumption.
  const sample = data?.items[0];
  const showsContact = sample ? "phone" in sample : true;
  const showsSpend = sample ? "totalSpend" in sample : true;

  const columns: Column<CustomerListItem>[] = [
    {
      header: "Customer",
      cell: (row) => (
        <div className="min-w-0">
          <p className="truncate font-medium text-gray-900">{row.fullName}</p>
          {row.company && <p className="truncate text-xs text-gray-500">{row.company}</p>}
        </div>
      ),
    },
    ...(showsContact
      ? [
          {
            header: "Contact",
            cell: (row: CustomerListItem) => (
              <div className="min-w-0">
                <p className="truncate text-gray-800">{row.phone}</p>
                {row.email && <p className="truncate text-xs text-gray-500">{row.email}</p>}
              </div>
            ),
          } as Column<CustomerListItem>,
        ]
      : []),
    {
      header: "Tags",
      secondary: true,
      cell: (row) =>
        row.tags.length === 0 ? (
          <span className="text-gray-400">—</span>
        ) : (
          <div className="flex flex-wrap gap-1">
            {row.tags.map((tag) => (
              <Badge key={tag} tone="info">{tag}</Badge>
            ))}
          </div>
        ),
    },
    { header: "Orders", numeric: true, cell: (row) => row.orderCount.toLocaleString() },
    ...(showsSpend
      ? [
          {
            header: "Lifetime",
            numeric: true,
            cell: (row: CustomerListItem) => money(row.totalSpend),
          } as Column<CustomerListItem>,
        ]
      : []),
    {
      header: "Last order",
      secondary: true,
      cell: (row) => <span className="text-xs text-gray-600">{date(row.lastOrderAt)}</span>,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Customers"
        description="Everyone who has ordered, and the history behind each of them."
        actions={
          can.salesOrAbove(role) && (
            <Button size="sm" onClick={() => setCreating(true)}>
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              New customer
            </Button>
          )
        }
      />

      <FilterBar
        active={hasFilters}
        onClear={() => {
          setSearchText("");
          setFilters({ search: null, tag: null, hasOutstanding: null });
        }}
      >
        <SearchInput
          value={searchText}
          onChange={setSearchText}
          placeholder="Name, phone, email or company"
        />

        <Select
          label="Balance"
          allLabel="All customers"
          value={filters.hasOutstanding}
          onChange={(value) => setFilters({ hasOutstanding: value || null })}
          options={[{ value: "true", label: "Owing money" }]}
        />

        <SearchInput
          value={filters.tag}
          onChange={(value) => setFilters({ tag: value || null })}
          placeholder="Tag"
        />
      </FilterBar>

      <DataTable
        columns={columns}
        rows={data?.items ?? null}
        keyOf={(row) => row.id}
        loading={loading}
        error={error}
        onRetry={reload}
        onRowClick={(row) => router.push(`/admin/customers/${row.id}`)}
        empty={{
          title: hasFilters ? "No customers match" : "No customers yet",
          description: hasFilters ? "Try a different search." : undefined,
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

      <CustomerForm
        open={creating}
        customer={null}
        onClose={() => setCreating(false)}
        onSaved={(customer) => {
          setCreating(false);
          router.push(`/admin/customers/${customer.id}`);
        }}
      />
    </div>
  );
}
