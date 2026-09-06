"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { cx } from "@/components/admin/ui/primitives";
import { useSession } from "@/lib/admin/session";
import { visibleSections } from "./navigation";

/**
 * The admin's primary navigation.
 *
 * A fixed rail on desktop, a dismissible drawer below `lg`. Denser than the
 * marketing site's nav on purpose: this is a tool someone has open all day, and
 * the whole structure should be visible without scrolling.
 *
 * Sections whose screens are not built yet render as disabled text rather than
 * links. That is the honest state — the backend for most of them exists, the UI
 * does not — and it is better than a link to an empty page.
 */
export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { role } = useSession();
  const sections = visibleSections(role);

  return (
    <>
      {/* Scrim, mobile only. Clicking it closes the drawer. */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-gray-900/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/*
        Shown or hidden outright rather than slid off-screen with a transform.
        The translate approach left the drawer sitting over the content on
        mobile — the utility applied but its transform did not survive the
        cascade — and a navigation panel covering the page is a worse bug than
        a missing slide animation is a loss.
      */}
      <nav
        aria-label="Admin sections"
        className={cx(
          "fixed inset-y-0 left-0 z-40 w-60 flex-col border-r border-gray-200 bg-white",
          "lg:flex",
          open ? "flex" : "hidden",
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-gray-200 px-4">
          <Link
            href="/admin"
            className="font-heading text-sm font-extrabold tracking-tight text-gray-900"
          >
            PrintPalash
            <span className="ml-1.5 rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              Admin
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-3">
          {sections.map((section, index) => (
            <div key={section.heading ?? index} className={index > 0 ? "mt-5" : undefined}>
              {section.heading && (
                <p className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  {section.heading}
                </p>
              )}

              <ul className="flex flex-col gap-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active =
                    pathname === item.href ||
                    (item.href !== "/admin" && pathname.startsWith(item.href));

                  if (item.pending) {
                    return (
                      <li key={item.href}>
                        <span
                          className="flex cursor-not-allowed items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-gray-400"
                          title="This screen has not been built yet."
                        >
                          <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                          <span className="truncate">{item.label}</span>
                          <span className="ml-auto text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                            Soon
                          </span>
                        </span>
                      </li>
                    );
                  }

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={cx(
                          "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
                          active
                            ? "bg-red-50 text-red-700"
                            : "text-gray-700 hover:bg-gray-100",
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span className="truncate">{item.label}</span>
                      </Link>

                      {active && item.children && (
                        <ul className="mb-1 ml-6 mt-0.5 flex flex-col gap-0.5 border-l border-gray-200 pl-3">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className="block rounded px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="shrink-0 border-t border-gray-200 px-4 py-2.5">
          <Link
            href="/"
            className="text-xs text-gray-500 underline-offset-2 hover:text-gray-900 hover:underline"
          >
            View the public site
          </Link>
        </div>
      </nav>
    </>
  );
}
