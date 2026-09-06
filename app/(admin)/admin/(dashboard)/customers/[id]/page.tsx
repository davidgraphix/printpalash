"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Pencil } from "lucide-react";

import { OrderStatusBadge, PaymentStatusBadge } from "@/components/admin/ui/badges";
import { Badge, Button, Card, EmptyState, ErrorState, Skeleton } from "@/components/admin/ui/primitives";
import { Field, PageHeader } from "@/components/admin/ui/table";
import { CustomerForm } from "@/components/admin/customers/CustomerForm";
import { can } from "@/lib/admin/config";
import { date, money, whatsAppLink } from "@/lib/admin/format";
import { useQuery } from "@/lib/admin/hooks";
import { customers } from "@/lib/admin/resources";
import { useSession } from "@/lib/admin/session";

export default function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { role } = useSession();
  const [editing, setEditing] = useState(false);

  const { data: customer, error, loading, reload } = useQuery(
    (signal) => customers.get(id, signal),
    [id],
  );

  if (loading && !customer) return <Skeleton className="h-96 rounded-lg" />;

  if (error) {
    return (
      <Card>
        <ErrorState message={error.message} onRetry={reload} />
      </Card>
    );
  }

  if (!customer) return null;

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/admin/customers"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        All customers
      </Link>

      <PageHeader
        title={customer.fullName}
        description={customer.company ?? undefined}
        actions={
          <>
            {customer.phone && (
              <a
                href={whatsAppLink(
                  customer.phone,
                  `Hi ${customer.fullName}, this is PrintPalash.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 text-xs font-semibold text-green-700 hover:bg-gray-50"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                WhatsApp
              </a>
            )}
            {can.salesOrAbove(role) && (
              <Button variant="secondary" size="sm" onClick={() => setEditing(true)}>
                <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                Edit
              </Button>
            )}
          </>
        }
      />

      {customer.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {customer.tags.map((tag) => (
            <Badge key={tag} tone="info">{tag}</Badge>
          ))}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Card title={`Orders (${customer.orderCount})`}>
            {customer.recentOrders.length === 0 ? (
              <EmptyState title="No orders yet" />
            ) : (
              <ul className="flex flex-col divide-y divide-gray-100">
                {customer.recentOrders.map((order) => (
                  <li key={order.id} className="py-2.5 first:pt-0 last:pb-0">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="flex flex-wrap items-center justify-between gap-2 hover:opacity-80"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                        <p className="text-xs text-gray-500">{date(order.createdAt)}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <OrderStatusBadge status={order.status} />
                        <PaymentStatusBadge status={order.paymentStatus} />
                        <span className="tabular-nums font-medium text-gray-900">
                          {money(order.totalAmount)}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {customer.orderCount > customer.recentOrders.length && (
              <p className="mt-3 text-xs text-gray-500">
                Showing the {customer.recentOrders.length} most recent of{" "}
                {customer.orderCount}.{" "}
                <Link
                  href={`/admin/orders?search=${encodeURIComponent(customer.fullName)}`}
                  className="text-red-700 hover:underline"
                >
                  See all in Orders
                </Link>
                .
              </p>
            )}
          </Card>

          {/* Present only when the server sent it — a Production Manager never
              receives a customer's commercial notes. */}
          {customer.notes && (
            <Card title="Notes">
              <p className="whitespace-pre-line text-sm text-gray-700">{customer.notes}</p>
              <p className="mt-2 text-xs text-gray-500">Sales and admin staff only.</p>
            </Card>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <Card title="Contact">
            <dl className="flex flex-col gap-3">
              {customer.phone ? (
                <Field label="Phone">{customer.phone}</Field>
              ) : (
                <p className="text-sm text-gray-500">
                  Contact details are not shown to your role.
                </p>
              )}
              {customer.email && <Field label="Email">{customer.email}</Field>}
              {customer.deliveryAddress && (
                <Field label="Delivery address">{customer.deliveryAddress}</Field>
              )}
              <Field label="Customer since">{date(customer.createdAt)}</Field>
            </dl>
          </Card>

          {customer.totalSpend !== undefined && (
            <Card title="Value">
              <dl className="flex flex-col gap-3">
                <Field label="Lifetime spend">
                  <span className="font-semibold">{money(customer.totalSpend)}</span>
                </Field>
                <Field label="Outstanding">
                  <span
                    className={
                      (customer.outstandingBalance ?? 0) > 0
                        ? "font-semibold text-red-700"
                        : "text-gray-500"
                    }
                  >
                    {money(customer.outstandingBalance)}
                  </span>
                </Field>
                <Field label="Orders">{customer.orderCount}</Field>
              </dl>
              <p className="mt-3 text-xs text-gray-500">Super Admins only.</p>
            </Card>
          )}
        </div>
      </div>

      <CustomerForm
        open={editing}
        customer={customer}
        onClose={() => setEditing(false)}
        onSaved={() => {
          setEditing(false);
          reload();
        }}
      />
    </div>
  );
}
