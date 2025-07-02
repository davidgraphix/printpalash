import Footer from "@/components/Footer";
import TermsAndConditions from "@/components/TermsAndConditionSection";
import TrustedBrands from "@/components/TrustedBrands";
import React from "react";

const page = () => {
  return (
    <div>
      <TermsAndConditions />
      <TrustedBrands />
      <Footer />
    </div>
  );
};

export default page;
