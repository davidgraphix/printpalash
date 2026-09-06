"use client";

import { Badge } from "./primitives";
import {
  PRICING_REVIEW_LABELS,
  orderStatusTone,
  paymentStatusTone,
  pricingReviewTone,
  productStatusTone,
  spaced,
} from "@/lib/admin/format";
import type {
  OrderStatus,
  PaymentStatus,
  PricingReviewStatus,
  ProductStatus,
} from "@/lib/admin/types";

/**
 * The status chips, defined once.
 *
 * A status looks identical wherever it appears — in a table, on a detail page,
 * in a timeline — because a reader learns the colours once and then reads them
 * everywhere. Each carries its label, so the colour is reinforcement and never
 * the only signal.
 */

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return <Badge tone={orderStatusTone(status)}>{spaced(status)}</Badge>;
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return <Badge tone={paymentStatusTone(status)}>{spaced(status)}</Badge>;
}

export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  return <Badge tone={productStatusTone(status)}>{status}</Badge>;
}

/**
 * Whether a product's price may be quoted automatically.
 *
 * The wording matters more than usual here: "Needs review" must not read as a
 * cosmetic warning. A flagged product is genuinely unquotable, and the badge is
 * the only place most staff will ever see that.
 */
export function PricingReviewBadge({
  status,
  showMeaning = false,
}: {
  status: PricingReviewStatus;
  showMeaning?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Badge tone={pricingReviewTone(status)}>{PRICING_REVIEW_LABELS[status]}</Badge>
      {showMeaning && status === "NeedsReview" && (
        <span className="text-xs text-red-700">blocked from quoting</span>
      )}
    </span>
  );
}
