import Image from "next/image";
import trustedBrand1 from "@/public/assests/trusted-brands-img/HERNICKY 1.svg";
import trustedBrand2 from "@/public/assests/trusted-brands-img/IITA 1.svg";
import trustedBrand3 from "@/public/assests/trusted-brands-img/kehnnies brand.svg";
import trustedBrand4 from "@/public/assests/trusted-brands-img/MASTERCARD 1.svg";
import trustedBrand5 from "@/public/assests/trusted-brands-img/REFLECTION 1.svg";
import trustedBrand6 from "@/public/assests/trusted-brands-img/ROSEWOOD CARGO LOGO 1.svg";

export default function TrustedBrands() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nigeria's No. 1 Online Print KING 👑
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our print services and solutions are trusted by these brands and
            more other businesses in Nigeria.
          </p>
        </div>

        {/* Brand Logos */}
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
          <div className=" hover:grayscale-0 transition-all duration-300">
            <Image
              src={trustedBrand1}
              alt="IITA - Transforming African Agriculture"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </div>
          <div className=" hover:grayscale-0 transition-all duration-300">
            <Image
              src={trustedBrand2}
              alt="Mastercard Foundation"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </div>
          <div className=" hover:grayscale-0 transition-all duration-300">
            <Image
              src={trustedBrand3}
              alt="Kkwhnnies Naturals"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </div>
          <div className=" hover:grayscale-0 transition-all duration-300">
            <Image
              src={trustedBrand4}
              alt="Reflection Universe"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </div>
          <div className=" hover:grayscale-0 transition-all duration-300">
            <Image
              src={trustedBrand5}
              alt="Hernicky"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </div>
          <div className=" hover:grayscale-0 transition-all duration-300">
            <Image
              src={trustedBrand6}
              alt="Northwood Cargo Services"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
