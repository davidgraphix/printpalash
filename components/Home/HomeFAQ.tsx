import Link from "next/link";
import type { ProductFAQ } from "@/lib/catalog/types";
import { PHONE_DISPLAY, SITE } from "@/lib/site";

/**
 * Homepage FAQs.
 *
 * Every answer here is drawn from information the business already publishes
 * (price list turnaround times, opening hours, address, delivery terms). The
 * same array feeds the FAQPage JSON-LD on the homepage, so the markup and the
 * visible content can never drift apart.
 */
export const HOME_FAQS: ProductFAQ[] = [
  {
    question: "Where is PrintPalash located in Lagos?",
    answer: `PrintPalash is at ${SITE.address.streetAddress}, ${SITE.address.addressLocality}, Lagos. We are open ${SITE.openingHours.display}, and you can reach us on ${PHONE_DISPLAY}.`,
  },
  {
    question: "How fast can you print in Lagos?",
    answer:
      "It depends on the product. A5, A6 and DL flyers and letterheads are available for same-day delivery within Lagos. Business cards take 1-3 days, ID cards 1-2 working days, and branded apparel 2-5 days. Rigid packaging boxes take 10-12 working days because they are built and wrapped by hand.",
  },
  {
    question: "Do you deliver outside Lagos?",
    answer:
      "Yes. We deliver to other states in Nigeria, typically 2-4 working days after the Lagos turnaround for the same product. Each product page lists both the Lagos and the nationwide timeline.",
  },
  {
    question: "Are the prices on this website final?",
    answer:
      "No — every price shown is a starting price for the batch size listed next to it, not the price of a single item. Your final price depends on your artwork, the finishing you choose and your total quantity. We confirm it with you before production starts.",
  },
  {
    question: "Can PrintPalash design the artwork for me?",
    answer:
      "Yes. Send your logo, copy and any photographs and our team will produce the design before printing. If you already have print-ready artwork, we can work from that instead.",
  },
  {
    question: "What is the minimum order?",
    answer:
      "It varies by product. Caps, mugs, T-shirts and mousepads are sold per piece. Paper bags, flyers, brochures and envelopes are produced per 100. Tote bags, notebooks and lanyards are produced in batches of 10 or 50. Each product page states its batch size.",
  },
];

export default function HomeFAQ() {
  return (
    <section className="border-t bg-white py-10 lg:py-14">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-extrabold text-gray-900 lg:text-3xl">
            Printing in Lagos — common questions
          </h2>
          <p className="mt-1.5 text-gray-600">
            What customers ask us most before placing a first order.
          </p>

          <dl className="mt-5 space-y-3">
            {HOME_FAQS.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-gray-200 p-4"
              >
                <dt className="font-bold text-gray-900">{faq.question}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-gray-600">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 text-sm text-gray-600">
            Still deciding?{" "}
            <Link
              href="/services"
              className="font-bold text-red-600 hover:text-red-700"
            >
              Browse our printing services
            </Link>{" "}
            or{" "}
            <Link
              href="/get-a-quote"
              className="font-bold text-red-600 hover:text-red-700"
            >
              request a quote
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
