import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { API_BASE_URL } from "@/lib/admin/config";
import { REFRESH_COOKIE, clearedCookieOptions, refreshCookieOptions } from "../cookie";

export const runtime = "nodejs";

/**
 * Exchanges the stored refresh token for a fresh access token.
 *
 * The backend rotates refresh tokens on every use, so the new one replaces the
 * cookie in the same response. If the exchange fails — expired, already used,
 * or the account was deactivated — the cookie is cleared rather than left to
 * fail again on the next attempt.
 */
export async function POST() {
  const store = await cookies();
  const refreshToken = store.get(REFRESH_COOKIE)?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: "No session." }, { status: 401 });
  }

  // Wrapped deliberately: an unreachable API used to throw straight out of the
  // handler and surface as a 500, which a client cannot tell apart from a
  // broken session and which says nothing useful to the person looking at it.
  let upstream: Response;

  try {
    upstream = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
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

  // Same rule as login: a rotation that returns no new refresh token would
  // leave the cookie holding one the server has already revoked.
  if (!upstream.ok || !data?.accessToken || !data?.refreshToken) {
    const failed = NextResponse.json(
      { message: "Your session has expired." },
      { status: 401 },
    );
    failed.cookies.set(REFRESH_COOKIE, "", clearedCookieOptions());
    return failed;
  }

  const response = NextResponse.json({
    accessToken: data.accessToken,
    expiresAt: data.expiresAt,
    user: data.user,
  });

  response.cookies.set(REFRESH_COOKIE, data.refreshToken, refreshCookieOptions());
  return response;
}
