"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle, ArrowRight, Banknote, ClipboardList, Package, Users,
} from "lucide-react";

import { OrderStatusBadge, PaymentStatusBadge } from "@/components/admin/ui/badges";
import { Card, ErrorState, Skeleton } from "@/components/admin/ui/primitives";
import { dateTime, money, moneyShort, number, relative, spaced } from "@/lib/admin/format";
import { useQuery } from "@/lib/admin/hooks";
import { dashboard } from "@/lib/admin/resources";
import { useSession } from "@/lib/admin/session";
import type { DashboardSummary, StatusCount } from "@/lib/admin/types";

/**
 * The overview.
 *
 * Every figure is read from GET /api/dashboard/summary, which counts and sums
 * real rows. Nothing here is estimated or filled in: an empty business reads as
 * zeros, and a section the server withheld for this role is not drawn at all
 * rather than drawn as a dash.
 */
export default function AdminOverviewPage() {
  const { user } = useSession();
  const { data, error, loading, reload } = useQuery((signal) => dashboard.summary(signal), []);

  if (loading && !data) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-14 w-72 rounded-md" />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((key) => (
            <Skeleton key={key} className="h-24 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-80 rounded-lg" />
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

  const firstName = user?.fullName?.split(" ")[0];
  const needsPricing = data.productsAwaitingPricingReview;
  const inProduction = countOf(data.ordersByStatus, "InProduction");
  const awaitingPayment =
    countOf(data.ordersByPaymentStatus, "Unpaid") +
    countOf(data.ordersByPaymentStatus, "PartiallyPaid");

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-heading text-xl font-extrabold tracking-tight text-gray-900">
          {firstName ? `Good to see you, ${firstName}` : "Overview"}
        </h1>
        <p className="mt-0.5 text-sm text-gray-600">
          Counted at {dateTime(data.generatedAt)}.
        </p>
      </div>

      {/* The one thing that actually blocks revenue, so it sits above the
          numbers rather than inside them. */}
      {needsPricing > 0 && (
        <Link
          href="/admin/products?pricingReview=NeedsReview"
          className="flex items-start gap-2.5 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 transition hover:bg-amber-100"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-amber-900">
              {needsPricing} {needsPricing === 1 ? "product needs" : "products need"} a price confirmed
            </p>
            <p className="mt-0.5 text-sm text-amber-800">
              These cannot be quoted automatically until a Super Admin confirms the
              price is right. Customers cannot order them.
            </p>
          </div>
          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
        </Link>
      )}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          icon={ClipboardList}
          label="Orders"
          value={number(data.totalOrders)}
          detail={`${number(data.ordersThisMonth)} this month`}
          href="/admin/orders"
        />

        {/* Money is present only with ViewFinancials — the server omits the
            whole object otherwise, so this card simply does not exist. */}
        {data.money ? (
          <Stat
            icon={Banknote}
            label="Revenue"
            value={moneyShort(data.money.revenueAllTime)}
            detail={`${moneyShort(data.money.revenueThisMonth)} this month`}
            href="/admin/payments"
          />
        ) : (
          <Stat
            icon={Package}
            label="In production"
            value={number(inProduction)}
            detail="jobs on the floor"
            href="/admin/orders?status=InProduction"
          />
        )}

        <Stat
          icon={Package}
          label="Products"
          value={number(data.publishedProducts)}
          detail={`published of ${number(data.totalProducts)}`}
          href="/admin/products"
        />

        <Stat
          icon={Users}
          label="Customers"
          value={number(data.totalCustomers)}
          href="/admin/customers"
        />
      </div>

      {data.money && (
        <Card title="Money">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Figure label="Collected" value={money(data.money.collectedAllTime)} />
            <Figure
              label="Outstanding"
              value={money(data.money.outstandingTotal)}
              tone={data.money.outstandingTotal > 0 ? "warn" : undefined}
              detail={
                data.money.ordersWithOutstandingBalance > 0
                  ? `across ${number(data.money.ordersWithOutstandingBalance)} ${
                      data.money.ordersWithOutstandingBalance === 1 ? "order" : "orders"
                    }`
                  : "nothing owed"
              }
            />
            <Figure label="Average order" value={money(data.money.averageOrderValue)} />
            <Figure
              label="Awaiting payment"
              value={number(awaitingPayment)}
              detail="orders unpaid or part-paid"
            />
          </dl>

          <p className="mt-4 border-t border-gray-100 pt-3 text-xs text-gray-500">
            Revenue excludes cancelled and refunded orders. Collected counts every
            payment received, including on orders cancelled afterwards.
          </p>
        </Card>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Orders by stage">
          <StatusBars
            counts={data.ordersByStatus}
            total={data.totalOrders}
            hrefFor={(status) => `/admin/orders?status=${status}`}
          />
        </Card>

        <Card title="Orders by payment">
          <StatusBars
            counts={data.ordersByPaymentStatus}
            total={data.totalOrders}
            hrefFor={(status) => `/admin/orders?paymentStatus=${status}`}
          />
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card
          title="Latest orders"
          action={
            <Link href="/admin/orders" className="text-xs font-semibold text-red-700 hover:underline">
              All orders
            </Link>
          }
        >
          {data.recentOrders.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-500">No orders yet.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-gray-100">
              {data.recentOrders.map((order) => (
                <li key={order.id}>
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="flex flex-wrap items-center justify-between gap-2 py-2.5 hover:opacity-75"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                      <p className="truncate text-xs text-gray-500">
                        {order.customerName} · {relative(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <OrderStatusBadge status={order.status} />
                      <PaymentStatusBadge status={order.paymentStatus} />
                      <span className="tabular-nums text-sm font-medium text-gray-900">
                        {money(order.totalAmount)}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {data.recentPayments && (
          <Card
            title="Latest payments"
            action={
              <Link
                href="/admin/payments"
                className="text-xs font-semibold text-red-700 hover:underline"
              >
                All payments
              </Link>
            }
          >
            {data.recentPayments.length === 0 ? (
              <p className="py-6 text-center text-sm text-gray-500">
                No payments recorded yet.
              </p>
            ) : (
              <ul className="flex flex-col divide-y divide-gray-100">
                {data.recentPayments.map((payment) => (
                  <li key={payment.id}>
                    <Link
                      href={`/admin/orders/${payment.orderId}`}
                      className="flex flex-wrap items-center justify-between gap-2 py-2.5 hover:opacity-75"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900">{payment.orderNumber}</p>
                        <p className="truncate text-xs text-gray-500">
                          {spaced(payment.paymentMethod)} · {payment.recordedBy} ·{" "}
                          {relative(payment.createdAt)}
                        </p>
                      </div>
                      <span className="tabular-nums text-sm font-semibold text-green-700">
                        {money(payment.amount)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        )}
      </div>

      {/* Super Admin only. The server omits it for everyone else. */}
      {data.recentActivity && (
        <Card
          title="Recent activity"
          action={
            <Link
              href="/admin/audit-logs"
              className="text-xs font-semibold text-red-700 hover:underline"
            >
              Full audit log
            </Link>
          }
        >
          {data.recentActivity.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-500">Nothing recorded yet.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {data.recentActivity.map((entry, index) => (
                <li
                  key={`${entry.createdAt}-${index}`}
                  className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-sm"
                >
                  <span className="font-medium text-gray-900">{entry.actor ?? "System"}</span>
                  <span className="font-mono text-xs text-gray-700">{entry.action}</span>
                  {entry.detail && (
                    <span className="min-w-0 flex-1 truncate text-xs text-gray-500" title={entry.detail}>
                      {entry.detail}
                    </span>
                  )}
                  <span className="ml-auto whitespace-nowrap text-xs text-gray-400">
                    {relative(entry.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
    </div>
  );
}

function countOf(counts: StatusCount[], status: string): number {
  return counts.find((entry) => entry.status === status)?.count ?? 0;
}

function Stat({
  icon: Icon,
  label,
  value,
  detail,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 transition hover:border-gray-300 hover:shadow-sm"
    >
      <span className="mt-0.5 rounded-md bg-gray-100 p-1.5 text-gray-600">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">{label}</p>
        <p className="mt-0.5 font-heading text-xl font-extrabold tabular-nums text-gray-900">
          {value}
        </p>
        {detail && <p className="text-xs text-gray-500">{detail}</p>}
      </div>
    </Link>
  );
}

function Figure({
  label,
  value,
  detail,
  tone,
}: {
  label: string;
  value: string;
  detail?: string;
  tone?: "warn";
}) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">{label}</dt>
      <dd
        className={
          tone === "warn"
            ? "mt-0.5 font-heading text-lg font-bold tabular-nums text-red-700"
            : "mt-0.5 font-heading text-lg font-bold tabular-nums text-gray-900"
        }
      >
        {value}
      </dd>
      {detail && <p className="text-xs text-gray-500">{detail}</p>}
    </div>
  );
}

/**
 * A count per status, as a proportion of all orders.
 *
 * Zero rows are kept: a stage that vanishes when empty leaves the reader unable
 * to tell "none" from "not measured".
 */
function StatusBars({
  counts,
  total,
  hrefFor,
}: {
  counts: StatusCount[];
  total: number;
  hrefFor: (status: string) => string;
}) {
  if (total === 0) {
    return <p className="py-6 text-center text-sm text-gray-500">No orders yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {counts.map((entry) => {
        const share = Math.round((entry.count / total) * 100);

        return (
          <li key={entry.status}>
            <Link href={hrefFor(entry.status)} className="group block">
              <div className="flex items-baseline justify-between gap-2 text-sm">
                <span className="text-gray-700 group-hover:text-gray-900">
                  {spaced(entry.status)}
                </span>
                <span className="tabular-nums text-gray-900">
                  {number(entry.count)}
                  <span className="ml-1 text-xs text-gray-400">{share}%</span>
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-red-600/70 group-hover:bg-red-600"
                  style={{ width: `${entry.count === 0 ? 0 : Math.max(share, 2)}%` }}
                />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
