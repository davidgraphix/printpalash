"use client";

import Link from "next/link";
import { KeyRound } from "lucide-react";

import { Badge, Button, Card } from "@/components/admin/ui/primitives";
import { Field, PageHeader } from "@/components/admin/ui/table";
import { API_BASE_URL, ROLE_LABELS, can } from "@/lib/admin/config";
import { dateTime } from "@/lib/admin/format";
import { useSession } from "@/lib/admin/session";

/**
 * Settings.
 *
 * There is no settings API, so there are no settings to change here — and
 * inventing toggles that write nowhere would be worse than the honest gap. What
 * this page does instead is answer the questions people actually open a
 * settings screen to ask: who am I signed in as, what may I do, where is this
 * connected, and how do I change my password.
 *
 * Everything shown comes from the live session or from build-time
 * configuration. Nothing is a placeholder.
 */
export default function SettingsPage() {
  const { user, role, signOut } = useSession();

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Settings" description="Your account, and how this dashboard is wired up." />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Your account">
          <dl className="flex flex-col gap-3">
            <Field label="Name">{user?.fullName ?? "—"}</Field>
            <Field label="Email">{user?.email ?? "—"}</Field>
            <Field label="Role">
              {role ? ROLE_LABELS[role] : "—"}{" "}
              {role && <Badge tone="info">{role}</Badge>}
            </Field>
            <Field label="Last signed in">
              {user?.lastLoginAt ? dateTime(user.lastLoginAt) : "This is your first session"}
            </Field>
          </dl>

          <div className="mt-4 border-t border-gray-100 pt-3">
            <Button variant="secondary" size="sm" onClick={signOut}>
              Sign out
            </Button>
          </div>
        </Card>

        <Card title="What your role allows">
          <ul className="flex flex-col gap-2 text-sm">
            <Permission allowed={can.anyStaff(role)}>
              View orders, job cards and production stages
            </Permission>
            <Permission allowed={can.salesOrAbove(role)}>
              Create orders, record payments, edit customers and products
            </Permission>
            <Permission allowed={can.viewFinancials(role)}>
              See costs, margins, revenue and the payments ledger
            </Permission>
            <Permission allowed={can.managePricing(role)}>
              Set prices and approve a flagged one
            </Permission>
            <Permission allowed={can.superAdminOnly(role)}>
              Manage staff, delete records, read the audit log
            </Permission>
          </ul>

          <p className="mt-3 border-t border-gray-100 pt-3 text-xs text-gray-500">
            These are decided by the server on every request. This list describes
            them; it does not enforce them.
          </p>
        </Card>
      </div>

      <Card title="Password">
        <div className="flex items-start gap-2.5">
          <KeyRound className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" aria-hidden="true" />
          <div className="text-sm">
            <p className="text-gray-900">
              There is no self-service password change or reset yet.
            </p>
            <p className="mt-1 text-gray-600">
              A Super Admin can create you a new account with a fresh password from{" "}
              <Link href="/admin/staff" className="text-red-700 hover:underline">
                Staff &amp; roles
              </Link>
              . Building a real reset flow means sending email, which is a
              deliberate next step rather than something to fake with a form that
              does nothing.
            </p>
          </div>
        </div>
      </Card>

      <Card title="Session &amp; security">
        <dl className="flex flex-col gap-3">
          <Field label="Access token">
            Held in memory only — never in localStorage, so a cross-site script
            cannot read it. It is gone when you close the tab.
          </Field>
          <Field label="Refresh token">
            An httpOnly, Secure, SameSite=Lax cookie scoped to /api/admin.
            JavaScript cannot read it, and it is replaced every time it is used.
          </Field>
          <Field label="Signing out">
            Clears the cookie server-side, so the token cannot be reused even if
            it were captured.
          </Field>
        </dl>
      </Card>

      <Card title="Connection">
        <dl className="flex flex-col gap-3">
          <Field label="API">
            <span className="font-mono text-xs">{API_BASE_URL}</span>
          </Field>
          <Field label="Search engines">
            The whole admin area sends <span className="font-mono text-xs">noindex, nofollow</span>.
          </Field>
        </dl>
      </Card>
    </div>
  );
}

function Permission({
  allowed,
  children,
}: {
  allowed: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-2">
      <span
        aria-hidden="true"
        className={
          allowed
            ? "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600"
            : "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300"
        }
      />
      <span className={allowed ? "text-gray-900" : "text-gray-400 line-through"}>
        {children}
      </span>
      <span className="sr-only">{allowed ? "allowed" : "not allowed"}</span>
    </li>
  );
}
