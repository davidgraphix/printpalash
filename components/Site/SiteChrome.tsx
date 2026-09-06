import type React from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

import TopBar from "@/components/Home/Topbar";
import Header from "@/components/Home/Header";
import Navbar from "@/components/Navbar/Navbar";
import WhatsAppButton from "@/components/Chat-with-us/WhatsappButton";
import JsonLd from "@/components/SEO/JsonLd";
import { buildSearchIndex } from "@/lib/catalog/search-index";
import { GA_MEASUREMENT_ID } from "@/lib/site";
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

/**
 * The public website's chrome: top bar, header, navigation, WhatsApp button,
 * site-wide structured data and analytics.
 *
 * Lifted out of the root layout when the admin area was added, because layouts
 * nest and an admin dashboard would otherwise have inherited the marketing
 * site's navigation. The markup is unchanged — same components, same order.
 *
 * It is a component rather than only a layout because two places need it and
 * neither is inside the other:
 *
 *   app/(site)/layout.tsx  every public page
 *   app/not-found.tsx      unmatched URLs, which never enter the (site) group
 *                          and so are not covered by its layout
 *
 * Without the second, a 404 rendered bare — no header, no navigation, no way
 * back into the site from the one page a lost visitor is most likely to land on.
 */
export default function SiteChrome({
  children,
  withSearch = true,
}: {
  children: React.ReactNode;
  /**
   * Whether to render the header, which carries the catalogue search box.
   *
   * Off for the root 404. Next includes the root not-found boundary in the
   * payload of every page, so anything it imports is serialised on every
   * request — building the search index there added 115 KB to each of the 152
   * public pages. The 404 keeps the top bar, the navigation and the WhatsApp
   * button, and offers its own category links instead of a search box.
   */
  withSearch?: boolean;
}) {
  // Built once on the server and handed to the header search box, which is
  // rendered on every route (including product detail pages).
  const searchEntries = withSearch ? buildSearchIndex() : null;

  return (
    <>
      {/*
        Site-wide entities. Page-level Product, Breadcrumb and FAQ blocks are
        emitted by the individual routes.
      */}
      <JsonLd
        data={[organizationJsonLd(), localBusinessJsonLd(), websiteJsonLd()]}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-red-600 focus:px-4 focus:py-2 focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>

      <TopBar />
      {searchEntries && <Header searchEntries={searchEntries} />}
      <Navbar />

      <main id="main-content">{children}</main>

      <WhatsAppButton />
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </>
  );
}
