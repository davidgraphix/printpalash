/**
 * Where the refresh token lives.
 *
 * httpOnly so no script on the page can read it, SameSite=Lax so it is not sent
 * on cross-site requests, Secure in production, and scoped to /api/admin so it
 * is not attached to ordinary requests to the marketing site.
 *
 * Fourteen days matches the backend's refresh-token lifetime. A cookie that
 * outlived the token would leave the user with a session that looks alive and
 * fails on first use.
 */
export const REFRESH_COOKIE = "pp_admin_refresh";

const FOURTEEN_DAYS_IN_SECONDS = 14 * 24 * 60 * 60;

export function refreshCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/api/admin",
    maxAge: FOURTEEN_DAYS_IN_SECONDS,
  };
}

/** The same cookie, expired, for signing out. */
export function clearedCookieOptions() {
  return { ...refreshCookieOptions(), maxAge: 0 };
}
