"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import ProductSearch from "@/components/Products/ProductSearch";
import type { SearchIndexEntry } from "@/lib/catalog/search-index";

type Slide = {
  titleRed: string;
  titleBlack: string;
  subtitle: string;
  description: React.ReactNode;
  image: string;
  imageAlt: string;
  ctaHref: string;
  ctaLabel: string;
};

const SLIDES: Slide[] = [
  {
    titleRed: "Top Quality",
    titleBlack: "Fast Prints",
    subtitle: "Shipped fast to your doorstep",
    description: (
      <>
        Flyers, jotters, business cards, banners, T-shirts and more. Premium
        print for business and personal projects.{" "}
        <span className="italic text-red-600">
          Fast, reliable and stress free.
        </span>
      </>
    ),
    image: "/assests/hero-slide-1.png",
    imageAlt:
      "Printed flyers, business cards and branded materials by PrintPalash",
    ctaHref: "/products",
    ctaLabel: "Browse all products",
  },
  {
    titleRed: "Quality",
    titleBlack: "T-Shirt Prints",
    subtitle: "Shipped fast to your doorstep",
    description: (
      <>
        Turn your ideas into wearable statements with custom T-shirt printing
        for businesses, churches, events and brands — clean prints, rich colours
        and durable fabrics.
      </>
    ),
    image: "/assests/hero-slide-2.png",
    imageAlt: "Custom printed T-shirts produced by PrintPalash",
    ctaHref: "/products/category/clothing-apparel",
    ctaLabel: "See branded apparel",
  },
  {
    titleRed: "Tradeshow/",
    titleBlack: "Exhibitions",
    subtitle: "Stand out. Get noticed. Win attention.",
    description: (
      <>
        Roll-up banners, pop-up backdrops, gazebo tents and flags built to make
        your stand the one people walk towards.
      </>
    ),
    image: "/assests/hero-slide-3.png",
    imageAlt: "Roll-up banners and exhibition backdrop printed by PrintPalash",
    ctaHref: "/products/category/banners-large-format",
    ctaLabel: "See banners & large format",
  },
  {
    titleRed: "Custom",
    titleBlack: "Packaging Boxes",
    subtitle: "From concept to delivery, we have you covered.",
    description: (
      <>
        Make your products stand out on the shelf with rigid and folding cartons
        — high-quality printing, sharp finishes and flawless folding.
      </>
    ),
    image: "/hero-slide-4.png",
    imageAlt: "Custom printed packaging boxes produced by PrintPalash",
    ctaHref: "/products/category/box-packaging",
    ctaLabel: "See packaging & boxes",
  },
];

export default function Hero({
  searchEntries,
}: {
  searchEntries: SearchIndexEntry[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true }),
  ]);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

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
    <section className="bg-white" aria-label="Featured printing services">
      <div className="container mx-auto px-4">
        <div className="relative z-20 pt-4">
          <p className="mb-1.5 text-sm font-semibold text-gray-900">
            Start printing today
          </p>
          <ProductSearch entries={searchEntries} />
        </div>

        <div
          className="mt-4 w-full overflow-hidden"
          ref={emblaRef}
          aria-roledescription="carousel"
        >
          <div className="flex">
            {SLIDES.map((slide, index) => (
              <div
                key={slide.titleBlack}
                className="min-w-0 flex-[0_0_100%]"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${SLIDES.length}`}
              >
                <div className="grid items-center gap-6 py-4 lg:grid-cols-2 lg:gap-10 lg:py-6">
                  <div>
                    {/*
                      Only the first slide carries the page's h1. The rest are
                      h2s so the document has exactly one top-level heading —
                      and each slide is rendered once, not duplicated into
                      separate desktop and mobile blocks.
                    */}
                    {index === 0 ? (
                      <h1 className="font-heading text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                        <span className="text-red-600">{slide.titleRed}</span>
                        <br />
                        <span className="text-gray-950">
                          {slide.titleBlack}
                        </span>
                      </h1>
                    ) : (
                      <h2 className="font-heading text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                        <span className="text-red-600">{slide.titleRed}</span>
                        <br />
                        <span className="text-gray-950">
                          {slide.titleBlack}
                        </span>
                      </h2>
                    )}

                    <p className="mt-2.5 text-sm font-medium text-gray-700 lg:text-base">
                      {slide.subtitle}
                    </p>

                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-gray-600 lg:text-base">
                      {slide.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2.5">
                      <Link
                        href={slide.ctaHref}
                        className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
                      >
                        {slide.ctaLabel}
                      </Link>
                      <Link
                        href="/get-a-quote"
                        className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-900 transition hover:border-red-300 hover:text-red-600"
                      >
                        Get a quote
                      </Link>
                    </div>
                  </div>

                  <div className="order-first lg:order-none lg:flex lg:justify-end">
                    <div className="relative aspect-[4/3] w-full lg:aspect-[5/4] lg:max-w-[500px]">
                      <Image
                        src={slide.image}
                        alt={slide.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 500px"
                        className="object-contain"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 pb-5">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.titleBlack}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Show slide ${index + 1}: ${slide.titleRed} ${slide.titleBlack}`}
              aria-current={selectedIndex === index}
              className={`h-1 w-10 rounded-full transition-all ${
                selectedIndex === index ? "bg-gray-900" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
