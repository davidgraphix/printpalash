"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Printer } from "lucide-react";

/**
 * The controls, which are not part of the document.
 *
 * `.no-print` removes them at the printer. "Save as PDF" is not a separate
 * button because it is not a separate action — it is a destination in the
 * browser's own print dialogue, and a button that opens the same dialogue while
 * implying a different outcome would be a lie about what happens next.
 */
export function PrintToolbar({
  title,
  backHref,
}: {
  title: string;
  backHref: string;
}) {
  const router = useRouter();

  return (
    <div className="no-print sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-[794px] flex-wrap items-center justify-between gap-2 px-4 py-2.5">
        <button
          type="button"
          onClick={() => router.push(backHref)}
          className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to the order
        </button>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-gray-500 sm:inline">
            Print, or choose "Save as PDF" in the dialogue.
          </span>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-8 items-center gap-1.5 rounded-md bg-red-700 px-3 text-xs font-semibold text-white hover:bg-red-800"
          >
            <Printer className="h-3.5 w-3.5" aria-hidden="true" />
            Print {title}
          </button>
        </div>
      </div>
    </div>
  );
}

/** The A4 sheet itself. */
export function Sheet({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto my-6 w-full max-w-[794px] px-4 print:my-0 print:max-w-none print:px-0">
      <div className="sheet bg-white p-8 shadow-sm ring-1 ring-gray-200 print:p-0 print:shadow-none print:ring-0">
        {children}
      </div>
    </div>
  );
}
