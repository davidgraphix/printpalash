"use client";

import type React from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Spinner } from "@/components/admin/ui/primitives";
import { useSession } from "@/lib/admin/session";

/**
 * The frame for printable documents.
 *
 * Deliberately not the dashboard shell: a sidebar and a top bar have no place
 * on a sheet of A4, and a document opened in a new tab to be printed should
 * contain the document and nothing else.
 *
 * The auth check is the same one the dashboard uses, and for the same reason —
 * it decides what to render, not what is permitted. The invoice endpoint
 * requires SalesOrAbove and the job card requires staff; both are enforced by
 * the API on every request, whatever this component draws.
 */
export default function PrintLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status !== "anonymous") return;
    router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
  }, [status, pathname, router]);

  if (status !== "authenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Spinner className="h-6 w-6 text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white">
      {/*
        A4 at 96dpi is 794px wide. The sheet is that width on screen too, so
        what is on screen is what comes out of the printer rather than a
        surprise at the paper stage.
      */}
      <style>{`
        @page { size: A4; margin: 12mm; }
        @media print {
          html, body { background: #fff !important; }
          .no-print { display: none !important; }
          .sheet { width: auto !important; margin: 0 !important; padding: 0 !important;
                   box-shadow: none !important; border: 0 !important; }
          /* Keep a table row and its sub-lines together across a page break. */
          tr, .keep-together { break-inside: avoid; page-break-inside: avoid; }
          thead { display: table-header-group; }
        }
      `}</style>
      {children}
    </div>
  );
}
