"use client";

import { use } from "react";

import { PrintToolbar, Sheet } from "@/components/admin/print/PrintToolbar";
import { Card, ErrorState, Skeleton } from "@/components/admin/ui/primitives";
import { TrackingQr } from "@/components/admin/print/TrackingQr";
import { date, pluralUnit } from "@/lib/admin/format";
import { useQuery } from "@/lib/admin/hooks";
import { orders } from "@/lib/admin/resources";

/**
 * The sheet that goes on the parcel.
 *
 * The specification asks for a delivery sheet "with client contact details" and
 * says nothing about money, so there is none here — and none in the payload
 * behind it either. A packing slip is carried by a rider and left on a
 * doorstep; what is inside the box is the customer's business, what it cost is
 * not the street's.
 *
 * The QR encodes this order's own tracking number as a public tracking URL,
 * matching the dispatch label on the reference document. It is not a courier
 * waybill: there is no logistics provider and no carrier barcode, because the
 * specification defines neither and a fabricated carrier reference on a real
 * parcel would be worse than none.
 */
export default function PackingSlipPrintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data, error, loading, reload } = useQuery(
    (signal) => orders.packingSlip(id, signal),
    [id],
  );

  if (loading && !data) {
    return (
      <Sheet>
        <Skeleton className="h-[600px] w-full" />
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
      <PrintToolbar title="packing slip" backHref={`/admin/orders/${id}`} />

      <Sheet>
        <article className="text-[13px] text-gray-900">
          <header className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-gray-900 pb-3">
            <div>
              <p className="font-heading text-2xl font-extrabold tracking-tight text-red-700">
                {data.business.name}
              </p>
              <p className="mt-0.5 text-[11px] text-gray-600">{data.business.legalName}</p>
              <p className="mt-1 max-w-[38ch] text-[11px] text-gray-600">
                {data.business.addressLine}
              </p>
              <p className="text-[11px] text-gray-600">
                {data.business.phone} · {data.business.email}
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-right">
                <p className="font-heading text-lg font-extrabold uppercase tracking-widest">
                  Packing slip
                </p>
                <p className="mt-0.5 font-mono text-base font-bold">{data.orderNumber}</p>

                {/* The reference document gives the item count its own large
                    figure on the label — it is what gets checked against the
                    parcel before it leaves. */}
                <div className="mt-2 inline-block border border-gray-900 px-3 py-1 text-center">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gray-600">
                    Number of items
                  </p>
                  <p className="font-heading text-2xl font-extrabold leading-tight">
                    {data.itemCount}
                  </p>
                </div>
              </div>

              <TrackingQr trackingNumber={data.trackingNumber} size={110} />
            </div>
          </header>

          {/* The address, given the room it needs — this is the half of the
              sheet a rider actually reads. */}
          <section className="mt-5 border-2 border-gray-900 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Deliver to
            </p>
            <p className="mt-1 font-heading text-lg font-extrabold">{data.customerName}</p>
            {data.company && <p className="text-sm">{data.company}</p>}

            {data.deliveryAddress ? (
              <p className="mt-1.5 max-w-[46ch] text-base leading-snug">{data.deliveryAddress}</p>
            ) : (
              <p className="mt-1.5 text-sm italic text-gray-500">
                No delivery address recorded — confirm before dispatch.
              </p>
            )}

            <p className="mt-2 font-heading text-base font-bold">{data.phone}</p>
            {data.email && <p className="text-[11px] text-gray-600">{data.email}</p>}
          </section>

          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-4">
            <Field label="Ordered" value={date(data.orderDate)} />
            <Field label="Expected" value={data.estimatedDeliveryDate ?? "Not set"} />
            <Field label="Carried by" value={data.dispatchedTo ?? "Not assigned"} />
            <Field label="Items" value={String(data.itemCount)} />
          </dl>

          <table className="mt-5 w-full border-collapse text-[12px]">
            <thead>
              <tr className="border-y border-gray-300 bg-gray-50 text-left">
                <th className="w-8 px-2 py-2 text-[10px] font-bold uppercase tracking-wide text-gray-600">
                  #
                </th>
                <th className="px-2 py-2 text-[10px] font-bold uppercase tracking-wide text-gray-600">
                  Contents
                </th>
                <th className="w-28 px-2 py-2 text-right text-[10px] font-bold uppercase tracking-wide text-gray-600">
                  Quantity
                </th>
                {/* Checked off by hand when the box is packed. */}
                <th className="w-14 px-2 py-2 text-center text-[10px] font-bold uppercase tracking-wide text-gray-600">
                  ✓
                </th>
              </tr>
            </thead>

            <tbody>
              {data.lines.map((line) => (
                <tr key={line.lineNumber} className="border-b border-gray-200 align-top">
                  <td className="px-2 py-2.5 tabular-nums text-gray-500">{line.lineNumber}</td>

                  <td className="px-2 py-2.5">
                    <p className="font-medium">{line.productName}</p>
                    {line.variant && (
                      <p className="text-[11px] font-medium text-gray-800">{line.variant}</p>
                    )}
                    {line.addOns.length > 0 && (
                      <p className="mt-0.5 text-[11px] text-gray-600">
                        {line.addOns.join(" · ")}
                      </p>
                    )}
                    {line.itemNotes && (
                      <p className="mt-0.5 text-[11px] text-gray-600">{line.itemNotes}</p>
                    )}
                  </td>

                  <td className="px-2 py-2.5 text-right font-semibold tabular-nums">
                    {line.quantity.toLocaleString()}{" "}
                    <span className="text-[10px] font-normal text-gray-600">
                      {pluralUnit(line.unit, line.quantity)}
                    </span>
                  </td>

                  <td className="px-2 py-2.5">
                    <div className="mx-auto h-4 w-4 border border-gray-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {data.deliveryNotes && (
            <section className="keep-together mt-4 border-l-2 border-gray-900 pl-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Delivery notes
              </p>
              <p className="mt-0.5 whitespace-pre-line">{data.deliveryNotes}</p>
            </section>
          )}

          <div className="keep-together mt-8 grid grid-cols-2 gap-8 text-[11px]">
            <div>
              <div className="h-10 border-b border-gray-400" />
              <p className="mt-1 uppercase tracking-widest text-gray-500">Packed by</p>
            </div>
            <div>
              <div className="h-10 border-b border-gray-400" />
              <p className="mt-1 uppercase tracking-widest text-gray-500">
                Received by (name &amp; date)
              </p>
            </div>
          </div>

          <footer className="mt-6 border-t border-gray-300 pt-2 text-[10px] text-gray-500">
            {data.business.name} · {data.business.phone} · {data.business.website} ·
            Packing slip for {data.orderNumber} · Printed {date(data.generatedAt)}
          </footer>
        </article>
      </Sheet>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</dt>
      <dd className="mt-0.5">{value}</dd>
    </div>
  );
}
