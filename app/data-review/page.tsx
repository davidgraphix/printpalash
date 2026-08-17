import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getDataReviewItems } from "@/lib/catalog/repository";

/**
 * Internal page listing every value that looked wrong in the supplied price
 * list and was preserved or withheld rather than guessed at.
 *
 * Development only — it 404s in production and is disallowed in robots.txt, so
 * it never reaches customers or search engines.
 */
export const metadata: Metadata = {
  title: "Catalogue data review",
  robots: { index: false, follow: false },
};

export default function DataReviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const items = getDataReviewItems();
  const unpublished = items.filter((item) => !item.published);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-extrabold text-gray-900">
        Catalogue data review
      </h1>
      <p className="mt-2 text-gray-600">
        {items.length} product{items.length === 1 ? "" : "s"} carry notes from
        transcribing the price list, {unpublished.length} of which are held back
        from the live site. Nothing here was silently corrected.
      </p>

      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li
            key={item.slug}
            className="rounded-xl border border-gray-200 p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-bold text-gray-900">{item.name}</h2>
              {!item.published && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
                  unpublished
                </span>
              )}
              {item.source && (
                <span className="text-xs text-gray-500">{item.source}</span>
              )}
            </div>

            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
              {item.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>

            {item.published && (
              <Link
                href={`/products/${item.slug}`}
                className="mt-2 inline-flex text-sm font-semibold text-red-600 hover:text-red-700"
              >
                View product page
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
