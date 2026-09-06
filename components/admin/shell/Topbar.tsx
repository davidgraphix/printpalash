"use client";

import { useEffect, useRef, useState } from "react";
import { LogOut, Menu } from "lucide-react";

import { Button, cx } from "@/components/admin/ui/primitives";
import { ROLE_LABELS } from "@/lib/admin/config";
import { useSession } from "@/lib/admin/session";

/**
 * The admin's top bar: the menu toggle on small screens, and who is signed in.
 *
 * The role is shown next to the name deliberately. Half the confusion in a
 * role-based tool is somebody wondering why a button is missing, and naming the
 * role answers that before it is asked.
 */
export default function Topbar({ onOpenNav }: { onOpenNav: () => void }) {
  const { user, signOut } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* Close on an outside click or Escape — expected of any menu. */
  useEffect(() => {
    if (!menuOpen) return;

    function onPointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const initials = (user?.fullName ?? "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-gray-200 bg-white px-4">
      <button
        type="button"
        onClick={onOpenNav}
        className="rounded p-1.5 text-gray-600 hover:bg-gray-100 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="ml-auto" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          className="flex items-center gap-2 rounded-md px-1.5 py-1 text-left hover:bg-gray-100"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white"
          >
            {initials || "?"}
          </span>

          <span className="hidden sm:block">
            <span className="block text-xs font-semibold leading-tight text-gray-900">
              {user?.fullName ?? "Signed in"}
            </span>
            <span className="block text-[11px] leading-tight text-gray-500">
              {user ? ROLE_LABELS[user.role] : ""}
            </span>
          </span>
        </button>

        <div
          role="menu"
          className={cx(
            "absolute right-4 mt-1 w-56 rounded-lg border border-gray-200 bg-white p-1 shadow-lg",
            menuOpen ? "block" : "hidden",
          )}
        >
          <div className="border-b border-gray-100 px-2.5 py-2">
            <p className="truncate text-xs font-semibold text-gray-900">
              {user?.fullName}
            </p>
            <p className="truncate text-[11px] text-gray-500">{user?.email}</p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            role="menuitem"
            onClick={() => {
              setMenuOpen(false);
              void signOut();
            }}
            className="mt-1 w-full justify-start"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
}
