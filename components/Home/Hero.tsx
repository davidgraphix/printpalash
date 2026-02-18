"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { Search } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import slide1Img from "@/public/assests/hero-slide-1.png";
import slide2Img from "@/public/assests/hero-slide-2.png";
import slide3Img from "@/public/assests/hero-slide-3.png";

type Slide = {
  titleRed: string;
  titleBlack: string;
  subtitle: string;
  description: React.ReactNode;
  image: StaticImageData;
};

const SLIDES: Slide[] = [
  {
    titleRed: "Top Quality",
    titleBlack: "Fast Prints",
    subtitle: "shipped fast to your doorstep",
    description: (
      <>
        From Flyers, Jotters, Business Cards, Banners, T-Shirts &amp; More. <br />
        We Deliver Premium Print For Business And Personal Projects
        <br />
        <span className="text-red-600 italic">- Fast, Reliable &amp; Stress Free</span>
      </>
    ),
    image: slide1Img,
  },
  {
    titleRed: "Quality",
    titleBlack: "T-shirt Prints",
    subtitle: "shipped fast to your doorstep",
    description: (
      <>
        Turn Your Ideas Into Wearable Statements With Our High-Quality Custom
        T-Shirt Printing. Whether It&apos;s For Businesses, Churches, Events,
        Brands, Or Personal Use, We Deliver Clean Prints, Rich Colors, And
        Durable Fabrics That Last.
        <br />
        <span className="text-red-600 italic">- Fast, Reliable &amp; Stress Free</span>
      </>
    ),
    image: slide2Img,
  },
  {
    titleRed: "Trade Show/",
    titleBlack: "Exhibition",
    subtitle: "Stand out. Get noticed. Win attention.",
    description: (
      <>
        Our Trade Show Printing Solutions Are Crafted To Help Brands And
        Businesses Present Themselves Professionally At Events, Exhibitions, And
        Promotional Campaigns.
        <br />
        <span className="text-red-600 italic">- Fast, Reliable &amp; Stress Free</span>
      </>
    ),
    image: slide3Img,
  },
];

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [
      Autoplay({
        delay: 10000,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollTo = React.useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="bg-white">
      <div className="container mx-auto px-8">
        <div className="relative z-10 -mb-10 lg:-mb-14 pt-4 -lg:pt-6">
          <p className="text-sm font-semibold text-gray-900 mb-2">
            Start Printing Today
          </p>

          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="search for flyers, paper bag, business card, e.t.c."
              className="w-full border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Carousel viewport */}
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex">
            {SLIDES.map((s, i) => (
              <div
                key={i}
                className="min-w-0 flex-[0_0_100%] pt-16 pb-2 lg:pt-8 lg:pb-2"
              >
                {/* DESKTOP */}
                <div className="hidden lg:grid grid-cols-2 gap-10 items-center">
                  {/* Left */}
                  <div>
                    <h1 className="font-biorhyme font-extrabold text-[96px] leading-[0.95] tracking-[0%]">
                      <span className="text-red-600 text-7xl">{s.titleRed}</span>
                      <br />
                      <span className="text-black text-6xl">{s.titleBlack}</span>
                    </h1>

                    <p className="mt-3 text-base text-gray-700">{s.subtitle}</p>

                    <div className="mt-8 text-[16px] leading-6 text-gray-600 max-w-lg">
                      {s.description}
                    </div>
                  </div>

                  {/* Right image */}
                  <div className="flex justify-end">
                    <div className="relative w-full max-w-[520px]">
                      <div className="relative aspect-[5/4] w-full">
                        <Image
                          src={s.image}
                          alt={`${s.titleRed} ${s.titleBlack}`}
                          fill
                          className="object-contain"
                          priority={i === 0}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* MOBILE */}
                <div className="lg:hidden">
                  <div className="mt-1">
                    <h2 className="font-biorhyme font-extrabold text-[42px] leading-[1]">
                      <span className="text-red-600 text-4xl">{s.titleRed}</span>{" "}
                      <span className="text-black text-3xl">{s.titleBlack}</span>
                    </h2>

                    <p className="mt-2 text-sm text-gray-700">{s.subtitle}</p>

                    <div className="mt-4 text-[11px] leading-5 text-gray-600">
                      {s.description}
                    </div>

                    <div className="mt-6 relative aspect-[4/3] w-full">
                      <Image
                        src={s.image}
                        alt={`${s.titleRed} ${s.titleBlack}`}
                        fill
                        className="object-contain"
                        priority={i === 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 pb-6">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={[
                "h-[3px] w-10 rounded-full transition-all",
                selectedIndex === i ? "bg-black" : "bg-gray-300",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
