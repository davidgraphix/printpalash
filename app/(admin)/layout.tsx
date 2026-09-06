import type React from "react";
import type { Metadata } from "next";

import { ToastProvider } from "@/components/admin/ui/feedback";
import { SessionProvider } from "@/lib/admin/session";

/**
 * The admin route group.
 *
 * Sits beside `(site)` rather than inside it, so it inherits none of the public
 * chrome — no top bar, no marketing navigation, no WhatsApp button, no
 * site-wide JSON-LD, no analytics. The parentheses keep the group out of the
 * URL; these pages live at /admin.
 *
 * `noindex, nofollow` is set here rather than per page so a route added later
 * cannot be published to search engines by omission. robots.txt is a request;
 * this is the instruction that actually keeps a staff tool out of an index.
 */
export const metadata: Metadata = {
  title: {
    // Absolute, so the public layout template does not append " | PrintPalash"
    // to an internal tool. Child pages get the admin template instead.
    absolute: "PrintPalash Admin",
    template: "%s · PrintPalash Admin",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ToastProvider>{children}</ToastProvider>
    </SessionProvider>
  );
}
