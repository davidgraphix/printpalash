import { NextResponse } from "next/server";

import { API_BASE_URL } from "@/lib/admin/config";
import { REFRESH_COOKIE, refreshCookieOptions } from "../cookie";

export const runtime = "nodejs";

/**
 * Signs a staff member in.
 *
 * The browser never handles the refresh token. This proxies the credentials to
 * the ASP.NET Core API, keeps the fourteen-day refresh token in an httpOnly
 * cookie the page's JavaScript cannot read, and hands back only the short-lived
 * access token for the client to hold in memory.
 *
 * That split is the whole point: a script injected into the admin could read an
 * access token and have thirty minutes; it could not read the credential that
 * renews it for a fortnight.
 */
export async function POST(request: Request) {
  let credentials: unknown;

  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Enter your email and password." },
      { status: 400 },
    );
  }

  // Wrapped deliberately: an unreachable API used to throw straight out of the
  // handler and surface as a 500, which a client cannot tell apart from a
  // broken session and which says nothing useful to the person looking at it.
  let upstream: Response;

  try {
    upstream = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
  } catch {
    // The API is unreachable — a transport failure, not an expired session, so
    // the refresh cookie is left alone rather than cleared.
    return NextResponse.json(
      { message: "Could not reach the server. Please try again shortly." },
      { status: 503 },
    );
  }

  const data = await upstream.json().catch(() => null);

  // Both tokens are required. A response carrying only one is a broken
  // upstream, not a session — setting a cookie to "undefined" would leave the
  // browser looking signed in and failing on every refresh afterwards.
  if (!upstream.ok || !data?.accessToken || !data?.refreshToken) {
    // The API deliberately answers the same way for an unknown address and a
    // wrong password, so it cannot be used to discover which accounts exist.
    // That wording is passed straight through.
    return NextResponse.json(
      { message: data?.message ?? "Invalid email or password." },
      { status: upstream.status === 200 ? 502 : upstream.status },
    );
  }

  const response = NextResponse.json({
    accessToken: data.accessToken,
    expiresAt: data.expiresAt,
    user: data.user,
  });

  response.cookies.set(REFRESH_COOKIE, data.refreshToken, refreshCookieOptions());

  return response;
}
