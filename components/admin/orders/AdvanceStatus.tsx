"use client";

import { useState } from "react";

import { Button, Input, cx } from "@/components/admin/ui/primitives";
import { ConfirmDialog, useToast } from "@/components/admin/ui/feedback";
import { ApiError } from "@/lib/admin/api";
import { orderStatusTone, spaced } from "@/lib/admin/format";
import { orders } from "@/lib/admin/resources";
import type { Order, OrderStatus } from "@/lib/admin/types";

/**
 * Moves an order to its next state.
 *
 * The choices come from `allowedNextStatuses` on the order itself — the server
 * owns the workflow, and offering a transition it would refuse only teaches
 * people to distrust the buttons. Cancelling and refunding are confirmed
 * because neither can be walked back: the backend treats both as terminal.
 */
export function AdvanceStatus({
  order,
  onChanged,
}: {
  order: Order;
  onChanged: () => void;
}) {
  const toast = useToast();
  const [note, setNote] = useState("");
  const [pending, setPending] = useState<OrderStatus | null>(null);
  const [busy, setBusy] = useState(false);

  async function move(status: OrderStatus) {
    setBusy(true);

    try {
      await orders.updateStatus(order.id, status, note.trim() || undefined);
      toast.success(`Moved to ${spaced(status).toLowerCase()}.`);
      setNote("");
      setPending(null);
      onChanged();
    } catch (caught) {
      // A refused transition is a conflict with the order's current state, and
      // the server explains which transitions it would accept.
      toast.error(
        caught instanceof ApiError ? caught.message : "Could not change the status.",
      );
      setPending(null);
    } finally {
      setBusy(false);
    }
  }

  if (order.allowedNextStatuses.length === 0) {
    return (
      <p className="text-sm text-gray-600">
        {spaced(order.status)} is a final state. This order cannot move any further.
      </p>
    );
  }

  const irreversible = (status: OrderStatus) =>
    status === "Cancelled" || status === "Refunded";

  return (
    <div className="flex flex-col gap-3">
      <Input
        label="Note (optional)"
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Why is it moving?"
        hint="Recorded against this change in the order's history."
      />

      <div className="flex flex-wrap gap-2">
        {order.allowedNextStatuses.map((status) => (
          <Button
            key={status}
            size="sm"
            variant={irreversible(status) ? "danger" : "primary"}
            loading={busy && pending === status}
            disabled={busy}
            onClick={() => (irreversible(status) ? setPending(status) : move(status))}
            className={cx(
              orderStatusTone(status) === "success" && !irreversible(status)
                ? "bg-green-700 hover:bg-green-800"
                : undefined,
            )}
          >
            {spaced(status)}
          </Button>
        ))}
      </div>

      <ConfirmDialog
        open={pending !== null}
        busy={busy}
        destructive
        title={`${pending ? spaced(pending) : ""} this order?`}
        message={
          pending === "Cancelled"
            ? "A cancelled order cannot re-enter production. It can only be refunded afterwards."
            : "A refunded order is final. It cannot be moved to any other status."
        }
        confirmLabel={pending ? spaced(pending) : "Confirm"}
        onCancel={() => setPending(null)}
        onConfirm={() => pending && move(pending)}
      />
    </div>
  );
}
