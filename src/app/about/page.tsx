import { generateSEO } from "@/lib/seo";
import AboutHero from "@/components/sections/about-hero";
import Team from "@/components/sections/team";
import Vision from "@/components/sections/vision";
import Values from "@/components/sections/values";

export const metadata = generateSEO({
  title: "About Us - Our Story & Team",
  description:
    "Learn about Gree Software Company's mission, vision, and the experienced team behind our innovative software solutions. Discover our commitment to excellence.",
  keywords: [
    "about gree software",
    "software development team",
    "company mission",
    "ghana tech company",
  ],
  canonical: "/about",
});

export default function AboutPage() {
  return (
    <div className="pt-20">
      <AboutHero />
      <Vision />
      <Team />
      <Values />
    </div>
  );
}
