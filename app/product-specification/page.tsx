import Features from "@/components/Features";
import Footer from "@/components/Footer";
import ProductDetails from "@/components/ProductDetails";
import React from "react";

const productSpecification = () => {
  return (
    <>
      <ProductDetails slug={""} />
      <Features />
      <Footer />
    </>
  );
};

export default productSpecification;
