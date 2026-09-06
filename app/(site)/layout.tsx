import type React from "react";

import SiteChrome from "@/components/Site/SiteChrome";

/**
 * The public website.
 *
 * `(site)` is a route group: the parentheses keep it out of the URL, so every
 * public address is exactly what it was before the admin area existed. The
 * chrome itself lives in <see cref="SiteChrome" /> because the root 404 needs
 * it too, and that page is never inside this group.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteChrome>{children}</SiteChrome>;
}
