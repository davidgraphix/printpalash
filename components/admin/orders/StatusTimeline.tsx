"use client";

import { OrderStatusBadge } from "@/components/admin/ui/badges";
import { EmptyState } from "@/components/admin/ui/primitives";
import { dateTime, spaced } from "@/lib/admin/format";
import type { OrderStatusHistoryEntry } from "@/lib/admin/types";

/**
 * Every status this order has been through, and who moved it.
 *
 * Append-only on the server, so this is a record rather than a summary. Newest
 * first: the current state is what somebody opening the order wants first, and
 * the history is there if they keep reading.
 */
export function StatusTimeline({ entries }: { entries: OrderStatusHistoryEntry[] }) {
  if (entries.length === 0) {
    return <EmptyState title="No history yet" />;
  }

  const newestFirst = [...entries].reverse();

  return (
    <ol className="flex flex-col">
      {newestFirst.map((entry, index) => (
        <li key={`${entry.createdAt}-${index}`} className="flex gap-3">
          {/* The rail: a dot per event, joined by a line that stops at the last. */}
          <div className="flex flex-col items-center pt-1">
            <span
              className={
                index === 0
                  ? "h-2 w-2 rounded-full bg-red-600"
                  : "h-2 w-2 rounded-full bg-gray-300"
              }
              aria-hidden="true"
            />
            {index < newestFirst.length - 1 && (
              <span className="w-px flex-1 bg-gray-200" aria-hidden="true" />
            )}
          </div>

          <div className="flex-1 pb-4 last:pb-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <OrderStatusBadge status={entry.toStatus} />
              {entry.fromStatus && (
                <span className="text-xs text-gray-500">
                  from {spaced(entry.fromStatus).toLowerCase()}
                </span>
              )}
            </div>

            <p className="mt-0.5 text-xs text-gray-500">
              {dateTime(entry.createdAt)} · {entry.changedBy}
            </p>

            {entry.note && (
              <p className="mt-1 text-sm text-gray-700">{entry.note}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
