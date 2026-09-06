import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { API_BASE_URL } from "@/lib/admin/config";
import { REFRESH_COOKIE, clearedCookieOptions } from "../cookie";

export const runtime = "nodejs";

/**
 * Ends the session on the server as well as in this browser.
 *
 * Clearing the cookie alone would leave a working refresh token on the server
 * for another fortnight. The backend's logout clears the stored hash, which is
 * what actually revokes it; the cookie is then cleared regardless of whether
 * that call succeeded, because the user asked to be signed out.
 */
export async function POST(request: Request) {
  const accessToken = request.headers.get("authorization");

  if (accessToken) {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: { Authorization: accessToken },
    }).catch(() => {
      // Signing out locally must not depend on the network.
    });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(REFRESH_COOKIE, "", clearedCookieOptions());
  return response;
}
