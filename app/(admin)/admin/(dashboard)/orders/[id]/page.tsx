"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, FileText, MessageCircle, Package, Printer, Truck,
} from "lucide-react";

import { OrderStatusBadge, PaymentStatusBadge } from "@/components/admin/ui/badges";
import { Button, Card, ErrorState, Skeleton } from "@/components/admin/ui/primitives";
import { Field, PageHeader } from "@/components/admin/ui/table";
import { useToast } from "@/components/admin/ui/feedback";
import { AdvanceStatus } from "@/components/admin/orders/AdvanceStatus";
import { RecordPayment } from "@/components/admin/orders/RecordPayment";
import { ArtworkLink } from "@/components/admin/orders/ArtworkLink";
import { SendInvoice } from "@/components/admin/orders/SendInvoice";
import { OrderDetailsForm } from "@/components/admin/orders/OrderDetailsForm";
import { StatusTimeline } from "@/components/admin/orders/StatusTimeline";
import { useQuery } from "@/lib/admin/hooks";
import { can } from "@/lib/admin/config";
import { useSession } from "@/lib/admin/session";
import { dateTime, date, money, spaced, whatsAppLink } from "@/lib/admin/format";
import { orders } from "@/lib/admin/resources";
import type { Order } from "@/lib/admin/types";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { role } = useSession();
  const toast = useToast();

  const { data: order, error, loading, reload } = useQuery(
    (signal) => orders.get(id, signal),
    [id],
  );

  if (loading && !order) return <OrderSkeleton />;

  if (error) {
    return (
      <Card>
        <ErrorState message={error.message} onRetry={reload} />
      </Card>
    );
  }

  if (!order) return null;

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/admin/orders"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        All orders
      </Link>

      <PageHeader
        title={order.orderNumber}
        description={`Placed ${dateTime(order.createdAt)} by ${order.createdBy} · ${spaced(order.channel)}`}
        actions={
          <>
            {can.salesOrAbove(role) && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => window.open(`/admin/print/${order.id}/invoice`, "_blank")}
                >
                  <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                  Invoice
                </Button>
                {/* The specification asks for a one-click way to send the
                    invoice or receipt to the client over WhatsApp or email. */}
                <SendInvoice order={order} />
              </>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => window.open(`/admin/print/${order.id}/job-card`, "_blank")}
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              Job card
            </Button>
            {/* Sales and above: the sheet carries the customer's phone, email
                and address, which a Production Manager is not shown. */}
            {can.salesOrAbove(role) && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.open(`/admin/print/${order.id}/packing-slip`, "_blank")}
              >
                <Package className="h-3.5 w-3.5" aria-hidden="true" />
                Packing slip
              </Button>
            )}
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <OrderStatusBadge status={order.status} />
        <PaymentStatusBadge status={order.paymentStatus} />
        <span className="rounded bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-700">
          {order.trackingNumber}
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <OrderLines order={order} onChanged={reload} />

          <Card title="Payments">
            <RecordPayment order={order} onChanged={reload} />
          </Card>

          <Card title="Status history">
            <StatusTimeline entries={order.statusHistory} />
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card
            title="Customer"
            action={
              order.customer.phone && (
                <a
                  href={whatsAppLink(
                    order.customer.phone,
                    `Hi ${order.customer.fullName}, regarding your PrintPalash order ${order.orderNumber}:`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 hover:text-green-800"
                >
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  WhatsApp
                </a>
              )
            }
          >
            <dl className="flex flex-col gap-3">
              <Field label="Name">
                <Link
                  href={`/admin/customers/${order.customer.id}`}
                  className="font-medium text-red-700 hover:underline"
                >
                  {order.customer.fullName}
                </Link>
              </Field>
              {order.customer.company && (
                <Field label="Company">{order.customer.company}</Field>
              )}
              <Field label="Phone">{order.customer.phone}</Field>
              {order.customer.email && <Field label="Email">{order.customer.email}</Field>}
            </dl>
          </Card>

          <Card title="Move this order on">
            <AdvanceStatus order={order} onChanged={reload} />
          </Card>

          <Card title="Delivery & notes">
            <OrderDetailsForm
              order={order}
              onSaved={() => {
                toast.success("Order updated.");
                reload();
              }}
            />
          </Card>

          {/* Present only when the backend sent it — a Sales Rep or Production
              Manager never receives these figures at all. */}
          {order.financials && (
            <Card title="Job costing">
              <dl className="flex flex-col gap-3">
                <Field label="Production cost">{money(order.financials.productionCost)}</Field>
                <Field label="Delivery cost">{money(order.financials.deliveryCost)}</Field>
                <Field label="Gross profit">
                  <span
                    className={
                      order.financials.grossProfit >= 0
                        ? "font-semibold text-green-700"
                        : "font-semibold text-red-700"
                    }
                  >
                    {money(order.financials.grossProfit)}
                  </span>
                </Field>
              </dl>
              <p className="mt-3 text-xs text-gray-500">
                Visible to Super Admins only.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Lines and totals
 * ------------------------------------------------------------------ */

function OrderLines({ order, onChanged }: { order: Order; onChanged: () => void }) {
  return (
    <Card title={`Items (${order.items.length})`}>
      <div className="flex flex-col divide-y divide-gray-100">
        {order.items.map((item) => (
          <div key={item.id} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-semibold text-gray-900">
                {item.quantity.toLocaleString()} × {item.productName}
              </p>
              <p className="font-semibold tabular-nums text-gray-900">
                {money(item.totalPrice)}
              </p>
            </div>

            {/* How the figure was reached, in words. An invoice reprinted next
                year still shows the arithmetic that was actually charged. */}
            {item.selectedOptionLabel && (
              <p className="text-xs font-medium text-gray-700">
                {item.selectedOptionGroupLabel
                  ? `${item.selectedOptionGroupLabel}: ${item.selectedOptionLabel}`
                  : item.selectedOptionLabel}
              </p>
            )}

            <p className="text-xs text-gray-500">{item.priceExplanation}</p>

            {item.pricingSource === "Custom" && item.customPriceReason && (
              <p className="text-xs text-amber-800">
                Agreed price — {item.customPriceReason}
              </p>
            )}

            {item.addOns.length > 0 && (
              <ul className="mt-1 flex flex-col gap-0.5 pl-3">
                {item.addOns.map((addOn) => (
                  <li
                    key={addOn.id}
                    className="flex justify-between text-xs text-gray-600"
                  >
                    <span>+ {addOn.name}</span>
                    <span className="tabular-nums">{money(addOn.price)}</span>
                  </li>
                ))}
              </ul>
            )}

            {item.specifications && Object.keys(item.specifications).length > 0 && (
              <p className="mt-1 text-xs text-gray-500">
                {Object.entries(item.specifications)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(" · ")}
              </p>
            )}

            {/* Every staff role may attach this — the press floor is who it is
                for, and the server refuses anything but an http(s) address. */}
            <ArtworkLink orderId={order.id} item={item} onChanged={onChanged} />
          </div>
        ))}
      </div>

      <dl className="mt-4 flex flex-col gap-1.5 border-t border-gray-200 pt-3 text-sm">
        <Row label="Subtotal" value={money(order.subtotal)} />
        {order.discountAmount > 0 && (
          <Row label="Discount" value={`− ${money(order.discountAmount)}`} />
        )}
        {order.deliveryFee > 0 && (
          <Row label="Delivery" value={money(order.deliveryFee)} />
        )}
        {order.vatAmount > 0 && (
          <Row label={`VAT (${order.vatRatePercent}%)`} value={money(order.vatAmount)} />
        )}
        <Row label="Total" value={money(order.totalAmount)} emphasis />
        <Row label="Paid" value={money(order.amountPaid)} />
        <Row
          label="Outstanding"
          value={money(order.outstandingBalance)}
          tone={order.outstandingBalance > 0 ? "danger" : "muted"}
        />
      </dl>
    </Card>
  );
}

function Row({
  label,
  value,
  emphasis,
  tone,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
  tone?: "danger" | "muted";
}) {
  return (
    <div className="flex justify-between gap-4">
      <dt className={emphasis ? "font-bold text-gray-900" : "text-gray-600"}>{label}</dt>
      <dd
        className={[
          "tabular-nums",
          emphasis ? "font-bold text-gray-900" : "",
          tone === "danger" ? "font-semibold text-red-700" : "",
          tone === "muted" ? "text-gray-500" : "",
        ].filter(Boolean).join(" ")}
      >
        {value}
      </dd>
    </div>
  );
}

function OrderSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-64" />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-40 rounded-lg" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-48 rounded-lg" />
          <Skeleton className="h-32 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
