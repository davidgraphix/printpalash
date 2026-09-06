"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { Button, Card, Input } from "@/components/admin/ui/primitives";
import { ConfirmDialog, Modal, useToast } from "@/components/admin/ui/feedback";
import { Column, DataTable, PageHeader } from "@/components/admin/ui/table";
import { ApiError } from "@/lib/admin/api";
import { can } from "@/lib/admin/config";
import { useQuery } from "@/lib/admin/hooks";
import { categories } from "@/lib/admin/resources";
import { useSession } from "@/lib/admin/session";
import type { Category } from "@/lib/admin/types";

export default function CategoriesPage() {
  const { role } = useSession();
  const toast = useToast();
  const mayEdit = can.superAdminOnly(role);

  const { data, error, loading, reload } = useQuery((signal) => categories.list(signal), []);

  const [editing, setEditing] = useState<Category | "new" | null>(null);
  const [deleting, setDeleting] = useState<Category | null>(null);
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!deleting) return;
    setBusy(true);

    try {
      await categories.remove(deleting.id);
      toast.success(`${deleting.name} deleted.`);
      setDeleting(null);
      reload();
    } catch (caught) {
      // The backend refuses while products still belong to it and says how
      // many — far more useful than a generic failure.
      toast.error(caught instanceof ApiError ? caught.message : "Could not delete it.");
      setDeleting(null);
    } finally {
      setBusy(false);
    }
  }

  const columns: Column<Category>[] = [
    {
      header: "Category",
      cell: (row) => (
        <div className="min-w-0">
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="truncate font-mono text-xs text-gray-500">/{row.slug}</p>
        </div>
      ),
    },
    {
      header: "Tagline",
      secondary: true,
      cell: (row) => <span className="text-gray-600">{row.tagline ?? "—"}</span>,
    },
    { header: "Products", numeric: true, cell: (row) => row.productCount.toLocaleString() },
    {
      header: "Published",
      numeric: true,
      secondary: true,
      cell: (row) => row.publishedProductCount.toLocaleString(),
    },
    { header: "Order", numeric: true, secondary: true, cell: (row) => row.sortOrder },
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
        title="Categories"
        description="How the catalogue is grouped on the public site."
        actions={
          mayEdit && (
            <Button size="sm" onClick={() => setEditing("new")}>
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              New category
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
        empty={{ title: "No categories yet" }}
      />

      <CategoryForm
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
        title="Delete this category?"
        message={
          deleting && deleting.productCount > 0
            ? `${deleting.name} still has ${deleting.productCount} product(s). The server will ` +
              "refuse this until they are moved — every product must belong to a category."
            : `${deleting?.name} will be removed permanently.`
        }
        confirmLabel="Delete category"
        onCancel={() => setDeleting(null)}
        onConfirm={remove}
      />
    </div>
  );
}

function CategoryForm({
  value,
  onClose,
  onSaved,
}: {
  value: Category | "new" | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const toast = useToast();
  const existing = value !== "new" && value !== null ? value : null;

  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Reset the fields whenever a different record opens.
  const [lastId, setLastId] = useState<string | null>(null);
  const currentId = existing?.id ?? (value === "new" ? "new" : null);

  if (currentId !== lastId) {
    setLastId(currentId);
    setName(existing?.name ?? "");
    setTagline(existing?.tagline ?? "");
    setDescription(existing?.description ?? "");
    setSortOrder(String(existing?.sortOrder ?? 0));
    setError(null);
  }

  async function save() {
    if (name.trim().length < 2) {
      setError("Give the category a name.");
      return;
    }

    setBusy(true);
    setError(null);

    const body = {
      name: name.trim(),
      tagline: tagline.trim() || null,
      description: description.trim() || null,
      sortOrder: Number(sortOrder) || 0,
    };

    try {
      if (existing) await categories.update(existing.id, body);
      else await categories.create(body);

      toast.success(existing ? "Category updated." : "Category created.");
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
      title={existing ? `Edit ${existing.name}` : "New category"}
      description={
        existing
          ? "The URL stays as it is — it is in the sitemap and search engines have indexed it."
          : undefined
      }
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button size="sm" loading={busy} onClick={save}>
            {existing ? "Save changes" : "Create category"}
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
          label="Tagline"
          value={tagline}
          onChange={(event) => setTagline(event.target.value)}
          hint="One short line, shown on category cards."
        />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="category-description" className="text-sm font-semibold text-gray-800">
            Description
          </label>
          <textarea
            id="category-description"
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
          />
        </div>
        <Input
          label="Sort order"
          type="number"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
          hint="Lower numbers appear first."
        />
      </div>
    </Modal>
  );
}
