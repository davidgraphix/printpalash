"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Info } from "lucide-react";

import { Button, Card, EmptyState, ErrorState, Skeleton } from "@/components/admin/ui/primitives";
import { useToast } from "@/components/admin/ui/feedback";
import { PageHeader } from "@/components/admin/ui/table";
import { ApiError } from "@/lib/admin/api";
import { can } from "@/lib/admin/config";
import { money, moneyShort, number } from "@/lib/admin/format";
import { useQuery } from "@/lib/admin/hooks";
import { dashboard } from "@/lib/admin/resources";
import { useSession } from "@/lib/admin/session";
import type { Analytics, MonthlyTrend } from "@/lib/admin/types";

const WINDOWS = [6, 12, 24] as const;

/**
 * Revenue trends, best sellers, and where the work comes from.
 *
 * Every figure is an aggregate over rows that exist. There is no projection, no
 * "estimated", and no target line — a chart that mixes what happened with what
 * someone hoped would happen is not a record of anything.
 *
 * Revenue and collected are drawn as two separate series because they answer
 * two different questions and routinely disagree: an order invoiced in March
 * and paid in April belongs to both months, once each.
 */
export default function AnalyticsPage() {
  const { role } = useSession();
  const [months, setMonths] = useState<number>(12);

  const { data, error, loading, reload } = useQuery(
    (signal) => dashboard.analytics(months, signal),
    [months],
  );

  // The endpoint is Super-Admin-only server-side; saying so beats a 403 toast.
  if (!can.viewFinancials(role)) {
    return (
      <Card>
        <EmptyState
          title="Reports are Super Admin only"
          description="Every figure on this page is commercial — revenue, margins and what each product earns."
        />
      </Card>
    );
  }

  if (loading && !data) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-14 w-64 rounded-md" />
        <Skeleton className="h-72 rounded-lg" />
        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <ErrorState message={error.message} onRetry={reload} />
      </Card>
    );
  }

  if (!data) return null;

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Reports"
        description="What was sold, what was collected, and where it came from."
        actions={<ExportButton />}
      />

      <div className="flex flex-wrap items-center gap-2">
        {WINDOWS.map((window) => (
          <button
            key={window}
            type="button"
            onClick={() => setMonths(window)}
            aria-pressed={months === window}
            className={
              months === window
                ? "h-8 rounded-md bg-gray-900 px-3 text-xs font-semibold text-white"
                : "h-8 rounded-md border border-gray-300 bg-white px-3 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            }
          >
            {window} months
          </button>
        ))}
      </div>

      <Card title="Revenue and collections by month">
        <TrendChart trends={data.monthlyTrends} />
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Best sellers">
          <TopProducts data={data} />
        </Card>

        <Card title="Where the work came from">
          <Channels data={data} />
        </Card>
      </div>

      <p className="flex items-start gap-1.5 text-xs text-gray-500">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        Revenue excludes cancelled and refunded orders. Every order line is
        valued at the price it was sold for, never at the product&apos;s current
        price — so a price change today does not rewrite last quarter.
      </p>
    </div>
  );
}

