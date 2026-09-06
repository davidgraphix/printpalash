"use client";

import { use } from "react";

import { PrintToolbar, Sheet } from "@/components/admin/print/PrintToolbar";
import { Card, ErrorState, Skeleton } from "@/components/admin/ui/primitives";
import { date, pluralUnit, spaced } from "@/lib/admin/format";
import { useQuery } from "@/lib/admin/hooks";
import { orders } from "@/lib/admin/resources";

/**
 * The production sheet.
 *
 * There is no money on this page, and there is none in the payload behind it
 * either: the job card endpoint returns a shape with no price, total, balance
 * or payment status on it at all. That is the point — a press operator needs to
 * know what to print and by when, and a sheet that sits on a bench all day
 * should not disclose what the customer paid.
 *
 * The frontend therefore has nothing to hide here, which is the only kind of
 * hiding worth trusting.
 */
export default function JobCardPrintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data, error, loading, reload } = useQuery(
    (signal) => orders.jobCard(id, signal),
    [id],
  );

  if (loading && !data) {
    return (
      <Sheet>
        <Skeleton className="h-[700px] w-full" />
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
      <PrintToolbar title="job card" backHref={`/admin/orders/${id}`} />

      <Sheet>
        <article className="text-[13px] text-gray-900">
          <header className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-gray-900 pb-3">
            <div>
              <p className="font-heading text-xl font-extrabold uppercase tracking-widest">
                Job card
              </p>
              <p className="mt-0.5 text-[11px] text-gray-600">
                Production copy · no commercial information
              </p>
            </div>

            <div className="text-right">
              <p className="font-mono text-lg font-bold">{data.orderNumber}</p>
              <p className="text-[11px] text-gray-600">
                Tracking {data.trackingNumber}
              </p>
            </div>
          </header>

          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-4">
            <Field label="Customer" value={data.customerName} />
            <Field label="Company" value={data.company ?? "—"} />
            <Field label="Ordered" value={date(data.orderDate)} />
            <Field label="Stage" value={spaced(data.status)} />
          </dl>

          {/* The date the floor actually works to, so it is given its own
              emphasis rather than sitting in the run of metadata. */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-y-2 border-gray-900 py-2.5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Required by
              </p>
              <p className="font-heading text-lg font-extrabold">
                {data.estimatedDeliveryDate ?? "Not set"}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Items
              </p>
              <p className="font-heading text-lg font-extrabold tabular-nums">
                {data.itemCount}
              </p>
            </div>
          </div>

          <ol className="mt-5 flex flex-col gap-4">
            {data.lines.map((line) => (
              <li
                key={line.lineNumber}
                className="keep-together border border-gray-300 p-3"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-200 pb-2">
                  <p className="font-semibold">
                    <span className="mr-2 text-gray-500">{line.lineNumber}.</span>
                    {line.productName}
                  </p>
                  {line.variant && (
                    <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-gray-800">
                      {line.variant}
                    </p>
                  )}
                  <p className="font-heading text-base font-extrabold tabular-nums">
                    {line.quantity.toLocaleString()}{" "}
                    <span className="text-[11px] font-semibold uppercase text-gray-600">
                      {pluralUnit(line.unit, line.quantity)}
                    </span>
                  </p>
                </div>

                {line.specifications && Object.keys(line.specifications).length > 0 && (
                  <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3">
                    {Object.entries(line.specifications).map(([key, value]) => (
                      <Field key={key} label={key} value={value} />
                    ))}
                  </dl>
                )}

                {line.addOns.length > 0 && (
                  <div className="mt-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Finishing
                    </p>
                    <p className="mt-0.5">{line.addOns.join(" · ")}</p>
                  </div>
                )}

                {line.artworkFileUrl && (
                  <div className="mt-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Artwork
                    </p>
                    {/* Printed in full: a hyperlink is useless on paper, and the
                        operator needs the address they can actually type. */}
                    <a
                      href={line.artworkFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all font-mono text-[11px] text-blue-800 underline"
                    >
                      {line.artworkFileUrl}
                    </a>
                  </div>
                )}

                {line.itemNotes && (
                  <div className="mt-2 border-l-2 border-gray-900 pl-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Note
                    </p>
                    <p className="whitespace-pre-line">{line.itemNotes}</p>
                  </div>
                )}
              </li>
            ))}
          </ol>

          {data.productionNotes && (
            <section className="keep-together mt-5 border-2 border-gray-900 p-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Production notes
              </p>
              <p className="mt-1 whitespace-pre-line">{data.productionNotes}</p>
            </section>
          )}

          {data.deliveryAddress && (
            <section className="mt-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Deliver to
              </p>
              <p className="mt-0.5 max-w-[46ch]">{data.deliveryAddress}</p>
            </section>
          )}

          {/* Signed off on paper, where the work is. */}
          <div className="keep-together mt-8 grid grid-cols-3 gap-6 text-[11px]">
            {["Printed by", "Finished by", "Checked by"].map((role) => (
              <div key={role}>
                <div className="h-8 border-b border-gray-400" />
                <p className="mt-1 uppercase tracking-widest text-gray-500">{role}</p>
              </div>
            ))}
          </div>

          <footer className="mt-6 border-t border-gray-300 pt-2 text-[10px] text-gray-500">
            Printed {date(data.generatedAt)} · Job card {data.orderNumber} ·
            Production copy, no pricing
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
