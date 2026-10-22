"use client";

import { useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";

import { ApiError, getAccessToken } from "@/lib/admin/api";
import { API_BASE_URL } from "@/lib/admin/config";

/**
 * Uploads a file and hands back its address.
 *
 * The file goes to the PrintPalash API, which validates it on its own leading
 * bytes and forwards it to the file store with a server-side signature. No
 * credential reaches this component, and no upload happens that the server has
 * not agreed to.
 *
 * It sits beside the URL field rather than replacing it: the schema has always
 * stored an address, staff already exchange files over WhatsApp and email, and
 * a paste is often quicker than a picker. When the store is not configured the
 * server answers 503 and this says so, leaving the URL field working.
 */
export type UploadKind = "artwork" | "payment-proof" | "product-image";

/** What the picker offers. The server decides regardless, from the bytes. */
const ACCEPT: Record<UploadKind, string> = {
  artwork: ".pdf,.png,.jpg,.jpeg,.gif,.tif,.tiff,.eps,.cdr,.ai,.zip,.webp",
  "payment-proof": ".pdf,.png,.jpg,.jpeg,.gif,.tif,.tiff,.webp",
  // Narrower, matching the server: only what a browser renders in an img tag.
  // Offering a PDF here would let someone pick one and be refused for a reason
  // the file picker had implied was fine.
  "product-image": ".png,.jpg,.jpeg,.webp,.gif",
};

export function FileUpload({
  kind,
  onUploaded,
  label = "Upload a file",
}: {
  kind: UploadKind;
  /**
   * The stored address, and the store's own id for it. The id is what a later
   * replace or delete would need, so it is handed over even though the URL is
   * all the page needs to render.
   */
  onUploaded: (url: string, publicId: string) => void;
  label?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const accept = ACCEPT[kind];

  async function send(file: File) {
    setBusy(true);
    setError(null);

    const body = new FormData();
    body.append("file", file);

    try {
      // FormData sets its own multipart boundary, so no Content-Type here.
      const token = getAccessToken();

      const response = await fetch(`${API_BASE_URL}/api/uploads/${kind}`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        // The server's wording names the actual rule — the size limit, the
        // format, or the missing configuration.
        throw new ApiError(response.status, data?.message ?? "The upload failed.");
      }

      onUploaded(data.url as string, (data.publicId as string) ?? "");
    } catch (caught) {
      setError(
        caught instanceof ApiError
          ? caught.message
          : "Could not reach the server. Check your connection and try again.",
      );
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <input
        ref={input}
        type="file"
        accept={accept}
        className="sr-only"
        aria-label={label}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void send(file);
        }}
      />

      <button
        type="button"
        disabled={busy}
        onClick={() => input.current?.click()}
        className="inline-flex h-8 w-fit items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 text-xs font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-60"
      >
        {busy ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            Uploading…
          </>
        ) : (
          <>
            <Upload className="h-3.5 w-3.5" aria-hidden="true" />
            {label}
          </>
        )}
      </button>

      {error && (
        <p role="alert" className="text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
