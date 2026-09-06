"use client";

import { Suspense } from "react";
import { Lock } from "lucide-react";

import { Skeleton } from "@/components/admin/ui/primitives";
import {
  Column, DataTable, FilterBar, PageHeader, Pagination, SearchInput, Select,
} from "@/components/admin/ui/table";
import { useQuery, useUrlFilters } from "@/lib/admin/hooks";
import { dateTime, spaced } from "@/lib/admin/format";
import { auditLogs } from "@/lib/admin/resources";
import type { AuditLogEntry } from "@/lib/admin/types";

const PAGE_SIZE = 50;

export default function AuditLogsPage() {
  return (
    <Suspense fallback={<Skeleton className="h-96 rounded-lg" />}>
      <AuditLogList />
    </Suspense>
  );
}

function AuditLogList() {
  const [filters, setFilters] = useUrlFilters({
    action: "", entityType: "", entityId: "", from: "", to: "", page: "1",
  });

  const page = Math.max(1, Number(filters.page) || 1);

  const { data, error, loading, reload } = useQuery(
    (signal) =>
      auditLogs.list(
        {
          action: filters.action || undefined,
          entityType: filters.entityType || undefined,
          entityId: filters.entityId || undefined,
          from: filters.from || undefined,
          to: filters.to || undefined,
          page,
          pageSize: PAGE_SIZE,
        },
        signal,
      ),
    [filters.action, filters.entityType, filters.entityId, filters.from, filters.to, page],
  );

  // The actions actually present, so the filter offers real values rather than
  // a hard-coded list that drifts as features are added.
  const { data: actions } = useQuery((signal) => auditLogs.actions(signal), []);

  const hasFilters = Boolean(
    filters.action || filters.entityType || filters.entityId || filters.from || filters.to,
  );

  const columns: Column<AuditLogEntry>[] = [
    {
      header: "When",
      cell: (row) => (
        <span className="whitespace-nowrap text-xs text-gray-600">{dateTime(row.createdAt)}</span>
      ),
      width: "11rem",
    },
    {
      header: "Who",
      cell: (row) => (
        <div className="min-w-0">
          <p className="truncate text-gray-900">{row.userName ?? "—"}</p>
          {!row.userName && (
            <p className="text-xs text-gray-500">
              {row.action === "user.login_failed" ? "not signed in" : "command line"}
            </p>
          )}
        </div>
      ),
    },
    {
      header: "Action",
      cell: (row) => (
        <span className="font-mono text-xs text-gray-800">{row.action}</span>
      ),
    },
    {
      header: "Entity",
      secondary: true,
      cell: (row) => <span className="text-xs text-gray-600">{spaced(row.entityType)}</span>,
    },
    {
      header: "Detail",
      cell: (row) => (
        <div className="min-w-0 max-w-md">
          {row.oldValue && (
            <p className="truncate text-xs text-gray-500" title={row.oldValue}>
              from: {row.oldValue}
            </p>
          )}
          {row.newValue && (
            <p className="truncate text-xs text-gray-800" title={row.newValue}>
              {row.newValue}
            </p>
          )}
          {!row.oldValue && !row.newValue && <span className="text-gray-400">—</span>}
        </div>
      ),
    },
    {
      header: "From",
      secondary: true,
      cell: (row) => (
        <span className="font-mono text-xs text-gray-500">{row.ipAddress ?? "—"}</span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Audit log"
        description="Every recorded action, in the order it happened."
      />

      <FilterBar
        active={hasFilters}
        onClear={() =>
          setFilters({ action: null, entityType: null, entityId: null, from: null, to: null })
        }
      >
        <Select
          label="Action" allLabel="All actions"
          value={filters.action}
          onChange={(value) => setFilters({ action: value || null })}
          options={(actions ?? []).map((action) => ({ value: action, label: action }))}
        />

        <Select
          label="Entity" allLabel="All entities"
          value={filters.entityType}
          onChange={(value) => setFilters({ entityType: value || null })}
          options={["Order", "Product", "Customer", "Category", "Brand", "User", "OrderItem", "Catalog"]
            .map((entity) => ({ value: entity, label: entity }))}
        />

        <SearchInput
          value={filters.entityId}
          onChange={(value) => setFilters({ entityId: value || null })}
          placeholder="Entity id"
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
        skeletonRows={12}
        empty={{
          title: hasFilters ? "Nothing matches those filters" : "No activity recorded",
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
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        Read-only, by design. There is no endpoint that edits or deletes an entry —
        a log the recorded parties can alter is not an audit log.
      </p>
    </div>
  );
}
