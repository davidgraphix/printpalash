import Link from "next/link";
import { SERVICES } from "@/lib/services";

export const metadata = {
    title: "Printing Services in Lagos | Print Palash Studios",
    description:
        "Explore printing services in Lagos: business cards, flyers, banners, stickers, roll-up banners, brochures, packaging, T-shirts and more.",
};

export default function ServicesPage() {
    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-12 max-w-5xl">
                <h1 className="font-biorhyme text-3xl md:text-4xl font-extrabold text-gray-900">
                    Printing Services in Lagos
                </h1>
                <p className="mt-3 text-gray-700">
                    Select a service to see options, turnaround time and how to order.
                </p>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {SERVICES.map((s) => (
                        <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="rounded-xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-sm transition"
                        >
                            <div className="font-semibold text-gray-900">{s.title}</div>
                            <div className="mt-2 text-sm text-gray-600">{s.description}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
