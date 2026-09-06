"use client";

import { use } from "react";

import { PrintToolbar, Sheet } from "@/components/admin/print/PrintToolbar";
import { Card, ErrorState, Skeleton } from "@/components/admin/ui/primitives";
import { TrackingQr } from "@/components/admin/print/TrackingQr";
import { date, money, spaced } from "@/lib/admin/format";
import { useQuery } from "@/lib/admin/hooks";
import { orders } from "@/lib/admin/resources";
import type { Invoice } from "@/lib/admin/types";

/**
 * The customer-facing document.
 *
 * Every figure is rendered exactly as the server sent it. Nothing on this page
 * multiplies, sums or rounds: the invoice total is the order total because it
 * is literally the same number, and a printed document that recomputed its own
 * arithmetic could disagree with the record it claims to represent.
 *
 * It is headed "Receipt" once the order is fully paid and "Invoice" while money
 * is still owed — that decision is also the server's.
 */
export default function InvoicePrintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data, error, loading, reload } = useQuery(
    (signal) => orders.invoice(id, signal),
    [id],
  );

  if (loading && !data) {
    return (
      <Sheet>
        <Skeleton className="h-[900px] w-full" />
      </Sheet>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-lg p-6">
        <Card>
          <ErrorState message={error.message} onRetry={reload} />
        </Card>
      </div>
    );
  }

  if (!data) return null;

  return (
    <>
      <PrintToolbar title={data.documentType.toLowerCase()} backHref={`/admin/orders/${id}`} />

      <Sheet>
        <article className="text-[13px] leading-relaxed text-gray-900">
          <Letterhead invoice={data} />

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Billed to
              </h2>
              <p className="mt-1.5 font-semibold">{data.customer.fullName}</p>
              {data.customer.company && <p>{data.customer.company}</p>}
              <p className="text-gray-700">{data.customer.phone}</p>
              {data.customer.email && <p className="text-gray-700">{data.customer.email}</p>}
              {data.customer.deliveryAddress && (
                <p className="mt-1 max-w-[34ch] text-gray-700">{data.customer.deliveryAddress}</p>
              )}
            </section>

            <section className="flex items-start gap-4 sm:justify-end">
              <dl className="inline-grid grid-cols-[auto_auto] gap-x-4 gap-y-1 text-left">
                <Meta label="Order no." value={data.orderNumber} mono />
                <Meta label="Tracking" value={data.trackingNumber} mono />
                <Meta label="Date" value={date(data.orderDate)} />
                <Meta label="Channel" value={spaced(data.channel)} />
                {/* "Order stage", not "Status": this is the fulfilment
                    workflow, and an order can sit at "Pending Payment" while
                    the balance is zero. Printed beside "PAID IN FULL" under the
                    bare label "Status", it reads as a demand for money the
                    customer has already sent. */}
                <Meta label="Order stage" value={spaced(data.status)} />
                {data.estimatedDeliveryDate && (
                  <Meta label="Delivery by" value={data.estimatedDeliveryDate} />
                )}
              </dl>

              {/* Scannable tracking, as on the reference document. */}
              <div className="hidden sm:block">
                <TrackingQr trackingNumber={data.trackingNumber} size={96} />
              </div>
            </section>
          </div>

          <LineTable invoice={data} />

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:justify-between">
            <div className="max-w-[46ch] text-[12px]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Amount in words
              </p>
              <p className="mt-1 font-medium">{data.amountInWords}</p>

              {data.payments.length > 0 && (
                <div className="mt-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    Payments received
                  </p>
                  <ul className="mt-1 flex flex-col gap-0.5">
                    {data.payments.map((payment, index) => (
                      <li key={index} className="flex justify-between gap-4 text-gray-700">
                        <span>
                          {date(payment.paidAt)} · {spaced(payment.method)}
                          {payment.reference && (
                            <span className="text-gray-500"> · {payment.reference}</span>
                          )}
                        </span>
                        <span className="tabular-nums">{money(payment.amount)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Totals invoice={data} />
          </div>

          {/* Present only for staff — the endpoint omits it otherwise, and a
              customer copy must never carry internal remarks. */}
          {data.internalNotes && (
            <section className="no-print mt-6 rounded-md border border-dashed border-amber-300 bg-amber-50 p-3 text-[12px]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-800">
                Internal notes — not printed
              </p>
              <p className="mt-1 whitespace-pre-line text-amber-900">{data.internalNotes}</p>
            </section>
          )}

          {/* How to pay. On the invoice only — never the packing slip, the job
              card, or the public tracking page. */}
          <section className="keep-together mt-6 border border-gray-300 p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Payment details
            </p>

            <dl className="mt-1.5 grid gap-x-6 gap-y-2 sm:grid-cols-3">
              <div>
                <dt className="text-[10px] uppercase tracking-wide text-gray-500">
                  Account name
                </dt>
                <dd className="font-medium">{data.business.bank.accountName}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wide text-gray-500">Bank</dt>
                <dd className="font-medium">{data.business.bank.bankName}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wide text-gray-500">
                  Account number
                </dt>
                {/* Tabular figures and wide tracking: this is the one string on
                    the page somebody types into a banking app. */}
                <dd className="font-mono text-sm font-bold tabular-nums tracking-wider">
                  {data.business.bank.accountNumber}
                </dd>
              </div>
            </dl>

            <p className="mt-2 text-[10px] text-gray-500">
              Please quote {data.orderNumber} as the transfer reference.
            </p>
          </section>

          <footer className="mt-8 border-t border-gray-300 pt-4 text-[11px] text-gray-600">
            <p className="font-semibold text-gray-800">Thank you for your business.</p>
            <p className="mt-1">
              Goods remain the property of {data.business.legalName} until paid for in full.
              Please quote order {data.orderNumber} on any payment or enquiry.
            </p>
            <p className="mt-2 text-gray-500">
              {data.business.name} · {data.business.phone} · {data.business.email} ·{" "}
              {data.business.website}
            </p>
          </footer>
        </article>
      </Sheet>
    </>
  );
}

function Letterhead({ invoice }: { invoice: Invoice }) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-gray-900 pb-4">
      <div>
        <p className="font-heading text-2xl font-extrabold tracking-tight text-red-700">
          {invoice.business.name}
        </p>
        <p className="mt-0.5 text-[11px] text-gray-600">{invoice.business.legalName}</p>
        <p className="mt-1.5 max-w-[38ch] text-[11px] text-gray-600">
          {invoice.business.addressLine}
        </p>
        <p className="text-[11px] text-gray-600">
          {invoice.business.phone} · {invoice.business.email}
        </p>
      </div>

      <div className="text-right">
        <p className="font-heading text-xl font-extrabold uppercase tracking-widest text-gray-900">
          {invoice.documentType}
        </p>
        {invoice.isFullyPaid ? (
          <p className="mt-1 inline-block rounded border-2 border-green-700 px-2 py-0.5 text-[11px] font-bold uppercase tracking-widest text-green-700">
            Paid in full
          </p>
        ) : (
          <p className="mt-1 inline-block rounded border-2 border-red-700 px-2 py-0.5 text-[11px] font-bold uppercase tracking-widest text-red-700">
            {money(invoice.outstandingBalance)} due
          </p>
        )}
      </div>
    </header>
  );
}

function Meta({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <>
      <dt className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</dt>
      <dd className={mono ? "font-mono text-[12px]" : "text-[12px]"}>{value}</dd>
    </>
  );
}

/**
 * The lines.
 *
 * Add-ons are printed underneath the product they belong to and are already
 * inside its total, matching how the batch price and its extras actually
 * relate: one job, one price, itemised so the customer can see what they paid
 * for. The price column carries the basis in words ("₦15,100 per 1,000") rather
 * than a bare figure, because a batch price read as a unit price is the single
 * most expensive misunderstanding this business can have.
 */
function LineTable({ invoice }: { invoice: Invoice }) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-[12px]">
        <thead>
          <tr className="border-y border-gray-300 bg-gray-50 text-left">
            <th className="w-8 px-2 py-2 font-bold uppercase tracking-wide text-[10px] text-gray-600">
              #
            </th>
            <th className="px-2 py-2 font-bold uppercase tracking-wide text-[10px] text-gray-600">
              Description
            </th>
            <th className="w-20 px-2 py-2 text-right font-bold uppercase tracking-wide text-[10px] text-gray-600">
              Qty
            </th>
            <th className="w-32 px-2 py-2 text-right font-bold uppercase tracking-wide text-[10px] text-gray-600">
              Price
            </th>
            <th className="w-28 px-2 py-2 text-right font-bold uppercase tracking-wide text-[10px] text-gray-600">
              Amount
            </th>
          </tr>
        </thead>

        <tbody>
          {invoice.lines.map((line) => (
            <tr key={line.lineNumber} className="border-b border-gray-200 align-top">
              <td className="px-2 py-2.5 tabular-nums text-gray-500">{line.lineNumber}</td>

              <td className="px-2 py-2.5">
                <p className="font-medium">{line.description}</p>

                {line.variant && (
                  <p className="text-[11px] font-medium text-gray-700">{line.variant}</p>
                )}

                {line.specifications && Object.keys(line.specifications).length > 0 && (
                  <p className="mt-0.5 text-[11px] text-gray-600">
                    {Object.entries(line.specifications)
                      .map(([key, value]) => `${key}: ${value}`)
                      .join(" · ")}
                  </p>
                )}

                {line.addOns.length > 0 && (
                  <ul className="mt-1 flex flex-col gap-0.5">
                    {line.addOns.map((addOn, index) => (
                      <li key={index} className="flex justify-between gap-3 text-[11px] text-gray-600">
                        <span>+ {addOn.name}</span>
                        <span className="tabular-nums">{money(addOn.price)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </td>

              <td className="px-2 py-2.5 text-right tabular-nums">
                {line.quantity.toLocaleString()}
                <span className="block text-[10px] text-gray-500">{line.unit}</span>
              </td>

              <td className="px-2 py-2.5 text-right tabular-nums">
                {money(line.basePrice)}
                <span className="block text-[10px] text-gray-500">{line.priceExplanation}</span>
              </td>

              <td className="px-2 py-2.5 text-right font-medium tabular-nums">
                {money(line.lineTotal)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Totals({ invoice }: { invoice: Invoice }) {
  return (
    <dl className="w-full shrink-0 text-[12px] sm:w-64">
      <Row label="Subtotal" value={money(invoice.subtotal)} />

      {invoice.discountAmount > 0 && (
        <Row label="Discount" value={`− ${money(invoice.discountAmount)}`} />
      )}

      {invoice.deliveryFee > 0 && (
        <Row label="Delivery" value={money(invoice.deliveryFee)} />
      )}

      {/* VAT appears only when a rate is actually set on the order. A zero-rate
          line reading "VAT ₦0.00" implies a tax decision nobody made. */}
      {invoice.vatRatePercent > 0 && (
        <Row label={`VAT (${invoice.vatRatePercent}%)`} value={money(invoice.vatAmount)} />
      )}

      <div className="mt-1 flex justify-between gap-4 border-y-2 border-gray-900 py-1.5">
        <dt className="font-bold uppercase tracking-wide">Total</dt>
        <dd className="font-heading text-base font-extrabold tabular-nums">
          {money(invoice.grandTotal)}
        </dd>
      </div>

      <Row label="Paid" value={money(invoice.amountPaid)} />

      <div className="flex justify-between gap-4 border-b border-gray-300 py-1">
        <dt className="font-bold">Balance due</dt>
        <dd
          className={
            invoice.outstandingBalance > 0
              ? "font-bold tabular-nums text-red-700"
              : "font-bold tabular-nums text-green-700"
          }
        >
          {money(invoice.outstandingBalance)}
        </dd>
      </div>
    </dl>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-gray-200 py-1">
      <dt className="text-gray-600">{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}
