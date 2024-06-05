import React from "react";
import HeroSection from "./_components/HeroSection";
import FeatureSection from "./_components/FeatureSection";
import Testimonials from "./_components/Testimonials";
import Footer from "./_components/Footer";

const page = () => {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <Testimonials />
      <Footer />
    </>
  );
};

export default page;
