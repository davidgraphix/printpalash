/**
 * Where the admin dashboard finds the backend.
 *
 * The only value the browser needs, and it is a public URL — no secret belongs
 * in this bundle. The JWT signing key, the database connection string and every
 * provider credential stay on the ASP.NET Core server.
 *
 * The localhost default is for development only and deliberately does not
 * survive a production build. NEXT_PUBLIC_* values are inlined at build time,
 * so a deploy missing this variable used to bake "http://localhost:5080" into
 * the bundle: every staff member's browser would try to reach a server on
 * their own machine, and the dashboard would report a network error that
 * blames their connection. An empty base is checked for instead, and the
 * failure says what is actually wrong.
 *
 * A trailing slash is trimmed because every call site appends a path that
 * begins with one, and "https://api.example.com//api/orders" is not the same
 * URL.
 */
export const LOCAL_API_FALLBACK = "http://localhost:5080";

/**
 * One address out of however many candidates, under one rule.
 *
 * Exported because the public order-tracking proxy resolves the same thing
 * from a different pair of variables, and two copies of "trim it, drop the
 * trailing slash, no localhost in production" would not stay the same for
 * long. This file is plain constants with no client directive, so a server
 * route can import it.
 *
 * Returns "" rather than a default when nothing is configured in production,
 * and callers check for that. The alternative — substituting localhost — is
 * what shipped a dashboard pointed at the visitor's own machine.
 */
export function resolveApiBaseUrl(
  candidates: (string | undefined)[],
  isProduction = process.env.NODE_ENV === "production",
): string {
  for (const candidate of candidates) {
    const trimmed = candidate?.trim().replace(/\/+$/, "");
    if (trimmed) return trimmed;
  }

  return isProduction ? "" : LOCAL_API_FALLBACK;
}

export const API_BASE_URL = resolveApiBaseUrl([process.env.NEXT_PUBLIC_API_URL]);

/** True when the build shipped without NEXT_PUBLIC_API_URL set. */
export const API_URL_MISSING = API_BASE_URL.length === 0;

export const API_URL_MISSING_MESSAGE =
  "This deployment has no API address configured. Set NEXT_PUBLIC_API_URL to " +
  "the backend's public URL and redeploy.";

/** Roles as the backend spells them, in the `role` field of `/api/auth/me`. */
export const ROLES = {
  superAdmin: "SuperAdmin",
  salesRep: "SalesRep",
  productionManager: "ProductionManager",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

/**
 * The four server-side authorization policies, mirrored so the UI can decide
 * what to show without guessing.
 *
 * This is a courtesy, never a boundary. The backend re-checks every one of
 * these on every request and answers 403 regardless of what the UI rendered —
 * hiding a button has never stopped anybody typing a URL.
 */
export const can = {
  /** Deletions, staff administration, reversing a payment, the audit log. */
  superAdminOnly: (role: Role | null | undefined) => role === ROLES.superAdmin,

  /** Creating orders, recording payments, editing products and customers. */
  salesOrAbove: (role: Role | null | undefined) =>
    role === ROLES.superAdmin || role === ROLES.salesRep,

  /** Anything a signed-in staff member may do. */
  anyStaff: (role: Role | null | undefined) =>
    role === ROLES.superAdmin ||
    role === ROLES.salesRep ||
    role === ROLES.productionManager,

  /** Changing prices and approving a flagged one. */
  managePricing: (role: Role | null | undefined) => role === ROLES.superAdmin,

  /** Costs, margin, revenue reports and the payments ledger. */
  viewFinancials: (role: Role | null | undefined) => role === ROLES.superAdmin,
} as const;

/** How a role is written where a person will read it. */
export const ROLE_LABELS: Record<Role, string> = {
  SuperAdmin: "Super Admin",
  SalesRep: "Sales Rep",
  ProductionManager: "Production Manager",
};
