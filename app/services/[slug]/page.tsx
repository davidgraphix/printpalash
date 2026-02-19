import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES } from "@/lib/services";

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) return {};

    const url = `https://printpalash.com/services/${service.slug}`;

    return {
        title: service.metaTitle,
        description: service.description,
        alternates: { canonical: url },
        openGraph: {
            title: service.metaTitle,
            description: service.description,
            url,
            type: "website",
            siteName: "Print Palash Studios",
        },
    };
}

export default function ServicePage({ params }: Props) {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) notFound();

    const pageUrl = `https://printpalash.com/services/${service.slug}`;

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
    };

    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.h1,
        provider: {
            "@type": "LocalBusiness",
            name: "Print Palash Studios",
            url: "https://printpalash.com",
            telephone: "+2347035017359",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Lagos",
                addressCountry: "NG",
            },
            areaServed: "Lagos",
        },
        areaServed: "Lagos",
        serviceType: service.title,
        url: pageUrl,
    };

    return (
        <div className="bg-white">
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
            />

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <nav className="text-sm text-gray-600 mb-6">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/services" className="hover:underline">Services</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900">{service.title}</span>
                </nav>

                <h1 className="font-biorhyme text-3xl md:text-4xl font-extrabold text-gray-900">
                    {service.h1}
                </h1>

                <p className="mt-4 text-gray-700 leading-relaxed">{service.intro}</p>

                <div className="mt-10 space-y-10">
                    {service.sections.map((sec) => (
                        <section key={sec.heading}>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                                {sec.heading}
                            </h2>
                            <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700">
                                {sec.body.map((line) => (
                                    <li key={line}>{line}</li>
                                ))}
                            </ul>
                        </section>
                    ))}

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                            FAQs
                        </h2>
                        <div className="mt-4 space-y-4">
                            {service.faqs.map((f) => (
                                <div key={f.q} className="rounded-lg border border-gray-200 p-4">
                                    <h3 className="font-semibold text-gray-900">{f.q}</h3>
                                    <p className="mt-2 text-gray-700">{f.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="pt-6 flex flex-col sm:flex-row gap-3">
                        <Link
                            href="/get-a-quote"
                            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
                        >
                            Get a Quote
                        </Link>
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-900 hover:bg-gray-50"
                        >
                            Browse Products
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
