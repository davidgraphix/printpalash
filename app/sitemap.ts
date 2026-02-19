import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";

const baseUrl = "https://printpalash.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes = [
        "",
        "/about",
        "/products",
        "/services",
        "/blog",
        "/get-a-quote",
        "/track-order",
        "/contact",
        "/privacy",
        "/terms",
        "/money-back",
        "/product-specification",
    ];

    const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1 : 0.7,
    }));

    const serviceEntries: MetadataRoute.Sitemap = SERVICES.map((s) => ({
        url: `${baseUrl}/services/${s.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    return [...staticEntries, ...serviceEntries];
}
