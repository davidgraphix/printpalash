"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Button, EmptyState, Input } from "@/components/admin/ui/primitives";
import { ConfirmDialog, Modal, useToast } from "@/components/admin/ui/feedback";
import { ApiError } from "@/lib/admin/api";
import { can } from "@/lib/admin/config";
import { dateTime, money, spaced } from "@/lib/admin/format";
import { FileUpload } from "@/components/admin/FileUpload";
import { orders } from "@/lib/admin/resources";
import { useSession } from "@/lib/admin/session";
import type { Order, OrderPayment } from "@/lib/admin/types";

const METHODS = [
  { value: "BankTransfer", label: "Bank transfer" },
  { value: "Pos", label: "POS" },
  { value: "Cash", label: "Cash" },
  { value: "OnlineLink", label: "Online link" },
];

/**
 * The payments on an order, and the form that adds one.
 *
 * Every figure shown comes from the server. The form does not compute a new
 * balance and does not decide whether a payment is allowed — the backend
 * refuses anything that would take the order past its total, and its refusal is
 * shown verbatim because it says exactly how much room is left.
 */
export function RecordPayment({
  order,
  onChanged,
}: {
  order: Order;
  onChanged: () => void;
}) {
  const { role } = useSession();
  const toast = useToast();

  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("BankTransfer");
  const [reference, setReference] = useState("");
  const [proof, setProof] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<OrderPayment | null>(null);

  const mayRecord = can.salesOrAbove(role);
  const mayReverse = can.superAdminOnly(role);
  const settled = order.outstandingBalance <= 0;

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) {
      setError("Enter an amount greater than zero.");
      return;
    }

    setBusy(true);

    try {
      await orders.recordPayment(order.id, {
        amount: value,
        paymentMethod: method,
        referenceNumber: reference.trim() || null,
        proofOfPaymentUrl: proof.trim() || null,
      });

      toast.success(`Recorded ${money(value)}.`);
      setOpen(false);
      setAmount("");
      setReference("");
      onChanged();
    } catch (caught) {
      // "This payment would take the order to ₦35,000 against a total of
      // ₦30,000…" — far more useful than anything this form could invent.
      setError(caught instanceof ApiError ? caught.message : "Could not record the payment.");
    } finally {
      setBusy(false);
    }
  }

  async function reverse() {
    if (!deleting) return;
    setBusy(true);

    try {
      await orders.deletePayment(order.id, deleting.id);
      toast.success("Payment reversed.");
      setDeleting(null);
      onChanged();
    } catch (caught) {
      toast.error(caught instanceof ApiError ? caught.message : "Could not reverse it.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {order.payments.length === 0 ? (
        <EmptyState
          title="Nothing paid yet"
          description={`${money(order.totalAmount)} outstanding.`}
        />
      ) : (
        <ul className="flex flex-col divide-y divide-gray-100">
          {order.payments.map((payment) => (
            <li key={payment.id} className="flex items-center gap-3 py-2 first:pt-0">
              <div className="min-w-0 flex-1">
                <p className="font-semibold tabular-nums text-gray-900">
                  {money(payment.amount)}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {spaced(payment.paymentMethod)}
                  {payment.referenceNumber ? ` · ${payment.referenceNumber}` : ""} ·{" "}
                  {dateTime(payment.createdAt)} · {payment.recordedBy}
                </p>
              </div>

              {mayReverse && (
                <button
                  type="button"
                  onClick={() => setDeleting(payment)}
                  className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-700"
                  aria-label={`Reverse payment of ${money(payment.amount)}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {mayRecord && (
        <Button
          size="sm"
          variant={settled ? "secondary" : "primary"}
          disabled={settled}
          onClick={() => setOpen(true)}
          className="w-fit"
        >
          {settled ? "Fully paid" : `Record a payment · ${money(order.outstandingBalance)} due`}
        </Button>
      )}

      <Modal
        open={open}
        onClose={() => (busy ? undefined : setOpen(false))}
        title="Record a payment"
        description={`${money(order.outstandingBalance)} outstanding on ${order.orderNumber}.`}
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setOpen(false)} disabled={busy}>
              Cancel
            </Button>
            <Button size="sm" loading={busy} onClick={submit}>
              Record payment
            </Button>
          </>
        }
      >
        <form onSubmit={submit} className="flex flex-col gap-4">
          <Input
            label="Amount"
            type="number"
            step="0.01"
            min="0"
            inputMode="decimal"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            hint={`Up to ${money(order.outstandingBalance)}.`}
            error={error ?? undefined}
            autoFocus
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="payment-method" className="text-sm font-semibold text-gray-800">
              Method
            </label>
            <select
              id="payment-method"
              value={method}
              onChange={(event) => setMethod(event.target.value)}
              className="h-9 rounded-md border border-gray-300 bg-white px-2.5 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            >
              {METHODS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Reference (optional)"
            value={reference}
            onChange={(event) => setReference(event.target.value)}
            placeholder="Transfer reference or receipt number"
            hint="Recorded for the payment audit trail."
          />

          {/* The specification asks for a payment verification log: the bank
              reference and the receipt image, kept for audit. The server
              accepts only http(s) here — it is rendered back as a link. */}
          <Input
            label="Proof of payment (optional)"
            value={proof}
            onChange={(event) => setProof(event.target.value)}
            placeholder="https://…"
            hint="Link to the transfer receipt or screenshot."
          />

          <FileUpload
            kind="payment-proof"
            label="Upload receipt"
            onUploaded={setProof}
          />
        </form>
      </Modal>

      <ConfirmDialog
        open={deleting !== null}
        busy={busy}
        destructive
        title="Reverse this payment?"
        message={
          deleting
            ? `${money(deleting.amount)} will be removed from this order and the payment status ` +
              "recalculated. The reversal is recorded in the audit log."
            : ""
        }
        confirmLabel="Reverse payment"
        onCancel={() => setDeleting(null)}
        onConfirm={reverse}
      />
    </div>
  );
}
