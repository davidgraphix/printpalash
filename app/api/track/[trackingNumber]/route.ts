import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Public order tracking, proxied through the Next server.
 *
 * The public site otherwise makes no API calls at all — every page is built
 * from the static catalogue — and this deliberately keeps it that way from the
 * browser's point of view. Fetching the backend directly from the page would
 * mean putting the API origin into the public bundle and opening CORS to the
 * marketing domain, for one lookup. A same-origin proxy costs neither.
 *
 * The upstream endpoint is the only anonymous order surface on the API: one
 * order, by its tracking number, returning a hand-built restricted DTO with no
 * money, no customer details and no artwork on it. This adds nothing to that
 * payload and takes nothing away.
 */
const API_BASE_URL =
  process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5080";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ trackingNumber: string }> },
) {
  const { trackingNumber } = await params;

  // Tracking numbers are generated as PP-YYYY-XXXXXX. Anything that cannot be
  // one is refused here rather than forwarded, so the upstream rate limit is
  // spent on plausible lookups instead of on whatever a scanner sends.
  if (!/^[A-Za-z0-9-]{6,40}$/.test(trackingNumber)) {
    return NextResponse.json(
      { message: "That does not look like a tracking number." },
      { status: 400 },
    );
  }

  let upstream: Response;

  try {
    upstream = await fetch(
      `${API_BASE_URL}/api/tracking/${encodeURIComponent(trackingNumber)}`,
      { headers: { Accept: "application/json" }, cache: "no-store" },
    );
  } catch {
    return NextResponse.json(
      { message: "We could not reach our system just now. Please try again shortly." },
      { status: 503 },
    );
  }

  const data = await upstream.json().catch(() => null);

  if (!upstream.ok) {
    // The upstream answers 404 for everything it will not disclose, so that a
    // response cannot be used to discover which codes exist. That wording is
    // passed through rather than replaced.
    return NextResponse.json(
      {
        message:
          data?.message ??
          (upstream.status === 429
            ? "Too many lookups just now. Please wait a moment and try again."
            : "We could not find an order with that tracking number."),
      },
      { status: upstream.status },
    );
  }

  return NextResponse.json(data);
}
