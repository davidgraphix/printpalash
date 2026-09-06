"use client";

import { useState } from "react";
import { ExternalLink, Paperclip, X } from "lucide-react";

import { Button, Input } from "@/components/admin/ui/primitives";
import { useToast } from "@/components/admin/ui/feedback";
import { ApiError } from "@/lib/admin/api";
import { FileUpload } from "@/components/admin/FileUpload";
import { orders } from "@/lib/admin/resources";
import type { OrderItem } from "@/lib/admin/types";

/**
 * The print-ready artwork for one line.
 *
 * Every staff role can set this, because the specification puts artwork proofs
 * in the Production Manager's hands and they hold no other write access on an
 * order. The server enforces that the value is an http(s) address — the job
 * card prints it as a clickable link, so a script URI here would be a payload
 * waiting for a click.
 *
 * It records where the file is rather than storing the file. That is what the
 * schema has always held and what the job card has always printed, and it
 * matches how the business already exchanges artwork over WhatsApp and email.
 */
export function ArtworkLink({
  orderId,
  item,
  onChanged,
}: {
  orderId: string;
  item: OrderItem;
  onChanged: () => void;
}) {
  const toast = useToast();

  const [editing, setEditing] = useState(false);
  const [url, setUrl] = useState(item.artworkFileUrl ?? "");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function save(next: string | null) {
    setError(null);
    setBusy(true);

    try {
      await orders.updateArtwork(orderId, item.id, next);
      toast.success(next ? "Artwork attached." : "Artwork removed.");
      setEditing(false);
      onChanged();
    } catch (caught) {
      // The server's wording is the useful one here — it names the rule.
      setError(caught instanceof ApiError ? caught.message : "Could not save that.");
    } finally {
      setBusy(false);
    }
  }

  if (editing) {
    return (
      <div className="mt-2 flex flex-col gap-2 rounded-md bg-gray-50 p-2.5">
        <Input
          label="Artwork link"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          error={error ?? undefined}
          placeholder="https://drive.google.com/…"
          hint="Where the print-ready file lives. Printed on the job card."
          autoFocus
        />

        {/* Upload sits beside the field rather than replacing it: staff
            already exchange artwork over WhatsApp and email, and pasting a
            link is often quicker than a file picker. */}
        <FileUpload
          kind="artwork"
          label="Upload artwork"
          onUploaded={(uploaded) => {
            setUrl(uploaded);
            void save(uploaded);
          }}
        />

        <div className="flex flex-wrap gap-2">
          <Button size="sm" loading={busy} onClick={() => save(url.trim() || null)}>
            Save
          </Button>
          <Button
            size="sm"
            variant="secondary"
            disabled={busy}
            onClick={() => {
              setUrl(item.artworkFileUrl ?? "");
              setError(null);
              setEditing(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  if (!item.artworkFileUrl) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="mt-1 inline-flex w-fit items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800"
      >
        <Paperclip className="h-3 w-3" aria-hidden="true" />
        Attach artwork
      </button>
    );
  }

  return (
    <div className="mt-1 flex flex-wrap items-center gap-2">
      <a
        href={item.artworkFileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-w-0 items-center gap-1.5 text-xs text-blue-800 hover:underline"
      >
        <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
        <span className="truncate">{fileName(item.artworkFileUrl)}</span>
      </a>

      <button
        type="button"
        onClick={() => setEditing(true)}
        className="text-xs text-gray-500 hover:text-gray-800"
      >
        Change
      </button>

      <button
        type="button"
        disabled={busy}
        onClick={() => save(null)}
        aria-label="Remove artwork"
        className="text-gray-400 hover:text-red-700 disabled:opacity-50"
      >
        <X className="h-3 w-3" aria-hidden="true" />
      </button>
    </div>
  );
}

/**
 * The last path segment, so a long storage URL does not push the layout wide.
 * The full address is still the link target and its title.
 */
function fileName(url: string): string {
  try {
    const path = new URL(url).pathname;
    const last = decodeURIComponent(path.split("/").filter(Boolean).pop() ?? "");
    return last || url;
  } catch {
    return url;
  }
}
