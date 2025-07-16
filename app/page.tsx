import Hero from "@/components/Home/Hero";
import Features from "@/components/Features/Features";
import PopularProducts from "@/components/Products/PopularProducts";
import TrustedBrands from "@/components/Trusted-Brands/TrustedBrands";
import Testimonials from "@/components/Testimonials/Testimonials";
import Footer from "@/components/Footer/Footer";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <PopularProducts />
      <TrustedBrands />
      <Testimonials />
      <Footer />
    </div>
  );
}
