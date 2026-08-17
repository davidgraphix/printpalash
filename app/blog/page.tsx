import type { Metadata } from "next";

import BlogSection from "@/components/Blog/BlogSection";
import JsonLd from "@/components/SEO/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How to Choose a Printing Company in Lagos",
  description:
    "A practical guide to choosing a printing company in Lagos for packaging, branding, flyers, business cards, paper bags and corporate materials — what to check before you commit to a print run.",
  path: "/blog",
  type: "article",
  keywords: [
    "best printing company in Lagos",
    "how to choose a printer Lagos",
    "printing guide Nigeria",
  ],
});

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <BlogSection />
    </>
  );
}
