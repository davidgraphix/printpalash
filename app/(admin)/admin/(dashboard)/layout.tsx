import type React from "react";

import AdminShell from "@/components/admin/shell/AdminShell";

/**
 * The signed-in area.
 *
 * This is a route group, not a path segment: the parentheses keep "(dashboard)"
 * out of the URL, so its page still answers at /admin. The point is that
 * /admin/login sits *beside* this group rather than inside it, and so is not
 * wrapped by the guard below — a login screen behind an auth guard redirects to
 * itself.
 */
export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
