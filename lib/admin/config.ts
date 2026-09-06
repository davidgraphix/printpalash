/**
 * Where the admin dashboard finds the backend.
 *
 * The only value the browser needs, and it is a public URL — no secret belongs
 * in this bundle. The JWT signing key, the database connection string and every
 * provider credential stay on the ASP.NET Core server.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5080";

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
