import Image from "next/image";
import trustedBrand1 from "@/public/assests/trusted-brands-img/HERNICKY 1.svg";
import trustedBrand2 from "@/public/assests/trusted-brands-img/IITA 1.svg";
import trustedBrand3 from "@/public/assests/trusted-brands-img/kehnnies brand.svg";
import trustedBrand4 from "@/public/assests/trusted-brands-img/MASTERCARD 1.svg";
import trustedBrand5 from "@/public/assests/trusted-brands-img/REFLECTION 1.svg";
import trustedBrand6 from "@/public/assests/trusted-brands-img/ROSEWOOD CARGO LOGO 1.svg";

export default function TrustedBrands() {
  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Nigeria's No. 1 Online Print KING 👑
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm lg:text-base">
            Our print services and solutions are trusted by these brands and
            more other businesses in Nigeria.
          </p>
        </div>

        {/* Brand Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center items-center gap-8 lg:gap-12 xl:gap-16">
          <div className="flex justify-center hover:grayscale-0 transition-all duration-300">
            <Image
              src={trustedBrand4 || "/placeholder.svg"}
              alt="Master card foundation"
              width={120}
              height={60}
              className="h-8 lg:h-12 w-auto"
            />
          </div>
          <div className="flex justify-center hover:grayscale-0 transition-all duration-300">
            <Image
              src={trustedBrand2 || "/placeholder.svg"}
              alt="IITA"
              width={120}
              height={60}
              className="h-8 lg:h-12 w-auto"
            />
          </div>
          <div className="flex justify-center hover:grayscale-0 transition-all duration-300">
            <Image
              src={trustedBrand3 || "/placeholder.svg"}
              alt="Kehnnies Naturals"
              width={120}
              height={60}
              className="h-8 lg:h-12 w-auto"
            />
          </div>

          <div className="flex justify-center hover:grayscale-0 transition-all duration-300">
            <Image
              src={trustedBrand1 || "/placeholder.svg"}
              alt="IITA - Transforming African Agriculture"
              width={120}
              height={60}
              className="h-8 lg:h-12 w-auto"
            />
          </div>

          <div className="flex justify-center hover:grayscale-0 transition-all duration-300">
            <Image
              src={trustedBrand5 || "/placeholder.svg"}
              alt="Hernicky"
              width={120}
              height={60}
              className="h-10 lg:h-15 w-auto"
            />
          </div>
          <div className="flex justify-center hover:grayscale-0 transition-all duration-300">
            <Image
              src={trustedBrand6 || "/placeholder.svg"}
              alt="Northwood Cargo Services"
              width={120}
              height={60}
              className="h-8 lg:h-12 w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
