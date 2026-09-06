"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { Button, Skeleton } from "@/components/admin/ui/primitives";
import { useSession } from "@/lib/admin/session";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

/**
 * The signed-in frame: guard, sidebar, top bar, content.
 *
 * The guard is a convenience, not the security boundary. It decides what to
 * render; the backend decides what a request is allowed to do, and re-checks on
 * every call regardless of what this component drew. Someone who types a URL
 * gets the screen and then a 403 from the API, which is the correct outcome.
 */
export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);

  /* Close the drawer whenever the route changes. */
  useEffect(() => setNavOpen(false), [pathname]);

  useEffect(() => {
    if (status !== "anonymous") return;

    // Carry where they were going, so signing in lands them there rather than
    // dumping them on the overview.
    const next = encodeURIComponent(pathname);
    router.replace(`/admin/login?next=${next}`);
  }, [status, pathname, router]);

  if (status === "loading") return <BootSkeleton />;

  // The redirect above is in flight. Rendering the app for an unauthenticated
  // user, even for a frame, would flash data that is not theirs.
  if (status === "anonymous") return <BootSkeleton />;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />

      <div className="lg:pl-60">
        <Topbar onOpenNav={() => setNavOpen(true)} />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

/** The frame, before we know who is looking at it. */
function BootSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-60 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white">
        <div className="h-14 border-b border-gray-200 px-4 py-4">
          <Skeleton className="h-5 w-36" />
        </div>
        <div className="flex flex-col gap-2 p-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-7 w-full" />
          ))}
        </div>
      </div>

      <div className="lg:pl-60">
        <div className="h-14 border-b border-gray-200 bg-white" />
        <div className="flex flex-col gap-4 p-4 lg:p-6">
          <Skeleton className="h-7 w-52" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

/**
 * Signed in, but not allowed here.
 *
 * Deliberately not a redirect to login: the user's session is perfectly valid,
 * and bouncing them to a sign-in form for a permission problem invites them to
 * try credentials that will not help. Exported for screens that need it once
 * the API answers 403.
 */
export function Forbidden({
  message = "Your role does not have access to this section.",
}: {
  message?: string;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-16 text-center">
      <p className="font-heading text-lg font-extrabold text-gray-900">
        You do not have access to this
      </p>
      <p className="text-sm text-gray-600">{message}</p>
      <p className="text-sm text-gray-600">
        If you think that is wrong, ask a Super Admin to check your role.
      </p>
      {/* A link, styled as a button — nesting an anchor inside a <button> is
          invalid markup and breaks keyboard navigation. */}
      <Link
        href="/admin"
        className="mt-2 inline-flex h-9 items-center rounded-md border border-gray-300 bg-white px-3.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        Back to the dashboard
      </Link>
    </div>
  );
}
