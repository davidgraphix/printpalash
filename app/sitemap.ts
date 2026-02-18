import type { MetadataRoute } from "next";

const baseUrl = "https://printpalash.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        "",
        "/about",
        "/products",
        "/blog",
        "/get-a-quote",
        "/track-order",
        "/contact",
        "/privacy",
        "/terms",
        "/money-back",
        "/product-specification",
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.7,
    }));
}
