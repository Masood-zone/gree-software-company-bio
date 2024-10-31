import { about_slides } from "@/assets/data";
import AboutCarousel from "@/components/banner/about-carousel";
import Founders from "@/components/banner/founders";
import AboutSection from "@/components/sections/about-section";
import React from "react";

export default function AboutPage() {
  return (
    <section className="py-20">
      {/* Carousel Header */}
      <AboutCarousel slides={about_slides} />
      {/* Our Vision */}
      <AboutSection />
      {/* Founders of Gree */}
      <Founders />
      {/* Location */}
    </section>
  );
}
