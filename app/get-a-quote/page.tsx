import Features from "@/components/Features/Features";
import Footer from "@/components/Footer/Footer";
import GetQuoteSection from "@/components/Quote/GetQuoteSection";
import React from "react";

const QuotePage = () => {
  return (
    <div>
      <GetQuoteSection />
      <Features />
      <Footer />
    </div>
  );
};

export default QuotePage;
