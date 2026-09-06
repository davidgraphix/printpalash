"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { Badge, Button, Input } from "@/components/admin/ui/primitives";
import { ConfirmDialog, Modal, useToast } from "@/components/admin/ui/feedback";
import { Column, DataTable, PageHeader } from "@/components/admin/ui/table";
import { ApiError } from "@/lib/admin/api";
import { can } from "@/lib/admin/config";
import { useQuery } from "@/lib/admin/hooks";
import { brands } from "@/lib/admin/resources";
import { useSession } from "@/lib/admin/session";
import type { Brand } from "@/lib/admin/types";

export default function BrandsPage() {
  const { role } = useSession();
  const toast = useToast();
  const mayEdit = can.superAdminOnly(role);

  const { data, error, loading, reload } = useQuery((signal) => brands.list(signal), []);

  const [editing, setEditing] = useState<Brand | "new" | null>(null);
  const [deleting, setDeleting] = useState<Brand | null>(null);
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!deleting) return;
    setBusy(true);

    try {
      await brands.remove(deleting.id);
      toast.success(`${deleting.name} deleted.`);
      setDeleting(null);
      reload();
    } catch (caught) {
      // Refused while products still carry it — the foreign key would silently
      // unbrand a whole shelf otherwise.
      toast.error(caught instanceof ApiError ? caught.message : "Could not delete it.");
      setDeleting(null);
    } finally {
      setBusy(false);
    }
  }

  const columns: Column<Brand>[] = [
    {
      header: "Brand",
      cell: (row) => (
        <div className="min-w-0">
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="truncate font-mono text-xs text-gray-500">/{row.slug}</p>
        </div>
      ),
    },
    {
      header: "Visibility",
      cell: (row) =>
        row.isPublished ? (
          <Badge tone="success">Published</Badge>
        ) : (
          <Badge tone="neutral">Hidden</Badge>
        ),
    },
    { header: "Products", numeric: true, cell: (row) => row.productCount.toLocaleString() },
    {
      header: "",
      cell: (row) =>
        mayEdit && (
          <div className="flex justify-end gap-1">
            <button
              type="button"
              onClick={() => setEditing(row)}
              className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              aria-label={`Edit ${row.name}`}
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setDeleting(row)}
              className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-700"
              aria-label={`Delete ${row.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Brands"
        description="Optional on a product. A hidden brand's name is withheld from the public page."
        actions={
          mayEdit && (
            <Button size="sm" onClick={() => setEditing("new")}>
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              New brand
            </Button>
          )
        }
      />

      <DataTable
        columns={columns}
        rows={data ?? null}
        keyOf={(row) => row.id}
        loading={loading}
        error={error}
        onRetry={reload}
        empty={{ title: "No brands yet" }}
      />

      <BrandForm
        value={editing}
        onClose={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          reload();
        }}
      />

      <ConfirmDialog
        open={deleting !== null}
        busy={busy}
        destructive
        title="Delete this brand?"
        message={
          deleting && deleting.productCount > 0
            ? `${deleting.name} is still on ${deleting.productCount} product(s). The server will ` +
              "refuse this rather than quietly unbranding them."
            : `${deleting?.name} will be removed permanently.`
        }
        confirmLabel="Delete brand"
        onCancel={() => setDeleting(null)}
        onConfirm={remove}
      />
    </div>
  );
}

function BrandForm({
  value,
  onClose,
  onSaved,
}: {
  value: Brand | "new" | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const toast = useToast();
  const existing = value !== "new" && value !== null ? value : null;

  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [lastId, setLastId] = useState<string | null>(null);
  const currentId = existing?.id ?? (value === "new" ? "new" : null);

  if (currentId !== lastId) {
    setLastId(currentId);
    setName(existing?.name ?? "");
    setLogoUrl(existing?.logoUrl ?? "");
    setIsPublished(existing?.isPublished ?? true);
    setError(null);
  }

  async function save() {
    if (name.trim().length < 2) {
      setError("Give the brand a name.");
      return;
    }

    setBusy(true);
    setError(null);

    const body = {
      name: name.trim(),
      logoUrl: logoUrl.trim() || null,
      logoPublicId: existing?.logoPublicId ?? null,
      isPublished,
    };

    try {
      if (existing) await brands.update(existing.id, body);
      else await brands.create(body);

      toast.success(existing ? "Brand updated." : "Brand created.");
      onSaved();
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal
      open={value !== null}
      onClose={busy ? () => {} : onClose}
      title={existing ? `Edit ${existing.name}` : "New brand"}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button size="sm" loading={busy} onClick={save}>
            {existing ? "Save changes" : "Create brand"}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={error ?? undefined}
          autoFocus
        />

        <Input
          label="Logo URL"
          value={logoUrl}
          onChange={(event) => setLogoUrl(event.target.value)}
          placeholder="/assests/brand-logo.png"
          hint="A path on this site. Cloudinary hosting comes in a later phase."
        />

        <label className="flex items-start gap-2.5">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(event) => setIsPublished(event.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
          />
          <span className="text-sm">
            <span className="font-semibold text-gray-800">Show on the public site</span>
            <span className="block text-gray-500">
              When off, the brand name is withheld from product pages.
            </span>
          </span>
        </label>
      </div>
    </Modal>
  );
}
