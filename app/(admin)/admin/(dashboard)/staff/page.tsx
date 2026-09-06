"use client";

import { useState } from "react";
import { Plus, ShieldAlert } from "lucide-react";

import { Badge, Button, Input } from "@/components/admin/ui/primitives";
import { Modal, useToast } from "@/components/admin/ui/feedback";
import { Column, DataTable, PageHeader } from "@/components/admin/ui/table";
import { ApiError } from "@/lib/admin/api";
import { ROLE_LABELS, ROLES, type Role } from "@/lib/admin/config";
import { dateTime, relative } from "@/lib/admin/format";
import { useQuery } from "@/lib/admin/hooks";
import { staff } from "@/lib/admin/resources";
import { useSession } from "@/lib/admin/session";
import type { StaffMember } from "@/lib/admin/types";

/** The backend's UserRole enum, which the create and role endpoints take. */
const ROLE_VALUES: Record<Role, number> = {
  SuperAdmin: 0,
  SalesRep: 1,
  ProductionManager: 2,
};

const ROLE_ORDER: Role[] = ["SuperAdmin", "SalesRep", "ProductionManager"];

export default function StaffPage() {
  const { user } = useSession();
  const toast = useToast();

  const { data, error, loading, reload } = useQuery((signal) => staff.list({}, signal), []);

  const [creating, setCreating] = useState(false);
  const [changing, setChanging] = useState<{ member: StaffMember; active: boolean } | null>(null);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);

  async function setActive() {
    if (!changing) return;

    if (reason.trim().length < 4) {
      toast.error("Say why — it goes into the audit log.");
      return;
    }

    setBusy(true);

    try {
      await staff.setActive(changing.member.id, changing.active, reason.trim());
      toast.success(
        changing.active
          ? `${changing.member.fullName} can sign in again.`
          : `${changing.member.fullName} can no longer sign in.`,
      );
      setChanging(null);
      setReason("");
      reload();
    } catch (caught) {
      // The server refuses self-deactivation and removing the last Super Admin.
      toast.error(caught instanceof ApiError ? caught.message : "Could not change that.");
    } finally {
      setBusy(false);
    }
  }

  async function changeRole(member: StaffMember, role: Role) {
    setBusy(true);

    try {
      await staff.setRole(member.id, ROLE_VALUES[role]);
      toast.success(`${member.fullName} is now a ${ROLE_LABELS[role]}.`);
      reload();
    } catch (caught) {
      toast.error(caught instanceof ApiError ? caught.message : "Could not change the role.");
    } finally {
      setBusy(false);
    }
  }

  const columns: Column<StaffMember>[] = [
    {
      header: "Person",
      cell: (row) => (
        <div className="min-w-0">
          <p className="truncate font-medium text-gray-900">
            {row.fullName}
            {row.id === user?.id && (
              <span className="ml-1.5 text-xs font-normal text-gray-500">(you)</span>
            )}
          </p>
          <p className="truncate text-xs text-gray-500">{row.email}</p>
        </div>
      ),
    },
    {
      header: "Role",
      cell: (row) => (
        <select
          value={row.role}
          disabled={busy || row.id === user?.id}
          onChange={(event) => changeRole(row, event.target.value as Role)}
          aria-label={`Role for ${row.fullName}`}
          className="h-8 rounded-md border border-gray-300 bg-white px-2 text-xs disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
          title={
            row.id === user?.id
              ? "You cannot change your own role — ask another Super Admin."
              : undefined
          }
        >
          {ROLE_ORDER.map((role) => (
            <option key={role} value={role}>
              {ROLE_LABELS[role]}
            </option>
          ))}
        </select>
      ),
    },
    {
      header: "Access",
      cell: (row) =>
        row.isActive ? <Badge tone="success">Active</Badge> : <Badge tone="neutral">Disabled</Badge>,
    },
    {
      header: "Last signed in",
      secondary: true,
      cell: (row) => (
        <span className="text-xs text-gray-600" title={dateTime(row.lastLoginAt)}>
          {row.lastLoginAt ? relative(row.lastLoginAt) : "Never"}
        </span>
      ),
    },
    {
      header: "",
      cell: (row) => (
        <div className="flex justify-end">
          <Button
            size="sm"
            variant={row.isActive ? "secondary" : "primary"}
            disabled={busy || row.id === user?.id}
            onClick={() => {
              setReason("");
              setChanging({ member: row, active: !row.isActive });
            }}
          >
            {row.isActive ? "Disable" : "Restore"}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Staff & roles"
        description="Who can sign in, and what each of them may do."
        actions={
          <Button size="sm" onClick={() => setCreating(true)}>
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            New account
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        {ROLE_ORDER.map((role) => (
          <div key={role} className="rounded-lg border border-gray-200 bg-white p-3">
            <p className="font-heading text-sm font-bold text-gray-900">{ROLE_LABELS[role]}</p>
            <p className="mt-0.5 text-xs text-gray-600">
              {role === "SuperAdmin" &&
                "Everything: pricing, financial reports, staff, deletions, the audit log."}
              {role === "SalesRep" &&
                "Orders, payments, customers and products — but not prices, costs or profit."}
              {role === "ProductionManager" &&
                "Job cards and production stages. No money, no customer contact details."}
            </p>
          </div>
        ))}
      </div>

      <DataTable
        columns={columns}
        rows={data ?? null}
        keyOf={(row) => row.id}
        loading={loading}
        error={error}
        onRetry={reload}
        empty={{ title: "No staff accounts" }}
      />

      <p className="flex items-start gap-1.5 text-xs text-gray-500">
        <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        Disabling an account or changing a role ends that person's session immediately —
        their refresh token is cleared, so they cannot keep working on an old one.
      </p>

      <CreateStaff
        open={creating}
        onClose={() => setCreating(false)}
        onCreated={() => {
          setCreating(false);
          reload();
        }}
      />

      {/* One dialog, not a confirm plus a form: the reason and the decision
          are the same act, and splitting them into two overlays would ask twice
          for one answer. */}
      {changing !== null && (
        <Modal
          open
          onClose={() => (busy ? undefined : setChanging(null))}
          title={changing.active ? "Restore access" : "Disable access"}
          description={changing.member.fullName}
          footer={
            <>
              <Button variant="secondary" size="sm" onClick={() => setChanging(null)} disabled={busy}>
                Cancel
              </Button>
              <Button
                variant={changing.active ? "primary" : "danger"}
                size="sm"
                loading={busy}
                onClick={setActive}
              >
                {changing.active ? "Restore access" : "Disable account"}
              </Button>
            </>
          }
        >
          <Input
            label="Reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder={changing.active ? "Back from leave" : "Left the company"}
            hint="Recorded in the audit log against this change."
            autoFocus
          />
        </Modal>
      )}
    </div>
  );
}

function CreateStaff({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}) {
  const toast = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>(ROLES.salesRep);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function create() {
    setError(null);

    if (password.length < 10) {
      setError("Use at least 10 characters.");
      return;
    }

    setBusy(true);

    try {
      await staff.create({
        email: email.trim(),
        fullName: fullName.trim(),
        password,
        role: ROLE_VALUES[role],
      });

      toast.success(`${fullName.trim()} can now sign in.`);
      setFullName("");
      setEmail("");
      setPassword("");
      onCreated();
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "Could not create the account.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={busy ? () => {} : onClose}
      title="New staff account"
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button size="sm" loading={busy} onClick={create}>
            Create account
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Full name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          autoFocus
        />

        <Input
          label="Email"
          type="email"
          autoComplete="off"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Input
          label="Temporary password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={error ?? undefined}
          hint="At least 10 characters. Share it with them directly — there is no reset flow yet."
        />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="new-staff-role" className="text-sm font-semibold text-gray-800">
            Role
          </label>
          <select
            id="new-staff-role"
            value={role}
            onChange={(event) => setRole(event.target.value as Role)}
            className="h-9 rounded-md border border-gray-300 bg-white px-2.5 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
          >
            {ROLE_ORDER.map((option) => (
              <option key={option} value={option}>
                {ROLE_LABELS[option]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Modal>
  );
}
