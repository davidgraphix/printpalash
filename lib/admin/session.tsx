"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import { apiFetch, setAccessToken, setSessionLostHandler } from "./api";
import type { Role } from "./config";

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  isActive: boolean;
  lastLoginAt: string | null;
}

type Status = "loading" | "authenticated" | "anonymous";

interface SessionValue {
  status: Status;
  user: AdminUser | null;
  role: Role | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const SessionContext = createContext<SessionValue | null>(null);

/**
 * Who is signed in, and the two operations that change it.
 *
 * <b>The role comes from the server.</b> It is read from `/api/auth/me` rather
 * than decoded out of the JWT in the browser. A token's payload is readable and
 * editable by anyone holding it, so trusting it client-side would mean trusting
 * the user's own claim about their permissions. Asking the API costs one
 * request on load and cannot be forged.
 *
 * On mount the provider tries to refresh: the access token lives in memory and
 * is gone after a reload, but the httpOnly refresh cookie survives, so a
 * returning user is signed back in without retyping anything.
 */
export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>("loading");
  const [user, setUser] = useState<AdminUser | null>(null);
  const router = useRouter();

  // Held in a ref so the effect below does not re-run when it changes.
  const clearRef = useRef(() => {});

  const clear = useCallback(() => {
    setAccessToken(null);
    setUser(null);
    setStatus("anonymous");
  }, []);

  clearRef.current = clear;

  useEffect(() => {
    setSessionLostHandler(() => clearRef.current());
    return () => setSessionLostHandler(null);
  }, []);

  /* Restore a session from the refresh cookie, once, on mount. */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await fetch("/api/admin/session/refresh", {
          method: "POST",
          credentials: "same-origin",
        });

        if (!response.ok) throw new Error("no session");

        const data = (await response.json()) as { accessToken: string };
        setAccessToken(data.accessToken);

        // The role is whatever the server says it is.
        const me = await apiFetch<AdminUser>("/api/auth/me");

        if (cancelled) return;
        setUser(me);
        setStatus("authenticated");
      } catch {
        if (cancelled) return;
        setAccessToken(null);
        setStatus("anonymous");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    let response: Response;

    try {
      response = await fetch("/api/admin/session/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, password }),
      });
    } catch {
      throw new Error(
        "Could not reach the server. Check your connection and try again.",
      );
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      // The API answers identically for an unknown address and a wrong
      // password, so this wording cannot be used to discover which accounts
      // exist. It is passed through rather than rewritten.
      throw new Error(data?.message ?? "Invalid email or password.");
    }

    setAccessToken(data.accessToken);

    try {
      // The role and identity come from the server, never from decoding the
      // token here: a JWT payload is readable and editable by whoever holds it.
      const me = await apiFetch<AdminUser>("/api/auth/me");
      setUser(me);
      setStatus("authenticated");
    } catch (caught) {
      // Credentials were right but the account could not be loaded — most
      // likely it was deactivated between issuing the token and reading it.
      // Leaving the token set would look signed in and fail on every request.
      setAccessToken(null);
      setUser(null);
      setStatus("anonymous");

      throw new Error(
        caught instanceof Error && caught.message
          ? caught.message
          : "Signed in, but your account could not be loaded.",
      );
    }
  }, []);

  const signOut = useCallback(async () => {
    const { getAccessToken } = await import("./api");
    const token = getAccessToken();

    await fetch("/api/admin/session/logout", {
      method: "POST",
      credentials: "same-origin",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    }).catch(() => {
      // Signing out locally must not depend on the network.
    });

    clear();
    router.replace("/admin/login");
  }, [clear, router]);

  const value = useMemo<SessionValue>(
    () => ({ status, user, role: user?.role ?? null, signIn, signOut }),
    [status, user, signIn, signOut],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used inside the admin SessionProvider.");
  }

  return context;
}
