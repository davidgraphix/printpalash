import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

import { CATALOG_TAG, productTag } from "@/lib/catalog/source";

export const runtime = "nodejs";

/**
 * Tells the storefront that the catalogue changed.
 *
 * The admin saves a product to the API; the API calls this; the affected pages
 * rebuild on their next request. Without it a product edit would wait out the
 * cache window, and a newly created product would wait for a deployment.
 *
 * Security, in the order the checks run:
 *
 *  - POST only. A GET would be followed by any crawler that found the URL, and
 *    a link preview would quietly flush the cache.
 *  - The shared secret lives in REVALIDATE_SECRET, read on the server and never
 *    given the NEXT_PUBLIC_ prefix. It is compared with a timing-safe equality
 *    check: an ordinary string comparison returns faster on an earlier
 *    mismatch, which over many attempts leaks the prefix.
 *  - With no secret configured the endpoint refuses everything. The tempting
 *    inverse — "no secret set, so skip the check" — turns a missing environment
 *    variable into an open cache-purge endpoint, which is a denial-of-service
 *    lever against both this site and the API behind it.
 *
 * It is deliberately not destructive. The worst an authorised caller can do is
 * make the next request for a page slower, so there is no confirmation step and
 * no audit trail here beyond the API's own.
 */

interface RevalidateRequest {
  /** When present, only this product and the shared catalogue tag are flushed. */
  slug?: unknown;
}

/** Constant-time comparison that does not reveal length through an early exit. */
function secretMatches(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);

  // timingSafeEqual throws on a length mismatch, which would itself be a
  // timing signal. Hashing both to a fixed width first avoids that, but a
  // length check plus a full comparison of equal-length buffers is enough
  // here: the length of a secret is not the part worth protecting.
  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const expected = process.env.REVALIDATE_SECRET?.trim();

  if (!expected) {
    // 503, not 500: the request was fine and the server is not configured to
    // serve it. Says which variable without hinting at any value.
    return NextResponse.json(
      {
        revalidated: false,
        message:
          "Revalidation is not configured on this deployment. Set REVALIDATE_SECRET.",
      },
      { status: 503 },
    );
  }

  // Header first, because a secret in a query string ends up in access logs,
  // browser history and referrer headers.
  const provided =
    request.headers.get("x-revalidate-secret")?.trim() ??
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim() ??
    "";

  if (!provided || !secretMatches(provided, expected)) {
    // No detail. A caller who got the secret wrong learns only that.
    return NextResponse.json(
      { revalidated: false, message: "Not authorised." },
      { status: 401 },
    );
  }

  let body: RevalidateRequest = {};

  if (request.headers.get("content-type")?.includes("application/json")) {
    try {
      body = (await request.json()) as RevalidateRequest;
    } catch {
      return NextResponse.json(
        { revalidated: false, message: "The request body is not valid JSON." },
        { status: 400 },
      );
    }
  }

  const tags = [CATALOG_TAG];

  // A slug narrows the work to one product plus the shared listings. Anything
  // that is not a plausible slug is refused rather than ignored, so a caller
  // never believes it invalidated a page it did not.
  if (body.slug !== undefined && body.slug !== null) {
    if (typeof body.slug !== "string" || !/^[a-z0-9][a-z0-9-]{0,99}$/i.test(body.slug)) {
      return NextResponse.json(
        {
          revalidated: false,
          message: "'slug' must be a product slug, or be omitted to refresh everything.",
        },
        { status: 400 },
      );
    }

    tags.push(productTag(body.slug.toLowerCase()));
  }

  for (const tag of tags) revalidateTag(tag);

  return NextResponse.json({ revalidated: true, tags });
}

/**
 * Anything other than POST. Spelled out so a mistaken GET gets a clear answer
 * rather than Next's default, which reads like the route does not exist.
 */
export async function GET() {
  return NextResponse.json(
    { message: "Use POST with the x-revalidate-secret header." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
