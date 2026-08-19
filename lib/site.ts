/**
 * Single source of truth for PrintPalash business information.
 *
 * Everything here is verified from the existing project (header, contact page,
 * layout schema). Nothing in this file is invented — if a value is not known it
 * is simply absent rather than guessed, because it feeds structured data that
 * Google reads as factual claims about the business.
 */

export const SITE_URL = "https://printpalash.com";

/**
 * Digits-only international format, used to build wa.me and tel: links.
 *
 * DATA REVIEW: `app/contact/page.tsx` previously displayed
 * "+234 703 901 7359" while the header, layout JSON-LD and every WhatsApp link
 * used "+234 703 501 7359". The latter is used consistently across the
 * codebase, so it is treated as canonical here. Confirm with the business
 * before publishing anything that depends on the other number.
 */
export const PHONE_E164 = "+2347035017359";
export const PHONE_DIGITS = "2347035017359";
export const PHONE_DISPLAY = "+234 703 501 7359";
export const WHATSAPP_NUMBER = PHONE_DIGITS;

export const SITE = {
  name: "PrintPalash",
  legalName: "Print Palash Studios",
  url: SITE_URL,
  description:
    "PrintPalash is a printing, branding and packaging company in Lagos, Nigeria producing flyers, business cards, paper bags, packaging boxes, banners, branded apparel, invitations and corporate stationery.",
  logo: `${SITE_URL}/assests/printpalash-logo.png`,
  ogImage: `${SITE_URL}/opengraph-image`,
  locale: "en_NG",
  currency: "NGN",
  phone: {
    e164: PHONE_E164,
    display: PHONE_DISPLAY,
    digits: PHONE_DIGITS,
  },
  email: "depalashltd@gmail.com",
  address: {
    streetAddress: "29 Shipeolu Street, Elediye Roundabout, Onipanu",
    addressLocality: "Shomolu",
    addressRegion: "Lagos",
    addressCountry: "NG",
  },
  /** Displayed on the site header; used for openingHoursSpecification. */
  openingHours: {
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ] as const,
    opens: "08:00",
    closes: "20:00",
    display: "Monday to Saturday, 8:00AM - 8:00PM",
    /** Just the times, for the compact header block. */
    hoursShort: "8:00AM - 8:00PM",
    daysShort: "Monday to Saturday",
  },
  /**
   * Only profiles that are actually referenced by the business are listed.
   * LinkedIn and X entries that previously appeared here were unverified
   * guesses and have been removed — add them back only once the real handles
   * are confirmed.
   */
  socialProfiles: [
    "https://www.instagram.com/print_palash",
    "https://www.facebook.com/share/1CXJmcKExu/",
  ],
  /** Google Maps listing linked from the footer. */
  mapsUrl: "https://maps.app.goo.gl/R4baNsY7v71JPG3Z9",
  areaServed: ["Lagos", "Nigeria"],
  /** Free shipping threshold shown in the top bar. */
  freeShippingThreshold: 1_000_000,
} as const;

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID || "G-5FVE57VNGR";

/** Absolute URL helper — keeps canonicals and JSON-LD consistent. */
export function absoluteUrl(path = ""): string {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Builds a wa.me link with a pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds a `mailto:` link against the centralised business address.
 *
 * Used by the "Get a quote" CTAs so the email address lives in exactly one
 * place. Line breaks in `body` are encoded, which is what mail clients expect.
 */
export function mailtoLink(subject: string, body: string): string {
  const params = new URLSearchParams({ subject, body });
  // URLSearchParams encodes spaces as "+", which mail clients render literally
  // in the subject line, so switch those back to %20.
  return `mailto:${SITE.email}?${params.toString().replace(/\+/g, "%20")}`;
}
