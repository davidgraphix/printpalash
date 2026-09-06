"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Info, ShieldCheck } from "lucide-react";

import { PricingReviewBadge } from "@/components/admin/ui/badges";
import { Button, Card, Input } from "@/components/admin/ui/primitives";
import { ConfirmDialog, useToast } from "@/components/admin/ui/feedback";
import { ApiError } from "@/lib/admin/api";
import { can } from "@/lib/admin/config";
import { PRICING_REVIEW_MEANING, dateTime, money, priceBasis } from "@/lib/admin/format";
import { products } from "@/lib/admin/resources";
import { useSession } from "@/lib/admin/session";
import type { Product } from "@/lib/admin/types";

/**
 * The pricing gate, on the product it applies to.
 *
 * This is the screen the whole pricing-review mechanism exists for, so it is
 * deliberately explicit about three things:
 *
 *   - the price shown is exactly what the source published, and approving does
 *     not change it by a kobo;
 *   - a flagged product is genuinely unquotable, not merely annotated;
 *   - the reasons are the source's own words, rule by rule, so whoever decides
 *     is deciding on evidence rather than a colour.
 *
 * The reasons are rendered as text, never as HTML — they are transcribed notes
 * from a supplier's price list and get no opportunity to inject markup.
 */
export function PricingReviewPanel({
  product,
  onChanged,
}: {
  product: Product;
  onChanged: () => void;
}) {
  const { role } = useSession();
  const toast = useToast();

  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState<"approve" | "withdraw" | null>(null);

  const mayDecide = can.managePricing(role);
  const flagged = product.pricingReviewStatus === "NeedsReview";
  const approved = product.pricingReviewStatus === "ManuallyApproved";

  // The exported reasons are one per line, tagged with the rule that produced
  // them: "[source_flagged_price] Price list quotes ₦150 per 50 pieces…".
  const reasons = (product.pricingReviewNotes ?? "")
    .split("\n\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      // [\s\S] rather than the /s flag, which needs a newer compile target
      // than this project sets.
      const match = line.match(/^\[([a-z_]+)\]\s*([\s\S]*)$/);
      return match
        ? { rule: match[1], detail: match[2] }
        : { rule: null, detail: line };
    });

  async function decide(approve: boolean) {
    if (note.trim().length < 4) {
      setError("Say what you checked — an approval with no reasoning cannot be audited later.");
      return;
    }

    setBusy(true);
    setError(null);

    try {
      await products.setPricingReview(product.id, approve, note.trim());
      toast.success(
        approve
          ? "Price approved. This product can now be quoted automatically."
          : "Approval withdrawn. This product is blocked from automatic quoting again.",
      );
      setNote("");
      setConfirming(null);
      onChanged();
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "Could not save that decision.");
      setConfirming(null);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card title="Pricing review">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <PricingReviewBadge status={product.pricingReviewStatus} />
          {product.canAutoQuote ? (
            <span className="inline-flex items-center gap-1 text-xs text-green-700">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              Quoted automatically
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700">
              <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
              Not quoted automatically
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600">
          {PRICING_REVIEW_MEANING[product.pricingReviewStatus]}
        </p>

        {/* What the source actually says, so a decision is made against the
            figure rather than against a status. */}
        <dl className="grid gap-3 rounded-md bg-gray-50 p-3 sm:grid-cols-2">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              Source price
            </dt>
            <dd className="mt-0.5 font-semibold text-gray-900">
              {priceBasis(product.basePrice, product.priceQuantity, product.priceUnit)}
            </dd>
          </div>

          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              Works out at
            </dt>
            <dd className="mt-0.5 text-gray-900">
              {product.basePrice === null
                ? "—"
                : `${money(product.basePrice / product.priceQuantity)} per ${product.priceUnit}`}
            </dd>
          </div>

          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              Batch size
            </dt>
            <dd className="mt-0.5 text-gray-900">
              {product.priceQuantity.toLocaleString()} {product.priceUnit}
            </dd>
          </div>

          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              Minimum order
            </dt>
            <dd className="mt-0.5 text-gray-900">
              {product.minimumQuantity.toLocaleString()} {product.priceUnit}
            </dd>
          </div>
        </dl>

        {reasons.length > 0 && (
          <div>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              Why it was flagged
            </p>
            <ul className="flex flex-col gap-2">
              {reasons.map((reason, index) => (
                <li
                  key={index}
                  className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2"
                >
                  {reason.rule && (
                    <p className="font-mono text-[10px] uppercase tracking-wide text-amber-800">
                      {reason.rule.replace(/_/g, " ")}
                    </p>
                  )}
                  <p className="mt-0.5 text-sm text-amber-900">{reason.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {product.dataReviewNotes && (
          <div>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              Data review notes
            </p>
            <p className="whitespace-pre-line rounded-md bg-gray-50 p-3 text-sm text-gray-700">
              {product.dataReviewNotes}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Staff only. Never shown on the public product page.
            </p>
          </div>
        )}

        {approved && (
          <div className="flex gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-2">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold">
                Approved by {product.pricingApprovedBy ?? "a Super Admin"}
                {product.pricingApprovedAt ? ` · ${dateTime(product.pricingApprovedAt)}` : ""}
              </p>
              {product.pricingApprovalNote && (
                <p className="mt-0.5">{product.pricingApprovalNote}</p>
              )}
            </div>
          </div>
        )}

        {/* The decision itself. Super Admin only, and the API refuses anyone
            else regardless of what is drawn here. */}
        {mayDecide && (flagged || approved) ? (
          <div className="flex flex-col gap-3 border-t border-gray-200 pt-4">
            <Input
              label={flagged ? "What did you check?" : "Why are you withdrawing approval?"}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              error={error ?? undefined}
              placeholder={
                flagged
                  ? "e.g. Confirmed with production that ₦150 per 50 is correct"
                  : "e.g. The basis is still unclear with the supplier"
              }
              hint="Recorded against the product and in the audit log."
            />

            <div className="flex flex-wrap gap-2">
              {flagged && (
                <Button size="sm" onClick={() => setConfirming("approve")} disabled={busy}>
                  Approve this price
                </Button>
              )}
              {approved && (
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => setConfirming("withdraw")}
                  disabled={busy}
                >
                  Withdraw approval
                </Button>
              )}
            </div>

            <p className="flex items-start gap-1.5 text-xs text-gray-500">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Approving changes only whether the backend may quote from this figure.
              The price itself is never altered.
            </p>
          </div>
        ) : flagged && !mayDecide ? (
          <p className="border-t border-gray-200 pt-4 text-xs text-gray-500">
            Only a Super Admin can confirm a flagged price.
          </p>
        ) : null}
      </div>

      <ConfirmDialog
        open={confirming !== null}
        busy={busy}
        destructive={confirming === "withdraw"}
        title={
          confirming === "approve" ? "Approve this price for quoting?" : "Withdraw this approval?"
        }
        message={
          confirming === "approve"
            ? `${priceBasis(product.basePrice, product.priceQuantity, product.priceUnit)} ` +
              "will be quoted automatically on the public site and on new orders. " +
              "The stored price is not changed."
            : "This product will stop being quoted automatically until it is approved again."
        }
        confirmLabel={confirming === "approve" ? "Approve price" : "Withdraw approval"}
        onCancel={() => setConfirming(null)}
        onConfirm={() => decide(confirming === "approve")}
      />
    </Card>
  );
}
