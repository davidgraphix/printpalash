import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assests/about-image/about-bg-img.png"
            alt="Professional printing machine with colorful prints"
            fill
            sizes="100vw"
            className="object-cover opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              About Us
            </h1>
            <p className="text-white/80 text-sm md:text-base">
              More Than Printing. Brand Execution.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Intro */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nigeria&apos;s No. 1 Print King!
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              At PrintPalash.com, we believe that every idea deserves to be
              brought to life. As a proud division of De Palash Ltd., founded
              with a passion for creativity and a commitment to quality, we
              specialize in delivering top-notch print products to customers
              across the globe. Whether you&apos;re a business looking to make a
              statement, an individual celebrating a special moment, or a
              creative in need of the perfect materials, we&apos;re here to make
              your vision a reality.
            </p>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Journey: From Local to Global
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                What started as a small endeavor in Nigeria has rapidly
                transformed into a leading print service recognized for
                excellence and reliability. Our journey began with a simple
                mission: to provide high-quality print products that are
                accessible to everyone, no matter where you are. Through
                innovation, dedication, and a keen understanding of our
                customers&apos; needs, we&apos;ve built a brand synonymous with
                trust and excellence.
              </p>
            </div>
          </div>

          {/* Mission and Vision Cards (updated to match Brand Bible) */}
          <div className="bg-pink-50 py-16 mb-16 rounded-lg">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Mission */}
                <div className="bg-white rounded-lg shadow-md p-8 relative">
                  <div className="absolute -top-4 left-8">
                    <span className="bg-red-600 text-white px-6 py-2 rounded font-bold text-lg">
                      Brand Mission
                    </span>
                  </div>
                  <div className="pt-6">
                    <p className="text-gray-700 leading-relaxed text-center">
                      To deliver high-quality, fast, and strategic print
                      solutions that help brands communicate better, sell
                      smarter, and stand taller in competitive markets by
                      combining modern print technology, creative thinking, and
                      business understanding.
                    </p>
                  </div>
                </div>

                {/* Vision */}
                <div className="bg-white rounded-lg shadow-md p-8 relative">
                  <div className="absolute -top-4 left-8">
                    <span className="bg-red-600 text-white px-6 py-2 rounded font-bold text-lg">
                      Brand Vision
                    </span>
                  </div>
                  <div className="pt-6">
                    <p className="text-gray-700 leading-relaxed text-center">
                      To become Africa&apos;s leading print and brand execution
                      company, empowering businesses and individuals to present
                      themselves with confidence, clarity, and credibility —
                      everywhere they show up.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Brand Bible & Manifesto (NEW) */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              {/* Header strip */}
              <div className="bg-gray-900 px-6 md:px-10 py-8">
                <p className="text-white/70 text-sm font-semibold tracking-wide">
                  PRINT PALASH STUDIOS
                </p>
                <h2 className="text-2xl md:text-4xl font-extrabold text-white mt-2">
                  Brand Bible &amp; Manifesto
                </h2>
                <p className="text-white/80 mt-3 max-w-3xl leading-relaxed">
                  This document defines the vision, mission, values,
                  positioning, identity, and belief system of Print Palash
                  Studios. It exists to protect the brand, guide decisions, and
                  ensure long-term consistency as the company grows.
                </p>
              </div>

              <div className="px-6 md:px-10 py-10">
                {/* Purpose / Position / Identity / Story in cards */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Brand Position
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Print Palash Studios is positioned as a premium print and
                      brand execution partner. We do not compete on volume
                      alone; we compete on quality, strategy, and brand impact.
                      Our clients value how they are perceived, not just what
                      they print.
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Brand Purpose
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      To help brands show up right. We exist to close the gap
                      between ideas and execution, small businesses and
                      big-brand presence, and printing and real-world brand
                      perception. Every print must count.
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Brand Identity
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Bold. Professional. Intentional. Reliable. Print Palash
                      Studios represents confidence without noise, creativity
                      without chaos, and speed without disorder. Visually and
                      verbally, we speak for brands that want to be taken
                      seriously.
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Brand Story
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Print Palash Studios was born from the understanding that
                      great ideas often fail because they are poorly presented.
                      We saw brands lose credibility not for lack of vision, but
                      for lack of execution. So we built a studio where printing
                      becomes a tool for growth, reputation, and trust.
                    </p>
                  </div>
                </div>

                {/* Core Values */}
                <div className="mt-10">
                  <h3 className="text-xl font-extrabold text-gray-900 mb-4">
                    Core Values
                  </h3>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        title: "Excellence",
                        desc: "Every job must reflect professionalism, precision, and pride.",
                      },
                      {
                        title: "Speed with Integrity",
                        desc: "Fast delivery without shortcuts or compromised quality.",
                      },
                      {
                        title: "Partnership",
                        desc: "We build with our clients, not just for them.",
                      },
                      {
                        title: "Reliability",
                        desc: "Promises are kept. Deadlines are respected. Trust is protected.",
                      },
                      {
                        title: "Innovation",
                        desc: "We constantly evolve materials, processes, and presentation.",
                      },
                    ].map((v, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl bg-gray-50 border border-gray-200 p-5"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white font-bold">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="font-bold text-gray-900">{v.title}</p>
                            <p className="text-gray-700 text-sm leading-relaxed mt-1">
                              {v.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Manifesto */}
                <div className="mt-10 rounded-2xl bg-pink-50 border border-pink-100 p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-4">
                    The Print Palash Studios Manifesto
                  </h3>

                  <ul className="space-y-3 text-gray-800 leading-relaxed">
                    {[
                      "We believe printing is not just production — it is representation.",
                      "We believe every brand deserves to look as serious as its ambition.",
                      "We believe speed matters, but quality matters more.",
                      "We believe trust is built through consistency.",
                      "We believe print should sell, speak, and stand the test of time.",
                      "We are not here to be the cheapest.",
                      "We are here to be dependable.",
                      "We are Print Palash Studios.",
                    ].map((line, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-red-600 flex-shrink-0" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-6 border-t border-pink-200">
                    <p className="text-lg font-extrabold text-gray-900">
                      More Than Printing.{" "}
                      <span className="text-red-600">Brand Execution.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Why Choose Us?
            </h3>

            <div className="space-y-6">
              {[
                {
                  title: "Unmatched Quality:",
                  desc: "We use state-of-the-art technology and the finest materials to ensure every product meets the highest standards. Our prints are vibrant, durable, and crafted to perfection.",
                },
                {
                  title: "Global Reach:",
                  desc: "With our seamless online ordering system, you can access our services from anywhere in the world. No more barriers—just effortless printing at your fingertips.",
                },
                {
                  title: "Customer-Centric Approach:",
                  desc: "Our customers are at the heart of everything we do. From personalized service to quick turnaround times, we strive to make your experience smooth and enjoyable.",
                },
                {
                  title: "Innovative Solutions:",
                  desc: "We're not just about prints; we're about ideas. Our team is always ready to collaborate and offer creative solutions tailored to your specific needs.",
                },
                {
                  title: "Sustainability Commitment:",
                  desc: "We understand the importance of protecting our planet. That's why we incorporate eco-friendly practices in our printing processes, ensuring we contribute to a greener future.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-700">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Join the Family */}
          <div className="bg-gray-50 rounded-lg p-8 md:p-12 mb-16">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="relative">
                <div className="rounded-lg p-2 inline-block mb-4">
                  <div className="rounded p-4">
                    <Image
                      src="/assests/about-image/Group 22.png"
                      alt="Wooden figurines representing community and teamwork"
                      width={350}
                      height={400}
                      className="rounded"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Join the PrintPalash.com Family!
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  We&apos;re proud to be Nigeria&apos;s leading print service,
                  but our greatest achievement is the satisfaction of our
                  customers. When you choose PrintPalash.com, you&apos;re not
                  just ordering a product; you&apos;re joining a community that
                  values creativity, quality, and service. Let us help you
                  transform your ideas into reality, one print at a time.
                </p>
                <Link
                  href="/products"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
