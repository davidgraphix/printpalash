import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import Footer from "@/components/Footer/Footer";
import JsonLd from "@/components/SEO/JsonLd";
import { PHONE_DISPLAY, PHONE_E164, SITE, whatsappLink } from "@/lib/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us — Printing Company in Shomolu, Lagos",
  description: `Reach PrintPalash at ${SITE.address.streetAddress}, ${SITE.address.addressLocality}, Lagos. Call ${PHONE_DISPLAY} or message us on WhatsApp. Open ${SITE.openingHours.display}.`,
  path: "/contact",
  keywords: [
    "printing company Lagos contact",
    "printer in Shomolu Lagos",
    "PrintPalash address",
  ],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-10 lg:py-14">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-3xl font-extrabold text-gray-900 lg:text-4xl">
              Contact PrintPalash
            </h1>
            <p className="mt-2 max-w-2xl text-gray-600">
              Talk to us about a print job, get a quote, or come to the shop.
              WhatsApp is the fastest way to reach the team.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div className="space-y-5">
                <div className="flex gap-3">
                  <MapPin
                    aria-hidden
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600"
                  />
                  <div>
                    <h2 className="font-bold text-gray-900">Address</h2>
                    <address className="mt-0.5 not-italic leading-relaxed text-gray-600">
                      {SITE.address.streetAddress}
                      <br />
                      {SITE.address.addressLocality},{" "}
                      {SITE.address.addressRegion}, Nigeria
                    </address>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone
                    aria-hidden
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600"
                  />
                  <div>
                    <h2 className="font-bold text-gray-900">Phone</h2>
                    <a
                      href={`tel:${PHONE_E164}`}
                      className="mt-0.5 block text-gray-600 hover:text-red-600"
                    >
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Mail
                    aria-hidden
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600"
                  />
                  <div>
                    <h2 className="font-bold text-gray-900">Email</h2>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="mt-0.5 block break-all text-gray-600 hover:text-red-600"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock
                    aria-hidden
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600"
                  />
                  <div>
                    <h2 className="font-bold text-gray-900">Opening hours</h2>
                    <p className="mt-0.5 text-gray-600">
                      {SITE.openingHours.display}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h2 className="text-lg font-extrabold text-gray-900">
                  Send us your job
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                  Tell us what you are printing, the quantity and your deadline.
                  Send artwork if you have it — if you do not, our team can
                  design it for you.
                </p>

                <div className="mt-5 space-y-2.5">
                  <a
                    href={whatsappLink(
                      "Hello PrintPalash, I would like to talk about a printing job."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700"
                  >
                    <FaWhatsapp aria-hidden className="text-lg" />
                    Message us on WhatsApp
                  </a>

                  <Link
                    href="/get-a-quote"
                    className="flex w-full items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                  >
                    Request a quote
                  </Link>

                  <Link
                    href="/products"
                    className="flex w-full items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-bold text-gray-900 transition hover:border-red-300 hover:text-red-600"
                  >
                    Browse products and prices
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