function ExportButton() {
  const toast = useToast();
  const [busy, setBusy] = useState(false);

  async function download() {
    setBusy(true);

    // The current month, which is what an accountant reaching for "export"
    // almost always wants. A custom range is a follow-on, not a guess.
    const now = new Date();
    const first = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
    const iso = (d: Date) => d.toISOString().slice(0, 10);

    try {
      await dashboard.exportOrders(iso(first), iso(now));
      toast.success("Export downloaded.");
    } catch (caught) {
      toast.error(caught instanceof ApiError ? caught.message : "Could not export.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button size="sm" variant="secondary" loading={busy} onClick={download}>
      <Download className="h-3.5 w-3.5" aria-hidden="true" />
      Export this month
    </Button>
  );
}

/**
 * Two series, drawn as grouped bars.
 *
 * Hand-drawn rather than pulled from a charting library: this is a bar per
 * month with a scale and a label, and a dependency that ships a rendering
 * engine to do it would cost more than it explains. Both series share one
 * scale, because drawing them on separate axes would let a small collection
 * figure look as tall as a large revenue one.
 */
function TrendChart({ trends }: { trends: MonthlyTrend[] }) {
  const peak = Math.max(
    ...trends.map((t) => Math.max(t.revenue, t.collected)),
    0,
  );

  if (peak === 0) {
    return (
      <p className="py-10 text-center text-sm text-gray-500">
        No trading recorded in this period.
      </p>
    );
  }

  const label = (iso: string) =>
    new Date(iso).toLocaleDateString("en-NG", { month: "short", year: "2-digit" });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-red-700" aria-hidden="true" />
          Invoiced
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-green-600" aria-hidden="true" />
          Collected
        </span>
        <span className="ml-auto text-gray-500">Peak {moneyShort(peak)}</span>
      </div>

      <div className="overflow-x-auto">
        <ol className="flex min-w-fit items-end gap-3" style={{ height: "13rem" }}>
          {trends.map((t) => {
            // Percentages of the shared peak, with a 2% floor so a small but
            // non-zero month is still visible rather than reading as nothing.
            const r = t.revenue === 0 ? 0 : Math.max(2, (t.revenue / peak) * 100);
            const c = t.collected === 0 ? 0 : Math.max(2, (t.collected / peak) * 100);

            return (
              <li key={t.month} className="flex h-full w-16 shrink-0 flex-col justify-end gap-1.5">
                <div className="flex h-full items-end justify-center gap-1">
                  <div
                    className="w-5 rounded-t bg-red-700"
                    style={{ height: `${r}%` }}
                    title={`Invoiced ${money(t.revenue)} across ${t.orders} orders`}
                  />
                  <div
                    className="w-5 rounded-t bg-green-600"
                    style={{ height: `${c}%` }}
                    title={`Collected ${money(t.collected)}`}
                  />
                </div>

                <div className="text-center">
                  <p className="text-[10px] font-semibold text-gray-700">{label(t.month)}</p>
                  <p className="text-[10px] tabular-nums text-gray-500">{t.orders}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="text-xs text-gray-500">
        The small figure under each month is the number of orders.
      </p>
    </div>
  );
}

function TopProducts({ data }: { data: Analytics }) {
  if (data.topProducts.length === 0) {
    return <p className="py-8 text-center text-sm text-gray-500">Nothing sold in this period.</p>;
  }

  const peak = data.topProducts[0].revenue;

  return (
    <ol className="flex flex-col gap-2.5">
      {data.topProducts.map((product, index) => (
        <li key={`${product.productId ?? "custom"}-${index}`}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="min-w-0 truncate">
              <span className="mr-1.5 text-xs text-gray-400">{index + 1}</span>
              {product.productId ? (
                <Link
                  href={`/admin/products/${product.productId}`}
                  className="text-gray-900 hover:underline"
                >
                  {product.productName}
                </Link>
              ) : (
                // A custom line with no catalogue product behind it.
                <span className="text-gray-900">{product.productName}</span>
              )}
            </span>
            <span className="shrink-0 tabular-nums font-medium text-gray-900">
              {money(product.revenue)}
            </span>
          </div>

          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-red-600/70"
              style={{ width: `${peak === 0 ? 0 : Math.max(2, (product.revenue / peak) * 100)}%` }}
            />
          </div>

          <p className="mt-0.5 text-xs text-gray-500">
            {number(product.unitsSold)} units across {number(product.orderCount)}{" "}
            {product.orderCount === 1 ? "order" : "orders"}
          </p>
        </li>
      ))}
    </ol>
  );
}

function Channels({ data }: { data: Analytics }) {
  const anyOrders = data.channels.some((c) => c.orders > 0);

  if (!anyOrders) {
    return <p className="py-8 text-center text-sm text-gray-500">No orders in this period.</p>;
  }

  return (
    <ul className="flex flex-col gap-2.5">
      {data.channels.map((channel) => (
        <li key={channel.channel}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <Link
              href={`/admin/orders?channel=${channel.channel}`}
              className="text-gray-900 hover:underline"
            >
              {channel.channel}
            </Link>
            <span className="tabular-nums text-gray-900">
              {money(channel.revenue)}
              <span className="ml-2 text-xs text-gray-400">{channel.sharePercent}%</span>
            </span>
          </div>

          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gray-700"
              style={{ width: `${channel.orders === 0 ? 0 : Math.max(2, channel.sharePercent)}%` }}
            />
          </div>

          <p className="mt-0.5 text-xs text-gray-500">
            {number(channel.orders)} {channel.orders === 1 ? "order" : "orders"}
          </p>
        </li>
      ))}
    </ul>
  );
}
