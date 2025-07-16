import Footer from "@/components/Footer/Footer";
import PrivacyPolicy from "@/components/Privacy-policy/PrivacyPolicyPage";
import TrustedBrands from "@/components/Trusted-Brands/TrustedBrands";
import React from "react";

const page = () => {
  return (
    <div>
      <PrivacyPolicy />
      <TrustedBrands />
      <Footer />
    </div>
  );
};

export default page;
