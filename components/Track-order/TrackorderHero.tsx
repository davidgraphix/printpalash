"use client";

import type React from "react";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ChevronRight, Circle, Loader2 } from "lucide-react";
import Image from "next/image";
import trackOrderImage from "@/public/assests/red-delivery-car-deliver-express-shipping-fast-delivery-with-arrow-graph-background-3d-rendering 1.png";

/**
 * What the public tracking endpoint returns.
 *
 * Deliberately narrow: a status, a timeline and the item names. There is no
 * money, no customer detail, no artwork and no internal note on this shape,
 * and nothing here asks for any.
 */
interface TrackingResult {
  trackingNumber: string;
  orderNumber: string;
  orderDate: string;
  status: string;
  statusDescription: string;
  isComplete: boolean;
  isClosedWithoutDelivery: boolean;
  timeline: { status: string; label: string; state: string; reachedAt: string | null }[];
  items: { productName: string; quantity: number }[];
  estimatedDeliveryDate: string | null;
  lastUpdated: string;
}

export default function TrackOrderHero() {
  return (
    // useSearchParams needs a boundary, and this page is statically rendered.
    <Suspense fallback={<TrackOrderShell />}>
      <TrackOrderContent />
    </Suspense>
  );
}

function TrackOrderContent() {
  const searchParams = useSearchParams();

  const [orderNumber, setOrderNumber] = useState("");
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const lookUp = useCallback(async (reference: string) => {
    const trimmed = reference.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`/api/track/${encodeURIComponent(trimmed)}`);
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(data?.message ?? "We could not find an order with that number.");
        return;
      }

      setResult(data as TrackingResult);
    } catch {
      setError("We could not reach our system just now. Please try again shortly.");
    } finally {
      setLoading(false);
    }
  }, []);

  // The QR code on a PrintPalash invoice or packing slip links straight here
  // with the tracking number attached, so a scan should show the order without
  // anybody retyping the reference off the paper.
  useEffect(() => {
    const fromLink = searchParams.get("tracking");
    if (!fromLink) return;

    setOrderNumber(fromLink);
    void lookUp(fromLink);
  }, [searchParams, lookUp]);

  return (
    <TrackOrderShell
      orderNumber={orderNumber}
      onOrderNumberChange={setOrderNumber}
      onSubmit={(event: React.FormEvent) => {
        event.preventDefault();
        void lookUp(orderNumber);
      }}
      loading={loading}
      error={error}
      result={result}
    />
  );
}

/**
 * The page itself.
 *
 * The layout, imagery, copy and WhatsApp fallback are exactly as they were —
 * this is a working public page and the brief was to make the form function,
 * not to redesign it. The results panel is additive and appears only once a
 * lookup has been made.
 */
function TrackOrderShell({
  orderNumber = "",
  onOrderNumberChange,
  onSubmit,
  loading = false,
  error = null,
  result = null,
}: {
  orderNumber?: string;
  onOrderNumberChange?: (value: string) => void;
  onSubmit?: (event: React.FormEvent) => void;
  loading?: boolean;
  error?: string | null;
  result?: TrackingResult | null;
} = {}) {
  return (
    <section className="bg-gradient-to-br from-pink-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Illustration */}
          <div className="relative">
            {/* Background Arrow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-96 h-32 bg-pink-200 rounded-full transform rotate-12 opacity-50"></div>
            </div>

            {/* Mobile Phone with Tracking Steps */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="relative">
                <Image src={trackOrderImage} alt="" />
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Track your print order
              </h1>
              <p className="text-lg text-gray-600">
                Easily track the status of your order using your order number
                and see step by step progress on your order.
              </p>
            </div>

            {/* Order Tracking Form */}
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="flex">
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => onOrderNumberChange?.(e.target.value)}
                  placeholder="Enter your Order Number"
                  aria-label="Order or tracking number"
                  className="flex-1 py-4 px-6 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Track order"
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-6 py-4 rounded-r-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="w-6 h-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div
                role="alert"
                className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg"
              >
                {error}
              </div>
            )}

            {result && <TrackingResultPanel result={result} />}

            {/* Contact Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                If you would prefer to speak to someone personally about the
                status of your order, please reach out via WhatsApp{" "}
                <a
                  href={`https://wa.me/2347035017359?text=${encodeURIComponent(
                    "Hello, I would like to inquire about the status of my print order. Could you please assist me?"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-red-600 underline hover:text-red-700"
                >
                  +234 703 501 7359
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrackingResultPanel({ result }: { result: TrackingResult }) {
  const date = (value: string | null) =>
    value
      ? new Date(value).toLocaleDateString("en-NG", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500">Order</p>
          <p className="text-xl font-bold text-gray-900">{result.orderNumber}</p>
          <p className="text-sm text-gray-500">Placed {date(result.orderDate)}</p>
        </div>

        <span
          className={
            result.isClosedWithoutDelivery
              ? "px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-700"
              : result.isComplete
                ? "px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800"
                : "px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800"
          }
        >
          {result.status}
        </span>
      </div>

      <p className="text-gray-700">{result.statusDescription}</p>

      {/* A cancelled or refunded order gets a plain statement rather than a
          progress bar frozen part way along, which would read as "still
          coming". */}
      {!result.isClosedWithoutDelivery && (
        <ol className="space-y-3">
          {result.timeline.map((step) => (
            <li key={step.status} className="flex items-start gap-3">
              {step.state === "pending" ? (
                <Circle className="w-5 h-5 mt-0.5 text-gray-300 shrink-0" aria-hidden="true" />
              ) : (
                <CheckCircle2
                  className={
                    step.state === "current"
                      ? "w-5 h-5 mt-0.5 text-red-600 shrink-0"
                      : "w-5 h-5 mt-0.5 text-green-600 shrink-0"
                  }
                  aria-hidden="true"
                />
              )}

              <div className="min-w-0">
                <p
                  className={
                    step.state === "pending"
                      ? "text-gray-400"
                      : "text-gray-900 font-medium"
                  }
                >
                  {step.label}
                </p>
                {step.reachedAt && (
                  <p className="text-sm text-gray-500">{date(step.reachedAt)}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}

      {result.estimatedDeliveryDate && !result.isComplete && (
        <p className="text-gray-700">
          <span className="font-semibold">Expected by:</span>{" "}
          {date(result.estimatedDeliveryDate)}
        </p>
      )}

      {result.items.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-900 mb-2">In this order</p>
          <ul className="space-y-1">
            {result.items.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item.quantity.toLocaleString()} × {item.productName}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-sm text-gray-500 border-t border-gray-100 pt-3">
        Tracking number {result.trackingNumber}
      </p>
    </div>
  );
}
