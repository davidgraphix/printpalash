import Link from "next/link";
import type { Service } from "@/lib/services";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ServiceDetail({ service }: { service: Service }) {
    return (
        <div className="bg-white">
            {/* Header */}
            <section className="border-b bg-gradient-to-b from-pink-50 to-white">
                <div className="container mx-auto px-4 py-10 md:py-14">
                    <p className="text-sm font-semibold text-red-600">{service.category}</p>
                    <h1 className="mt-2 font-biorhyme text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                        {service.h1}
                    </h1>
                    <p className="mt-4 text-gray-700 md:text-lg max-w-3xl">{service.intro}</p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href="/get-a-quote"
                            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
                        >
                            Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                        >
                            Back to Services
                        </Link>
                    </div>

                    {/* Highlights */}
                    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {service.highlights.map((h) => (
                            <div key={h} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                                <div className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-red-600 mt-0.5" />
                                    <p className="text-sm font-semibold text-gray-900">{h}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="container mx-auto px-4 py-10 md:py-14">
                <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
                    {/* Main */}
                    <div className="space-y-8">
                        {service.sections.map((sec) => (
                            <div key={sec.heading} className="rounded-2xl border border-gray-100 p-6">
                                <h2 className="text-lg md:text-xl font-bold text-gray-900">{sec.heading}</h2>
                                <ul className="mt-4 space-y-2">
                                    {sec.body.map((line) => (
                                        <li key={line} className="text-gray-700 flex items-start gap-2">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-600" />
                                            <span className="leading-relaxed">{line}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* FAQ */}
                        <div className="rounded-2xl border border-gray-100 p-6">
                            <h2 className="text-lg md:text-xl font-bold text-gray-900">FAQs</h2>
                            <div className="mt-4 space-y-4">
                                {service.faqs.map((f) => (
                                    <div key={f.q} className="rounded-xl bg-gray-50 p-4">
                                        <p className="font-semibold text-gray-900">{f.q}</p>
                                        <p className="mt-1 text-sm text-gray-700 leading-relaxed">{f.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:sticky lg:top-6 h-fit rounded-2xl border border-gray-100 p-6 bg-white shadow-sm">
                        <p className="text-sm font-semibold text-gray-900">Need pricing?</p>
                        <p className="mt-2 text-sm text-gray-600">
                            Tell us your quantity, size, finishing, and deadline — we’ll send a quote.
                        </p>

                        <div className="mt-5 space-y-3">
                            <Link
                                href="/get-a-quote"
                                className="w-full inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
                            >
                                Get a Quote
                            </Link>
                            <Link
                                href="https://wa.me/2347035017359"
                                className="w-full inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                            >
                                WhatsApp
                            </Link>
                        </div>

                        <div className="mt-6 border-t pt-5">
                            <p className="text-xs font-semibold text-gray-500">Service URL</p>
                            <p className="mt-1 text-sm text-gray-900 break-words">
                                /services/{service.slug}
                            </p>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
}
