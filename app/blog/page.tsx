import type { Metadata } from "next";
import BlogSection from "@/components/Blog/BlogSection";
import Features from "@/components/Features/Features";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title:
    "Best Printing Company in Lagos for Packaging & Branding | PrintPalash",
  description:
    "Learn how to choose the best printing company in Lagos for packaging, branding, flyers, business cards, paper bags, T-shirts, souvenirs, and corporate printing.",
  alternates: {
    canonical: "https://printpalash.com/blog",
  },
  openGraph: {
    title:
      "Best Printing Company in Lagos for Packaging & Branding | PrintPalash",
    description:
      "A complete guide for businesses choosing a professional printing company in Lagos for packaging, branding, business printing, flyers, paper bags, and corporate materials.",
    url: "https://printpalash.com/blog",
    siteName: "PrintPalash",
    type: "article",
  },
};

export default function BlogPage() {
  return (
    <div>
      <BlogSection />
    </div>
  );
}