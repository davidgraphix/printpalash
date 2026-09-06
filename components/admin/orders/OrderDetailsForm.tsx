"use client";

import { useState } from "react";

import { Button, Input } from "@/components/admin/ui/primitives";
import { useToast } from "@/components/admin/ui/feedback";
import { ApiError } from "@/lib/admin/api";
import { can } from "@/lib/admin/config";
import { dateTime } from "@/lib/admin/format";
import { orders } from "@/lib/admin/resources";
import { useSession } from "@/lib/admin/session";
import type { Order } from "@/lib/admin/types";

/**
 * The parts of an order that change after it is placed: where it is going, when
 * it is due, who is carrying it, and what the customer asked for.
 *
 * No money here. Items and totals are settled when the order is created — a
 * notes form is not the place to rewrite what somebody agreed to pay, and the
 * backend refuses it regardless.
 */
export function OrderDetailsForm({
  order,
  onSaved,
}: {
  order: Order;
  onSaved: () => void;
}) {
  const { role } = useSession();
  const toast = useToast();

  const [address, setAddress] = useState(order.deliveryAddress ?? "");
  const [eta, setEta] = useState(order.estimatedDeliveryDate ?? "");
  const [dispatchedTo, setDispatchedTo] = useState(order.dispatchedTo ?? "");
  const [notes, setNotes] = useState(order.internalNotes ?? "");
  const [productionNotes, setProductionNotes] = useState(order.productionNotes ?? "");
  const [busy, setBusy] = useState(false);

  const mayEdit = can.salesOrAbove(role);

  // A Production Manager never receives internal notes, so the field is not
  // shown to them — saving it back would blank what they cannot see.
  // Decided from the role, not from whether the field arrived. The API omits
  // internalNotes for a role that may not see it — which is indistinguishable
  // from an order that simply has none, so inferring permission from its
  // presence hid the field exactly when somebody wanted to write the first note.
  const mayEditNotes = can.salesOrAbove(role);

  async function save() {
    setBusy(true);

    try {
      await orders.update(order.id, {
        deliveryAddress: address.trim() || null,
        estimatedDeliveryDate: eta || null,
        dispatchedTo: dispatchedTo.trim() || null,
        productionNotes: productionNotes.trim() || null,
        ...(mayEditNotes ? { internalNotes: notes.trim() || null } : {}),
      });
      onSaved();
    } catch (caught) {
      toast.error(caught instanceof ApiError ? caught.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  if (!mayEdit) {
    return (
      <dl className="flex flex-col gap-3 text-sm">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            Delivery address
          </dt>
          <dd className="mt-0.5 text-gray-900">{order.deliveryAddress ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            Expected
          </dt>
          <dd className="mt-0.5 text-gray-900">{order.estimatedDeliveryDate ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            Dispatch
          </dt>
          <dd className="mt-0.5 text-gray-900">{order.dispatchedTo ?? "Not assigned"}</dd>
        </div>
      </dl>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <Input
        label="Delivery address"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
        placeholder="Where the job is going"
      />

      <Input
        label="Expected delivery"
        type="date"
        value={eta}
        onChange={(event) => setEta(event.target.value)}
      />

      <Input
        label="Dispatch"
        value={dispatchedTo}
        onChange={(event) => setDispatchedTo(event.target.value)}
        placeholder="Rider or courier"
        hint={
          order.dispatchedAt
            ? `Assigned ${dateTime(order.dispatchedAt)}.`
            : "Who is carrying it. Recorded with the time it was assigned."
        }
      />

      {/* Two note fields, because they go to two different places. The job
          card prints this one and never the commercial one. */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="production-notes" className="text-sm font-semibold text-gray-800">
          Production notes
        </label>
        <textarea
          id="production-notes"
          rows={3}
          value={productionNotes}
          onChange={(event) => setProductionNotes(event.target.value)}
          placeholder="Match the Pantone from the last run"
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
        />
        <p className="text-xs text-gray-500">
          Printed on the job card. Keep it to what the press floor needs — no
          prices or payment terms.
        </p>
      </div>

      {mayEditNotes && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="internal-notes" className="text-sm font-semibold text-gray-800">
            Internal notes
          </label>
          <textarea
            id="internal-notes"
            rows={3}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Agreed terms, credit history, who to chase"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
          />
          <p className="text-xs text-gray-500">
            Sales and admin staff only. Never on a customer's invoice, and never
            on the job card.
          </p>
        </div>
      )}

      <Button size="sm" loading={busy} onClick={save} className="w-fit">
        Save
      </Button>
    </div>
  );
}
