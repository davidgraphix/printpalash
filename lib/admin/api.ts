"use client";

import { API_BASE_URL } from "./config";

/**
 * An error the server actually explained.
 *
 * The backend writes its refusals for people — "'Bags' still has 15 product(s).
 * Move them to another category first" — so the message is carried through
 * rather than replaced with "Something went wrong". The status is kept
 * alongside it because 401 and 403 mean different things to the caller: one is
 * "sign in again", the other is "you are signed in and still may not do this".
 */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }

  /** The session is over, or was never valid. */
  get isUnauthorized() {
    return this.status === 401;
  }

  /**
   * Signed in, and still not allowed. Never treated as a session problem:
   * sending someone to the login form for a permission error invites them to
   * try credentials that cannot help.
   */
  get isForbidden() {
    return this.status === 403;
  }

  /** The request conflicts with current state — a duplicate, a used slug. */
  get isConflict() {
    return this.status === 409;
  }

  /** Malformed input the server rejected before doing anything. */
  get isValidation() {
    return this.status === 400 || this.status === 422;
  }

  /** The request never reached the server. Status 0 is not an HTTP code. */
  get isNetwork() {
    return this.status === 0;
  }

  get isServerFault() {
    return this.status >= 500;
  }
}

/* ------------------------------------------------------------------ *
 * Token handling
 *
 * The access token lives in a module-scoped variable and nowhere else. It is
 * short-lived, and keeping it out of localStorage, sessionStorage and any
 * JS-readable cookie means a script injected into this page cannot read it back
 * out or leave it behind on a shared machine. It is gone on reload; the session
 * is restored from the httpOnly refresh cookie instead.
 * ------------------------------------------------------------------ */

let accessToken: string | null = null;
let onSessionLost: (() => void) | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

/** Called once when refreshing fails and the session is genuinely over. */
export function setSessionLostHandler(handler: (() => void) | null) {
  onSessionLost = handler;
  sessionLostAnnounced = false;
}

/**
 * Guards against announcing the same dead session once per queued request.
 * Reset whenever a new token arrives, so a later expiry is announced again.
 */
let sessionLostAnnounced = false;

function announceSessionLost() {
  if (sessionLostAnnounced) return;
  sessionLostAnnounced = true;
  onSessionLost?.();
}

/* ------------------------------------------------------------------ *
 * Refresh, once at a time
 * ------------------------------------------------------------------ */

let refreshInFlight: Promise<boolean> | null = null;

/**
 * Exchanges the refresh token for a new access token.
 *
 * <b>Single-flight.</b> Refresh tokens rotate on the server: the old one is
 * invalidated the moment a new one is issued. Two concurrent refreshes would
 * therefore race, and the loser would be holding a token the server has already
 * revoked — signing the user out in the middle of their work. Every 401 that
 * arrives while a refresh is running waits for that one call instead.
 *
 * The refresh token itself never appears here. It lives in an httpOnly cookie
 * that only the Next route handler can read, so this request carries no
 * credential that JavaScript can see.
 */
async function refreshAccessToken(): Promise<boolean> {
  refreshInFlight ??= (async () => {
    try {
      const response = await fetch("/api/admin/session/refresh", {
        method: "POST",
        credentials: "same-origin",
      });

      if (!response.ok) return false;

      const data = (await response.json()) as { accessToken?: string };
      if (!data.accessToken) return false;

      accessToken = data.accessToken;
      sessionLostAnnounced = false;
      return true;
    } catch {
      // A network failure during refresh is not a valid session either.
      return false;
    } finally {
      // Cleared in a microtask so every caller awaiting this promise observes
      // the same result before a later 401 can start a second refresh.
      queueMicrotask(() => {
        refreshInFlight = null;
      });
    }
  })();

  return refreshInFlight;
}

/** Exposed for tests: is a refresh currently running? */
export function isRefreshing() {
  return refreshInFlight !== null;
}

/* ------------------------------------------------------------------ *
 * The request
 * ------------------------------------------------------------------ */

