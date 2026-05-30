"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowUpRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { getAllProducts } from "@/lib/products-data";

type Slide = {
  titleRed: string;
  titleBlack: string;
  subtitle: string;
  description: React.ReactNode;
  image: string;
};

const SLIDES: Slide[] = [
  {
    titleRed: "Top Quality",
    titleBlack: "Fast Prints",
    subtitle: "shipped fast to your doorstep",
    description: (
      <>
        From Flyers, Jotters, Business Cards, Banners, T-Shirts &amp; More.{" "}
        <br />
        We Deliver Premium Print For Business And Personal Projects
        <br />
        <span className="text-red-600 italic">
          - Fast, Reliable &amp; Stress Free
        </span>
      </>
    ),
    image: "/assests/hero-slide-1.png",
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
        <span className="text-red-600 italic">
          - Fast, Reliable &amp; Stress Free
        </span>
      </>
    ),
    image: "/assests/hero-slide-2.png",
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
        <span className="text-red-600 italic">
          - Fast, Reliable &amp; Stress Free
        </span>
      </>
    ),
    image: "/assests/hero-slide-3.png",
  },
  {
    titleRed: " Custom",
    titleBlack: "Packaging Boxes",
    subtitle: "From concept to delivery, we've got you covered.",
    description: (
      <>
        Make your products stand out on the shelves with premium retail boxes.
        Designed for stunning visual impact, our rigid or folding cartons offer high-quality printing,
        sharp finishes, and flawless folding.
        <br />
        <span className="text-red-600 italic">
          - Fast, Reliable &amp; Stress Free
        </span>
      </>
    ),
    image: "/assests/hero-slide-4.png",
  },
];

export default function Hero() {
  const router = useRouter();

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
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  const allProducts = React.useMemo(() => getAllProducts(), []);

  const filteredProducts = React.useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return [];

    return allProducts
      .filter((product) => {
        return (
          product.name.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
        );
      })
      .slice(0, 6);
  }, [allProducts, searchTerm]);

  const showSearchResults =
    isSearchFocused && searchTerm.trim().length > 0;

  const scrollTo = React.useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const firstProduct = filteredProducts[0];

    if (firstProduct) {
      router.push(`/products/${firstProduct.slug}`);
      setSearchTerm("");
      setIsSearchFocused(false);
      return;
    }

    router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

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
      <div className="container mx-auto px-4">
        <div className="relative z-20 -mb-10 pt-4 lg:-mb-14 lg:pt-6">
          <p className="mb-2 text-sm font-semibold text-gray-900">
            Start Printing Today
          </p>

          <form onSubmit={handleSearchSubmit} className="relative max-w-md">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search for flyers, paper bag, business card..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-20 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-100"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-12 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-red-600"
                aria-label="Search products"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            {showSearchResults && (
              <div
                className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
                onMouseDown={(e) => e.preventDefault()}
              >
                {filteredProducts.length > 0 ? (
                  <>
                    <div className="border-b px-4 py-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                        Product results
                      </p>
                    </div>

                    <div className="max-h-[360px] overflow-y-auto">
                      {filteredProducts.map((product) => {
                        const productImage =
                          product.images?.[0] ||
                          product.image ||
                          "/placeholder.svg";

                        return (
                          <Link
                            key={product.slug}
                            href={`/products/${product.slug}`}
                            onClick={() => {
                              setSearchTerm("");
                              setIsSearchFocused(false);
                            }}
                            className="flex items-center gap-3 border-b px-4 py-3 transition last:border-b-0 hover:bg-red-50"
                          >
                            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                              <Image
                                src={productImage}
                                alt={product.name}
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3 className="truncate text-sm font-bold text-gray-900">
                                {product.name}
                              </h3>

                              <p className="truncate text-xs text-gray-500">
                                {product.category}
                              </p>

                              <p className="mt-1 text-sm font-black text-red-600">
                                Starting at ₦
                                {product.priceNumeric.toLocaleString()}
                              </p>
                            </div>

                            <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-gray-400" />
                          </Link>
                        );
                      })}
                    </div>

                    <Link
                      href={`/products?search=${encodeURIComponent(
                        searchTerm.trim()
                      )}`}
                      onClick={() => setIsSearchFocused(false)}
                      className="block bg-gray-50 px-4 py-3 text-center text-sm font-bold text-red-600 transition hover:bg-red-50"
                    >
                      View all matching products
                    </Link>
                  </>
                ) : (
                  <div className="px-4 py-6 text-center">
                    <p className="text-sm font-bold text-gray-800">
                      No product found
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Try searching for flyers, bags, business cards, banners,
                      shirts, or brochures.
                    </p>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {SLIDES.map((s, i) => (
              <div
                key={i}
                className="min-w-0 flex-[0_0_100%] pb-2 pt-16 lg:pb-2 lg:pt-8"
              >
                <div className="hidden grid-cols-2 items-center gap-10 lg:grid">
                  <div>
                    <h1 className="font-biorhyme text-[96px] font-extrabold leading-[0.95] tracking-[0%]">
                      <span className="text-7xl text-red-600">
                        {s.titleRed}
                      </span>
                      <br />
                      <span className="text-6xl text-black">
                        {s.titleBlack}
                      </span>
                    </h1>

                    <p className="mt-3 text-base text-gray-700">
                      {s.subtitle}
                    </p>

                    <div className="mt-8 max-w-lg text-[16px] leading-6 text-gray-600">
                      {s.description}
                    </div>
                  </div>

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

                <div className="lg:hidden">
                  <div className="mt-1">
                    <h2 className="font-biorhyme text-[42px] font-extrabold leading-[1]">
                      <span className="text-4xl text-red-600">
                        {s.titleRed}
                      </span>{" "} <br />
                      <span className="text-3xl text-black">
                        {s.titleBlack}
                      </span>
                    </h2>

                    <p className="mt-2 text-sm text-gray-700">{s.subtitle}</p>

                    <div className="mt-4 text-[11px] leading-5 text-gray-600">
                      {s.description}
                    </div>

                    <div className="relative mt-6 aspect-[4/3] w-full">
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