import Image from "next/image";
import trustedBrand1 from "@/public/assests/trusted-brands-img/MASTERCARD 1.svg";
import trustedBrand2 from "@/public/assests/trusted-brands-img/IITA 1.svg";
import trustedBrand3 from "@/public/assests/trusted-brands-img/pulse.png";
import trustedBrand4 from "@/public/assests/trusted-brands-img/RANK.png";
import trustedBrand5 from "@/public/assests/trusted-brands-img/yala.png";
import trustedBrand6 from "@/public/assests/trusted-brands-img/noblechi.png";
import trustedBrand7 from "@/public/assests/trusted-brands-img/REFLECTION 1.svg";
import trustedBrand8 from "@/public/assests/trusted-brands-img/kehnnies brand.svg";
import trustedBrand9 from "@/public/assests/trusted-brands-img/amana.png";
import trustedBrand10 from "@/public/assests/trusted-brands-img/lolytee catering services.png";
import trustedBrand11 from "@/public/assests/trusted-brands-img/ILE agoyinn.png";

const trustedBrands = [
  {
    image: trustedBrand1,
    alt: "Mastercard",
    className: "h-12 lg:h-16",
  },
  {
    image: trustedBrand2,
    alt: "IITA",
    className: "h-8 lg:h-12",
  },
  {
    image: trustedBrand3,
    alt: "Pulse",
    className: "h-8 lg:h-12",
  },
  {
    image: trustedBrand4,
    alt: "Rank",
    className: "h-6 lg:h-10",
  },
  {
    image: trustedBrand5,
    alt: "Yala",
    className: "h-6 lg:h-10",
  },
  {
    image: trustedBrand6,
    alt: "Noblechi",
    className: "h-8 lg:h-12",
  },
  {
    image: trustedBrand7,
    alt: "Reflection",
    className: "h-8 lg:h-12",
  },
  {
    image: trustedBrand8,
    alt: "Kehnnies Brand",
    className: "h-8 lg:h-12",
  },
  {
    image: trustedBrand9,
    alt: "Amana",
    className: "h-12 lg:h-16",
  },
  {
    image: trustedBrand10,
    alt: "Lolytee Catering Services",
    className: "h-12 lg:h-16",
  },
  {
    image: trustedBrand11,
    alt: "ILE Agoyinn",
    className: "h-12 lg:h-16",
  },
];

export default function TrustedBrands() {
  const repeatedBrands = [...trustedBrands, ...trustedBrands];

  return (
    <section className="overflow-hidden bg-gray-50 py-12 lg:py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center lg:mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 lg:text-3xl">
            Nigeria&apos;s Print KING 👑
          </h2>

          <p className="mx-auto max-w-2xl text-sm text-gray-600 lg:text-base">
            Our print services and solutions are trusted by these brands and
            many other businesses in Nigeria.
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-gray-50 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-gray-50 to-transparent" />

        <div className="flex w-max animate-trusted-brand-marquee items-center gap-10 lg:gap-16">
          {repeatedBrands.map((brand, index) => (
            <div
              key={`${brand.alt}-${index}`}
              className="flex h-24 min-w-[140px] items-center justify-center rounded-2xl px-2 shadow-sm transition-all duration-300 "
            >
              <Image
                src={brand.image}
                alt={brand.alt}
                width={140}
                height={70}
                className={`${brand.className} w-auto object-contain`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}