interface RequestOptions {
  method?: string;
  body?: unknown;
  signal?: AbortSignal;
  /**
   * Set internally after a refresh so a replayed request cannot refresh again.
   * This is what stops a 401 loop: at most one refresh and one replay per call.
   */
  retried?: boolean;
}

/**
 * One typed call to the backend.
 *
 * A 401 triggers a single refresh and one replay. If the refresh fails the
 * session is over and the handler set by the session provider takes the user to
 * the login screen. A 403 is returned as an error and never as a redirect — the
 * user is signed in perfectly well, they simply may not do this.
 */
export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, signal, retried = false } = options;

  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal,
    });
  } catch (caught) {
    // An aborted request is the caller's own doing, not a failure to report.
    if (caught instanceof DOMException && caught.name === "AbortError") throw caught;

    // Offline, DNS failure, CORS rejection, server not running. Typed like any
    // other failure so callers have one thing to catch.
    throw new ApiError(
      0,
      "Could not reach the server. Check your connection and try again.",
    );
  }

  if (response.status === 401 && !retried) {
    if (await refreshAccessToken()) {
      return apiFetch<T>(path, { ...options, retried: true });
    }

    announceSessionLost();
    throw new ApiError(401, "Your session has expired. Please sign in again.");
  }

  if (response.status === 401) {
    // A second 401 after a successful refresh: the token is fine and this
    // request is genuinely unauthenticated. Stop rather than loop.
    announceSessionLost();
    throw new ApiError(401, "Your session has expired. Please sign in again.");
  }

  if (!response.ok) {
    throw new ApiError(response.status, await messageFor(response));
  }

  if (response.status === 204) return undefined as T;

  return (await response.json()) as T;
}

/**
 * Downloads a file the API generates, and hands the browser a save dialogue.
 *
 * A plain <a href> cannot do this: the endpoint needs a bearer token, and a
 * link carries none. Putting the token in the query string instead would leak
 * it into browser history and any server log along the way. So the file is
 * fetched like every other request — same auth, same single-flight refresh on
 * a 401 — and only then turned into a download.
 *
 * The object URL is revoked immediately afterwards; leaving it alive pins the
 * whole file in memory for as long as the tab is open.
 */
export async function apiDownload(
  path: string,
  filename: string,
  retried = false,
): Promise<void> {
  const headers: Record<string, string> = {};
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, { headers });
  } catch {
    throw new ApiError(0, "Could not reach the server. Check your connection and try again.");
  }

  if (response.status === 401 && !retried) {
    if (await refreshAccessToken()) return apiDownload(path, filename, true);

    announceSessionLost();
    throw new ApiError(401, "Your session has expired. Please sign in again.");
  }

  if (!response.ok) throw new ApiError(response.status, await messageFor(response));

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  try {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * The server's own wording where there is any, because it is nearly always
 * more useful than anything this layer could invent.
 */
async function messageFor(response: Response): Promise<string> {
  try {
    const data = await response.json();

    if (typeof data?.message === "string") return data.message;

    // ASP.NET Core model validation returns { errors: { Field: [messages] } }.
    if (data?.errors && typeof data.errors === "object") {
      const first = Object.values(data.errors as Record<string, string[]>)[0];
      if (Array.isArray(first) && typeof first[0] === "string") return first[0];
    }

    if (typeof data?.title === "string") return data.title;
  } catch {
    // Not JSON. Fall through to the status-based wording.
  }

  switch (response.status) {
    case 403:
      return "You do not have permission to do that.";
    case 404:
      return "That could not be found.";
    case 409:
      return "That conflicts with the current state.";
    case 429:
      return "Too many requests. Please wait a moment and try again.";
    default:
      return response.status >= 500
        ? "The server could not complete that request."
        : `Request failed (${response.status}).`;
  }
}

/** Exposed for tests so state does not leak between cases. */
export function __resetApiClientForTests() {
  accessToken = null;
  refreshInFlight = null;
  sessionLostAnnounced = false;
  onSessionLost = null;
}
