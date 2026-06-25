import Hero from "@/components/Home/Hero";
import Features from "@/components/Features/Features";
import PopularProducts from "@/components/Products/PopularProducts";
import TrustedBrands from "@/components/Trusted-Brands/TrustedBrands";
import Testimonials from "@/components/Testimonials/Testimonials";
import Footer from "@/components/Footer/Footer";
import HomeSEOSection from "@/components/Home/HomeSEOSection";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <PopularProducts />
      <HomeSEOSection />
      <Features />
      <TrustedBrands />
      <Testimonials />
      <Footer />
    </div>
  );
}
